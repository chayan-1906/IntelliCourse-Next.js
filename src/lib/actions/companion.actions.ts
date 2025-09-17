'use server';

import {auth} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";
import {createSupabaseClient} from "@/lib/supabase";

const createCompanion = async (formData: CreateCompanion): Promise<Companion> => {
	const {userId: author} = await auth();
	if (!author) return;
	const supabase = createSupabaseClient();

	const {data, error} = await supabase
		.from('companions')
		.insert({...formData, author})
		.select();

	if (error || !data) {
		throw new Error(error?.message || 'Failed to create a companion');
	}

	return data[0] as Companion;
}

const getAllCompanions = async ({limit = 10, page = 1, subject, topic, userId}: GetAllCompanions): Promise<Companion[]> => {
	const supabase = createSupabaseClient();
	console.log('userId', userId);

	let query = supabase
		.from('companions')
		.select(
			`*,
				bookmarks!left (
					user_id
				)
			`
		);

	if (subject && topic) {
		query = query.ilike('subject', `${subject}%`)
			.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
	} else if (subject) {
		query = query.ilike('subject', `%${subject}%`);
	} else if (topic) {
		query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
	}

	query = query.range((page - 1) * limit, page * limit - 1);

	const {data: companions, error} = await query;
	// const {data: companions, error} = await query.eq('bookmarks.user_id', userId);

	if (error) {
		throw new Error(error.message);
	}

	return companions.map((companion: Companion) => ({
		...companion,
		isBookmarked: companion.bookmarks?.some((bookmark: Companion) => bookmark.user_id === userId) || false,
		// isBookmarked: companion.bookmarks && companion.bookmarks.length > 0,
	}));
}

const getCompanion = async (id: string): Promise<Companion> => {
	const supabase = createSupabaseClient();
	const {data, error} = await supabase
		.from('companions')
		.select()
		.eq('id', id);

	if (error) {
		return console.error('error in getCompanions');
	}

	return data[0];
}

const addToSessionHistory = async (companionId: string): Promise<Companion> => {
	const {userId} = await auth();
	if (!userId) return;
	const supabase = createSupabaseClient();
	const {data, error} = await supabase
		.from('session_history')
		.insert({companion_id: companionId, user_id: userId});

	if (error) throw new Error(error.message);

	return data;
}

const getRecentSessions = async (limit = 10): Promise<Companion[]> => {
	const supabase = createSupabaseClient();
	const {data, error} = await supabase
		.from('session_history')
		.select(`companions:companion_id (*)`)
		.order('created_at', {ascending: false})
		.limit(limit);

	if (error) throw new Error(error.message);

	console.log(data);
	return data?.map(({companions}) => companions);
}

const getUserSessions = async (userId: string, limit = 10): Promise<Companion[]> => {
	const supabase = createSupabaseClient();
	const {data, error} = await supabase
		.from('session_history')
		.select(`companions:companion_id (*)`)
		.eq('user_id', userId)
		.order('created_at', {ascending: false})
		.limit(limit);

	if (error) throw new Error(error.message);

	return data?.map(({companions}) => companions);
}

const getUserCompanions = async (userId: string): Promise<Companion[]> => {
	const supabase = createSupabaseClient();
	const {data, error} = await supabase
		.from('companions')
		.select()
		.eq('author', userId);

	if (error) throw new Error(error.message);

	return data;
}

const newCompanionPermissions = async () => {
	const {userId, has} = await auth();
	if (!userId) return;
	const supabase = createSupabaseClient();

	let limit = 0;

	if (has({plan: 'pro'})) {
		return true;
	} else if (has({feature: '3_companion_limit'})) {
		limit = 3;
	} else if (has({feature: '10_companion_limit'})) {
		limit = 10;
	}

	const {data, error} = await supabase
		.from('companions')
		.select('id', {count: 'exact'})
		.eq('author', userId);

	if (error) {
		throw new Error(error.message);
	}

	const companionCount = data?.length;

	return companionCount < limit;
}

const toggleBookmark = async (companionId: string, isBookmarked: boolean, path: string) => {
	const {userId} = await auth();
	if (!userId) return;
	const supabase = createSupabaseClient();

	if (isBookmarked) {
		const {data, error} = await supabase
			.from('bookmarks')
			.delete()
			.eq('companion_id', companionId)
			.eq('user_id', userId);

		if (error) {
			throw new Error(error.message);
		}

		revalidatePath(path);
		return data;
	} else {
		const {data, error} = await supabase.from('bookmarks').insert({
			companion_id: companionId,
			user_id: userId,
		});

		if (error) {
			throw new Error(error.message);
		}

		revalidatePath(path);
		return data;
	}
}

const getBookmarkedCompanions = async (userId: string): Promise<Companion[]> => {
	const supabase = createSupabaseClient();
	const {data, error} = await supabase
		.from('bookmarks')
		.select(`companions:companion_id (*)`)
		.eq('user_id', userId);

	if (error) {
		throw new Error(error.message);
	}

	return data.map(({companions}) => ({
		...companions,
		isBookmarked: true,
	}));
}

const getHeatmapData = async (userId: string): Promise<HeatmapValue[]> => {
	const supabase = createSupabaseClient();

	const oneYearAgo: Date = new Date();
	oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

	const {data, error} = await supabase
		.from('session_history')
		.select('created_at, duration_minutes')
		.eq('user_id', userId)
		.gte('created_at', oneYearAgo.toISOString())
		.order('created_at', {ascending: true});

	if (error) throw new Error(error.message);

	const heatmapData: { [key: string]: number } = {};

	data?.forEach((session: HeatmapSessionData) => {
		const date: string = new Date(session.created_at).toISOString().split('T')[0];
		heatmapData[date] = (heatmapData[date] || 0) + (session.duration_minutes || 0);
	});

	return Object.entries(heatmapData).map(([date, count]) => ({
		date,
		count,
	}));
}

const updateSessionDuration = async (companionId: string, durationMinutes: number): Promise<void> => {
	const {userId} = await auth();
	if (!userId) return;

	const supabase = createSupabaseClient();
	const {error} = await supabase
		.from('session_history')
		.update({
			duration_minutes: durationMinutes,
			completed_at: new Date().toISOString(),
		})
		.eq('companion_id', companionId)
		.eq('user_id', userId)
		.order('created_at', {ascending: false})
		.limit(1);

	if (error) throw new Error(error.message);
}

export {
	createCompanion,
	getAllCompanions,
	getCompanion,
	addToSessionHistory,
	getRecentSessions,
	getUserSessions,
	getUserCompanions,
	newCompanionPermissions,
	toggleBookmark,
	getBookmarkedCompanions,
	getHeatmapData,
	updateSessionDuration,
};
