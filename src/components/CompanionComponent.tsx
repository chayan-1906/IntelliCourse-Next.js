'use client';

import Image from "next/image";
import {vapi} from "@/lib/vapi.sdk";
import {useEffect, useRef, useState} from "react";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import micOn from '../../public/icons/mic-on.svg';
import micOff from '../../public/icons/mic-off.svg';
import soundWaves from '@/constants/soundwaves.json';
import {AnimationModal} from "@/components/AnimationModal";
import {useAnimationModal} from "@/hooks/useAnimationModal";
import {SubjectIconName, subjectIcons} from "@/constants/icons";
import {cn, configureAssistant, getSubjectColor} from "@/lib/utils";
import {addToSessionHistory} from "@/lib/actions/companion.actions";

enum CallStatus {
	INACTIVE = 'INACTIVE',
	ACTIVE = 'ACTIVE',
	CONNECTING = 'CONNECTING',
	FINISHED = 'FINISHED',
}

function CompanionComponent({companionId, subject, topic, name, userName, userImage, style, voice}: CompanionComponentProps) {
	const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [messages, setMessages] = useState<SavedMessage[]>([]);

	const lottieRef = useRef<LottieRefCurrentProps>(null);
	const {modalState, showLoading, showSuccess, close} = useAnimationModal();

	const toggleMicrophone = () => {
		if (callStatus === CallStatus.ACTIVE) {
			const currentMutedState = vapi.isMuted();
			vapi.setMuted(!currentMutedState);
			setIsMuted(!currentMutedState);
		} else {
			setIsMuted(!isMuted);
		}
	}

	const handleCall = async () => {
		setCallStatus(CallStatus.CONNECTING);
		showLoading('Connecting to your AI companion...');

		const assistantOverrides = {
			variableValues: {subject, topic, style},
			clientMessages: ['transcript'],
			serverMessages: [],
		};

		try {
			// @ts-expect-error - VAPI start method has incorrect type definitions
			await vapi.start(configureAssistant(voice, style), assistantOverrides);
		} catch (error) {
			console.error('Failed to start call:', error);
			setCallStatus(CallStatus.INACTIVE);
			close();
		}
	}

	const handleDisconnect = async () => {
		setCallStatus(CallStatus.FINISHED);
		vapi.stop();

		setTimeout(() => showSuccess('Lesson Completed!', 'Great job! Your learning session has been saved to your progress'), 500);
	}

	useEffect(() => {
		const onCallStart = () => {
			setCallStatus(CallStatus.ACTIVE);
			close(); // Close loading animation
			if (isMuted) {
				vapi.setMuted(true);
			}
		}

		const onCallEnd = async () => {
			setCallStatus(CallStatus.FINISHED);
			await addToSessionHistory(companionId);
		}

		const onMessage = (message: Message) => {
			if ((message.type === 'transcript' && message.transcriptType === 'final')) {
				const savedMessage: SavedMessage = {
					role: message.role,
					content: message.transcript,
				};
				setMessages((prev: SavedMessage[]) => [savedMessage, ...prev]);
			}
		}

		const onError = (error: Error) => console.log('Error', error);

		const onSpeechStart = () => setIsSpeaking(true);

		const onSpeechEnd = () => setIsSpeaking(false);

		vapi.on('call-start', onCallStart);
		vapi.on('call-end', onCallEnd);
		vapi.on('message', onMessage);
		vapi.on('error', onError);
		vapi.on('speech-start', onSpeechStart);
		vapi.on('speech-end', onSpeechEnd);

		return () => {
			vapi.off('call-start', onCallStart);
			vapi.off('call-end', onCallEnd);
			vapi.off('message', onMessage);
			vapi.off('error', onError);
			vapi.off('speech-start', onSpeechStart);
			vapi.off('speech-end', onSpeechEnd);
		}
	}, [close, companionId, isMuted]);

	/** lottie */
	useEffect(() => {
		if (lottieRef) {
			if (isSpeaking) {
				lottieRef.current?.play();
			} else {
				lottieRef.current?.stop();
			}
		}
	}, [isSpeaking, lottieRef]);

	return (
		<section className={'flex flex-col h-[70vh]'}>
			<section className={'flex max-sm:flex-col gap-8'}>
				<div className={'companion-section pb-4'}>
					<div className={'companion-avatar'} style={{backgroundColor: getSubjectColor(subject)}}>
						<div className={cn('absolute transition-opacity duration-1000',
							callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-1001' : 'opacity-0',
							callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}>
							<Image src={subjectIcons[subject as SubjectIconName]} alt={subject} width={150} height={150} className={'max-sm:w-fit'}/>
						</div>

						<div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
							<Lottie lottieRef={lottieRef} animationData={soundWaves} autoplay={false} className={'companion-lottie'}/>
						</div>
					</div>

					<p className={'font-bold text-2xl'}>{name}</p>
				</div>

				<div className={'user-section'}>
					<div className={'user-avatar'}>
						<Image src={userImage} alt={userName} width={130} height={130} className={'rounded-lg'}/>
						<p className={'font-bold text-2xl'}>{userName}</p>
					</div>
					<button className={'btn-mic'} disabled={callStatus !== CallStatus.ACTIVE} onClick={toggleMicrophone}>
						<Image src={isMuted ? micOff : micOn} alt={'mic'} width={36} height={36}/>
						<p className={'max-sm:hidden'}>{isMuted ? 'Turn on microphone' : 'Turn off microphone'}</p>
					</button>
					<button
						className={cn('w-full text-white rounded-lg py-2 cursor-pointer transition-colors', callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatus.CONNECTING && 'animate-pulse')}
						onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
						{callStatus === CallStatus.ACTIVE ? 'End Session' : callStatus === CallStatus.CONNECTING ? 'Connecting' : 'Start Session'}
					</button>
				</div>
			</section>

			{/** transcript */}
			<section className={'transcript'}>
				<div className={'transcript-message no-scrollbar'}>
					{messages.map((message: SavedMessage, index: number) => {
						if (message.role === 'assistant') {
							return (
								<p key={index} className={'max-sm:text-sm'}>{name.split(' ')[0].replace('/[.,]/g, ', '')}: {message.content}</p>
							);
						} else {
							return (
								<p key={index} className={'max-sm:text-sm text-primary'}>{userName}: {message.content}</p>
							);
						}
					})}
				</div>
				<div className={'transcript-fade'}/>
			</section>

			{/* Animation Modal */}
			<AnimationModal
				isOpen={modalState.isOpen}
				type={modalState.type}
				title={modalState.title}
				message={modalState.message}
				onClose={close}
			/>
		</section>
	);
}

export {CompanionComponent};
