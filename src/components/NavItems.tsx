'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {navItems} from "@/config/navigation";

function NavItems() {
	const pathname = usePathname();

	return (
		<nav className={'flex items-center gap-4'}>
			{navItems.map(({label, href}) => {
				return (
					<div key={label}>
						<Link href={href} className={cn(pathname === href)}>{label}</Link>
					</div>
				);
			})}
		</nav>
	);
}

export {NavItems};
