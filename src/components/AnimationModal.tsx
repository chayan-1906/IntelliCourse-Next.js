'use client';

import {motion, AnimatePresence, Variants} from 'framer-motion';
import {LoadingAnimation} from './LoadingAnimation';
import {SuccessAnimation} from './SuccessAnimation';
import {AnimationModalProps} from "@/types/companion";

function AnimationModal({isOpen, type, title, message, onClose, autoClose = true, duration = 3000}: AnimationModalProps) {
	const backdropVariants: Variants = {
		hidden: {opacity: 0},
		visible: {opacity: 1},
	};

	const modalVariants: Variants = {
		hidden: {scale: 0.8, opacity: 0},
		visible: {scale: 1, opacity: 1},
		exit: {scale: 0.8, opacity: 0},
	};

	const renderAnimation = () => {
		switch (type) {
			case 'loading':
				return (
					<LoadingAnimation message={message || 'Loading...'} size={'lg'}/>
				);
			case 'success':
				return (
					<SuccessAnimation message={title || 'Success!'} autoHide={autoClose} duration={duration} onComplete={onClose}/>
				);
			case 'error':
				return (
					<div className={'flex flex-col items-center justify-center py-8'}>
						<div className={'text-6xl mb-4'}>❌</div>
						<h3 className={'text-2xl font-semibold text-red-600 mb-2'}>{title || 'Error!'}</h3>
						<p className={'text-gray-600 text-center max-w-md'}>{message || 'Something went wrong. Please try again'}</p>
					</div>
				);
			default:
				return null;
		}
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div className={'fixed inset-0 z-50 flex items-center justify-center p-4'} initial={'hidden'} animate={'visible'} exit={'hidden'} variants={backdropVariants}
				            transition={{duration: 0.3}}>
					{/* Backdrop */}
					<motion.div className={'absolute inset-0 bg-black/50 backdrop-blur-sm'} onClick={type !== 'loading' ? onClose : undefined}/>

					{/* Modal */}
					<motion.div
						className={'relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4'}
						variants={modalVariants}
						transition={{duration: 0.3, type: 'spring', stiffness: 200}}
						style={{backdropFilter: 'blur(20px)', background: 'rgba(255, 255, 255, 0.95)'}}
					>
						<div className={'p-6'}>
							{renderAnimation()}

							{type !== 'loading' && !autoClose && (
								<div className={'mt-6 flex justify-center'}>
									<button onClick={onClose} className={'px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'}>Close</button>
								</div>
							)}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export {AnimationModal};
