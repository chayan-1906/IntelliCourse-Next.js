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
	console.log('addToSessionHistory:', companionId);
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
		.select(`
			id,
			created_at,
			duration_minutes,
			companions:companion_id (
				id,
				name,
				subject,
				topic,
				voice,
				style,
				duration
			)
		`)
		.order('created_at', {ascending: false})
		.limit(limit);

	if (error) throw new Error(error.message);

	return data?.map((session: Companion) => ({
		...session.companions,
		duration: session.duration_minutes || 0,
		sessionId: session.id,
		sessionDate: session.created_at,
	})) || [];
}

const getUserSessions = async (userId: string, limit = 10): Promise<Companion[]> => {
	const supabase = createSupabaseClient();
	const {data, error} = await supabase
		.from('session_history')
		.select(`
			id,
			created_at,
			duration_minutes,
			companions:companion_id (
				id,
				name,
				subject,
				topic,
				voice,
				style,
				duration
			)
		`)
		.eq('user_id', userId)
		.order('created_at', {ascending: false})
		.limit(limit);

	if (error) throw new Error(error.message);

	return data?.map((session: Companion) => ({
		...session.companions,
		duration: session.duration_minutes || 0,
		sessionId: session.id,
		sessionDate: session.created_at,
	})) || [];
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
	console.log('updateSessionDuration:', {companionId, durationMinutes});
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

const getUserStreakData = async (userId: string): Promise<StreakData> => {
	const supabase = createSupabaseClient();

	const {data, error} = await supabase
		.from('session_history')
		.select('created_at, duration_minutes')
		.eq('user_id', userId)
		.gt('duration_minutes', 0)
		.order('created_at', {ascending: true});

	if (error) throw new Error(error.message);

	if (!data || data.length === 0) {
		return {currentStreak: 0, longestStreak: 0, lastActivityDate: null, isActiveToday: false};
	}

	const uniqueDates = Array.from(
		new Set(data.map((session) => new Date(session.created_at).toISOString().split('T')[0]))
	).sort();

	if (uniqueDates.length === 0) {
		return {currentStreak: 0, longestStreak: 0, lastActivityDate: null, isActiveToday: false};
	}

	const today = new Date().toISOString().split('T')[0];

	const isActiveToday = uniqueDates.includes(today);
	const lastActivityDate = uniqueDates[uniqueDates.length - 1];

	let currentStreak = 0;

	for (let i = uniqueDates.length - 1; i >= 0; i--) {
		const currentDate = uniqueDates[i];
		const expectedDate = new Date();
		expectedDate.setDate(expectedDate.getDate() - currentStreak);
		const expectedDateStr = expectedDate.toISOString().split('T')[0];

		if (currentDate === expectedDateStr) {
			currentStreak++;
		} else {
			break;
		}
	}

	let longestStreak = 0;
	let tempStreak = 1;

	for (let i = 1; i < uniqueDates.length; i++) {
		const prevDate = new Date(uniqueDates[i - 1]);
		const currentDate = new Date(uniqueDates[i]);
		const diffTime = currentDate.getTime() - prevDate.getTime();
		const diffDays = diffTime / (1000 * 60 * 60 * 24);

		if (diffDays === 1) {
			tempStreak++;
		} else {
			longestStreak = Math.max(longestStreak, tempStreak);
			tempStreak = 1;
		}
	}
	longestStreak = Math.max(longestStreak, tempStreak);

	return {currentStreak, longestStreak, lastActivityDate, isActiveToday};
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
	getUserStreakData,
};
