import Link from "next/link";
import Image from "next/image";
import {redirect} from "next/navigation";
import {auth} from "@clerk/nextjs/server";
import {routes} from "@/lib/routes";
import {images} from "@/constants/icons";
import {CompanionForm} from "@/components/CompanionForm";
import {newCompanionPermissions} from "@/lib/actions/companions.actions";

async function NewCompanion() {
	const {userId} = await auth();
	if (!userId) {
		redirect(routes.signInPath);
	}

	const canCreateCompanion = await newCompanionPermissions();

	return (
		<main className={'min-lg:w-1/3 min-md:w-2/3 items-center justify-center'}>
			{canCreateCompanion ? (
				<article className={'flex flex-col w-full gap-4'}>
					<h1>Companion Builder</h1>
					<CompanionForm/>
				</article>
			) : (
				<article className={'companion-limit'}>
					<Image src={images.limit} alt={'Companion limit reached'} width={360} height={260}/>
					<div className={'cta-badge'}>Upgrade your plan</div>
					<h1>You&#39;ve Reached Your Limit</h1>
					<p>You&#39;ve reached your companion limit. Upgrade to create more companions and access premium features</p>
					<Link href={routes.subscriptionPath} className={'btn-primary w-full justify-center'}>Upgrade My Plan</Link>
				</article>
			)}
		</main>
	);
}

export default NewCompanion;
