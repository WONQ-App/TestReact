const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboards',
				title: 'Dashboards',
				translate: 'DASHBOARDS',
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
				id: 'scrumboard',
				title: 'Scrumboard',
				translate: 'SCRUMBOARD',
				type: 'item',
				icon: 'assessment',
				url: '/apps/scrumboard'
			}
		]
	},
	{
		id: 'pages',
		title: 'Pages',
		type: 'group',
		icon: 'pages',
		children: [
			{
				id: 'coming-soon',
				title: 'Coming Soon',
				type: 'item',
				icon: 'alarm',
				url: '/pages/coming-soon'
			}
		]
	}
];

export default navigationConfig;
