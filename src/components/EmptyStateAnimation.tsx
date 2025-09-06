'use client';

import {motion} from 'framer-motion';
import {EmptyStateAnimationProps} from '@/types/companion';

function EmptyStateAnimation({title = 'No companions found', description = 'Try adjusting your search criteria or create a new companion', className = ''}: EmptyStateAnimationProps) {
	// TODO: Fix with actual lottie
	// Simple CSS animation as placeholder for now
	const PlaceholderAnimation = () => (
		<div className={'relative w-48 h-48 mx-auto mb-6'}>
			<motion.div className={'absolute inset-0 rounded-full border-4 border-gray-200'} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}/>
			<motion.div className={'absolute inset-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100'} initial={{scale: 0}} animate={{scale: 1}}
			            transition={{duration: 0.6, delay: 0.2, type: 'spring'}}/>
			<motion.div className={'absolute inset-8 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center'} initial={{scale: 0, rotate: 0}}
			            animate={{scale: 1, rotate: 360}} transition={{duration: 0.8, delay: 0.4, type: 'spring'}}>
				<motion.div className={'text-4xl text-gray-400'} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.8}}>🔍</motion.div>
			</motion.div>
		</div>
	)

	return (
		<motion.div className={`flex flex-col items-center justify-center py-16 px-8 text-center ${className}`} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
			<PlaceholderAnimation/>

			<motion.h3 className={'text-2xl font-semibold text-gray-700 mb-2'} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.3}}>
				{title}
			</motion.h3>

			<motion.p className={'text-gray-500 max-w-md'} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.4}}>
				{description}
			</motion.p>
		</motion.div>
	);
}

export {EmptyStateAnimation};
