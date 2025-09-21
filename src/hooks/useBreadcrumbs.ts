'use client';

import {useMemo} from 'react';
import {usePathname} from 'next/navigation';
import {routes} from '@/lib/routes';
import {BreadcrumbItem} from '@/types/navigation';
import {useBreadcrumbContext} from '@/components/BreadcrumbProvider';

function useBreadcrumbs(): BreadcrumbItem[] {
	const pathname = usePathname();
	const {customBreadcrumbs} = useBreadcrumbContext();

	return useMemo(() => {
		if (customBreadcrumbs) {
			return customBreadcrumbs;
		}
		const breadcrumbs: BreadcrumbItem[] = [];

		breadcrumbs.push({
			label: 'Home',
			href: routes.homePath,
		});

		if (pathname === routes.homePath) {
			return breadcrumbs;
		}

		if (pathname === routes.companionsPath) {
			breadcrumbs.push({
				label: 'Companions',
				href: routes.companionsPath,
			});
		} else if (pathname === routes.newCompanionPath) {
			breadcrumbs.push({
				label: 'Companions',
				href: routes.companionsPath,
			});
			breadcrumbs.push({
				label: 'New Companion',
			});
		} else if (pathname.startsWith(routes.companionsPath) && pathname !== routes.newCompanionPath) {
			breadcrumbs.push({
				label: 'Companions',
				href: routes.companionsPath,
			});
			breadcrumbs.push({
				label: 'Companion Details',
			});
		} else if (pathname === routes.myJourneyPath) {
			breadcrumbs.push({
				label: 'My Journey',
				href: routes.myJourneyPath,
			});
		} else if (pathname === routes.subscriptionPath) {
			breadcrumbs.push({
				label: 'Subscription',
				href: routes.subscriptionPath,
			});
		} else if (pathname.startsWith(routes.signInPath)) {
			breadcrumbs.push({
				label: 'Sign In',
			});
		} else {
			const segments = pathname.split('/').filter(Boolean);
			let currentPath = '';

			segments.forEach((segment, index) => {
				currentPath += `/${segment}`;
				const isLast = index === segments.length - 1;

				const label = segment
					.split('-')
					.map(word => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ');

				breadcrumbs.push({
					label,
					href: isLast ? undefined : currentPath,
				});
			});
		}

		return breadcrumbs;
	}, [pathname, customBreadcrumbs]);
}

export {useBreadcrumbs};
