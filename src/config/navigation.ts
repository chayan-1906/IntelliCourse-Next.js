import {routes} from "@/lib/routes";
import {NavItem} from "@/types/navigation";

export const navItems: NavItem[] = [
	{
		label: 'Home',
		href: routes.homePath,
	},
	{
		label: 'Companions',
		href: routes.companionsPath,
	},
	{
		label: 'My Journey',
		href: routes.myJourneyPath,
	},
];
