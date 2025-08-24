import {getSubjectColor} from "@/lib/utils";
import {SearchInput} from "@/components/SearchInput";
import CompanionCard from "@/components/CompanionCard";
import {SubjectFilter} from "@/components/SubjectFilter";
import {getAllCompanions} from "@/lib/actions/companions.actions";

async function CompanionsLibraryPage({searchParams}: SearchParams) {
	const filters = await searchParams || {};
	const subject = filters.subject ? filters.subject : '';
	const topic = filters.topic ? filters.topic : '';

	const companions = await getAllCompanions({subject, topic});
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
				{companions?.map((companion: Companion) => (
					<CompanionCard key={companion.id} color={getSubjectColor(companion.subject)} {...companion}/>
				))}
			</section>
		</main>
	);
}

export default CompanionsLibraryPage;
