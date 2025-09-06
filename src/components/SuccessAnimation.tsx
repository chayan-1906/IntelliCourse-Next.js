'use client';

import {motion} from 'framer-motion';
import {SuccessAnimationProps} from '@/types/companion';

function SuccessAnimation({message = 'Success!', autoHide = true, duration = 3000, onComplete, className = ''}: SuccessAnimationProps) {
	const CheckmarkAnimation = () => (
		<div className={'relative w-24 h-24 mx-auto mb-4'}>
			<motion.div
				className={'absolute inset-0 border-4 border-green-200 rounded-full'}
				initial={{scale: 0, opacity: 0}}
				animate={{scale: 1, opacity: 1}}
				transition={{duration: 0.3}}
			/>
			<motion.div
				className={'absolute inset-2 bg-green-500 rounded-full flex items-center justify-center'}
				initial={{scale: 0}} animate={{scale: 1}}
				transition={{duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200}}
			>
				<motion.div initial={{scale: 0, rotate: 0}} animate={{scale: 1, rotate: 0}} transition={{duration: 0.3, delay: 0.3}}>
					<svg className={'w-8 h-8 text-white'} fill={'none'} stroke={'currentColor'} viewBox={'0 0 24 24'}>
						<motion.path
							strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={3} d={'M5 13l4 4L19 7'}
							initial={{pathLength: 0}} animate={{pathLength: 1}} transition={{duration: 0.5, delay: 0.4}}
						/>
					</svg>
				</motion.div>
			</motion.div>
		</div>
	);

	const ParticleEffect = () => (
		<div className={'absolute inset-0 pointer-events-none'}>
			{[...Array(8)].map((_, i) => (
				<motion.div
					key={i}
					className={'absolute size-2 bg-yellow-400 rounded-full'}
					style={{left: '50%', top: '50%'}}
					initial={{scale: 0, x: 0, y: 0, opacity: 1}}
					animate={{
						scale: [0, 1, 0],
						x: [0, Math.cos(i * 45 * Math.PI / 180) * 60],
						y: [0, Math.sin(i * 45 * Math.PI / 180) * 60],
						opacity: [1, 1, 0],
					}}
					transition={{duration: 1, delay: 0.5 + i * 0.1, ease: 'easeOut'}}
				/>
			))}
		</div>
	);

	return (
		<motion.div
			className={`flex flex-col items-center justify-center py-8 relative ${className}`}
			initial={{opacity: 0, scale: 0.8}}
			animate={{opacity: 1, scale: 1}}
			exit={{opacity: 0, scale: 0.8}}
			transition={{duration: 0.4}}
			onAnimationComplete={() => {
				if (autoHide && onComplete) {
					setTimeout(onComplete, duration);
				}
			}}
		>
			<ParticleEffect/>
			<CheckmarkAnimation/>

			<motion.h3 className={'text-2xl font-semibold text-green-600 mb-2 text-center'} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.4, delay: 0.3}}>
				{message}
			</motion.h3>

			<motion.div className={'text-4xl mb-2'} initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: [0, 1.2, 1]}} transition={{duration: 0.6, delay: 0.4}}>
				🎉
			</motion.div>
		</motion.div>
	);
}

export {SuccessAnimation};
