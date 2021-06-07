import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/scrumboard',
			component: lazy(() => import('./board/Board'))
		} 
		// {
		// 	path: '/apps/scrumboard',
		// 	component: lazy(() => import('./boards/Boards'))
		// },
		// {
		// 	path: '/apps/scrumboard',
		// 	component: () => <Redirect to="/apps/scrumboard/boards" />
		// }
	]
};

export default ScrumboardAppConfig;
