const routes = {
	homePath: '/',
	signInPath: '/sign-in',
	companionsPath: '/companions',
	companionDetailsPath: (companionId: string) => `/companions/${companionId}`,
	companionSessionPath: (sessionId: string) => `/companions/${sessionId}`,
	newCompanionPath: `/companions/new`,
	myJourneyPath: '/my-journey',
};

export {routes};
