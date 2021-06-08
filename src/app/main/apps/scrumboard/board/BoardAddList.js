import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { newList } from '../store/boardSlice';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardActions from '@material-ui/core/CardActions';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
	card: {
		backgroundColor: darken(theme.palette.background.paper, theme.palette.type === 'light' ? 0.02 : 0.25)
	}
}));

const defaultValues = {
	title: ''
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	title: yup.string().required('You must enter a title')
});

function BoardAddList(props) {
	const dispatch = useDispatch();
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);

	const classes = useStyles(props);
	const [formOpen, setFormOpen] = useState(false);
	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;
	//color選択
	const [color, setColor] = useState('#dcdcdc');
	// Dialog表示•••••••••••••
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (!open) {
			reset(defaultValues);
			setColor('#dcdcdc');
		}
	}, [open, reset, color]);

	function handleOpenForm(ev) {
		ev.stopPropagation();
		setFormOpen(true);
	}

	function handleCloseForm() {
		setFormOpen(false);
	}

	function onSubmit(data) {
		dispatch(newList({ boardId: board.id, listTitle: data.title, boardColor: color}));
		
		handleClose();
	}

	return (
		<div>
			<Card className={clsx(classes.card, 'w-320 mx-8 sm:mx-12 rounded-20 shadow')} square>
				{formOpen ? (
					<ClickAwayListener onClickAway={handleClose}>
						{/*<form className="p-16" onSubmit={handleSubmit(onSubmit)}>
							<Controller
								name="title"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-16"
										required
										fullWidth
										variant="filled"
										label="List title"
										autoFocus
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton onClick={handleClose}>
														<Icon className="text-18">close</Icon>
													</IconButton>
												</InputAdornment>
											)
										}}
									/>
								)}
							/>

							<div className="flex justify-between items-center">
								<Button
									variant="contained"
									color="secondary"
									type="submit"
									disabled={_.isEmpty(dirtyFields) || !isValid}
								>
									Add
								</Button>
							</div>
						</form>*/}
					</ClickAwayListener>
				) : (
					<Button
						onClick={handleClickOpen}
						classes={{
							root: 'font-medium w-full rounded-none h-64 px-16',
							label: 'justify-start'
						}}
					>
						<Icon className="text-32 text-red">add_circle</Icon>
						<span className="mx-8">Add a list</span>
					</Button>
				)}
			</Card>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<Card  style={{ color: 'black', backgroundColor: '#fff',borderRadius: 1 }}>
					<CardActions className="flex justify-between">
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" color="inherit">
							ステータス編集
						</Typography>
						<Button autoFocus variant="contained" color="primary" 
						style={{ color: 'white', backgroundColor: '#89c3eb',borderRadius: 2 }}
						disabled={_.isEmpty(dirtyFields) || !isValid}
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
								style={{ backgroundColor: color}}
								fullWidth
								variant="filled"
								label="List title"
								autoFocus
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={handleClose}>
												<Icon className="text-18">close</Icon>
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						)}
					/>
					{/*button add*/}
					<div className="flex justify-between items-center mb-20">
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
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default BoardAddList;
