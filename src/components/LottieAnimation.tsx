'use client';

import dynamic from 'next/dynamic';
import {useEffect, useRef, useState} from 'react';
import {LottieRefCurrentProps} from 'lottie-react';
import {LottieAnimationProps} from '@/types/companion';

const Lottie = dynamic(() => import('lottie-react'), {
	loading: () => <div className={'animate-pulse bg-gray-200 rounded-lg'}/>,
	ssr: false,
});

function LottieAnimation({animationPath, loop = true, autoplay = true, className, width, height, onComplete, style}: LottieAnimationProps) {
	const lottieRef = useRef<LottieRefCurrentProps | null>(null);
	const [loadedAnimation, setLoadedAnimation] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleComplete = () => {
		if (onComplete) {
			onComplete();
		}
	}

	useEffect(() => {
		if (animationPath) {
			setIsLoading(true);
			fetch(animationPath)
				.then(response => response.json())
				.then(data => {
					setLoadedAnimation(data);
					setIsLoading(false);
				})
				.catch(() => {
					console.warn(`Failed to load Lottie animation: ${animationPath}`);
					setIsLoading(false);
				});
		}
	}, [animationPath]);

	if (isLoading) {
		return (
			<div className={`flex items-center justify-center ${className}`} style={{width: width || '200px', height: height || '200px', ...style}}>
				<div className={'animate-pulse bg-gray-200 rounded-lg w-full h-full'}/>
			</div>
		);
	}

	if (!loadedAnimation) {
		return (
			<div className={`flex items-center justify-center ${className}`} style={{width: width || '200px', height: height || '200px', ...style}}>
				<div className={'animate-pulse bg-gray-200 rounded-lg w-full h-full'}/>
			</div>
		);
	}

	return (
		<Lottie
			lottieRef={lottieRef}
			animationData={loadedAnimation}
			loop={loop}
			autoPlay={autoplay}
			className={className}
			style={{width: width || '200px', height: height || '200px', ...style}}
			onComplete={handleComplete}
		/>
	);
}

export {LottieAnimation};
