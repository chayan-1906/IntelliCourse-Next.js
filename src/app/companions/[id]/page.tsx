import Image from "next/image";
import {redirect} from "next/navigation";
import {currentUser} from "@clerk/nextjs/server";
import {routes} from "@/lib/routes";
import {getSubjectColor} from "@/lib/utils";
import {CompanionSessionPageProps} from "@/types/companion";
import {getCompanion} from "@/lib/actions/companions.actions";
import {SubjectIconName, subjectIcons} from "@/constants/icons";

async function CompanionSessionPage({params}: CompanionSessionPageProps) {
	const {id} = await params || {};
	const companion: Companion = await getCompanion(id);
	const user = await currentUser();

	if (!user) {
		redirect(routes.signInPath);
	}
	if (!companion) {
		redirect(routes.companionsPath);
	}

	console.log('companion:', companion);
	const {name, subject, topic, duration, bookmarked} = companion;

	return (
		<main>
			<article className={'flex max-md:flex-col justify-between rounded-border p-6'}>
				<div className={'flex items-center gap-2'}>
					<div className={'flex max-md:hidden items-center justify-center rounded-lg size-72'} style={{backgroundColor: getSubjectColor(subject)}}>
						<Image src={subjectIcons[subject as SubjectIconName]} alt={subject} width={35} height={35}/>
					</div>
					<div className={'flex flex-col gap-2'}>
						<div className={'flex items-center gap-2'}>
							<p className={'font-bold text-2xl'}>{name}</p>
							<div className={'subject-badge max-sm:hidden'}>{subject}</div>
						</div>
						<p className={'text-lg'}>{topic}</p>
					</div>
				</div>
				<div className={'max-md:hidden text-2xl'}>{duration} minute(s)</div>
			</article>
		</main>
	);
}

export default CompanionSessionPage;
