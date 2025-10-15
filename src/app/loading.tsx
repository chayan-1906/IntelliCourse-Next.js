import React from 'react';
import {CompanionListSkeleton} from "@/components/skeletons/CompanionListSkeleton";

function Loading() {
	return (
		<main>
			<div className={'h-8 w-64 bg-muted animate-pulse rounded-md mb-6'}/>
			<section className={'home-section'}>
				<div className={'flex gap-4 w-full'}>
					{Array.from({length: 3}).map((_, i) => (
						<div key={i} className={'flex flex-col rounded-4xl p-4 gap-5 w-full animate-pulse'}>
							<div className={'h-32 bg-muted rounded-lg'}/>
							<div className={'h-6 bg-muted rounded w-3/4'}/>
							<div className={'h-4 bg-muted rounded w-full'}/>
						</div>
					))}
				</div>
			</section>

			<section className={'home-section'}>
				<CompanionListSkeleton className={'w-2/3 max-lg:w-full rounded-4xl'} rows={5}/>
				<div className={'w-1/3 max-lg:w-1/2 max-md:w-full h-64 bg-muted animate-pulse rounded-4xl'}/>
			</section>
		</main>
	);
}

export default Loading;
