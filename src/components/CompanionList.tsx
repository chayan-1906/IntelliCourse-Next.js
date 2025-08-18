import Link from "next/link";
import Image from "next/image";
import {routes} from "@/lib/routes";
import {cn, getSubjectColor} from "@/lib/utils";
import {CompanionListProps} from "@/types/companion";
import {icons, subjectIcons} from "@/constants/icons";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";

function CompanionList({title, companions, className}: CompanionListProps) {
	return (
		<article className={cn('companion-list', className)}>
			<h2 className={'font-bold text-3xl'}>Recent Sessions</h2>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className={'w-2/3 text-lg'}>Lessons</TableHead>
						<TableHead className={'text-lg'}>Subject</TableHead>
						<TableHead className={'text-lg text-right'}>Duration</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{companions?.map(({$id, name, subject, duration, topic, bookmarked}) => (
						<Link key={$id} href={routes.companionDetailsPath($id)} className={'table-row cursor-pointer hover:bg-gray-100'}>
							{/** subject logo, name, topic */}
							<div className={'table-cell font-medium py-4 pl-4 align-middle border-b border-gray-200'}>
								<div className={'flex items-center gap-4'}>
									<div className={'flex items-center justify-center rounded-lg size-[72px] max-md:hidden'} style={{backgroundColor: getSubjectColor(subject)}}>
										<Image src={subjectIcons[subject as keyof typeof subjectIcons]} alt={subject} width={35} height={35}/>
									</div>
									<div className={'flex flex-col'}>
										<p className={'font-bold text-2xl'}>{name}</p>
										<p className={'text-lg'}>{topic}</p>
									</div>
								</div>
							</div>

							{/** subject & subject logo for <md devices */}
							<div className={'table-cell py-4 px-4 align-middle border-b border-gray-200'}>
								<div className={'subject-badge w-fit max-md:hidden'}>{subject}</div>
								<div className={'flex md:hidden items-center justify-center rounded-lg w-fit p-2'} style={{backgroundColor: getSubjectColor(subject)}}>
									<Image src={subjectIcons[subject as keyof typeof subjectIcons]} alt={subject} width={18} height={18}/>
								</div>
							</div>

							<div className={'table-cell py-4 pr-4 align-middle border-b border-gray-200'}>
								<div className={'flex items-center gap-2 w-full'}>
									<p className={'text-2xl'}>
										{duration}
										<span className={'max-md:hidden'}> minutes</span>
									</p>
									<Image src={icons.clock} alt={'clock'} width={14} height={14} className={'md:hidden'}/>
								</div>
							</div>
						</Link>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total</TableCell>
						<TableCell className={'text-right'}>$2,500.00</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</article>
	);
}

export default CompanionList;
