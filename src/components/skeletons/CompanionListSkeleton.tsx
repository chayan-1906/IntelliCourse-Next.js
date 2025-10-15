'use client';

import React from "react";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import {CompanionListSkeletonProps} from "@/types/companion";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

function CompanionListSkeleton({className, rows = 3}: CompanionListSkeletonProps) {
	return (
		<article className={cn('companion-list', className)}>
			<Skeleton className={'h-9 w-64 mb-6'}/>
			<div className={'w-full'}>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className={'min-w-0 text-lg'}>Lessons</TableHead>
							<TableHead className={'text-lg whitespace-nowrap'}>Subject</TableHead>
							<TableHead className={'text-lg text-right whitespace-nowrap'}>Duration</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({length: rows}).map((_, index) => (
							<TableRow key={index}>
								<TableCell className={'font-medium whitespace-normal'}>
									<div className={'flex items-center gap-4'}>
										<Skeleton className={'size-[72px] rounded-lg max-md:hidden flex-shrink-0'}/>
										<div className={'flex flex-col gap-2 flex-1'}>
											<Skeleton className={'h-7 w-3/4'}/>
											<Skeleton className={'h-5 w-full'}/>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<Skeleton className={'h-6 w-20 rounded-4xl max-md:hidden'}/>
									<Skeleton className={'size-9 rounded-lg md:hidden'}/>
								</TableCell>
								<TableCell>
									<div className={'flex justify-end gap-2 w-full'}>
										<Skeleton className={'h-5 w-16'}/>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</article>
	);
}

export {CompanionListSkeleton};
