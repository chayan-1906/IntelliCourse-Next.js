import {getSubjectColor} from "@/lib/utils";
import {currentUser} from "@clerk/nextjs/server";
import {SearchInput} from "@/components/SearchInput";
import CompanionCard from "@/components/CompanionCard";
import {SubjectFilter} from "@/components/SubjectFilter";
import {getAllCompanions} from "@/lib/actions/companion.actions";
import {EmptyStateAnimation} from "@/components/EmptyStateAnimation";

async function CompanionsLibraryPage({searchParams}: SearchParams) {
	const filters = await searchParams || {};
	const subject = filters.subject ? filters.subject : '';
	const topic = filters.topic ? filters.topic : '';

	const user = await currentUser();

	const companions = await getAllCompanions({subject, topic, userId: user?.id});
	console.log('companions:', companions);

	return (
		<main>
			<section className={'flex max-sm:flex-col justify-between gap-4'}>
				<h1>Companion Library</h1>
				<div className={'flex gap-4'}>
					<SearchInput/>
					<SubjectFilter/>
				</div>
			</section>
			<section className={'companions-grid'}>
				{companions && companions.length > 0 ? (
					companions.map((companion: Companion) => (
						<CompanionCard key={companion.id} color={getSubjectColor(companion.subject)} {...companion}/>
					))
				) : (
					<div className={'w-full col-span-full'}>
						<EmptyStateAnimation
							title={'No companions found'}
							description={'Try adjusting your search criteria or browse different subjects to find AI companions that match your learning goals'}
						/>
					</div>
				)}
			</section>
		</main>
	);
}

export default CompanionsLibraryPage;
