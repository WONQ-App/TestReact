import {React, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import DueMenu from './DueMenu';
import { Controller, useForm } from 'react-hook-form';
import { newDate } from 'app/main/apps/scrumboard/store/boardSlice';
import { useDispatch, useSelector } from 'react-redux';

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5'
	}
})(props => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center'
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center'
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles(theme => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.common.white,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white
			}
		}
	}
}))(MenuItem);

export default function DateSelector(props) {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const [startValue, setStartValue] = useState(new Date())
	const [finValue, setFinValue] = useState(new Date())
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function onSubmit() {
		console.log(startValue.toString())
		dispatch(newDate({ boardId: props.board.id, cardId: props.card.id, title: props.card.name, start:startValue.toISOString(), end:finValue.toISOString() }));
	}
	return (
		<div>
			<Button
				aria-controls="customized-menu"
				aria-haspopup="true"
				variant="contained"
				color="secondary"
				onClick={handleClick}
			>
				スケジュール
			</Button>
			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledMenuItem>	
					<DueMenu label='開始' value={startValue} set={setStartValue}/>
				</StyledMenuItem>
				<StyledMenuItem>
					<DueMenu label='終了'value={finValue} set={setFinValue} />
				</StyledMenuItem>
				<StyledMenuItem onClick={() => onSubmit()}>
					<ListItemText primary="スケジュール追加" />
				</StyledMenuItem>
			</StyledMenu>
		</div>
	);
}
