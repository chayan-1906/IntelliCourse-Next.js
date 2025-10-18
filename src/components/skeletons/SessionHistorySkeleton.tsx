'use client';

import React from "react";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";

function SessionHistorySkeleton({className, rows = 3, showExport = false}: SessionHistorySkeletonProps) {
	return (
		<article className={cn('session-history', className)}>
			<div className={'flex items-center justify-between mb-6'}>
				<Skeleton className={'h-9 w-64'}/>
				{showExport && (
					<Skeleton className={'h-9 w-32 rounded-md'}/>
				)}
			</div>

			<div className={'space-y-2'}>
				{Array.from({length: rows}).map((_, index) => (
					<div key={index} className={'px-3 py-1 border-t border-border'}>
						<div className={'flex items-center gap-3'}>
							{/** Session Icon */}
							<Skeleton className={'size-[72px] rounded-lg max-md:hidden flex-shrink-0'}/>

							{/** Session Info */}
							<div className={'flex flex-col flex-1 min-w-0 gap-2'}>
								<div className={'flex items-center justify-between'}>
									<Skeleton className={'h-7 w-3/5'}/>
									<Skeleton className={'h-5 w-16 flex-shrink-0 ml-2'}/>
								</div>
								<Skeleton className={'h-5 w-full'}/>
								<div className={'flex items-center gap-2 mt-1'}>
									<Skeleton className={'h-6 w-20 rounded-full'}/>
									<Skeleton className={'h-4 w-24'}/>
									<Skeleton className={'h-4 w-20'}/>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</article>
	);
}

export {SessionHistorySkeleton};
