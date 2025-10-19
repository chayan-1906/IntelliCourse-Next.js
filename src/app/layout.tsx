import React from "react";
import type {Metadata} from "next";
import {ClerkProvider} from "@clerk/nextjs";
import {Bricolage_Grotesque, Inter, Source_Sans_3} from "next/font/google";
import "./globals.css";
import {Navbar} from "@/components/Navbar";
import {BreadcrumbWrapper} from "@/components/BreadcrumbWrapper";

const bricolage = Bricolage_Grotesque({
	variable: '--font-bricolage',
	subsets: ['latin'],
});

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

const sourceSans = Source_Sans_3({
	variable: '--font-source-sans',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'IntelliCourse - Learn Smarter, Not Harder',
	description: 'AI-powered voice learning platform that helps you master any subject with personalized AI companions',
};

function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
	return (
		<ClerkProvider appearance={{variables: {colorPrimary: '#FE5933'}}}>
			<html lang={'en'} suppressHydrationWarning>
			<body className={`${bricolage.variable} ${inter.variable} ${sourceSans.variable} antialiased`}>
			<Navbar/>
			<BreadcrumbWrapper>
				{children}
			</BreadcrumbWrapper>
			</body>
			</html>
		</ClerkProvider>
	);
}

export default RootLayout;
