import FuseUtils from '@fuse/utils';
import getUnixTime from 'date-fns/getUnixTime';
import _ from '@lodash';

function MemoModel(data) {
	data = data || {};

	return _.defaults(data, {
		id: FuseUtils.generateGUID(),
		type: 'memo',
		idMember: null,
		message: '',
		time: getUnixTime(new Date())
	});
}

export default MemoModel;
