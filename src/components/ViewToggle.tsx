'use client';

import {cn} from '@/lib/utils';

function ViewToggle({currentView, onViewChange}: ViewToggleProps) {
	const viewOptions: { value: ViewMode; label: string }[] = [
		{value: 'yearly', label: 'Year'},
		{value: 'monthly', label: 'Months'},
		{value: 'weekly', label: 'Weeks'},
	];

	return (
		<div className={'p-1 bg-gray-100 rounded-md border border-gray-200'}>
			{viewOptions.map((option) => (
				<button key={option.value} onClick={() => onViewChange(option.value)}
				        className={cn('px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer', currentView === option.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900')}>
					{option.label}
				</button>
			))}
		</div>
	);
}

export {ViewToggle};
