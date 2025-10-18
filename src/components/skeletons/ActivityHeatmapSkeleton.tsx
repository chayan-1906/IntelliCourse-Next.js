'use client';

import React from "react";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";

function ActivityHeatmapSkeleton({className}: ActivityHeatmapSkeletonProps) {
	return (
		<div className={cn('activity-heatmap-container', className)}>
			<div className={'mb-4'}>
				<div className={'flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'}>
					<div className={'flex flex-col w-full gap-2'}>
						<Skeleton className={'h-6 w-48'}/>
						<Skeleton className={'h-4 w-64'}/>
					</div>
					<div className={'inline-flex gap-3 w-full justify-between sm:justify-end sm:items-center'}>
						<Skeleton className={'h-9 w-32 rounded-md'}/>
						<div className={'inline-flex items-center gap-2'}>
							<Skeleton className={'h-7 w-16 rounded-md'}/>
							<Skeleton className={'h-7 w-16 rounded-md'}/>
						</div>
					</div>
				</div>
			</div>

			{/** Heatmap/Chart Area */}
			<div className={'bg-white p-4 rounded-lg border border-gray-200'}>
				<Skeleton className={'h-48 w-full'}/>
			</div>

			{/** Legend */}
			<div className={'mt-4 inline-flex w-full items-center justify-center gap-2'}>
				<Skeleton className={'h-3 w-8'}/>
				<div className={'inline-flex items-center gap-2'}>
					<Skeleton className={'size-3 rounded-sm'}/>
					<Skeleton className={'size-3 rounded-sm'}/>
					<Skeleton className={'size-3 rounded-sm'}/>
					<Skeleton className={'size-3 rounded-sm'}/>
					<Skeleton className={'size-3 rounded-sm'}/>
				</div>
				<Skeleton className={'h-3 w-8'}/>
			</div>
		</div>
	);
}

export {ActivityHeatmapSkeleton};
