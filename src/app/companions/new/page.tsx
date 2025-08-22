import {redirect} from "next/navigation";
import {auth} from "@clerk/nextjs/server";
import {routes} from "@/lib/routes";
import {CompanionForm} from "@/components/CompanionForm";

async function NewCompanion() {
	const {userId} = await auth();
	if (!userId) {
		redirect(routes.signInPath);
	}

	return (
		<main className={'min-lg:w-1/3 min-md:w-2/3 items-center justify-center'}>
			<article className={'flex flex-col w-full gap-4'}>
				<h1>Companion Builder</h1>
				<CompanionForm/>
			</article>
		</main>
	);
}

export default NewCompanion;
