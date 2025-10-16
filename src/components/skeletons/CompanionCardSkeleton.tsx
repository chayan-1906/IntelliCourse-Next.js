'use client';

import React from "react";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import {CompanionCardSkeletonProps} from "@/types/companion";

function CompanionCardSkeleton({className}: CompanionCardSkeletonProps) {
	return (
		<article className={cn('companion-card', className)}>
			{/** Header with subject badge and bookmark */}
			<div className={'flex justify-between items-center'}>
				<Skeleton className={'h-6 w-24 rounded-full'}/>
				<Skeleton className={'size-[15px] rounded'}/>
			</div>

			{/** Title */}
			<Skeleton className={'h-8 w-3/4 mt-4'}/>

			{/** Topic description - 3 lines */}
			<div className={'flex flex-col gap-2 mt-3'}>
				<Skeleton className={'h-4 w-full'}/>
				<Skeleton className={'h-4 w-full'}/>
				<Skeleton className={'h-4 w-2/3'}/>
			</div>

			{/** Duration info */}
			<div className={'flex items-center gap-2 mt-4'}>
				<Skeleton className={'size-[13.5px] rounded'}/>
				<Skeleton className={'h-4 w-20'}/>
			</div>

			{/** Launch button */}
			<Skeleton className={'h-10 w-full mt-4 rounded-md'}/>
		</article>
	);
}

export {CompanionCardSkeleton};
