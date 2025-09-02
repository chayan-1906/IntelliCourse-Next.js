'use client';

import React from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {routes} from "@/lib/routes";
import {cn, getSubjectColor} from "@/lib/utils";
import {CompanionListProps} from "@/types/companion";
import {icons, subjectIcons} from "@/constants/icons";
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

	return (
		<article className={cn('companion-list', className)}>
			<h2 className={'font-bold text-3xl'}>{title}</h2>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className={'w-2/3 text-lg'}>Lessons</TableHead>
						<TableHead className={'text-lg'}>Subject</TableHead>
						<TableHead className={'text-lg text-right'}>Duration</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{companions?.map(({id, name, subject, duration, topic}: Companion) => (
						<TableRow
							key={id}
							className={'hover:bg-gray-100 cursor-pointer'}
							onClick={(e) => handleRowClick(id, e)}
							onAuxClick={(e) => {
								if (e.button === 1) {
									window.open(routes.companionDetailsPath(id), '_blank');
								}
							}}
							data-href={routes.companionDetailsPath(id)}
						>
							{/** subject logo, name, topic */}
							<TableCell className={'font-medium'}>
								<div className={'flex items-center gap-4'}>
									<div className={'flex items-center justify-center rounded-lg size-[72px] max-md:hidden'} style={{backgroundColor: getSubjectColor(subject)}}>
										<Image src={subjectIcons[subject as keyof typeof subjectIcons]} alt={subject} width={35} height={35}/>
									</div>
									<div className={'flex flex-col'}>
										<p className={'font-bold text-2xl'}>{name}</p>
										<p className={'text-lg'}>{topic}</p>
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
		</article>
	);
}

export default CompanionList;
