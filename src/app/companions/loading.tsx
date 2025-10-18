import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {CompanionCardSkeleton} from "@/components/skeletons/CompanionCardSkeleton";

function Loading() {
	return (
		<main>
			<section className={'flex max-sm:flex-col justify-between gap-4'}>
				<Skeleton className={'h-10 w-64'}/>
				<div className={'flex gap-4'}>
					<Skeleton className={'h-10 w-64 max-sm:w-full'}/>
					<Skeleton className={'h-10 w-32 max-sm:w-24'}/>
				</div>
			</section>
			<section className={'companions-grid'}>
				{Array.from({length: 12}).map((_, i) => (
					<CompanionCardSkeleton key={i}/>
				))}
			</section>
		</main>
	);
}

export default Loading;
