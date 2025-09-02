import React from "react";
import type {Metadata} from "next";
import localFont from "next/font/local";
import {Bricolage_Grotesque} from "next/font/google";
import "./globals.css";
import {Navbar} from "@/components/Navbar";
import {ClerkProvider} from "@clerk/nextjs";

const bricolage = Bricolage_Grotesque({
	variable: '--font-bricolage',
	subsets: ['latin'],
});

const inter = localFont({
	src: [
		{
			path: '../../public/fonts/Inter-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Inter-Medium.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Inter-SemiBold.ttf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Inter-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-inter',
});

const sourceSans = localFont({
	src: [
		{
			path: '../../public/fonts/SourceSans3-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/SourceSans3-Medium.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/SourceSans3-SemiBold.ttf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/SourceSans3-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-source-sans',
});

export const metadata: Metadata = {
	title: 'IntelliCourse',
	description: 'Real-time AI Teaching Platform',
};

function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
	return (
		<ClerkProvider appearance={{variables: {colorPrimary: '#FE5933'}}}>
			<html lang={'en'} suppressHydrationWarning>
			<body className={`${bricolage.variable} ${inter.variable} ${sourceSans.variable} antialiased`}>
			<Navbar/>
			{children}
			</body>
			</html>
		</ClerkProvider>
	);
}

export default RootLayout;
