import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {CompanionCardSkeleton} from "@/components/skeletons/CompanionCardSkeleton";
import {CompanionListSkeleton} from "@/components/skeletons/CompanionListSkeleton";

function Loading() {
	return (
		<main>
			<Skeleton className={'h-8 w-64 mb-6'}/>
			<section className={'home-section'}>
				{Array.from({length: 3}).map((_, i) => (
					<CompanionCardSkeleton key={i}/>
				))}
			</section>

			<section className={'home-section'}>
				<CompanionListSkeleton className={'w-2/3 max-lg:w-full rounded-4xl'} rows={5}/>
				<div className={'w-1/3 max-lg:w-1/2 max-md:w-full h-64 bg-muted animate-pulse rounded-4xl'}/>
			</section>
		</main>
	);
}

export default Loading;
