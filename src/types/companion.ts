export interface CompanionCardProps {
	sessionId: string;
	name: string;
	topic: string;
	subject: string;
	duration: number;
	color: string;
}

export interface CompanionListProps {
	title: string;
	companions?: Companion[];
	className?: string;
}

