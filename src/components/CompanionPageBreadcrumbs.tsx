'use client';

import {useEffect} from 'react';
import {routes} from '@/lib/routes';
import {CompanionPageBreadcrumbsProps} from "@/types/navigation";
import {useBreadcrumbContext} from '@/components/BreadcrumbProvider';

function CompanionPageBreadcrumbs({companionName, companionId}: CompanionPageBreadcrumbsProps) {
	const {setCustomBreadcrumbs} = useBreadcrumbContext();

	useEffect(() => {
		setCustomBreadcrumbs([
			{
				label: 'Home',
				href: routes.homePath,
			},
			{
				label: 'Companions',
				href: routes.companionsPath,
			},
			{
				label: companionName,
			},
		]);

		return () => {
			setCustomBreadcrumbs(null);
		};
	}, [companionName, companionId, setCustomBreadcrumbs]);

	return null;
}

export {CompanionPageBreadcrumbs};
