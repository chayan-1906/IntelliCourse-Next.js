'use client';

import Image from "next/image";
import {vapi} from "@/lib/vapi.sdk";
import {useEffect, useRef, useState} from "react";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import {cn, configureAssistant, getSubjectColor} from "@/lib/utils";
import soundWaves from '@/constants/soundwaves.json';
import {SubjectIconName, subjectIcons} from "@/constants/icons";
import micOn from '../../public/icons/mic-on.svg';
import micOff from '../../public/icons/mic-off.svg';

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

	const lottieRef = useRef<LottieRefCurrentProps>(null);

	const toggleMicrophone = () => {
		const isMuted = vapi.isMuted();
		vapi.setMuted(!isMuted);
		setIsMuted(!isMuted);
	}

	const handleCall = async () => {
		setCallStatus(CallStatus.CONNECTING);
		const assistantOverrides = {
			variableValues: {subject, topic, style},
			clientMessages: ['transscript'],
			serverMessages: [],
		};

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		await vapi.start(configureAssistant(voice, style), assistantOverrides);
	}

	const handleDisconnect = async () => {
		setCallStatus(CallStatus.FINISHED);
		vapi.stop();
	}

	useEffect(() => {
		const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

		const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

		const onMessage = () => {
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
	}, []);

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
				<div className={'companion-section'}>
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
					<button className={'btn-mic'} onClick={toggleMicrophone}>
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
				<div className={'transcript-message no-scrollbar'}>MESSAGES</div>
				<div className={'transcript-fade'}>

				</div>
			</section>
		</section>
	);
}

export {CompanionComponent};
