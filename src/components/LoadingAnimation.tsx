'use client';

import {motion} from 'framer-motion';
import {LoadingAnimationProps} from '@/types/companion';

function LoadingAnimation({message = 'Loading...', size = 'md', className = ''}: LoadingAnimationProps) {
	const sizeClasses = {
		sm: 'size-16',
		md: 'size-24',
		lg: 'size-32',
	};

	// Animated loading spinner as placeholder
	const LoadingSpinner = () => (
		<div className={`relative ${sizeClasses[size]} mx-auto mb-4`}>
			<motion.div className={'absolute inset-0 border-4 border-gray-200 rounded-full'} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}}/>
			<motion.div
				className={'absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full'}
				animate={{rotate: 360}}
				transition={{duration: 1, repeat: Infinity, ease: 'linear'}}
			/>
			<motion.div
				className={'absolute inset-2 border-2 border-transparent border-b-blue-400 border-l-purple-400 rounded-full'}
				animate={{rotate: -360}}
				transition={{duration: 1.5, repeat: Infinity, ease: 'linear'}}
			/>
		</div>
	);

	const FloatingDots = () => (
		<div className={'flex space-x-2 justify-center mb-4'}>
			{[...Array(3)].map((_, index: number) => (
				<motion.div
					key={index} className={'w-3 h-3 bg-blue-500 rounded-full'}
					animate={{y: [-5, -15, -5], opacity: [0.5, 1, 0.5]}}
					transition={{duration: 1.5, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut'}}
				/>
			))}
		</div>
	);

	return (
		<motion.div className={`flex flex-col items-center justify-center py-8 ${className}`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.3}}>
			<LoadingSpinner/>
			<FloatingDots/>

			<motion.p className={'text-gray-600 text-center'} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.2}}>
				{message}
			</motion.p>
		</motion.div>
	);
}

export {LoadingAnimation};
