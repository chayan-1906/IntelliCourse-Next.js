const routes = {
	homePath: '/',
	signInPath: '/sign-in',
	companionsPath: '/companions',
	companionDetailsPath: (id: string) => `/companions/${id}`,
	// companionSessionPath: (id: string) => `/companions/${id}`,
	newCompanionPath: `/companions/new`,
	myJourneyPath: '/my-journey',
	subscriptionPath: '/subscription',
};

export {routes};
