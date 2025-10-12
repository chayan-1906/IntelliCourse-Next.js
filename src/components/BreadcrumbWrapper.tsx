'use client';

import React from 'react';
import {usePathname} from 'next/navigation';
import {Breadcrumb} from '@/components/Breadcrumb';
import {useBreadcrumbs} from '@/hooks/useBreadcrumbs';
import {BreadcrumbWrapperProps} from "@/types/navigation";
import {BreadcrumbProvider} from '@/components/BreadcrumbProvider';

function BreadcrumbContent({children}: BreadcrumbWrapperProps) {
	const pathname = usePathname();
	const breadcrumbs = useBreadcrumbs();

	const excludedRoutes = [
		'/',
		'/sign-in',
		'/sign-up',
		'/sentry-example-page',
	];

	const shouldShowBreadcrumbs = !excludedRoutes.some(route => pathname === route || (route !== '/' && pathname.startsWith(route)));

	return (
		<>
			{shouldShowBreadcrumbs && breadcrumbs.length > 1 && (
				<Breadcrumb items={breadcrumbs}/>
			)}
			{children}
		</>
	);
}

function BreadcrumbWrapper({children}: BreadcrumbWrapperProps) {
	return (
		<BreadcrumbProvider>
			<BreadcrumbContent>{children}</BreadcrumbContent>
		</BreadcrumbProvider>
	);
}

export {BreadcrumbWrapper};
