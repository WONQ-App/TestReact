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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
				<DialogTitle id="form-dialog-title">カードを追加する</DialogTitle>
				<DialogContent>
					<DialogContentText>タイトルとカラーを選択してください</DialogContentText>
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
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleSubmit(onSubmit)}
					>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default BoardAddList;
