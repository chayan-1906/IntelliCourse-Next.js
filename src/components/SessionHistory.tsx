'use client';

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {useRouter} from "next/navigation";
import {routes} from "@/lib/routes";
import {Button} from "@/components/ui/button";
import {icons, subjectIcons} from "@/constants/icons";
import {cn, formatDuration, getSubjectColor} from "@/lib/utils";

const TranscriptViewer = dynamic(() => import('@/components/TranscriptViewer').then(mod => ({default: mod.TranscriptViewer})), {
	loading: () => <span className={'text-xs text-muted-foreground'}>Loading...</span>,
	ssr: false,
});

const EmptyStateAnimation = dynamic(() => import('@/components/EmptyStateAnimation').then(mod => ({default: mod.EmptyStateAnimation})), {
	loading: () => <div className={'flex items-center justify-center py-16'}>Loading...</div>,
	ssr: false,
});

function SessionHistory({title, sessions, className, showExport = false}: SessionHistoryProps) {
	const router = useRouter();

	const handleRowClick = (id: string, event: React.MouseEvent) => {
		const href = routes.companionDetailsPath(id);

		if (event.ctrlKey || event.metaKey) {
			window.open(href, '_blank');
		} else {
			router.push(href);
		}
	}

	const handleExportSessions = () => {
		if (!sessions || sessions.length === 0) return;

		const csvContent = [
			['Date', 'Companion Name', 'Subject', 'Topic', 'Duration (minutes)', 'Session ID'].join(','),
			...sessions.map(({sessionId, sessionDate, name, subject, topic, duration}: Companion) => [
				new Date(sessionDate || '').toLocaleDateString(),
				`"${name}"`,
				subject,
				`"${topic}"`,
				duration || 0,
				sessionId || '',
			].join(',')),
		].join('\n');

		const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', `session-history-${new Date().toISOString().split('T')[0]}.csv`);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	if (!sessions || sessions.length === 0) {
		return (
			<article className={cn('session-history', className)}>
				<div className={'flex items-center justify-between mb-6'}>
					<h2 className={'font-bold text-3xl'}>{title}</h2>
				</div>
				<EmptyStateAnimation title={'No session history found'} description={'Start a lesson to see your progress and session history here!'}/>
			</article>
		);
	}

	return (
		<article className={cn('session-history', className)}>
			<div className={'flex items-center justify-between mb-6'}>
				<h2 className={'font-bold text-3xl'}>{title}</h2>
				{showExport && (
					<Button onClick={handleExportSessions} variant={'outline'} className={'flex items-center gap-2'}>
						<Image src={icons.history} alt={'export'} width={16} height={16}/>
						Export History
					</Button>
				)}
			</div>

			<div className={'space-y-2'}>
				{sessions.map(({id, sessionId, sessionDate, name, subject, topic, duration}: Companion, sessionIndex: number) => (
					<div key={`${id}-${sessionIndex}`} className={'px-3 py-1 border-t border-border hover:bg-gray-100 cursor-pointer transition-colors'}
					     onClick={(e) => handleRowClick(id, e)}>
						<div className={'flex items-center gap-3'}>
							{/** Session Icon */}
							<div className={'flex items-center justify-center rounded-lg size-[72px] max-md:hidden flex-shrink-0'} style={{backgroundColor: getSubjectColor(subject)}}>
								<Image src={subjectIcons[subject as keyof typeof subjectIcons]} alt={subject} width={35} height={35}/>
							</div>

							{/** Session Info */}
							<div className={'flex flex-col flex-1 min-w-0'}>
								<div className={'flex items-center justify-between'}>
									<p className={'font-bold text-2xl break-words'}>{name}</p>
									<span className={'text-lg flex-shrink-0 ml-2'}>{formatDuration(duration || 0)}</span>
								</div>
								<p className={'text-lg break-words'}>{topic.split(' ').length > 15 ? topic.split(' ').slice(0, 15).join(' ') + '...' : topic}</p>
								<div className={'flex items-center gap-2 mt-1'}>
									<div className={'subject-badge w-fit'}>{subject}</div>
									{sessionDate && (
										<span className={'text-xs text-muted-foreground'}>{new Date(sessionDate).toLocaleDateString()}</span>
									)}
									{/** Transcript Viewer */}
									{id && (
										<div onClick={(e) => e.stopPropagation()}>
											<TranscriptViewer sessionId={sessionId} className={'text-xs'}/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</article>
	);
}

export {SessionHistory};
