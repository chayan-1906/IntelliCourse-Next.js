'use client';

import {useRef} from 'react';
import Lottie, {LottieRefCurrentProps} from 'lottie-react';
import {LottieAnimationProps} from '@/types/companion';

function LottieAnimation({animationData, animationPath, loop = true, autoplay = true, className = '', width, height, onComplete, style}: LottieAnimationProps) {
	const lottieRef = useRef<LottieRefCurrentProps | null>(null);

	const handleComplete = () => {
		if (onComplete) {
			onComplete();
		}
	}

	// TODO: Fix with actual lottie
	// For now, we'll use a placeholder until we add actual animation files
	// This prevents the component from crashing if no animation is provided
	const defaultAnimation = animationData || (animationPath ? undefined : null);

	if (animationPath && !animationData) {
		// TODO: Fix with actual lottie
		// For external JSON files, we'd need to fetch them
		// For now, return a placeholder
		return (
			<div className={`flex items-center justify-center ${className}`} style={{width: width || '200px', height: height || '200px', ...style}}>
				<div className={'animate-pulse bg-gray-200 rounded-lg w-full h-full'}/>
			</div>
		);
	}

	if (!defaultAnimation) {
		return (
			<div className={`flex items-center justify-center ${className}`} style={{width: width || '200px', height: height || '200px', ...style}}>
				<div className={'animate-pulse bg-gray-200 rounded-lg w-full h-full'}/>
			</div>
		);
	}

	return (
		<Lottie
			lottieRef={lottieRef}
			animationData={defaultAnimation}
			loop={loop}
			autoPlay={autoplay}
			className={className}
			style={{width: width || '200px', height: height || '200px', ...style}}
			onComplete={handleComplete}
		/>
	);
}

export {LottieAnimation};
