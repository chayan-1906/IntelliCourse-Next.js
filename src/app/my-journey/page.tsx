import Image from "next/image";
import {redirect} from "next/navigation";
import {currentUser} from "@clerk/nextjs/server";
import {routes} from "@/lib/routes";
import {icons} from "@/constants/icons";
import CompanionList from "@/components/CompanionList";
import {getUserCompanions, getUserSessions} from "@/lib/actions/companions.actions";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

async function MyJourneyPage() {
	const user = await currentUser();

	if (!user) {
		redirect(routes.signInPath);
	}

	const sessionHistory: Companion[] = await getUserSessions(user.id);
	const companions: Companion[] = await getUserCompanions(user.id);
	console.log('companions:', companions);

	return (
		<main className={'min-lg:w-3/4'}>
			<section className={'flex sm:flex- items-center justify-between gap-4'}>
				<div className={'flex gap-4 items-center'}>
					<Image src={user.imageUrl} alt={user.firstName || 'profile-picture'} width={110} height={110}/>
					<div className={'flex flex-col gap-2'}>
						<h1>{user.firstName} {user.lastName}</h1>
						<p className={'text-sm text-muted-foreground'}>{user.emailAddresses[0].emailAddress}</p>
					</div>
				</div>

				<div className={'flex gap-4'}>
					<div className={'flex flex-col h-fit border border-black rounded-lg p-3 gap-2'}>
						<div className={'flex gap-2 items-center'}>
							<Image src={icons.check} alt={'checkmark'} width={22} height={22}/>
							<p className={'text-2xl font-bold'}>{sessionHistory.length}</p>
						</div>
						<div>Lessons completed</div>
					</div>
					<div className={'flex flex-col h-fit border border-black rounded-lg p-3 gap-2'}>
						<div className={'flex gap-2 items-center'}>
							<Image src={icons.cap} alt={'cap'} width={22} height={22}/>
							<p className={'text-2xl font-bold'}>{companions.length}</p>
						</div>
						<div>Companions created</div>
					</div>
				</div>
			</section>

			<Accordion type={'multiple'}>
				<AccordionItem value={'recent'}>
					<AccordionTrigger className={'text-2xl font-bold'}>Recent Sessions</AccordionTrigger>
					<AccordionContent>
						<CompanionList title={'Recent Sessions'} companions={sessionHistory}/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value={'companions'}>
					<AccordionTrigger className={'text-2xl font-bold'}>My Companions {`(${companions.length})`}</AccordionTrigger>
					<AccordionContent>
						<CompanionList title={'My Companions'} companions={companions}/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</main>
	);
}

export default MyJourneyPage;
