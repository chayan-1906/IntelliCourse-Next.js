const routes = {
	homePath: '/',
	companionsPath: '/companions',
	companionDetailsPath: (companionId: string) => `/companions/${companionId}`,
	companionSessionPath: (sessionId: string) => `/companions/${sessionId}`,
	newCompanionPath: `/companions/new`,
	myJourneyPath: '/my-journey',
};

export {routes};
