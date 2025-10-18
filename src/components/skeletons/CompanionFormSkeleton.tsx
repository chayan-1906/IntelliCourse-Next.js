'use client';

import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

function CompanionFormSkeleton({className}: CompanionFormSkeletonProps) {
	return (
		<div className={`space-y-8 ${className || ''}`}>
			{/** Companion name field */}
			<div className={'space-y-2'}>
				<Skeleton className={'h-5 w-32'}/>
				<Skeleton className={'h-10 w-full'}/>
			</div>

			{/** Subject field */}
			<div className={'space-y-2'}>
				<Skeleton className={'h-5 w-20'}/>
				<Skeleton className={'h-10 w-full'}/>
			</div>

			{/** Topic field */}
			<div className={'space-y-2'}>
				<Skeleton className={'h-5 w-64'}/>
				<Skeleton className={'h-24 w-full'}/>
			</div>

			{/** Voice field */}
			<div className={'space-y-2'}>
				<Skeleton className={'h-5 w-16'}/>
				<Skeleton className={'h-10 w-full'}/>
			</div>

			{/** Style field */}
			<div className={'space-y-2'}>
				<Skeleton className={'h-5 w-16'}/>
				<Skeleton className={'h-10 w-full'}/>
			</div>

			{/** Duration field */}
			<div className={'space-y-2'}>
				<Skeleton className={'h-5 w-48'}/>
				<Skeleton className={'h-10 w-full'}/>
			</div>

			{/** Submit button */}
			<Skeleton className={'h-10 w-full'}/>
		</div>
	);
}

export {CompanionFormSkeleton};
