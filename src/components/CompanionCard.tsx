'use client';

import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {usePathname} from "next/navigation";
import {routes} from "@/lib/routes";
import {icons} from "@/constants/icons";
import {CompanionCardProps} from '@/types/companion';
import {toggleBookmark} from "@/lib/actions/companion.actions";

function CompanionCard({id, name, topic, subject, duration, color, isBookmarked}: CompanionCardProps) {
	const pathname = usePathname();

	const handleBookmark = async () => await toggleBookmark(id, isBookmarked, pathname);

	return (
		<motion.article
			className={'companion-card'}
			style={{backgroundColor: color}}
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{duration: 0.5, ease: 'easeOut'}}
			whileHover={{
				scale: 1.02,
				transition: {duration: 0.2, ease: 'easeOut'},
			}}
			whileTap={{scale: 0.98}}
		>
			<motion.div
				className={'flex justify-between items-center'}
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{delay: 0.1, duration: 0.3}}
			>
				<motion.div className={'subject-badge'} whileHover={{scale: 1.05}} transition={{duration: 0.2}}>{subject}</motion.div>
				<motion.button
					className={'companion-bookmark'}
					onClick={handleBookmark}
					whileHover={{scale: 1.1, rotate: 5}}
					whileTap={{scale: 0.9}}
					transition={{duration: 0.2}}
				>
					<Image src={isBookmarked ? icons.bookmarkFilled : icons.bookmark} alt={'bookmark'} width={12.5} height={15}/>
				</motion.button>
			</motion.div>

			<motion.h2
				className={'text-2xl font-bold text-gray-800'}
				initial={{opacity: 0, x: -10}}
				animate={{opacity: 1, x: 0}}
				transition={{delay: 0.2, duration: 0.3}}
			>
				{name}
			</motion.h2>
			<motion.p className={'text-sm text-gray-600'} initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} transition={{delay: 0.3, duration: 0.3}}>
				{topic}
			</motion.p>

			<motion.div className={'flex items-center gap-2'} initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.4, duration: 0.3}}>
				<Image src={icons.clock} alt={'duration'} width={13.5} height={13.5}/>
				<p className={'text-sm'}>{duration} minutes</p>
			</motion.div>

			<Link href={routes.companionDetailsPath(id)} className={'w-full'}>
				<motion.button
					className={'btn-primary w-full justify-center'}
					whileHover={{scale: 1.02}}
					whileTap={{scale: 0.98}}
					transition={{duration: 0.2}}
				>
					Launch Lesson
				</motion.button>
			</Link>
		</motion.article>
	);
}

export default CompanionCard;
