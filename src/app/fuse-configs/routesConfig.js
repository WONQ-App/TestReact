import { Redirect } from 'react-router-dom';
import appsConfigs from 'app/main/apps/appsConfigs';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import FuseUtils from '@fuse/utils';

const routeConfigs = [...appsConfigs, ...pagesConfigs];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/apps/scrumboard" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
