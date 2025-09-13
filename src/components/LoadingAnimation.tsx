'use client';

import {motion} from 'framer-motion';
import {LottieAnimation} from './LottieAnimation';
import {animations} from "@/constants/animations";
import {LoadingAnimationProps} from '@/types/companion';

function LoadingAnimation({message = 'Loading...', size = 'md', className = ''}: LoadingAnimationProps) {
	const sizeMap = {
		sm: 64,
		md: 96,
		lg: 128,
	};

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
			<div className={'mb-4'}>
				<LottieAnimation
					animationPath={animations.neuralNetwork}
					width={sizeMap[size]}
					height={sizeMap[size]}
					loop={true}
					autoplay={true}
					className={'mx-auto'}
				/>
			</div>
			<FloatingDots/>

			<motion.p className={'text-gray-600 text-center'} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.2}}>
				{message}
			</motion.p>
		</motion.div>
	);
}

export {LoadingAnimation};
