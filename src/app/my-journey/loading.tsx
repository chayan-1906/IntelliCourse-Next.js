import React from 'react';
import {CompanionListSkeleton} from "@/components/skeletons/CompanionListSkeleton";
import {SessionHistorySkeleton} from "@/components/skeletons/SessionHistorySkeleton";
import {ActivityHeatmapSkeleton} from "@/components/skeletons/ActivityHeatmapSkeleton";

function Loading() {
	return (
		<main className={'min-lg:w-3/4'}>
			{/** Profile Section Skeleton */}
			<section className={'flex sm:flex- items-center justify-between gap-4 mb-8'}>
				<div className={'flex gap-4 items-center flex-wrap'}>
					<div className={'rounded-full size-16 sm:size-20 md:size-28 bg-muted animate-pulse flex-shrink-0'}/>
					<div className={'flex flex-col gap-2'}>
						<div className={'h-8 w-48 bg-muted animate-pulse rounded'}/>
						<div className={'h-5 w-64 bg-muted animate-pulse rounded'}/>
					</div>
				</div>

				<div className={'flex gap-4'}>
					<div className={'flex flex-col h-fit border border-muted rounded-lg p-3 gap-2 w-32 animate-pulse'}>
						<div className={'h-8 bg-muted rounded'}/>
						<div className={'h-4 bg-muted rounded'}/>
					</div>
					<div className={'flex flex-col h-fit border border-muted rounded-lg p-3 gap-2 w-32 animate-pulse'}>
						<div className={'h-8 bg-muted rounded'}/>
						<div className={'h-4 bg-muted rounded'}/>
					</div>
				</div>
			</section>

			{/** Streak Counter Skeleton */}
			<section className={'mx-6 mb-8'}>
				<div className={'h-24 bg-muted animate-pulse rounded-lg'}/>
			</section>

			{/** Activity Heatmap Skeleton */}
			<section className={'mx-6 mb-8'}>
				<ActivityHeatmapSkeleton/>
			</section>

			{/** Accordion Section Skeleton */}
			<div className={'space-y-4'}>
				<div className={'mx-6'}>
					<div className={'h-14 bg-muted animate-pulse rounded-lg mb-4'}/>
					<CompanionListSkeleton className={'border-border border mx-6'} rows={2}/>
				</div>

				<div className={'h-[1px] bg-border mx-6 my-4'}/>

				<div className={'mx-6'}>
					<div className={'h-14 bg-muted animate-pulse rounded-lg mb-4'}/>
					<SessionHistorySkeleton className={'border-border border mx-6'} rows={2} showExport={true}/>
				</div>

				<div className={'h-[1px] bg-border mx-6 my-4'}/>

				<div className={'mx-6'}>
					<div className={'h-14 bg-muted animate-pulse rounded-lg mb-4'}/>
					<CompanionListSkeleton className={'border-border border mx-6'} rows={2}/>
				</div>
			</div>
		</main>
	);
}

export default Loading;
