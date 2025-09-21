'use client';

import React from 'react';
import Link from 'next/link';
import {motion, Variants} from 'framer-motion';
import {ChevronRightIcon, HomeIcon} from 'lucide-react';
import {cn} from '@/lib/utils';
import {BreadcrumbItem, BreadcrumbProps} from '@/types/navigation';

function Breadcrumb({items, className}: BreadcrumbProps) {
	const containerVariants: Variants = {
		hidden: {opacity: 0, y: -10},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: {opacity: 0, x: -10},
		visible: {
			opacity: 1,
			x: 0,
			transition: {duration: 0.2},
		},
	};

	if (!items || items.length === 0) {
		return null;
	}

	return (
		<motion.nav className={cn('breadcrumb-nav flex items-center space-x-2 px-14 max-sm:px-4 py-3', className)} variants={containerVariants} initial={'hidden'} animate={'visible'}
		            aria-label={'Breadcrumb navigation'}>
			<motion.ol variants={itemVariants} className={'flex items-center space-x-2 text-sm'}>
				{items.map((item: BreadcrumbItem, index: number) => {
					const isLast = index === items.length - 1;
					const isFirst = index === 0;

					return (
						<motion.li key={index} variants={itemVariants} className={'flex items-center'}>
							{/* Show separator for all items except first */}
							{!isFirst && (
								<ChevronRightIcon className={'size-4 text-gray-400 mx-2 flex-shrink-0'} aria-hidden={'true'}/>
							)}

							{/* Breadcrumb item */}
							{item.href && !isLast ? (
								<Link href={item.href}
								      className={cn('flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors duration-200', 'hover:underline underline-offset-2', isFirst && 'font-medium')}>
									{isFirst && item.icon ? (
										item.icon
									) : isFirst ? (
										<HomeIcon className={'size-4'}/>
									) : null}
									<span>{item.label}</span>
								</Link>
							) : (
								<span className={cn('flex items-center gap-1.5 font-medium', isLast ? 'text-primary' : 'text-gray-800')} aria-current={isLast ? 'page' : undefined}>
									{isFirst && item.icon ? (
										item.icon
									) : isFirst ? (
										<HomeIcon className={'size-4'}/>
									) : null}
									<span>{item.label}</span>
								</span>
							)}
						</motion.li>
					);
				})}
			</motion.ol>
		</motion.nav>
	);
}

export {Breadcrumb};
