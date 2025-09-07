import React from 'react'
import {currentUser} from "@clerk/nextjs/server";
import {CTA} from "@/components/CTA";
import {getSubjectColor} from "@/lib/utils";
import CompanionCard from "@/components/CompanionCard";
import {CompanionList} from "@/components/CompanionList";
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companion.actions";

const Page = async () => {
	const user = await currentUser();

	const companions = await getAllCompanions({limit: 3, userId: user?.id});
	const recentSessions = await getRecentSessions(10);

	return (
		<main>
			<h1 className={'text-2xl underline'}>Popular Companions</h1>
			<section className={'home-section'}>
				{companions.map((companion: Companion) => (
					<CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)}/>
				))}
			</section>

			<section className={'home-section'}>
				<CompanionList title={'Recently completed sessions'} companions={recentSessions} className={'w-2/3 max-lg:w-full'}/>
				<CTA/>
			</section>
		</main>
	);
}

export default Page;
