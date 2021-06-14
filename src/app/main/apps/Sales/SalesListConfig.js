import { lazy } from 'react';

const SalesListConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/sales',
			component: lazy(() => import('./SalesList'))
		}
	]
};

export default SalesListConfig;