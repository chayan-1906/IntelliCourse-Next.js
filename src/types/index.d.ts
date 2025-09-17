// type User = {
//   name: string;
//   email: string;
//   image?: string;
//   accountId: string;
// };

declare module '*.svg' {
	const content: string;
	export default content;
}

enum Subject {
	maths = 'maths',
	language = 'language',
	science = 'science',
	history = 'history',
	coding = 'coding',
	geography = 'geography',
	economics = 'economics',
	finance = 'finance',
	business = 'business',
}

type Companion = Models.DocumentList<Models.Document> & {
	id: string;
	name: string;
	subject: Subject;
	topic: string;
	duration: number;
	isBookmarked: boolean;
};

interface CreateCompanion {
	name: string;
	subject: string;
	topic: string;
	voice: string;
	style: string;
	duration: number;
}

interface GetAllCompanions {
	limit?: number;
	page?: number;
	subject?: string | string[];
	topic?: string | string[];
	userId?: string;
}

interface SearchParams {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface SavedMessage {
	role: 'user' | 'system' | 'assistant';
	content: string;
}

interface CompanionComponentProps {
	companionId: string;
	subject: string;
	topic: string;
	name: string;
	userName: string;
	userImage: string;
	voice: string;
	style: string;
}

interface AnimatedMyJourneyPageProps {
	user: {
		id: string;
		imageUrl: string;
		firstName: string | null;
		lastName: string | null;
		emailAddress: string | undefined;
	};
	sessionHistory: Companion[];
	companions: Companion[];
	bookmarkedCompanions: Companion[];
}

interface HeatmapValue {
	date: string;
	count: number;
}

interface ReactCalendarHeatmapValue {
	date: string;
	count?: number;
}

interface HeatmapSessionData {
	created_at: string;
	duration_minutes: number;
}

interface ActivityHeatmapProps {
	userId: string;
	className?: string;
}

interface StreakCounterProps {
	userId: string;
	className?: string;
}

interface StreakData {
	currentStreak: number;
	longestStreak: number;
	lastActivityDate: string | null;
	isActiveToday: boolean;
}
