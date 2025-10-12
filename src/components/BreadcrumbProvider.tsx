'use client';

import React, {createContext, useContext, useState} from 'react';
import {BreadcrumbContextType, BreadcrumbItem} from '@/types/navigation';

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

function BreadcrumbProvider({children}: { children: React.ReactNode }) {
	const [customBreadcrumbs, setCustomBreadcrumbs] = useState<BreadcrumbItem[] | null>(null);

	return (
		<BreadcrumbContext.Provider value={{customBreadcrumbs, setCustomBreadcrumbs}}>
			{children}
		</BreadcrumbContext.Provider>
	);
}

function useBreadcrumbContext() {
	const context = useContext(BreadcrumbContext);
	if (context === undefined) {
		throw new Error('useBreadcrumbContext must be used within a BreadcrumbProvider');
	}
	return context;
}

export {BreadcrumbProvider, useBreadcrumbContext};
