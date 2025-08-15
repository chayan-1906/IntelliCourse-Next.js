const routes = {
	homePath: '/',
	companionPath: '/companions',
	companionSessionPath: (sessionId: string) => `/companions/${sessionId}`,
	myJourneyPath: '/my-journey',
};

export {routes};
