'use client';

import {Tooltip} from 'react-tooltip';
import {DownloadIcon} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import {getHeatmapData} from '@/lib/actions/companion.actions';
import {cn, exportHeatmapAsPNG, generateHeatmapSVG} from '@/lib/utils';

function ActivityHeatmap({userId, className}: ActivityHeatmapProps) {
	const [heatmapData, setHeatmapData] = useState<HeatmapValue[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isExporting, setIsExporting] = useState(false);
	const heatmapRef = useRef<HTMLDivElement>(null);

	const getTooltipDataAttrs = (value: ReactCalendarHeatmapValue | undefined): Record<string, string> => {
		if (!value || !value.date) {
			return {'data-tooltip-id': 'heatmap-tooltip', 'data-tooltip-content': 'No activity'};
		}

		const date = new Date(value.date);
		const formattedDate = date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});

		const minutes = value.count || 0;
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;

		let durationText;
		if (hours > 0) {
			durationText = `${hours}h ${remainingMinutes}m`;
		} else if (minutes > 0) {
			durationText = `${minutes}m`;
		} else {
			durationText = 'No activity';
		}

		const title = `${formattedDate}: ${durationText}`;
		console.log('tooltip title', title);
		return {'data-tooltip-id': 'heatmap-tooltip', 'data-tooltip-content': title};
	}

	const getClassForValue = (value: ReactCalendarHeatmapValue | undefined) => {
		if (!value || !value.count) {
			return 'color-empty';
		}

		const minutes = value.count;
		if (minutes < 30) return 'color-scale-1';
		if (minutes < 60) return 'color-scale-2';
		if (minutes < 120) return 'color-scale-3';
		return 'color-scale-4';
	}

	useEffect(() => {
		const fetchHeatmapData = async () => {
			try {
				setLoading(true);
				const data = await getHeatmapData(userId);
				setHeatmapData(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to load activity data');
			} finally {
				setLoading(false);
			}
		}

		if (userId) {
			fetchHeatmapData();
		}
	}, [userId]);

	const startDate = new Date();
	startDate.setFullYear(startDate.getFullYear() - 1);

	const endDate = new Date();

	if (loading) {
		return (
			<div className={cn('activity-heatmap-container', className)}>
				<div className={'mb-4'}>
					<h3 className={'text-lg font-semibold text-gray-900'}>Learning Activity</h3>
					<p className={'text-sm text-gray-600'}>Your learning streak over the past year</p>
				</div>
				<div className={'flex items-center justify-center h-32 bg-gray-50 rounded-lg animate-pulse'}>
					<div className={'text-gray-500'}>Loading activity data...</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={cn('activity-heatmap-container', className)}>
				<div className={'mb-4'}>
					<h3 className={'text-lg font-semibold text-gray-900'}>Learning Activity</h3>
					<p className={'text-sm text-gray-600'}>Your learning streak over the past year</p>
				</div>
				<div className={'flex items-center justify-center h-32 bg-red-50 rounded-lg border border-red-200'}>
					<div className={'text-red-600 text-sm'}>{error}</div>
				</div>
			</div>
		);
	}

	const totalSessions = heatmapData.length;
	const totalMinutes = heatmapData.reduce((sum, day) => sum + day.count, 0);
	const totalHours = Math.floor(totalMinutes / 60);

	const handleExportPNG = async () => {
		try {
			setIsExporting(true);
			await exportHeatmapAsPNG(heatmapData, {
				title: 'Learning Activity Heatmap',
				subtitle: `${totalHours > 0 ? `${totalHours} hours` : `${totalMinutes} minutes`} of learning across ${totalSessions} active days`,
				showLegend: true,
				backgroundColor: '#ffffff',
				textColor: '#374151',
			});
		} catch (error) {
			console.error('PNG export failed:', error);
			alert('Failed to export heatmap as PNG. Please try again.');
		} finally {
			setIsExporting(false);
		}
	}

	const handleExportSVG = async () => {
		try {
			setIsExporting(true);
			const svgContent = generateHeatmapSVG(heatmapData, {
				title: 'Learning Activity Heatmap',
				subtitle: `${totalHours > 0 ? `${totalHours} hours` : `${totalMinutes} minutes`} of learning across ${totalSessions} active days`,
				showLegend: true,
				showStats: true,
				backgroundColor: '#ffffff',
				textColor: '#374151',
			});

			const blob = new Blob([svgContent], {type: 'image/svg+xml'});
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = `learning-activity-${new Date().toISOString().split('T')[0]}.svg`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error('SVG export failed:', error);
			alert('Failed to export heatmap as SVG. Please try again.');
		} finally {
			setIsExporting(false);
		}
	}

	return (
		<div className={cn('activity-heatmap-container', className)} ref={heatmapRef}>
			<div className={'mb-4 flex items-start justify-between'}>
				<div>
					<h3 className={'text-lg font-semibold text-gray-900'}>Learning Activity</h3>
					<p className={'text-sm text-gray-600'}>
						{totalHours > 0 ? `${totalHours} hours` : `${totalMinutes} minutes`} of learning across {totalSessions} active days
					</p>
				</div>
				<div className={'flex items-center gap-2'}>
					<button title={'Export as PNG'} disabled={isExporting} onClick={handleExportPNG}
					        className={'inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-md transition-colors'}>
						<DownloadIcon className={'size-3'}/>
						{isExporting ? 'Exporting...' : 'PNG'}
					</button>
					<button title={'Export as SVG'} disabled={isExporting} onClick={handleExportSVG}
					        className={'inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-md transition-colors'}>
						<DownloadIcon className={'size-3'}/>
						{isExporting ? 'Exporting...' : 'SVG'}
					</button>
				</div>
			</div>

			<div className={'heatmap-wrapper bg-white p-4 rounded-lg border border-gray-200'}>
				<CalendarHeatmap
					startDate={startDate}
					endDate={endDate}
					values={heatmapData}
					classForValue={getClassForValue}
					tooltipDataAttrs={getTooltipDataAttrs}
					showWeekdayLabels={true}
					showMonthLabels={true}
				/>
			</div>

			<div className={'mt-3 flex items-center justify-between text-xs text-gray-500'}>
				<span>Less</span>
				<div className={'flex items-center space-x-1'}>
					<div className={'size-3 bg-gray-200 rounded-sm'}></div>
					<div className={'size-3 bg-green-200 rounded-sm'}></div>
					<div className={'size-3 bg-green-400 rounded-sm'}></div>
					<div className={'size-3 bg-green-600 rounded-sm'}></div>
					<div className={'size-3 bg-green-800 rounded-sm'}></div>
				</div>
				<span>More</span>
			</div>

			<Tooltip id={'heatmap-tooltip'}/>
		</div>
	);
}

export {ActivityHeatmap};
