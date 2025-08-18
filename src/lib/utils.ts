import {twMerge} from "tailwind-merge"
import {type ClassValue, clsx} from "clsx"
import {subjectsColors} from "@/constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getSubjectColor = (subject: string) => {
	return subjectsColors[subject as keyof typeof subjectsColors];
}
