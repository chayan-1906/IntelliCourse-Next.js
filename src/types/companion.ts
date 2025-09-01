export interface CompanionCardProps {
	id: string;
	name: string;
	topic: string;
	subject: string;
	duration: number;
	color: string;
	isBookmarked: boolean;
}

export interface CompanionListProps {
	title: string;
	companions?: Companion[];
	className?: string;
}

export interface CompanionSessionPageProps {
	params: Promise<{ id: string }>;
}
