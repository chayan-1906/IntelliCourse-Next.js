'use client';

import {Tooltip} from 'react-tooltip';
import {cn, getCellBackgroundColor} from '@/lib/utils';

function MonthlyCalendarGrid({data, className}: MonthlyCalendarGridProps) {
	if (!data || data.length === 0) {
		return (
			<div className={cn('monthly-calendar-grid', className)}>
				<div className={'flex items-center justify-center h-64 bg-gray-50 rounded-lg'}>
					<div className={'text-gray-500 text-sm'}>No monthly data available</div>
				</div>
			</div>
		);
	}

	const getTooltipContent = (month: MonthlyData) => {
		const hours = Math.floor(month.totalMinutes / 60);
		const minutes = month.totalMinutes % 60;
		let durationText;

		if (hours > 0) {
			durationText = `${hours}h ${minutes}m`;
		} else if (month.totalMinutes > 0) {
			durationText = `${month.totalMinutes}m`;
		} else {
			durationText = 'No activity';
		}

		return `${month.month} ${month.year}: ${durationText} across ${month.dayCount} days`;
	}

	const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate()

	const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month - 1, 1).getDay()

	const renderMonthCalendar = (monthData: MonthlyData) => {
		const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(monthData.month) + 1;
		const daysInMonth = getDaysInMonth(monthData.year, monthIndex);
		const firstDay = getFirstDayOfMonth(monthData.year, monthIndex);

		const dailyDataMap: { [key: string]: number } = {};
		monthData.dailyData.forEach(day => dailyDataMap[day.date] = day.count);

		const days = [];

		for (let i = 0; i < firstDay; i++) {
			days.push(
				<div key={`empty-${i}`} className={'size-4'}/>
			);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const dateStr = `${monthData.year}-${String(monthIndex).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
			const minutes = dailyDataMap[dateStr] || 0;

			days.push(
				<div key={day} data-tooltip-id={'monthly-grid-tooltip'}
				     className={cn('w-4 h-4 rounded-sm border border-gray-100 hover:border-gray-300 transition-colors', getCellBackgroundColor(minutes))}
				     data-tooltip-content={`${new Date(dateStr).toLocaleDateString('en-US', {
					     month: 'short',
					     day: 'numeric',
					     year: 'numeric'
				     })}: ${minutes > 0 ? `${Math.floor(minutes / 60) > 0 ? `${Math.floor(minutes / 60)}h ` : ''}${minutes % 60}m` : 'No activity'}`}
				/>
			);
		}

		return days;
	}

	return (
		<div className={cn('monthly-calendar-grid bg-white p-4 rounded-lg border border-gray-200', className)}>
			<div className={'grid grid-cols-4 gap-4'}>
				{data.map((month, index) => (
					<div key={index} className={'flex flex-col items-center'}>
						<div data-tooltip-id={'monthly-summary-tooltip'} data-tooltip-content={getTooltipContent(month)}
						     className={cn('size-20 rounded-lg mb-2 flex items-center justify-center text-white font-semibold text-sm transition-all duration-200 hover:opacity-80 cursor-pointer', getCellBackgroundColor(month.totalMinutes))}>
							{month.month}
						</div>
						<div className={'grid grid-cols-7 gap-px bg-gray-100 rounded p-1'}>{renderMonthCalendar(month)}</div>
						<div className={'text-xs text-gray-500 mt-1'}>{month.year}</div>
					</div>
				))}
			</div>
			<div className={'mt-4 flex items-center justify-between text-xs text-gray-500'}>
				<span>12 months ago</span>
				<span>This month</span>
			</div>
			<Tooltip id={'monthly-summary-tooltip'}/>
			<Tooltip id={'monthly-grid-tooltip'}/>
		</div>
	);
}

export {MonthlyCalendarGrid};
