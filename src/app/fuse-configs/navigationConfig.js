
const navigationConfig = [
	{
		id: 'dashboards',
		title: 'ダッシュボード',
		type: 'collapse',
		icon: 'dashboard',
		children: [
			{
				id: 'analytics-dashboard',
				title: 'Analytics',
				type: 'item',
				url: '/apps/dashboards/analytics'
			},
			{
				id: 'project-dashboard',
				title: 'Project',
				type: 'item',
				url: '/apps/dashboards/project'
			}
		]
	},
	{
		id: 'calendar',
		title: 'カレンダー',
		type: 'item',
		icon: 'today',
		url: '/apps/calendar'
	},
	{
		id: 'scrumboard',
		title: 'お客様管理',
		type: 'item',
		icon: 'assessment',
		url: '/apps/scrumboard'

	},
	{
		id: 'contacts',
		title: 'Contacts（ユーザー管理）',
		type: 'item',
		icon: 'account_box',
		url: '/apps/contacts/all'
	},
	{
		id: 'Sales',
		title: '売上管理',
		type: 'item',
		icon: 'assessment',
		url: '/apps/sales'
	}
];

export default navigationConfig;
