'use client';

import React, {useState} from "react";
import {motion} from "framer-motion";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {getSessionTranscript} from "@/lib/actions/companion.actions";

function TranscriptViewer({sessionId, className}: TranscriptViewerProps) {
	const [transcript, setTranscript] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [hasLoaded, setHasLoaded] = useState<boolean>(false);

	const loadTranscript = async () => {
		if (hasLoaded || isLoading) return;

		setIsLoading(true);
		try {
			console.log('getting transcript');
			const transcriptData = await getSessionTranscript(sessionId);
			setTranscript(transcriptData);
		} catch (error) {
			console.error('Failed to load transcript:', error);
		} finally {
			setIsLoading(false);
			setHasLoaded(true);
		}
	}

	const handleToggleExpanded = () => {
		if (!hasLoaded) {
			loadTranscript();
		}
		setIsExpanded(!isExpanded);
	}

	const formatTranscriptLines = (text: string): string[] => text.split('\n').filter(line => line.trim().length > 0);

	if (!transcript && hasLoaded) {
		return (
			<div className={cn('text-xs text-muted-foreground', className)}>No transcript available for this session</div>
		);
	}

	return (
		<div className={className}>
			<Button onClick={handleToggleExpanded} variant={'ghost'} size={'sm'} className={'text-xs p-2 h-auto cursor-pointer'} disabled={isLoading}>
				{isLoading ? 'Loading...' : isExpanded ? 'Hide Transcript' : 'View Transcript'}
			</Button>

			{isExpanded && transcript && (
				<motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} exit={{opacity: 0, height: 0}} transition={{duration: 0.3}}
				            className={'mt-2 p-3 bg-gray-50 rounded-lg border border-border'}>
					<div className={'max-h-40 overflow-y-auto text-xs space-y-1'}>
						{formatTranscriptLines(transcript).map((line: string, index: number) => (
							<p key={index} className={'leading-relaxed text-start'}>{line}</p>
						))}
					</div>
				</motion.div>
			)}
		</div>
	);
}

export {TranscriptViewer};
