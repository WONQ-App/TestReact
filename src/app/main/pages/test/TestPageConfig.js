import { lazy } from 'react';

const TestPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/pages/test',
			component: lazy(() => import('./TestPage'))
		}
	]
};

export default TestPageConfig;
