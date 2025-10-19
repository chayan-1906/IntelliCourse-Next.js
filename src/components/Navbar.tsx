import Link from "next/link";
import Image from "next/image";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {NavItems} from "@/components/NavItems";
import logoImg from "../../public/images/logo.svg";

const Navbar = () => {
	return (
		<nav className={'navbar'}>
			<Link href={'/'}>
				<div className={'flex items-center gap-2.5 cursor-pointer group transition-all duration-300 hover:scale-105'}>
					<Image src={logoImg} alt={'logo'} width={46} height={44} className={'transition-transform duration-300 group-hover:rotate-12'}/>
					<div className={'flex flex-col'}>
						<h1 className={'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold transition-all duration-300 group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-blue-600'}>IntelliCourse</h1>
						<p className={'hidden md:block text-xs text-gray-500 font-medium -mt-1'}>Learn Smarter, Not Harder</p>
					</div>
				</div>
			</Link>
			<div className="flex items-center gap-8">
				<NavItems/>
				<SignedOut>
					<SignInButton>
						<button className={'btn-signin'}>Sign In</button>
					</SignInButton>
				</SignedOut>
				<SignedIn>
					<UserButton/>
				</SignedIn>
			</div>
		</nav>
	);
}

export {Navbar};
