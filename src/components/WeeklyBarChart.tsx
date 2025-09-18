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
			<div className={'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6'}>
				{data.map((week: WeeklyData, index: number) => (
					<div key={index} className={'flex flex-col items-center p-3 bg-gray-50 rounded-lg'}>
						<div data-tooltip-id={'weekly-chart-tooltip'} data-tooltip-content={getTooltipContent(week)}
						     className={cn('w-full py-3 rounded-lg text-white font-semibold text-xs sm:text-sm text-center transition-all duration-200 hover:opacity-80 cursor-pointer', getCellBackgroundColor(week.totalMinutes))}>
							Week {index + 1}
						</div>
						<div className={'mt-2 w-full text-xs text-gray-600 text-center font-semibold'}>{formatDateRange(week.weekStart, week.weekEnd)}</div>
						<div className={'inline-flex w-full items-center justify-center gap-2 text-xs text-gray-500'}>
							<div className={'text-center'}>
								{Math.floor(week.totalMinutes / 60) > 0 ? `${Math.floor(week.totalMinutes / 60)}h ` : ''}
								{week.totalMinutes % 60 > 0 ? `${week.totalMinutes % 60}m` : ''}
								{week.totalMinutes === 0 ? 'No activity' : ''}
							</div>
							<div className={'text-center'}>{week.dayCount} {week.dayCount === 1 ? 'day' : 'days'}</div>
						</div>
					</div>
				))}
			</div>
			<Tooltip id={'weekly-chart-tooltip'}/>
		</div>
	);
}

export {WeeklyBarChart};
