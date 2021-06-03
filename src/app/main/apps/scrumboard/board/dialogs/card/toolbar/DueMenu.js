import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import { DateTimePicker } from '@material-ui/pickers';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import { useState } from 'react';
import ToolbarMenu from './ToolbarMenu';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

function DueMenu(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const dueDate = props.due ? format(fromUnixTime(props.due), 'Pp') : format(new Date(), 'Pp');

	function handleMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	return (
		<div>
				<div className=" max-w-200 max-h-30">
							{/*onClick={ev => {
								props.onRemoveDue();
								handleMenuClose(ev);
							}    storeに保存した後に走らせるため残す*/ }
						
						<KeyboardDateTimePicker
							disableToolbar
							variant="inline"
							format="yyyy//MM/dd HH:mm"
							margin="normal"
							placeholder="Select date"
							className="w-full"
							id="date-picker-inline"
							label={props.label}
							value={props.value}
							onChange={(newValue) => {
								props.set(newValue)
							}}
							KeyboardButtonProps={{
								'aria-label': 'change date'
							}}
						/>
				</div>
		</div>
	);
}

export default DueMenu;
