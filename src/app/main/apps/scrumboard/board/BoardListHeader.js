import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { removeList, renameList } from '../store/boardSlice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { spacing } from '@material-ui/system';
import { borders } from '@material-ui/system';


/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	title: yup.string().required('You must enter a title')
});

function BoardListHeader(props) {
	const dispatch = useDispatch();
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);

	const [anchorEl, setAnchorEl] = useState(null);
	const [formOpen, setFormOpen] = useState(false);

	//color選択
	const [color, setColor] = useState(props.list.color);
	const [afColor, setAfColor] = useState(props.list.color);
	// Dialog表示•••••••••••••
	const [open, setOpen] = useState(false);

	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			title: props.list.name
		},
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	const handleClickOpen = (ev) => {
		ev.stopPropagation();
		handleMenuClose()
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (!open) {
			reset({
				title: props.list.name
			});
			setColor(afColor)
		}
		
	}, [open, reset, props.list.name]);

	useEffect(() => {
		if (open && anchorEl) {
			setAnchorEl(null);
		}
	}, [anchorEl, open]);
	
	
	function handleMenuClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	function handleOpenForm(ev) {
		ev.stopPropagation();
		setFormOpen(true);
	}

	function handleCloseForm() {
		setFormOpen(false);
	}

	function onSubmit(data) {
		setAfColor(color)
		dispatch(renameList({ boardId: board.id, listId: props.list.id, listTitle: data.title, boardColor: color}));
		handleClose();
	}

	
	return (
		<div {...props.handleProps}>
			<div className="flex items-center justify-between h-48 sm:h-64 px-8">
				<div className="flex items-center min-w-0 px-12">
					{/*formOpen ? (
						<ClickAwayListener onClickAway={handleCloseForm}>
							<form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
								<Controller
									name="title"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											variant="outlined"
											margin="none"
											autoFocus
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															type="submit"
															disabled={_.isEmpty(dirtyFields) || !isValid}
														>
															<Icon>check</Icon>
														</IconButton>
													</InputAdornment>
												)
											}}
										/>
									)}
								/>
							</form>
						</ClickAwayListener>
										) : ()*/}
						<Typography type='title' className="text-8 font-medium cursor-pointer "  style={{ padding: 7.5, borderRadius:5, color: '#fff',backgroundColor: afColor}}>
							<pre>{props.list.name} | {props.list.idCards.length}</pre>
						</Typography>
						
					
				</div>
				<div className="">
					<IconButton
						aria-owns={anchorEl ? 'actions-menu' : null}
						aria-haspopup="true"
						onClick={handleMenuClick}
						variant="outlined"
						size="small"
					>
						<Icon className="text-20">more_vert</Icon>
					</IconButton>
					<Menu id="actions-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
						<MenuItem
							onClick={() => {
								dispatch(removeList({ boardId: board.id, listId: props.list.id }));
							}}
						>
							<ListItemIcon className="min-w-40">
								<Icon>delete</Icon>
							</ListItemIcon>
							<ListItemText primary="ボートリスト削除" />
						</MenuItem>
						<MenuItem onClick={handleClickOpen}>
							<ListItemIcon className="min-w-40">
								<Icon>edit</Icon>
							</ListItemIcon>
							<ListItemText primary="ボードリスト編集" />
						</MenuItem>
					</Menu>
				</div>
			</div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">リストを編集</DialogTitle>
				<DialogContent>
					<DialogContentText>タイトルとカラーを編集してください</DialogContentText>
					<Controller
						name="title"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mb-16"
								required
								style={{ color: '#fff', backgroundColor: color}}
								fullWidth
								variant="filled"
								label="List title"
								autoFocus
							/>
							
						)}
					/>
					{/*button add*/}
					
					<div className="flex justify-between items-center">
						<IconButton
							aria-label="Example"
							style={{ backgroundColor: '#ff2b00' }}
							onClick={() => {
								setColor('#ff2b00');
							}}
						></IconButton>
						<IconButton
							aria-label="Example"
							style={{ backgroundColor: '#ffa500' }}
							onClick={() => {
								setColor('#ffa500');
							}}
						></IconButton>
						<IconButton
							aria-label="Example"
							style={{ backgroundColor: '#228b22' }}
							onClick={() => {
								setColor('#228b22');
							}}
						></IconButton>
						<IconButton
							aria-label="Example"
							style={{ backgroundColor: '#4169e1' }}
							onClick={() => {
								setColor('#4169e1');
							}}
						></IconButton>
						<IconButton
							aria-label="Example"
							style={{ backgroundColor: '#ff00ff' }}
							onClick={() => {
								setColor('#ff00ff');
							}}
						></IconButton>
						<IconButton
							aria-label="Example"
							style={{ backgroundColor: '#6a5acd' }}
							onClick={() => {
								setColor('#6a5acd');
							}}
						></IconButton>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button
						variant="contained"
						color="secondary"
						type="submit"
						onClick={handleSubmit(onSubmit)}
					>
						編集
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default BoardListHeader;
