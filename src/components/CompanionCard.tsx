'use client';

import React from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {usePathname} from "next/navigation";
import {routes} from "@/lib/routes";
import {icons} from "@/constants/icons";
import {CompanionCardProps} from '@/types/companion';
import {toggleBookmark} from "@/lib/actions/companion.actions";

function CompanionCard({id, name, topic, subject, duration, color, isBookmarked}: CompanionCardProps) {
	const pathname = usePathname();

	const handleBookmark = async (e: React.MouseEvent) => {
		e.stopPropagation();
		await toggleBookmark(id, isBookmarked, pathname);
	}

	return (
		<motion.article
			className={'companion-card group cursor-pointer'}
			style={{backgroundColor: color}}
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{duration: 0.5, ease: 'easeOut'}}
			whileHover={{scale: 1.03, y: -6, transition: {duration: 0.3, ease: 'easeOut'}}}
			whileTap={{scale: 0.97}}
		>
			{/* Header with subject and bookmark */}
			<motion.div className={'flex justify-between items-center'} initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.1, duration: 0.3}}>
				<motion.div className={'subject-badge'} whileHover={{scale: 1.05}} transition={{duration: 0.2}}>
					{subject}
				</motion.div>
				<motion.button className={'companion-bookmark'} onClick={handleBookmark} whileHover={{scale: 1.1, rotate: 5}} whileTap={{scale: 0.9}} transition={{duration: 0.2}}>
					<Image src={isBookmarked ? icons.bookmarkFilled : icons.bookmark} alt={'bookmark'} width={12.5} height={15}/>
				</motion.button>
			</motion.div>

			{/* Title */}
			<motion.h2 className={'text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors'} initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}}
			           transition={{delay: 0.2, duration: 0.3}}>
				{name}
			</motion.h2>

			{/* Topic description - now always visible with 3 lines */}
			<motion.p className={'text-sm text-gray-600 group-hover:text-gray-700 transition-colors line-clamp-3'} initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}}
			          transition={{delay: 0.3, duration: 0.3}}>
				{topic}
			</motion.p>

			{/* Duration info */}
			<motion.div className={'flex items-center gap-2'} initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.4, duration: 0.3}}>
				<Image src={icons.clock} alt={'duration'} width={13.5} height={13.5}/>
				<p className={'text-sm'}>{duration} minutes</p>
			</motion.div>

			{/* Launch button */}
			<motion.div className={'w-full'} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.5, duration: 0.3}}>
				<motion.a className={'btn-primary w-full justify-center group-hover:shadow-lg transition-shadow'} whileHover={{scale: 1.02, y: -1}} whileTap={{scale: 0.98}}
				          transition={{duration: 0.2}} href={routes.companionDetailsPath(id)}>
					<span className={'group-hover:mr-1 transition-all'}>Launch Lesson</span>
					<motion.span className={'inline-block'} initial={{x: 0}} whileHover={{x: 2}} transition={{duration: 0.2}}>→</motion.span>
				</motion.a>
			</motion.div>
		</motion.article>
	);
}

export default CompanionCard;
