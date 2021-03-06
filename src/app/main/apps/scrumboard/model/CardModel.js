import FuseUtils from '@fuse/utils';
import _ from '@lodash';

function CardModel(data) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		name: '',
		date:[],
		description: '',
		idAttachmentCover: '',
		idMembers: [],
		idMembers2: [],
		idMembers3: [],
		idLabels: [],
		attachments: [],
		subscribed: true,
		checklists: [],
		checkItems: 0,
		checkItemsChecked: 0,
		log: [],
		memo: [],
		comments: [],
		activities: [],
		due: '',
		lineid: '',
		seikan: '',
		meikan: '',
		seikana: '',
		meikana: '',
		seibetsu: '',
		birthday: '',
		number: '',
		createday:[]


	});
}
export default CardModel;
