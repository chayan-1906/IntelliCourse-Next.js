import React from "react";

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
	isLoading?: boolean;
}

export interface CompanionSessionPageProps {
	params: Promise<{ id: string }>;
}

// Animation interfaces
export interface LottieAnimationProps {
	animationPath?: string;
	loop?: boolean;
	autoplay?: boolean;
	className?: string;
	width?: number;
	height?: number;
	onComplete?: () => void;
	style?: React.CSSProperties;
}

export interface EmptyStateAnimationProps {
	title?: string;
	description?: string;
	className?: string;
}

export interface LoadingAnimationProps {
	message?: string;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

export interface SuccessAnimationProps {
	message?: string;
	autoHide?: boolean;
	duration?: number;
	onComplete?: () => void;
	className?: string;
}

export interface AnimationModalProps {
	isOpen: boolean;
	type: 'loading' | 'success' | 'error';
	title?: string;
	message?: string;
	onClose?: () => void;
	autoClose?: boolean;
	duration?: number;
}

export interface AnimationModalState {
	isOpen: boolean;
	type: 'loading' | 'success' | 'error';
	title?: string;
	message?: string;
}

export interface CompanionListSkeletonProps {
	className?: string;
	rows?: number;
}

export interface CompanionCardSkeletonProps {
	className?: string;
}
