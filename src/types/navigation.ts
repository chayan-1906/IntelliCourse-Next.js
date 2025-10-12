import React from "react";

export interface NavItem {
	label: string;
	href: string;
}

export interface BreadcrumbItem {
	label: string;
	href?: string;
	icon?: React.ReactNode;
}

export interface BreadcrumbProps {
	items: BreadcrumbItem[];
	className?: string;
}

export interface BreadcrumbWrapperProps {
	children: React.ReactNode;
}

export interface BreadcrumbContextType {
	customBreadcrumbs: BreadcrumbItem[] | null;
	setCustomBreadcrumbs: (breadcrumbs: BreadcrumbItem[] | null) => void;
}

export interface CompanionPageBreadcrumbsProps {
	companionName: string;
	companionId: string;
}
