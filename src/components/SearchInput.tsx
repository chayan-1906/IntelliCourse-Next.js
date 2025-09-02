'use client';

import Image from "next/image";
import {useEffect, useState} from "react";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {routes} from "@/lib/routes";
import search from "../../public/icons/search.svg";

function SearchInput() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const query = searchParams.get('topic') || '';

	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		setTimeout(() => {
			if (searchQuery) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'topic',
					value: searchQuery,
				});
				router.push(newUrl, {scroll: false});
			} else {
				if (pathname === routes.companionsPath) {
					const newUrl = removeKeysFromUrlQuery({
						params: searchParams.toString(),
						keysToRemove: ['topic'],
					});
					router.push(newUrl, {scroll: false});
				}
			}
		}, 500);
	}, [searchQuery, router, searchParams, pathname]);

	return (
		<div className={'relative flex items-center gap-2 pl-4 pr-2 py-1 h-fit border border-black rounded-lg'}>
			<Image src={search} alt={'search'} width={15} height={15}/>
			<input placeholder={'Search companions...'} className={'outline-none pr-2'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
		</div>
	);
}

export {SearchInput};
