import { useDebounce } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { closeCardDialog, removeCard, updateCard, removeAttachment } from '../../../../store/cardSlice';
import { useState } from 'react';
import { useEffect } from 'react';

function CardAttachment(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const dispatch = useDispatch();
	const card = useSelector(({ scrumboardApp }) => scrumboardApp.card.data);
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
	const { register, watch, control, setValue } = useForm({ mode: 'onChange', defaultValues: card });
	const cardForm = watch();


	const updateCardData = useDebounce((boardId, newCard) => {
		dispatch(updateCard({ boardId, card: { ...newCard } }));
	}, 600);

	useEffect(() => {
		if (!card) {
			return;
		}

		const newCard = { ...card, ...cardForm };
		console.log(newCard.attachments)
		console.log(card.attachments, 'w')
		if (!_.isEqual(newCard.attachments, card.attachments)) {
			console.log(newCard)
			console.log(card)
			newCard.attachments = card.attachments
			// updateCardData(board.id, card);
		}
	}, [board.id, card, cardForm, updateCardData]);


	function handleMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	switch (props.item.type) {
		case 'image': {
			return (
				<div className="flex w-full" key={props.item.id}>
					{/* <div className="flex items-center justify-center min-w-128 w-128 h-128">
						<Paper className="overflow-hidden shadow">
							<img className="block max-h-full max-h-full" src={props.item.src} alt="attachment" />
						</Paper>
					</div> */}

					<Button
						aria-owns={anchorEl ? 'actions-menu' : null}
						aria-haspopup="true"
						onClick={
							handleMenuOpen

						}
						size="small"
					>
						<Icon className="text-8">insert_drive_file</Icon>
						<div className="flex flex-auto flex-col justify-center items-start min-w-0 px-16">
							<div className="flex items-center w-full">
								<Typography className="text-8 truncate flex-shrink">
									{props.item.name}
								</Typography>
							</div>

						</div>
						<Icon className="text-8">arrow_drop_down</Icon>
					</Button>
					<Menu id="actions-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>

						<MenuItem
							onClick={() => {
								handleMenuClose();

								let link = document.createElement('a')
								link.href = props.item.src
								link.download = props.item.name
								link.click()
							}}
						>
							ダウンロード
								</MenuItem>
						{/* <MenuItem
							onClick={() => {
								handleMenuClose();
								dispatch(removeAttachment({ boardId: board.id, cardId: cardForm.id, attachmenID: props.item.id, card: cardForm}))
								props.set
								// cardForm.attachments.splice(props.index,1)
							}}
						>
							Remove Attachment
							</MenuItem> */}
					</Menu>
				</div>
			);
		}
		case 'link': {
			return (
				<div className="flex w-full sm:w-1/2 mb-16 px-16" key={props.item.id}>
					<Paper className="min-w-128 w-128 h-128 flex items-center justify-center rounded-4 overflow-hidden shadow">
						<Typography className="font-semibold">LINK</Typography>
					</Paper>
					<div className="flex flex-auto flex-col justify-center items-start min-w-0 px-16">
						<Typography className="text-16 font-semibold truncate w-full">{props.item.url}</Typography>
						<Typography className="truncate w-full mb-12" color="textSecondary">
							{props.item.time}
						</Typography>
						<Button
							onClick={() => {
								handleMenuClose();

								let link = document.createElement('a')
								link.href = props.item.src
								link.download = props.item.name
								link.click()
							}}
						>
							Actions
							<Icon className="text-20">arrow_drop_down</Icon>
						</Button>
						<Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
							<MenuItem
								onClick={() => {
									handleMenuClose();

									let link = document.createElement('a')
									link.href = props.item.src
									link.download = props.item.name
									link.click()
								}}
							>
								ダウンロード
								</MenuItem>
							<MenuItem
								onClick={() => {
									handleMenuClose();
									//props.removeAttachment(props.item.id);

								}}
							>
								Remove Attachment
							</MenuItem>
						</Menu>
					</div>
				</div>
			);
		}
		default: {
			return null;
		}
	}
}

export default CardAttachment;
