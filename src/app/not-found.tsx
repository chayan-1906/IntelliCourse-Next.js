'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {routes} from '@/lib/routes';
import {animations} from '@/constants/animations';
import {LottieAnimation} from '@/components/LottieAnimation';

function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
			<motion.div className={'text-center max-w-lg mx-auto'} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
				{/* Lottie Animation */}
				<div className={'mb-8'}>
					<LottieAnimation
						animationPath={animations.noData}
						width={300}
						height={300}
						loop={true}
						autoplay={true}
						className={'mx-auto'}
					/>
				</div>

				{/* Large 404 Text */}
				<motion.h1 className={'text-8xl font-bold text-gray-300 mb-4'} initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.5, delay: 0.2}}>
					404
				</motion.h1>

				{/* Main Message */}
				<motion.h2 className={'text-3xl font-semibold text-gray-700 mb-4'} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.4}}>
					Oops! Page Not Found
				</motion.h2>

				{/* Description */}
				<motion.p className={'text-gray-500 text-lg mb-8 leading-relaxed'} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.6}}>
					It looks like the page you&#39;re looking for doesn&#39;t exist.
					Don&#39;t worry, even the best explorers sometimes take a wrong turn!
				</motion.p>

				{/* Action Buttons */}
				<motion.div className={'flex flex-col sm:flex-row gap-4 justify-center items-center'} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
				            transition={{duration: 0.5, delay: 0.8}}>
					<Link href={routes.homePath}
					      className={'px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'}>
						🏠 Back to Home
					</Link>

					<Link href={routes.companionsPath}
					      className={'px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105'}>
						📚 Browse Companions
					</Link>
				</motion.div>
			</motion.div>
		</div>
	);
}

export default NotFound;
