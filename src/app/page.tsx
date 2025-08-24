import React from 'react'
import {CTA} from "@/components/CTA";
import {recentSessions} from "@/constants";
import CompanionList from "@/components/CompanionList";
import CompanionCard from "@/components/CompanionCard";

const Page = () => {
	return (
		<main>
			<h1 className={'text-2xl underline'}>Popular Companions</h1>
			<section className={'home-section'}>
				<CompanionCard id={'123'} name={'Neura the Brainy Explorer'} topic={'Neural Network of the Brain'} subject={'Science'} duration={45} color={'#FFDA6E'}/>
				<CompanionCard id={'456'} name={'Countsy the Number Wizard'} topic={'Derivatives & Integrals'} subject={'Maths'} duration={30} color={'#E5D0FF'}/>
				<CompanionCard id={'789'} name={'Verba the Vocabulary Builder'} topic={'English Literature'} subject={'Language'} duration={30} color={'#BDE7FF'}/>
			</section>

			<section className={'home-section'}>
				<CompanionList title={'Recently completed sessions'} companions={recentSessions} className={'w-2/3 max-lg:w-full'}/>
				<CTA/>
			</section>
		</main>
	);
}

export default Page;
