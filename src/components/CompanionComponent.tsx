'use client';

import Image from "next/image";
import dynamic from "next/dynamic";
import {vapi} from "@/lib/vapi.sdk";
import {useCallback, useEffect, useRef, useState} from "react";
import {LottieRefCurrentProps} from "lottie-react";
import micOn from '../../public/icons/mic-on.svg';
import micOff from '../../public/icons/mic-off.svg';
import soundWaves from '@/constants/soundwaves.json';
import {useAnimationModal} from "@/hooks/useAnimationModal";
import {SubjectIconName, subjectIcons} from "@/constants/icons";
import {cn, configureAssistant, getSubjectColor} from "@/lib/utils";
import {addToSessionHistory, saveSessionTranscript, updateSessionDuration} from "@/lib/actions/companion.actions";

const Lottie = dynamic(() => import('lottie-react'), {
	loading: () => <div className={'companion-lottie animate-pulse'}/>,
	ssr: false,
});

const AnimationModal = dynamic(() => import('@/components/AnimationModal').then(mod => ({default: mod.AnimationModal})), {
	loading: () => null,
	ssr: false,
});

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

	const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
	const [sessionDuration, setSessionDuration] = useState<number>(0);
	const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

	const lottieRef = useRef<LottieRefCurrentProps>(null);
	const {modalState, showLoading, showSuccess, close: closeModal} = useAnimationModal();

	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	const startTimer = useCallback(() => {
		const startTime = new Date();
		setSessionStartTime(startTime);
		setSessionDuration(0);

		const interval = setInterval(() => setSessionDuration((prevDuration) => prevDuration + 1), 1000);

		setTimerInterval(interval);
	}, []);

	const stopTimer = useCallback(async () => {
		console.log('stopTimer');
		if (timerInterval) {
			clearInterval(timerInterval);
			setTimerInterval(null);
		}

		if (sessionStartTime) {
			console.log('sessionStartTime', sessionStartTime);
			const endTime = new Date();
			const durationSeconds = Math.round((endTime.getTime() - sessionStartTime.getTime()) / 1000);
			console.log('durationSeconds:', durationSeconds);
			const durationMinutes = Math.max(1, Math.round(durationSeconds / 60));
			console.log('durationMinutes:', durationMinutes);

			try {
				const newSessionId = await addToSessionHistory(companionId);
				await updateSessionDuration(companionId, durationMinutes);

				if (messages.length > 0) {
					const transcriptText = messages
						.reverse()
						.map(msg => `${msg.role === 'assistant' ? name.split(' ')[0] : userName}: ${msg.content}`)
						.join('\n');
					await saveSessionTranscript(newSessionId, transcriptText);
				}
			} catch (error) {
				console.error('Failed to update session duration:', error);
			}
		}

		setSessionStartTime(null);
		setSessionDuration(0);
	}, [companionId, messages, name, sessionStartTime, timerInterval, userName]);

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
			closeModal();
		}
	}

	const handleDisconnect = async () => {
		setCallStatus(CallStatus.FINISHED);
		await stopTimer();
		vapi.stop();

		setTimeout(() => showSuccess('Lesson Completed!', 'Great job! Your learning session has been saved to your progress'), 500);
	}

	useEffect(() => {
		const onCallStart = () => {
			console.log('onCallStart');
			setCallStatus(CallStatus.ACTIVE);
			startTimer();
			closeModal();
			if (isMuted) {
				vapi.setMuted(true);
			}
		}

		const onCallEnd = async () => {
			console.log('onCallEnd');
			setCallStatus(CallStatus.FINISHED);
			await stopTimer();
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
	}, [closeModal, companionId, isMuted, startTimer, stopTimer]);

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

					{/* Session Timer */}
					<div className={'w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4 flex flex-col items-center gap-2'}>
						<p className={'text-sm font-medium text-gray-700'}>Session Duration</p>
						<p className={'text-2xl font-bold text-primary font-mono'}>{formatTime(sessionDuration)}</p>
						<div className={cn('w-2 h-2 rounded-full transition-colors duration-300',
							callStatus === CallStatus.ACTIVE ? 'bg-green-500 animate-pulse' : 'bg-gray-300')}></div>
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
				onClose={closeModal}
			/>
		</section>
	);
}

export {CompanionComponent};
