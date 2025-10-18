import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

function Loading() {
	return (
		<main>
			{/** Breadcrumbs Skeleton */}
			<div className={'flex items-center gap-2 mb-4'}>
				<Skeleton className={'h-4 w-16'}/>
				<Skeleton className={'h-4 w-4'}/>
				<Skeleton className={'h-4 w-32'}/>
				<Skeleton className={'h-4 w-4'}/>
				<Skeleton className={'h-4 w-48'}/>
			</div>

			{/** Companion Header Skeleton */}
			<article className={'flex max-md:flex-col justify-between rounded-border p-6'}>
				<div className={'flex items-center gap-4'}>
					<Skeleton className={'size-[72px] rounded-lg max-md:hidden'}/>
					<div className={'flex flex-col gap-2'}>
						<div className={'flex items-center gap-2'}>
							<Skeleton className={'h-7 w-48'}/>
							<Skeleton className={'h-6 w-20 rounded-full max-sm:hidden'}/>
						</div>
						<Skeleton className={'h-5 w-96 max-w-full'}/>
					</div>
				</div>
				<Skeleton className={'h-7 w-32 max-md:hidden'}/>
			</article>

			{/** CompanionComponent Skeleton */}
			<section className={'flex flex-col h-[70vh]'}>
				<section className={'flex max-sm:flex-col gap-8'}>
					{/** Companion Section */}
					<div className={'companion-section pb-4'}>
						<Skeleton className={'companion-avatar rounded-full'}/>
						<Skeleton className={'h-7 w-48 mt-4'}/>
					</div>

					{/** User Section */}
					<div className={'user-section'}>
						<div className={'user-avatar'}>
							<Skeleton className={'size-[130px] rounded-lg'}/>
							<Skeleton className={'h-7 w-32 mt-2'}/>
						</div>

						{/** Session Timer Skeleton */}
						<div className={'w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4 flex flex-col items-center gap-2'}>
							<Skeleton className={'h-4 w-32'}/>
							<Skeleton className={'h-8 w-20'}/>
							<Skeleton className={'size-2 rounded-full'}/>
						</div>

						{/** Mic Button Skeleton */}
						<Skeleton className={'h-12 w-full rounded-lg'}/>

						{/** Start Session Button Skeleton */}
						<Skeleton className={'h-10 w-full rounded-lg'}/>
					</div>
				</section>

				{/** Transcript Skeleton */}
				<section className={'transcript'}>
					<div className={'transcript-message space-y-2'}>
						<Skeleton className={'h-4 w-full'}/>
						<Skeleton className={'h-4 w-3/4'}/>
						<Skeleton className={'h-4 w-5/6'}/>
					</div>
				</section>
			</section>
		</main>
	);
}

export default Loading;
