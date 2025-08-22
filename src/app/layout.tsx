import React from "react";
import type {Metadata} from "next";
import {Bricolage_Grotesque} from "next/font/google";
import "./globals.css";
import {Navbar} from "@/components/Navbar";
import {ClerkProvider} from "@clerk/nextjs";

const bricolage = Bricolage_Grotesque({
	variable: '--font-bricolage',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'IntelliCourse',
	description: 'Real-time AI Teaching Platform',
};

function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
	return (
		<ClerkProvider appearance={{variables: {colorPrimary: '#FE5933'}}}>
			<html lang={'en'}>
			<body className={`${bricolage.variable} antialiased`}>
			<Navbar/>
			{children}
			</body>
			</html>
		</ClerkProvider>
	);
}

export default RootLayout;
