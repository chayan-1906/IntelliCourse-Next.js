'use client';

import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

function StreakCounterSkeleton({className}: StreakCounterSkeletonProps) {
	return (
		<div className={`w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 ${className || ''}`}>
			{/** Header */}
			<div className={'flex items-center gap-3 mb-4'}>
				<Skeleton className={'size-8 rounded'}/>
				<Skeleton className={'h-6 w-32'}/>
			</div>

			{/** Current Streak */}
			<div className={'text-center mb-4'}>
				<Skeleton className={'h-10 w-16 mx-auto mb-2'}/>
				<Skeleton className={'h-5 w-12 mx-auto'}/>
			</div>

			{/** Streak Message */}
			<div className={'text-center mb-4'}>
				<Skeleton className={'h-5 w-48 mx-auto'}/>
			</div>

			{/** Stats Row */}
			<div className={'flex justify-between items-center pt-4 border-t border-white/20'}>
				<div className={'text-center'}>
					<Skeleton className={'h-8 w-12 mx-auto mb-1'}/>
					<Skeleton className={'h-4 w-20 mx-auto'}/>
				</div>
				<div className={'text-center'}>
					<Skeleton className={'h-8 w-12 mx-auto mb-1'}/>
					<Skeleton className={'h-4 w-12 mx-auto'}/>
				</div>
				<div className={'text-center'}>
					<Skeleton className={'h-8 w-16 mx-auto mb-1'}/>
					<Skeleton className={'h-4 w-24 mx-auto'}/>
				</div>
			</div>
		</div>
	);
}

export {StreakCounterSkeleton};
