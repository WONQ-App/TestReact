import _ from '@lodash';
import sub from 'date-fns/sub';
import getUnixTime from 'date-fns/getUnixTime';
import mock from '../mock';

const scrumboardDB = {
	lists: [
		{
			id: '56027cf5a2ca3839a5d36103',
			name: 'Design',
			idCards: [
				'5603a2a3cab0c8300f6096b3',
				'44d1.2b51ea6cc2b5d.21f4a3412e857.8ffa2d8b44ad9.ac87215ed53a1.67d4921ad8f8d.9f318bcb2'
			]
		},
		{
			id: '56127cf2a2ca3539g7d36103',
			name: 'Development',
			idCards: [
				'2837273da9b93dd84243s0f9',
				'5787b7e4740c57bf0dffd5b6',
				'5637273da9b93bb84743a0f9',
				'7987.9740ba532b0d4.f9d12243f7362.507c0738dc561.87fba0a03df6e.75e6508cacf10.7a9835b54'
			]
		},
		{
			id: 'faf244627326f1249525763d',
			name: 'Upcoming Features',
			idCards: [
				'd9005a4b89ed2aadca48a6ad',
				'f6b9d7a9247e5d794a081927',
				'80ed.24ad3b18e2668.f28fbbceeeff9.5a834620a42f1.5909be19a2bf2.6c4a54947ce2d.da356b0c1',
				'0ad2.7862f947bc456.f42b446df54cb.d1dd9e93601a1.9deb1406d1404.0b3c278fc7001.733341b42',
				'bad3.51be8ad33acaf.9540ecb37f7e8.6bee596cfe7d3.44c68bee289c4.b96ed0b9f0af7.e14846035'
			]
		},
		{
			id: 'ad7d.9fffac5dff412.c83bca6853767.8fd7549b2b1ca.ceda8a01774c4.a5cf3976e87e4.ce79eeeea',
			name: 'Known Bugs',
			idCards: [
				'acc6.9c673cd2f5e35.521e91d8d5991.4b2a95e0539d1.027930c0743c5.7ad1ea7bea476.e8fbe6347',
				'3279.3d69b40cc0b75.690252b6bea08.1e1789b0b7c2e.2f264b8661ce2.84d5f56910e23.429be5e8a',
				'ba01.8e1a43f92a03a.0022bd5cbb9ba.275c64d911d8c.880e0846a3966.f75ff43e53ad.48ad612e7'
			]
		}
	],
	cards: [
		{
			id: '2837273da9b93dd84243s0f9',
			name: 'Update generators',
			description: "Current generator doesn't support Node.js 6 and above.",
			idAttachmentCover: '',
			idMembers: ['26027s1930450d8bf7b10828'],
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
			due: null
		},
		{
			id: '5603a2a3cab0c8300f6096b3',
			name: 'Change background colors',
			description: '',
			idAttachmentCover: '67027cahbe3b52ecf2dc631c',
			idMembers: ['76027g1930450d8bf7b10958'],
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
		}
	]
}

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

mock.onPost('/api/scrumboard-app/list/new').reply(request => {
	const { boardId, data } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	const lists = [...board.lists, data];

	_.assign(board, { lists });

	return [200, lists];
});

mock.onPost('/api/scrumboard-app/list/rename').reply(request => {
	const { boardId, listId, listTitle } = JSON.parse(request.data);
	const board = _.find(scrumboardDB.boards, { id: boardId });
	const list = _.find(board.lists, { id: listId });
	_.assign(list, { name: listTitle });

	return [200, { listTitle, listId }];
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
