import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
		backgroundColor: 'white',
		justifyContent: 'spaceBetween',
		color: 'black'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	}
}));
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	title: yup.string().required('You must enter a title')
});

function BoardListHeader(props) {
	const dispatch = useDispatch();
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
	const classes = useStyles();

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

	const handleClickOpen = ev => {
		ev.stopPropagation();
		handleMenuClose();
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
			setColor(afColor);
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
		setAfColor(color);
		dispatch(renameList({ boardId: board.id, listId: props.list.id, listTitle: data.title, boardColor: color }));
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
					<Typography
						type="title"
						className="text-8 font-medium cursor-pointer "
						style={{ padding: 7.5, borderRadius: 5, color: '#fff', backgroundColor: afColor }}
					>
						<pre>
							{props.list.name} | {props.list.idCards.length}
						</pre>
					</Typography>
				</div>
				<div className="">
					<IconButton
						aria-owns={anchorEl ? 'actions-menu' : null}
						aria-haspopup="true"
						onClick={handleClickOpen}
						variant="outlined"
						size="small"
					>
						<Icon className="text-20">more_vert</Icon>
					</IconButton>
				</div>
			</div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<Card  style={{ color: 'black', backgroundColor: '#fff',borderRadius: 1 }}>
					<CardActions className="flex justify-between">
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" color="inherit">
							<pre> ステータス編集</pre>
						</Typography>
						<Button autoFocus variant="contained" color="primary" 
						style={{ color: 'white', backgroundColor: '#89c3eb',borderRadius: 2 }}
						onClick={handleSubmit(onSubmit)}>
							保存
						</Button>
					</CardActions>
				</Card>
				<DialogContent className="mt-40">
					<Controller
						name="title"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mb-16"
								required
								style={{ color: '#fff', backgroundColor: color }}
								fullWidth
								//variant="filled"
								label="ステータス"
								autoFocus
							/>
						)}
					/>
					{/*button add*/}

					<div className="flex justify-between items-center  ">
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#ff6347' }}
							onClick={() => {
								setColor('#ff6347');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#c71585' }}
							onClick={() => {
								setColor('#c71585');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#9400d3' }}
							onClick={() => {
								setColor('#9400d3');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#19448e' }}
							onClick={() => {
								setColor('#19448e');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#4169e1' }}
							onClick={() => {
								setColor('#4169e1');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#507ea4' }}
							onClick={() => {
								setColor('#507ea4');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#89c3eb' }}
							onClick={() => {
								setColor('#89c3eb');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#33cc99' }}
							onClick={() => {
								setColor('#33cc99');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#33cc66' }}
							onClick={() => {
								setColor('#33cc66');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#33ff00' }}
							onClick={() => {
								setColor('#33ff00');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#ffcc00' }}
							onClick={() => {
								setColor('#ffcc00');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#ff9900' }}
							onClick={() => {
								setColor('#ff9900');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#ff0000' }}
							onClick={() => {
								setColor('#ff0000');
							}}
						></IconButton>
						<IconButton
							className="m-4"
							aria-label="Example"
							style={{ backgroundColor: '#666666' }}
							onClick={() => {
								setColor('#666666');
							}}
						></IconButton>
					</div>
					<IconButton
						edge="start"
						color="inherit"
						className="mt-10 mb-24"
						aria-label="close"
						onClick={() => {
							dispatch(removeList({ boardId: board.id, listId: props.list.id }));
						}}
					>
						<DeleteForeverSharpIcon />
					</IconButton>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default BoardListHeader;
