'use client';

import React from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {routes} from "@/lib/routes";
import {cn, getSubjectColor} from "@/lib/utils";
import {CompanionListProps} from "@/types/companion";
import {icons, subjectIcons} from "@/constants/icons";
import {EmptyStateAnimation} from "@/components/EmptyStateAnimation";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

function CompanionList({title, companions, className}: CompanionListProps) {
	const router = useRouter();

	const handleRowClick = (id: string, event: React.MouseEvent) => {
		const href = routes.companionDetailsPath(id);

		if (event.ctrlKey || event.metaKey) {
			window.open(href, '_blank');
		} else {
			router.push(href);
		}
	}

	if (!companions || companions.length === 0) {
		return (
			<article className={cn('companion-list', className)}>
				<h2 className={'font-bold text-3xl'}>{title}</h2>
				<EmptyStateAnimation
					title={'No recent sessions found'}
					description={
						title.toLowerCase().includes('bookmarked')
							? 'You haven\'t bookmarked any companions yet. Bookmark your favorites to find them here!'
							: title.toLowerCase().includes('recent')
								? 'No recent sessions found. Start a lesson to see your progress here!'
								: 'No companions available. Create your first AI companion to get started!'
					}
				/>
			</article>
		);
	}

	return (
		<article className={cn('companion-list', className)}>
			<h2 className={'font-bold text-3xl'}>{title}</h2>

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
						{companions?.map(({id, name, subject, duration, topic}: Companion, index: number) => (
							<TableRow
								key={index} className={'bg-yellow-200hover:bg-gray-100 cursor-pointer flex-1'}
								onClick={(e) => handleRowClick(id, e)}
								onAuxClick={(e) => {
									if (e.button === 1) {
										window.open(routes.companionDetailsPath(id), '_blank');
									}
								}}
								data-href={routes.companionDetailsPath(id)}
							>
								{/** subject logo, name, topic */}
								<TableCell className={'font-medium whitespace-normal'}>
									<div className={'flex items-center gap-4'}>
										<div className={'flex items-center justify-center rounded-lg size-[72px] max-md:hidden flex-shrink-0'} style={{backgroundColor: getSubjectColor(subject)}}>
											<Image src={subjectIcons[subject as keyof typeof subjectIcons]} alt={subject} width={35} height={35}/>
										</div>
										<div className={'flex flex-col flex-1'}>
											<p className={'font-bold text-2xl break-words'}>{name}</p>
											<p className={'text-lg break-words'}>
												{topic.split(' ').length > 15 ? topic.split(' ').slice(0, 15).join(' ') + '...' : topic}
											</p>
										</div>
									</div>
								</TableCell>

								{/** subject & subject logo for <md devices */}
								<TableCell>
									<div className={'subject-badge w-fit max-md:hidden'}>{subject}</div>
									<div className={'flex md:hidden items-center justify-center rounded-lg w-fit p-2'} style={{backgroundColor: getSubjectColor(subject)}}>
										<Image src={subjectIcons[subject as keyof typeof subjectIcons]} alt={subject} width={18} height={18}/>
									</div>
								</TableCell>

								<TableCell>
									<div className={'flex justify-end gap-2 w-full'}>
										<p className={'text-2xl'}>
											{duration}
											<span className={'max-md:hidden'}> minutes</span>
										</p>
										<Image src={icons.clock} alt={'clock'} width={14} height={14} className={'md:hidden'}/>
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

export {CompanionList};
