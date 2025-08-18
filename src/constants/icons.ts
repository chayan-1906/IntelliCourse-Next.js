import capIcon from "../../public/icons/cap.svg";
import plusIcon from "../../public/icons/plus.svg";
import mathsIcon from "../../public/icons/maths.svg";
import checkIcon from "../../public/icons/check.svg";
import clockIcon from "../../public/icons/clock.svg";
import micOnIcon from "../../public/icons/mic-on.svg";
import searchIcon from "../../public/icons/search.svg";
import logoutIcon from "../../public/icons/logout.svg";
import codingIcon from "../../public/icons/coding.svg";
import googleIcon from "../../public/icons/google.svg";
import micOffIcon from "../../public/icons/mic-off.svg";
import historyIcon from "../../public/icons/history.svg";
import scienceIcon from "../../public/icons/science.svg";
import languageIcon from "../../public/icons/language.svg";
import bookmarkIcon from "../../public/icons/bookmark.svg";
import economicsIcon from "../../public/icons/economics.svg";
import bookmarkFilledIcon from "../../public/icons/bookmark-filled.svg";

import ctaImage from "../../public/images/cta.svg";
import logoImage from "../../public/images/logo.svg";
import limitImage from "../../public/images/limit.svg";

export const icons = {
	cap: capIcon,
	plus: plusIcon,
	maths: mathsIcon,
	check: checkIcon,
	clock: clockIcon,
	micOn: micOnIcon,
	search: searchIcon,
	logout: logoutIcon,
	coding: codingIcon,
	google: googleIcon,
	micOff: micOffIcon,
	history: historyIcon,
	science: scienceIcon,
	language: languageIcon,
	bookmark: bookmarkIcon,
	economics: economicsIcon,
	bookmarkFilled: bookmarkFilledIcon,
} as const;

export const images = {
	cta: ctaImage,
	limit: limitImage,
	logo: logoImage,
} as const;

export const subjectIcons = {
	coding: codingIcon,
	economics: economicsIcon,
	history: historyIcon,
	language: languageIcon,
	maths: mathsIcon,
	science: scienceIcon,
} as const;

export type IconName = keyof typeof icons;
export type ImageName = keyof typeof images;
export type SubjectIconName = keyof typeof subjectIcons;
