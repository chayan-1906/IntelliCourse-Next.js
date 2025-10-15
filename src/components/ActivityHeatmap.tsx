'use client';

import dynamic from 'next/dynamic';
import {Tooltip} from 'react-tooltip';
import {DownloadIcon} from 'lucide-react';
import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import 'react-calendar-heatmap/dist/styles.css';
import {ViewToggle} from '@/components/ViewToggle';
import {cn, exportHeatmapAsPNG, generateHeatmapSVG} from '@/lib/utils';
import {getHeatmapData, getMonthlyData, getWeeklyData} from '@/lib/actions/companion.actions';

const CalendarHeatmap = dynamic(() => import('react-calendar-heatmap'), {
	loading: () => <div className={'flex items-center justify-center h-32 bg-gray-50 rounded-lg'}>Loading calendar...</div>,
	ssr: false,
});

const WeeklyBarChart = dynamic(() => import('@/components/WeeklyBarChart').then(mod => ({default: mod.WeeklyBarChart})), {
	loading: () => <div className={'flex items-center justify-center h-32 bg-gray-50 rounded-lg'}>Loading chart...</div>,
	ssr: false,
});

const MonthlyCalendarGrid = dynamic(() => import('@/components/MonthlyCalendarGrid').then(mod => ({default: mod.MonthlyCalendarGrid})), {
	loading: () => <div className={'flex items-center justify-center h-32 bg-gray-50 rounded-lg'}>Loading calendar...</div>,
	ssr: false,
});

const ActivityHeatmapComponent = ({userId, className}: ActivityHeatmapProps) => {
	const [currentView, setCurrentView] = useState<ViewMode>('yearly');
	const [heatmapData, setHeatmapData] = useState<HeatmapValue[]>([]);
	const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
	const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isExporting, setIsExporting] = useState(false);
	const heatmapRef = useRef<HTMLDivElement>(null);

	const getTooltipDataAttrs = useCallback((value: ReactCalendarHeatmapValue | undefined): Record<string, string> => {
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
	}, []);

	const getClassForValue = useCallback((value: ReactCalendarHeatmapValue | undefined) => {
		if (!value || !value.count) {
			return 'color-empty';
		}

		const minutes = value.count;
		if (minutes < 30) return 'color-scale-1';
		if (minutes < 60) return 'color-scale-2';
		if (minutes < 120) return 'color-scale-3';
		return 'color-scale-4';
	}, []);

	const {startDate, endDate} = useMemo(() => {
		const start = new Date();
		start.setFullYear(start.getFullYear() - 1);
		const end = new Date();
		return {startDate: start, endDate: end};
	}, []);

	const getCurrentData = useMemo(() => {
		switch (currentView) {
			case 'weekly':
				return {
					totalMinutes: weeklyData.reduce((sum: number, week: WeeklyData) => sum + week.totalMinutes, 0),
					totalSessions: weeklyData.reduce((sum: number, week: WeeklyData) => sum + week.dayCount, 0),
				};
			case 'monthly':
				return {
					totalMinutes: monthlyData.reduce((sum: number, month: MonthlyData) => sum + month.totalMinutes, 0),
					totalSessions: monthlyData.reduce((sum: number, month: MonthlyData) => sum + month.dayCount, 0),
				};
			default:
				return {
					totalMinutes: heatmapData.reduce((sum: number, day: HeatmapValue) => sum + day.count, 0),
					totalSessions: heatmapData.length,
				};
		}
	}, [currentView, heatmapData, weeklyData, monthlyData]);

	const totalHours = useMemo(() => Math.floor(getCurrentData.totalMinutes / 60), [getCurrentData.totalMinutes]);

	const getViewTitle = useMemo(() => {
		switch (currentView) {
			case 'weekly':
				return 'Weekly Activity (Last 12 Weeks)';
			case 'monthly':
				return 'Monthly Activity (Last 12 Months)';
			default:
				return 'Learning Activity';
		}
	}, [currentView]);

	const renderCurrentView = () => {
		switch (currentView) {
			case 'weekly':
				return <WeeklyBarChart data={weeklyData}/>;
			case 'monthly':
				return <MonthlyCalendarGrid data={monthlyData}/>;
			default:
				return (
					<div className={'heatmap-wrapper bg-white p-4 rounded-lg border border-gray-200'}>
						<CalendarHeatmap
							startDate={startDate}
							endDate={endDate}
							values={heatmapData}
							classForValue={getClassForValue as never}
							tooltipDataAttrs={getTooltipDataAttrs as never}
							showWeekdayLabels={true}
							showMonthLabels={true}
						/>
					</div>
				);
		}
	}

	const handleExportPNG = useCallback(async () => {
		try {
			setIsExporting(true);
			await exportHeatmapAsPNG(heatmapData, {
				title: 'Learning Activity Heatmap',
				subtitle: `${totalHours > 0 ? `${totalHours} hours` : `${getCurrentData.totalMinutes} minutes`} of learning across ${getCurrentData.totalSessions} active days`,
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
	}, [heatmapData, totalHours, getCurrentData.totalMinutes, getCurrentData.totalSessions]);

	const handleExportSVG = useCallback(async () => {
		try {
			setIsExporting(true);
			const svgContent = generateHeatmapSVG(heatmapData, {
				title: 'Learning Activity Heatmap',
				subtitle: `${totalHours > 0 ? `${totalHours} hours` : `${getCurrentData.totalMinutes} minutes`} of learning across ${getCurrentData.totalSessions} active days`,
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
	}, [heatmapData, totalHours, getCurrentData.totalMinutes, getCurrentData.totalSessions]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [yearlyData, weeksData, monthsData] = await Promise.all([
					getHeatmapData(userId),
					getWeeklyData(userId),
					getMonthlyData(userId),
				]);
				setHeatmapData(yearlyData);
				setWeeklyData(weeksData);
				setMonthlyData(monthsData);
			} catch (error: unknown) {
				setError(error instanceof Error ? error.message : 'Failed to load activity data');
			} finally {
				setLoading(false);
			}
		}

		if (userId) {
			fetchData();
		}
	}, [userId]);

	if (loading) {
		return (
			<div className={cn('activity-heatmap-container', className)}>
				<div className={'mb-4'}>
					<h3 className={'text-lg font-semibold text-gray-900'}>Learning Activity</h3>
					<p className={'text-sm text-gray-600'}>Your learning activity visualization</p>
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
					<p className={'text-sm text-gray-600'}>Your learning activity visualization</p>
				</div>
				<div className={'flex items-center justify-center h-32 bg-red-50 rounded-lg border border-red-200'}>
					<div className={'text-red-600 text-sm'}>{error}</div>
				</div>
			</div>
		);
	}

	return (
		<div ref={heatmapRef} className={cn('activity-heatmap-container', className)}>
			<div className={'mb-4'}>
				<div className={'flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'}>
					<div className={'flex flex-col w-full'}>
						<h3 className={'text-lg font-semibold text-gray-900'}>{getViewTitle}</h3>
						<p className={'text-sm text-gray-600'}>
							{totalHours > 0 ? `${totalHours} hours` : `${getCurrentData.totalMinutes} minutes`} of learning across {getCurrentData.totalSessions} active days
						</p>
					</div>
					<div className={'inline-flex gap-3 w-full justify-between sm:justify-end sm:items-center'}>
						<ViewToggle currentView={currentView} onViewChange={setCurrentView}/>
						<div className={cn('inline-flex items-center gap-2', currentView !== 'yearly' && 'invisible')}>
							<button title={'Export as PNG'} disabled={isExporting} onClick={handleExportPNG}
							        className={'inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 border border-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-md transition-colors'}>
								<DownloadIcon className={'size-3'}/>
								<p>{isExporting ? 'Exporting...' : 'PNG'}</p>
							</button>
							<button title={'Export as SVG'} disabled={isExporting} onClick={handleExportSVG}
							        className={'inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 border border-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-md transition-colors'}>
								<DownloadIcon className={'size-3'}/>
								<p>{isExporting ? 'Exporting...' : 'SVG'}</p>
							</button>
						</div>
					</div>
				</div>
			</div>

			{renderCurrentView()}

			{currentView === 'yearly' && (
				<div className={'mt-4 inline-flex w-full items-center justify-center gap-2 text-xs text-gray-500'}>
					<span>Less</span>
					<div className={'inline-flex items-center gap-2'}>
						<div className={'size-3 bg-gray-200 rounded-sm'}/>
						<div className={'size-3 bg-green-200 rounded-sm'}/>
						<div className={'size-3 bg-green-400 rounded-sm'}/>
						<div className={'size-3 bg-green-600 rounded-sm'}/>
						<div className={'size-3 bg-green-800 rounded-sm'}/>
					</div>
					<span>More</span>
				</div>
			)}

			<Tooltip id={'heatmap-tooltip'}/>
		</div>
	);
}

export const ActivityHeatmap = memo(ActivityHeatmapComponent);
