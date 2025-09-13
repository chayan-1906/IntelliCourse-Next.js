'use client';

import Image from "next/image";
import {motion, Variants} from "framer-motion";
import {cn} from "@/lib/utils";
import {icons} from "@/constants/icons";
import {CompanionList} from "@/components/CompanionList";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

function AnimatedMyJourneyPage({user, sessionHistory, companions, bookmarkedCompanions}: AnimatedMyJourneyPageProps) {
	const containerVariants: Variants = {
		hidden: {opacity: 0},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.3,
				staggerChildren: 0.1
			}
		}
	};

	const itemVariants: Variants = {
		hidden: {opacity: 0, y: 20},
		visible: {
			opacity: 1,
			y: 0,
			transition: {duration: 0.5, ease: 'easeOut'},
		},
	};

	const statsVariants: Variants = {
		hidden: {opacity: 0, scale: 0.8},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {duration: 0.4, ease: 'easeOut'},
		},
	};

	const accordionVariants: Variants = {
		hidden: {opacity: 0, x: -20},
		visible: {
			opacity: 1,
			x: 0,
			transition: {duration: 0.6, ease: 'easeOut'},
		},
	};

	return (
		<motion.main className={'min-lg:w-3/4'} variants={containerVariants} initial={'hidden'} animate={'visible'}>
			{/* Profile Section */}
			<motion.section className={'flex sm:flex- items-center justify-between gap-4'} variants={itemVariants}>
				<div className={'flex gap-4 items-center'}>
					<motion.div
						initial={{opacity: 0, scale: 0}}
						animate={{opacity: 1, scale: 1}}
						transition={{duration: 0.5, delay: 0.2, type: 'spring', stiffness: 100}}
					>
						<Image src={user.imageUrl} alt={user.firstName || 'profile-picture'} width={110} height={110} className={'rounded-full'}/>
					</motion.div>
					<motion.div className={'flex flex-col gap-2'} initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.5, delay: 0.3}}>
						<h1>{user.firstName} {user.lastName}</h1>
						<p className={'text-sm text-muted-foreground'}>{user.emailAddress}</p>
					</motion.div>
				</div>

				{/* Stats Cards */}
				<motion.div className={'flex gap-4'} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.5, delay: 0.4}}>
					<motion.div
						className={'flex flex-col h-fit border border-black rounded-lg p-3 gap-2'}
						variants={statsVariants}
						whileHover={{scale: 1.05, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)', transition: {duration: 0.2}}}
					>
						<div className={'flex gap-2 items-center'}>
							<motion.div initial={{rotate: 0}} animate={{rotate: 360}} transition={{duration: 0.6, delay: 0.6}}>
								<Image src={icons.check} alt={'checkmark'} width={22} height={22}/>
							</motion.div>
							<motion.p className={'text-2xl font-bold'} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4, delay: 0.7}}>
								{sessionHistory.length}
							</motion.p>
						</div>
						<div>Lessons completed</div>
					</motion.div>

					<motion.div
						className={'flex flex-col h-fit border border-black rounded-lg p-3 gap-2'}
						variants={statsVariants}
						whileHover={{scale: 1.05, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)', transition: {duration: 0.2}}}
					>
						<div className={'flex gap-2 items-center'}>
							<motion.div initial={{rotate: 0}} animate={{rotate: 360}} transition={{duration: 0.6, delay: 0.8}}>
								<Image src={icons.cap} alt={'cap'} width={22} height={22}/>
							</motion.div>
							<motion.p className={'text-2xl font-bold'} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4, delay: 0.9}}>
								{companions.length}
							</motion.p>
						</div>
						<div>Companions created</div>
					</motion.div>
				</motion.div>
			</motion.section>

			{/* Accordion Section */}
			<motion.div variants={accordionVariants} transition={{delay: 0.5}}>
				<Accordion type={'multiple'}>
					<motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.6}}>
						<AccordionItem value={'bookmarks'} className={'border-0'}>
							<AccordionTrigger className={cn('text-2xl font-bold mx-6 px-4 border-border border', 'data-[state=open]:border-b-0')}>
								Bookmarked Companions {`(${bookmarkedCompanions.length})`}
							</AccordionTrigger>
							<AccordionContent className={cn('pb-4')}>
								<motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4, delay: 0.1}}>
									<CompanionList title={'Bookmarked Companions'} companions={bookmarkedCompanions} className={'border-border border mx-6'}/>
								</motion.div>
							</AccordionContent>
						</AccordionItem>
					</motion.div>

					<motion.div
						className={cn('h-[1px] bg-border mx-6 my-4')}
						initial={{scaleX: 0}}
						animate={{scaleX: 1}}
						transition={{duration: 0.6, delay: 0.7}}
						style={{originX: 0}}
					/>

					<motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.8}}>
						<AccordionItem value={'recent'} className={'border-0'}>
							<AccordionTrigger className={cn('text-2xl font-bold mx-6 px-4 border-border border', 'data-[state=open]:border-b-0')}>
								Recent Sessions
							</AccordionTrigger>
							<AccordionContent className={cn('pb-4')}>
								<motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4, delay: 0.1}}>
									<CompanionList title={'Recent Sessions'} companions={sessionHistory} className={'border-border border mx-6'}/>
								</motion.div>
							</AccordionContent>
						</AccordionItem>
					</motion.div>

					<motion.div
						className={cn('h-[1px] bg-border mx-6 my-4')}
						initial={{scaleX: 0}}
						animate={{scaleX: 1}}
						transition={{duration: 0.6, delay: 0.9}}
						style={{originX: 0}}
					/>

					<motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 1.0}}>
						<AccordionItem value={'companions'} className={'border-0'}>
							<AccordionTrigger className={cn('text-2xl font-bold mx-6 px-4 border-border border', 'data-[state=open]:border-b-0')}>
								My Companions {`(${companions.length})`}
							</AccordionTrigger>
							<AccordionContent className={cn('pb-4')}>
								<motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4, delay: 0.1}}>
									<CompanionList title={'My Companions'} companions={companions} className={'border-border border mx-6'}/>
								</motion.div>
							</AccordionContent>
						</AccordionItem>
					</motion.div>
				</Accordion>
			</motion.div>
		</motion.main>
	);
}

export {AnimatedMyJourneyPage};
