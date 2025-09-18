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
				<div key={`empty-${i}`} className={'size-5'}/>
			);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const dateStr = `${monthData.year}-${String(monthIndex).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
			const minutes = dailyDataMap[dateStr] || 0;

			days.push(
				<div key={day} data-tooltip-id={'monthly-grid-tooltip'}
				     className={cn('size-5 rounded border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer', getCellBackgroundColor(minutes))}
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
			<div className={'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'}>
				{data.map((monthlyData: MonthlyData, index: number) => (
					<div key={index} className={'flex flex-col justify-between'}>
						<div className={'flex flex-col w-full items-center bg-gray-50 rounded-lg gap-2'}>
							<div data-tooltip-id={'monthly-summary-tooltip'} data-tooltip-content={getTooltipContent(monthlyData)}
							     className={cn('w-full py-2 rounded-lg text-white font-semibold text-sm sm:text-base text-center transition-all duration-200 hover:opacity-80 cursor-pointer', getCellBackgroundColor(monthlyData.totalMinutes))}>
								{monthlyData.month}
							</div>
							<div className={'grid grid-cols-7 gap-1 bg-white rounded-lg p-3 w-full border border-gray-200'}>{renderMonthCalendar(monthlyData)}</div>
						</div>
						<div className={'w-full mt-1 text-sm text-gray-600 text-center font-semibold'}>{monthlyData.year}</div>
					</div>
				))}
			</div>
			<Tooltip id={'monthly-summary-tooltip'}/>
			<Tooltip id={'monthly-grid-tooltip'}/>
		</div>
	);
}

export {MonthlyCalendarGrid};
