'use client';

import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {routes} from "@/lib/routes";
import {icons} from "@/constants/icons";
import {CompanionCardProps} from '@/types/companion';
import {toggleBookmark} from "@/lib/actions/companion.actions";

function CompanionCard({id, name, topic, subject, duration, color, isBookmarked}: CompanionCardProps) {
	const pathname = usePathname();

	const handleBookmark = async () => await toggleBookmark(id, isBookmarked, pathname);

	return (
		<article className={'companion-card'} style={{backgroundColor: color}}>
			<div className={'flex justify-between items-center'}>
				<div className={'subject-badge'}>{subject}</div>
				<button className={'companion-bookmark'} onClick={handleBookmark}>
					<Image src={isBookmarked ? icons.bookmarkFilled : icons.bookmark} alt={'bookmark'} width={12.5} height={15}/>
				</button>
			</div>

			<h2 className={'text-2xl font-bold'}>{name}</h2>
			<p className={'text-sm'}>{topic}</p>

			<div className={'flex items-center gap-2'}>
				<Image src={icons.clock} alt={'duration'} width={13.5} height={13.5}/>
				<p className={'text-sm'}>{duration} minutes</p>
			</div>

			<Link href={routes.companionDetailsPath(id)} className={'w-full'}>
				<button className={'btn-primary w-full justify-center'}>Launch Lesson</button>
			</Link>
		</article>
	);
}

export default CompanionCard;
