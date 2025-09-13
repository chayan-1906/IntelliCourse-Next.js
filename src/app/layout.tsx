import React from "react";
import type {Metadata} from "next";
import {Bricolage_Grotesque, Inter, Source_Sans_3} from "next/font/google";
import "./globals.css";
import {Navbar} from "@/components/Navbar";
import {ClerkProvider} from "@clerk/nextjs";

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
