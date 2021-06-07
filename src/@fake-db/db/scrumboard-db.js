import _ from '@lodash';
import sub from 'date-fns/sub';
import getUnixTime from 'date-fns/getUnixTime';
import add from 'date-fns/add';
import mock from '../mock';
import { startCase } from 'lodash';

const scrumboardDB = {
	boards: [
		{
			id: 'customer',
			name: 'お客様管理',
			uri: 'board',
			settings: {
				color: 'fuse-dark',
				subscribed: false,
				cardCoverImages: true
			},
			lists: [
				{
					id: '56027cf5a2ca3839a5d36103',
					name: '未対応',
					color: '#228b22',
					idCards: [
						'1',
						'2'
					]
				},
				{
					id: '56127cf2a2ca3539g7d36103',
					name: '対応中',
					color: '#4169e1',
					idCards: [
						'3',
						'4',
						'5',
						'6'
					]
				},
				{
					id: 'faf244627326f1249525763d',
					name: '対応済',
					color: '#6a5acd',
					idCards: [
						'7',
						'8',
						'9',
						'10',
						'11'
					]
				},
				{
					id: 'ad7d.9fffac5dff412.c83bca6853767.8fd7549b2b1ca.ceda8a01774c4.a5cf3976e87e4.ce79eeeea',
					name: '新規',
					color: '#ffa500',
					idCards: [
						'12',
						'13',
						'14'
					]
				}
			],
			cards: [
				{
					id: '3',
					name: 'Update generators',
					date:['ddd'],
					description: "Current generator doesn't support Node.js 6 and above.",
					idAttachmentCover: '',
					idMembers: ['26027s1930450d8bf7b10828'],
					idMembers2: ['26027s1930450d8bf7b10828'],
					idMembers3: ['26027s1930450d8bf7b10828'],
					idLabels: ['26022e4129ad3a5sc28b36cd'],
					attachments: [],
					subscribed: false,
					checklists: [],
					activities: [
						{
							id: 1,
							type: 'comment',
							idMember: '36027j1930450d8bf7b10158',
							message: 'AngularCLI could be a nice alternative.',
							time: getUnixTime(sub(new Date(), { minutes: 10 }))
						}
					],
					due: null,
					lineid: 'efaffeaf',
					seikan: '',
					meikan: '',
					seikana: '',
					meikana: '',
					seibetsu: '',
					birthday: '',
					number: ''
				},
				{
					id: '1',
					name: 'Change background colors',
					date:['ssssss'],
					description: '',
					idAttachmentCover: '67027cahbe3b52ecf2dc631c',
					idMembers: ['76027g1930450d8bf7b10958'],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['56027e4119ad3a5dc28b36cd', '5640635e19ad3a5dc21416b2'],
					attachments: [
						{
							id: '67027cahbe3b52ecf2dc631c',
							name: 'mail.jpg',
							src: 'assets/images/scrumboard/mail.jpg',
							time: getUnixTime(sub(new Date(), { minutes: 12 })),
							type: 'image'
						},
						{
							id: '56027cfcbe1b72ecf1fc452a',
							name: 'calendar.jpg',
							src: 'assets/images/scrumboard/calendar.jpg',
							time: getUnixTime(sub(new Date(), { minutes: 22 })),
							type: 'image'
						}
					],
					subscribed: true,
					checklists: [
						{
							id: '63021cfdbe1x72wcf1fc451v',
							name: 'Checklist',
							checkItems: [
								{
									id: 1,
									name: 'Implement a calendar library',
									checked: false
								},
								{
									id: 2,
									name: 'Replace event colors with Material Design colors',
									checked: true
								},
								{
									id: 3,
									name: 'Replace icons with Material Design icons',
									checked: false
								},
								{
									id: 4,
									name: 'Use date-fns',
									checked: false
								}
							]
						},
						{
							name: 'Checklist 2',
							id: '74031cfdbe1x72wcz1dc166z',
							checkItems: [
								{
									id: 1,
									name: 'Replace event colors with Material Design colors',
									checked: true
								},
								{
									id: 2,
									name: 'Replace icons with Material Design icons',
									checked: false
								},
								{
									id: 3,
									name: 'Use date-fns',
									checked: false
								}
							]
						}
					],
					memo: [
						{
							id: 1,
							type: 'log',
							idMember: '56027c1930450d8bf7b10758',
							message: 'We should be able to add date-fns without any problems',
							time: getUnixTime(sub(new Date(), { minutes: 10 }))
						},
						{
							id: 2,
							type: 'log',
							idMember: '36027j1930450d8bf7b10158',
							message: 'I added a link for a page that might help us deciding the colors',
							time: getUnixTime(sub(new Date(), { minutes: 20 }))
						},
						{
							id: 3,
							type: 'log',
							idMember: '36027j1930450d8bf7b10158',
							message: 'attached a link',
							time: getUnixTime(sub(new Date(), { minutes: 45 }))
						}
					],
					activities: [
						{
							id: 1,
							type: 'comment',
							idMember: '56027c1930450d8bf7b10758',
							message: 'We should be able to add date-fns without any problems',
							time: getUnixTime(sub(new Date(), { minutes: 10 }))
						},
						{
							id: 2,
							type: 'comment',
							idMember: '36027j1930450d8bf7b10158',
							message: 'I added a link for a page that might help us deciding the colors',
							time:getUnixTime(sub(new Date(), { minutes: 20 }))
						},
						{
							id: 3,
							type: 'attachment',
							idMember: '36027j1930450d8bf7b10158',
							message: 'attached a link',
							time: getUnixTime(sub(new Date(), { minutes: 45 }))
						}
					],
					due: getUnixTime(sub(new Date(), { days: 10 }))
				},
				{
					id: '5',
					name: 'Fix splash screen bugs',
					date:['fdfdfd'],
					description: '',
					idAttachmentCover: '',
					idMembers: ['56027c1930450d8bf7b10758'],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['5640635e19ad3a5dc21416b2'],
					attachments: [],
					subscribed: true,
					checklists: [],
					activities: [],
					due: null,
					lineid: 'efaffeaf'
				},
				{
					id: '7',
					name: 'Add alternative authentication pages',
					description: '',
					idAttachmentCover: '',
					idMembers: ['36027j1930450d8bf7b10158'],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['6540635g19ad3s5dc31412b2', '56027e4119ad3a5dc28b36cd'],
					attachments: [],
					subscribed: false,
					checklists: [
						{
							id: 'dbfb.99bd0ad37dabc.e05046f0c824d.18f26bb524c96.78bebc8488634.240c0ee6a5e45.4cb872965',
							name: 'Pages',
							checkItems: [
								{
									id: 1,
									name: 'Login',
									checked: true
								},
								{
									id: 2,
									name: 'Register',
									checked: true
								},
								{
									id: 3,
									name: 'Lost Password',
									checked: false
								},
								{
									id: 4,
									name: 'Recover Password',
									checked: false
								},
								{
									id: 5,
									name: 'Activate Account',
									checked: false
								}
							]
						}
					],
					activities: [],
					due: null
				},
				{
					id: '4',
					name: 'Fix the console',
					description: 'We need to fix the console asap!',
					idAttachmentCover: '',
					idMembers: [],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['26022e4129ad3a5sc28b36cd'],
					attachments: [],
					subscribed: true,
					checklists: [],
					activities: [
						{
							id: 1,
							type: 'comment',
							idMember: '36027j1930450d8bf7b10158',
							message: "I'm on it!",
							time: getUnixTime(sub(new Date(), { minutes: 10 }))
						}
					],
					due: getUnixTime(add(new Date(), { days: 10 }))
				},
				{
					id: '8',
					name: 'New media player',
					date:[],
					description: '',
					idAttachmentCover: '',
					idMembers: ['76027g1930450d8bf7b10958', '56027c1930450d8bf7b10758', '26027s1930450d8bf7b10828'],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['5640635e19ad3a5dc21416b2', '6540635g19ad3s5dc31412b2'],
					attachments: [],
					subscribed: false,
					checklists: [],
					activities: [],
					due: null
				},
				{
					id: '12',
					name: 'Memory Leak',
					description: '',
					idAttachmentCover: '',
					idMembers: ['36027j1930450d8bf7b10158'],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['26022e4129ad3a5sc28b36cd', '5640635e19ad3a5dc21416b2'],
					attachments: [],
					subscribed: false,
					checklists: [],
					activities: [],
					due: null,
					lineid: 'efaffeaf'
				},
				{
					id: '13',
					name: 'Broken toolbar on profile page',
					description: '',
					idAttachmentCover: '',
					idMembers: ['26027s1930450d8bf7b10828'],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['26022e4129ad3a5sc28b36cd'],
					attachments: [],
					subscribed: false,
					checklists: [],
					activities: [
						{
							id: 1,
							type: 'comment',
							idMember: '36027j1930450d8bf7b10158',
							message: "This should be a medium priority bug, shouldn't it?",
							time: getUnixTime(sub(new Date(), { minutes: 1 }))
						}
					],
					due: null
				},
				{
					id: '14',
					name: 'Button hover style',
					description:
						'If there are 3 or more buttons in certain page, weird flashing happens when you hover over the red ones.',
					idAttachmentCover: '',
					idMembers: ['26027s1930450d8bf7b10828'],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['26022e4129ad3a5sc28b36cd', '5640635e19ad3a5dc21416b2'],
					attachments: [],
					subscribed: true,
					checklists: [],
					activities: [],
					due: getUnixTime(add(new Date(), { days: 3 })),
					lineid: 'efaffeaf'
				},
				{
					id: '9',
					name: 'New header designs',
					description: '',
					idAttachmentCover: '12027cafbe3b52ecf2ef632c',
					idMembers: [],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['56027e4119ad3a5dc28b36cd', '6540635g19ad3s5dc31412b2', '5640635e19ad3a5dc21416b2'],
					attachments: [
						{
							id: '12027cafbe3b52ecf2ef632c',
							name: 'header-.jpg',
							src: 'assets/images/scrumboard/header-1.jpg',
							time: getUnixTime(sub(new Date(), { days: 10 })),
							type: 'image'
						},
						{
							id: '55027ced1e1a12ecf1fced2a',
							name: 'header-2.jpg',
							src: 'assets/images/scrumboard/header-2.jpg',
							time: getUnixTime(sub(new Date(), { days: 20 })),
							type: 'image'
						}
					],
					subscribed: false,
					checklists: [],
					activities: [
						{
							id: 1,
							type: 'comment',
							idMember: '36027j1930450d8bf7b10158',
							message: 'Currently we have two new designs ready to ship.',
							time: getUnixTime(sub(new Date(), { minutes: 1 }))
						}
					],
					due: null
				},
				{
					id: '10',
					name: 'Fixed footer',
					description: '',
					idAttachmentCover: '',
					idMembers: ['26027s1930450d8bf7b10828', '56027c1930450d8bf7b10758'],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['6540635g19ad3s5dc31412b2'],
					attachments: [],
					subscribed: true,
					checklists: [],
					activities: [],
					due: null,
					lineid: 'efaffeaf'
				},
				{
					id: '11',
					name: 'Collapsable navigation',
					description: '',
					idAttachmentCover: '',
					idMembers: [],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['6540635g19ad3s5dc31412b2'],
					attachments: [],
					subscribed: false,
					checklists: [],
					activities: [
						{
							id: 1,
							type: 'comment',
							idMember: '36027j1930450d8bf7b10158',
							message:
								"I'm not sure why we re-doing the navigation. The current collapsable navigation works flawlessly.",
							time: getUnixTime(new Date())
						}
					],
					due: null
				},
				{
					id: '2',
					name: 'Mail app new layout',
					description: 'Current layout has lots of flaws in mobile. Outlook view should help with that.',
					idAttachmentCover: '',
					idMembers: [
						'56027c1930450d8bf7b10758',
						'26027s1930450d8bf7b10828',
						'76027g1930450d8bf7b10958',
						'36027j1930450d8bf7b10158'
					],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['56027e4119ad3a5dc28b36cd', '26022e4129ad3a5sc28b36cd'],
					attachments: [],
					subscribed: false,
					checklists: [],
					activities: [],
					due: null,
					lineid: 'efaffeaf'
				},
				{
					id: '6',
					name: 'API recover and monitoring',
					description: 'We need a service to monitor and recover failed APIs.',
					idAttachmentCover: '',
					idMembers: ['36027j1930450d8bf7b10158', '76027g1930450d8bf7b10958'],
					idMembers2: [],
					idMembers3: [],
					idLabels: ['26022e4129ad3a5sc28b36cd', '5640635e19ad3a5dc21416b2'],
					attachments: [],
					subscribed: true,
					checklists: [
						{
							id: '6926.2b31d119e4a.889401e0ca7a0.13ad8ce2e569d.976e54e8b5d87.456afccd7e820.d6c77106a',
							name: 'API Monitoring',
							checkItems: [
								{
									id: 1,
									name: 'Simple dashboard design',
									checked: false
								},
								{
									id: 2,
									name: 'Should be able to see different time periods on the same dashboard',
									checked: true
								},
								{
									id: 3,
									name: 'Different colors for different clusters',
									checked: true
								}
							]
						},
						{
							id: '7c22.5261c7924387f.248e8b1d32205.003f7a9f501d1.1d48dcdbe8b23.8099dcc5f75a7.29a966196',
							name: 'API Recovery',
							checkItems: [
								{
									id: 1,
									name: 'Warning notifications to all developers',
									checked: false
								},
								{
									id: 2,
									name: 'Immediate recovery options attached to the notifications',
									checked: true
								},
								{
									id: 3,
									name: 'Backups every 6hours',
									checked: false
								}
							]
						}
					],
					activities: [],
					due: getUnixTime(sub(new Date(), { days: 12 })),
					lineid: 'efaffeaf'
				}
			],
			members: [
				{
					id: '56027c1930450d8bf7b10758',
					name: 'Alice Freeman',
					avatar: 'assets/images/avatars/alice.jpg'
				},
				{
					id: '26027s1930450d8bf7b10828',
					name: 'Danielle Obrien',
					avatar: 'assets/images/avatars/danielle.jpg'
				},
				{
					id: '76027g1930450d8bf7b10958',
					name: 'James Lewis',
					avatar: 'assets/images/avatars/james.jpg'
				},
				{
					id: '36027j1930450d8bf7b10158',
					name: 'John Doe',
					avatar: 'assets/images/avatars/Velazquez.jpg'
				}
			],
			labels: [
				{
					id: '26022e4129ad3a5sc28b36cd',
					name: 'High Priority',
					class: 'bg-red text-white'
				},
				{
					id: '56027e4119ad3a5dc28b36cd',
					name: 'Design',
					class: 'bg-orange text-white'
				},
				{
					id: '5640635e19ad3a5dc21416b2',
					name: 'App',
					class: 'bg-blue text-white'
				},
				{
					id: '6540635g19ad3s5dc31412b2',
					name: 'Feature',
					class: 'bg-green text-white'
				}
			]
		},
	],
	date: [
			{
				id:'11',
					title:'山田　太郎',
					start :	'T2021-06-02T07:04:00.000Z',
					end: '2021-06-3T07:04:00.000Z'
			},
			{
				id:'13',
					title:'八郎　太郎',
					start :	'2021-06-01T07:04:53.302Z"',
					end: '2021-06-02T07:04:00.000Z'
			},
			{
				id: "000e87e7",
				title: "Change background colors",
				start: "2021-06-04T07:04:53.302Z",
				end: "2021-06-11T07:04:00.000Z"
			},
			{
				id: "d446fbe0",
				title: "山田　八郎",
				start: "2021-06-01T07:20:00.000Z",
				end: "2021-06-02T07:20:00.000Z"
			}
	]
};

mock.onGet('/api/scrumboard-app/boards').reply(() => {
	const response = _.map(scrumboardDB.boards, board => _.pick(board, ['id', 'name', 'uri']));
	return [200, response];
});

mock.onPost('/api/scrumboard-app/board/new').reply(request => {
	const { board } = JSON.parse(request.data);
	scrumboardDB.boards = [...scrumboardDB.boards, board];
	return [200, _.pick(board, ['id', 'name', 'uri'])];
});

mock.onPost('/api/scrumboard-app/board/rename').reply(request => {
	const { boardId, boardTitle } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	_.set(board, 'name', boardTitle);

	return [200, boardTitle];
});

mock.onGet('/api/scrumboard-app/board').reply(config => {
	const { boardId } = config.params;
	const response = _.find(scrumboardDB.boards, { id: boardId });
	if (response) {
		return [200, response];
	}
	return [404, 'Requested board do not exist.'];
});

mock.onPost('/api/scrumboard-app/board/settings/update').reply(request => {
	const { boardId, settings } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	_.set(board, 'settings', settings);

	return [200, settings];
});

mock.onPost('/api/scrumboard-app/board/delete').reply(request => {
	const { boardId } = JSON.parse(request.data);
	scrumboardDB.boards = _.reject(scrumboardDB.boards, { id: boardId });
	return [200, true];
});

mock.onPost('/api/scrumboard-app/card/new').reply(request => {
	const { boardId, listId, data } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });

	_.assign(board, {
		cards: [...board.cards, data],
		lists: _.map(board.lists, _list => {
			if (_list.id === listId) {
				_.assign(_list, { idCards: [..._list.idCards, data.id] });
			}
			return _list;
		})
	});

	return [200, board];
});

///
mock.onPost('/api/scrumboard-app/date/new').reply(request => {
	const { boardId, cardId, data } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	const date = scrumboardDB.date
	
	_.assign(scrumboardDB, { date: [...date, data]})
	_.assign(board, {
		cards: _.map(board.cards, _card => {
			if (_card.id === cardId ) {
				_.assign(_card, { date: [..._card.date, data.id] });
			}
			return _card;
		})
	});
	
	console.log(date,"564")
	return [200, board, scrumboardDB];
});

mock.onPost('/api/scrumboard-app/list/new').reply(request => {
	const { boardId, data } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	const lists = [...board.lists, data];

	_.assign(board, { lists });

	return [200, lists];
});

mock.onPost('/api/scrumboard-app/list/rename').reply(request => {
	const { boardId, listId, listTitle, boardColor } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	const list = _.find(board.lists, { id: listId });
	_.assign(list, { name: listTitle, color: boardColor });

	return [200, { boardColor, listTitle, listId }];
});

mock.onPost('/api/scrumboard-app/list/remove').reply(request => {
	const { boardId, listId } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	_.set(board, 'lists', _.reject(board.lists, { id: listId }));
	return [200, listId];
});

mock.onPost('/api/scrumboard-app/card/update').reply(request => {
	const { boardId, card } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	const selectedCard = _.find(board.cards, { id: card.id });
	_.assign(selectedCard, card);
	return [200, card];
});

mock.onPost('/api/scrumboard-app/card/remove').reply(request => {
	const { boardId, cardId } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	_.assign(board, {
		cards: _.reject(board.cards, { id: cardId }),
		lists: board.lists.map(list => {
			_.set(
				list,
				'idCards',
				_.reject(list.idCards, id => id === cardId)
			);
			return list;
		})
	});
	return [200, cardId];
});

mock.onPost('/api/scrumboard-app/card/order').reply(request => {
	const { boardId, lists } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	_.assign(board, { lists });
	return [200, lists];
});

mock.onPost('/api/scrumboard-app/list/order').reply(request => {
	const { boardId, lists } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	_.assign(board, { lists });
	return [200, lists];
});

mock.onPost('/api/scrumboard-app/card/remove/attachment').reply(request => {
	const { boardId, cardId, attachmenID, card } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	const selectedCard = _.find(board.cards, { id: cardId });
	_.set(selectedCard, 'attachments', _.reject(selectedCard.attachments, { id: attachmenID }),
	);
	return [200, selectedCard];
});

mock.onGet('/api/calendar-app/events').reply(config => {
	
	return [200, scrumboardDB.date];
});

mock.onPost('/api/scrumboard-app/list/renameStatus').reply(request => {
	const { boardId, listId, cardId, listStatus } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	const list = _.find(board.lists, { id: listId });
	_.assign(board, {
		lists: board.lists.map(list => {
			_.set(
				list,
				'idCards',
				_.reject(list.idCards, id => id === cardId)
			);
			if (list.name === listStatus) {
				_.assign(list, { idCards: [...list.idCards, cardId] });
			}
			return list;
		})
	});
	return [200, board];
});
