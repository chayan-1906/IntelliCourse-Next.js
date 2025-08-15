import Link from "next/link";
import Image from "next/image";
import {NavItems} from "@/components/NavItems";
import logoImg from "../../public/images/logo.svg";

function Navbar() {
	return (
		<nav className={'navbar'}>
			<Link href={'/'}>
				<div className={'flex items-center gap-2.5 cursor-pointer'}>
					<Image src={logoImg} alt={'logo'} width={46} height={44}/>
				</div>
			</Link>
			<div className={'flex items-center gap-8'}>
				<NavItems/>
				<p>Sign In</p>
			</div>
		</nav>
	);
}

export {Navbar};
