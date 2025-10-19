import html2canvas from 'html2canvas';
import {twMerge} from "tailwind-merge";
import {type ClassValue, clsx} from "clsx";
import {subjectsColors, voices} from "@/constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
	return subjectsColors[subject as keyof typeof subjectsColors];
}

export const getCellBackgroundColor = (minutes: number) => {
	if (minutes === 0) return 'bg-gray-200';
	if (minutes < 60) return 'bg-green-200';
	if (minutes < 180) return 'bg-green-400';
	if (minutes < 360) return 'bg-green-600';
	return 'bg-green-800';
}

export const configureAssistant = (voice: string, style: string) => {
	const voiceId = voices[voice as keyof typeof voices][style as keyof (typeof voices)[keyof typeof voices]] || 'sarah';

	const vapiAssistant = {
		name: 'Companion',
		firstMessage: 'Hello, let\'s start the session. Today we\'ll be talking about {{topic}}.',
		transcriber: {
			provider: 'deepgram',
			model: 'nova-3',
			language: 'en',
		},
		voice: {
			provider: '11labs',
			voiceId: voiceId,
			stability: 0.4,
			similarityBoost: 0.8,
			speed: 1,
			style: 0.5,
			useSpeakerBoost: true,
		},
		model: {
			provider: 'openai',
			model: 'gpt-4',
			messages: [
				{
					role: 'system',
					content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

                    Tutor Guidelines:
                    Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                    Keep the conversation flowing smoothly while maintaining control.
                    From time to time make sure that the student is following you and understands you.
                    Break down the topic into smaller parts and teach the student one part at a time.
                    Keep your style of conversation {{ style }}.
                    Keep your responses short, like in a real voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.
              `,
				},
			],
		},
	}

	return vapiAssistant;
}

export const exportHeatmapAsPNG = async (heatmapData: HeatmapValue[], config: HeatmapExportConfig): Promise<void> => {
	try {
		const filename = `learning-activity-${new Date().toISOString().split('T')[0]}`;

		const svgString = generateHeatmapSVG(heatmapData, config);

		const svgElement = document.createElement('div');
		svgElement.innerHTML = svgString;
		svgElement.style.position = 'absolute';
		svgElement.style.left = '-9999px';
		document.body.appendChild(svgElement);

		const canvas = await html2canvas(svgElement, {backgroundColor: '#ffffff', scale: 2});

		const link = document.createElement('a');
		link.download = `${filename}.png`;
		link.href = canvas.toDataURL('image/png');
		link.click();

		document.body.removeChild(svgElement);
	} catch (error) {
		console.error('PNG export failed:', error);
		alert('PNG export failed. Try SVG export instead');
	}
}

export const generateHeatmapSVG = (heatmapData: HeatmapValue[], config: HeatmapExportConfig): string => {
	const activityMap = new Map(heatmapData.map(item => [item.date, item.count]));
	const startDate = new Date();
	startDate.setFullYear(startDate.getFullYear() - 1);

	let cells = '';
	for (let week = 0; week < 53; week++) {
		for (let day = 0; day < 7; day++) {
			const date = new Date(startDate);
			date.setDate(date.getDate() + week * 7 + day);
			const activity = activityMap.get(date.toISOString().split('T')[0]) || 0;

			let color = '#ebedf0';
			if (activity > 0) {
				if (activity < 30) color = '#9be9a8';
				else if (activity < 60) color = '#40c463';
				else if (activity < 120) color = '#30a14e';
				else color = '#216e39';
			}

			const x = week * 13;
			const y = day * 13;
			cells += `<rect x="${x}" y="${y}" width="11" height="11" fill="${color}" rx="2"/>`;
		}
	}

	const legend = config.showLegend ? (
		`
			<g transform="translate(50, 170)">
				<text x="0" y="15" font-size="10" fill="${config.textColor}">Less</text>
				<rect x="30" y="5" width="11" height="11" fill="#ebedf0" rx="2"/>
				<rect x="43" y="5" width="11" height="11" fill="#9be9a8" rx="2"/>
				<rect x="56" y="5" width="11" height="11" fill="#40c463" rx="2"/>
				<rect x="69" y="5" width="11" height="11" fill="#30a14e" rx="2"/>
				<rect x="82" y="5" width="11" height="11" fill="#216e39" rx="2"/>
				<text x="100" y="15" font-size="10" fill="${config.textColor}">More</text>
			</g>
		`
	) : '';

	return (
		`<svg width="750" height="200" xmlns="http://www.w3.org/2000/svg">
			<rect width="100%" height="100%" fill="${config.backgroundColor}"/>
			<text x="50" y="30" font-size="16" font-weight="bold" fill="${config.textColor}">${config.title}</text>
			<text x="50" y="50" font-size="12" fill="${config.textColor}">${config.subtitle}</text>
			<g transform="translate(50, 70)">${cells}</g>
			${legend}
		</svg>`
	);
}

export const formatDuration = (minutes: number): string => {
	if (minutes < 60) {
		return `${minutes}m`;
	} else {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
	}
}
