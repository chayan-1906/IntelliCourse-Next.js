'use client';

import {motion} from 'framer-motion';
import {LottieAnimation} from './LottieAnimation';
import {animations} from "@/constants/animations";
import {EmptyStateAnimationProps} from '@/types/companion';

function EmptyStateAnimation({title = 'No companions found', description = 'Try adjusting your search criteria or create a new companion', className = ''}: EmptyStateAnimationProps) {
	return (
		<motion.div className={`flex flex-col items-center justify-center py-16 px-8 text-center ${className}`} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
			<div className={'mb-6'}>
				<LottieAnimation
					animationPath={animations.noData}
					width={192}
					height={192}
					loop={true}
					autoplay={true}
					className={'mx-auto'}
				/>
			</div>

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
