'use client';

import {Tooltip} from 'react-tooltip';
import {cn, getCellBackgroundColor} from '@/lib/utils';

function WeeklyBarChart({data, className}: WeeklyBarChartProps) {
	if (!data || data.length === 0) {
		return (
			<div className={cn('weekly-bar-chart', className)}>
				<div className={'flex items-center justify-center h-32 bg-gray-50 rounded-lg'}>
					<div className={'text-gray-500 text-sm'}>No weekly data available</div>
				</div>
			</div>
		);
	}

	const maxMinutes = Math.max(...data.map(week => week.totalMinutes));

	const getBarHeight = (minutes: number) => {
		if (maxMinutes === 0) return 0;
		return Math.max((minutes / maxMinutes) * 100, 2);
	}

	const formatDateRange = (weekStart: string, weekEnd: string) => {
		const start = new Date(weekStart);
		const end = new Date(weekEnd);
		return `${start.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} - ${end.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}`;
	}

	const getTooltipContent = (week: WeeklyData) => {
		const hours = Math.floor(week.totalMinutes / 60);
		const minutes = week.totalMinutes % 60;
		let durationText;

		if (hours > 0) {
			durationText = `${hours}h ${minutes}m`;
		} else if (week.totalMinutes > 0) {
			durationText = `${week.totalMinutes}m`;
		} else {
			durationText = 'No activity';
		}

		return `${formatDateRange(week.weekStart, week.weekEnd)}: ${durationText} across ${week.dayCount} days`;
	}

	return (
		<div className={cn('weekly-bar-chart bg-white p-4 rounded-lg border border-gray-200', className)}>
			<div className={'flex items-end justify-between h-32 gap-2'}>
				{data.map((week, index) => (
					<div key={index} className={'flex-1 flex flex-col items-center h-full'}>
						<div className={'flex-1 flex items-end w-full'}>
							<div data-tooltip-id={'weekly-chart-tooltip'} data-tooltip-content={getTooltipContent(week)}
							     className={cn('w-full rounded-t-sm transition-all duration-200 hover:opacity-80', getCellBackgroundColor(week.totalMinutes))}
							     style={{height: `${getBarHeight(week.totalMinutes)}%`}}/>
						</div>
						<div className={'text-xs text-gray-500 mt-5 transform -rotate-45 origin-center w-16 text-center'}>
							{new Date(week.weekStart).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
						</div>
					</div>
				))}
			</div>
			<div className={'mt-4 flex items-center justify-between text-xs text-gray-500'}>
				<span>12 weeks ago</span>
				<span>This week</span>
			</div>
			<Tooltip id={'weekly-chart-tooltip'}/>
		</div>
	);
}

export {WeeklyBarChart};
