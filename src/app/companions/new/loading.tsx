import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {CompanionFormSkeleton} from "@/components/skeletons/CompanionFormSkeleton";

function Loading() {
	return (
		<main className={'min-lg:w-1/3 min-md:w-2/3 items-center justify-center'}>
			<article className={'flex flex-col w-full gap-4'}>
				{/** Page title skeleton */}
				<Skeleton className={'h-9 w-64'}/>

				{/** Form skeleton */}
				<CompanionFormSkeleton/>
			</article>
		</main>
	);
}

export default Loading;
