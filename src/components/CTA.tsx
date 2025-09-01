import Link from "next/link";
import Image from "next/image";
import {routes} from "@/lib/routes";
import {icons, images} from "@/constants/icons";

function CTA() {
	return (
		<section className={'cta-section'}>
			<div className={'cta-badge'}>Start learning your way!</div>
			<h2 className={'text-3xl font-bold'}>Build and Personalize Learning Companion</h2>
			<p>Pick a name, subject, voice & personality - and start learning through voice conversations that feel natural and fun</p>
			<Image src={images.cta} alt={'cta'} width={362} height={232}/>
			<Link href={routes.newCompanionPath} className={'btn-primary bg-amber-600'}>
				<Image src={icons.plus} alt={'plus'} width={12} height={12}/>
				<p>Build a new Companion</p>
			</Link>
		</section>
	);
}

export {CTA};
