import Dialog from '@material-ui/core/Dialog';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { closeCardDialog } from '../../../store/cardSlice';
import BoardCardForm from './BoardCardForm';
import Slide from '@material-ui/core/Slide';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { forwardRef, memo, useState } from 'react';


const Transition = forwardRef(function Transition(props, ref) {
	const theme = useTheme();
	return <Slide direction={theme.direction === 'ltr' ? 'left' : 'right'} ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	paper: {
		color: theme.palette.text.primary
	},
	dialogPaper: {
		position: 'fixed',
		width: 760,
		maxWidth: '180vw',
		backgroundColor: theme.palette.background.paper,
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		right: 0,
		margin: 0,
		zIndex: 1000,
		borderRadius: 0
	}
}));

function BoardCardDialog(props) {
	const dispatch = useDispatch();
	const cardDialogOpen = useSelector(({ scrumboardApp }) => scrumboardApp.card.dialogOpen);

	const classes = useStyles(props);

	return (
		<Dialog
		TransitionComponent={Transition}
		BackdropProps={{ invisible: true }}
		classes={{
			paper: clsx(classes.dialogPaper, 'shadow-lg')
		}}
			onClose={ev => dispatch(closeCardDialog())}
			open={cardDialogOpen}
		>
			<BoardCardForm />
		</Dialog>
	);
}

export default BoardCardDialog;
