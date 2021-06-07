import { useDebounce } from '@fuse/hooks';
import _ from '@lodash';
import { DateTimePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import { Autocomplete } from '@material-ui/lab';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import format from 'date-fns/format';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCardDialog, removeCard, updateCard } from '../../../store/cardSlice';
import CardActivity from './activity/CardActivity';
import Hidden from '@material-ui/core/Hidden';
import NavbarToggleButton from 'app/fuse-layouts/shared-components/NavbarToggleButton';
import CardAttachment from './attachment/CardAttachment';
import CardChecklist from './checklist/CardChecklist';
import CardComment from './comment/CardComment';
import CheckListMenu from './toolbar/CheckListMenu';
import DueMenu from './toolbar/DueMenu';
import LabelsMenu from './toolbar/LabelsMenu';
import MembersMenu from './toolbar/MembersMenu';
import Select from '@material-ui/core/Select';
import OptionsMenu from './toolbar/OptionsMenu';
import CenteredTabs from './CenteredTabs';
import DateSelector from './toolbar/DateSelector';
import Divider from '@material-ui/core/Divider';
import { renameStatus } from '../../../store/boardSlice';

function BoardCardForm(props) {
	const dispatch = useDispatch();
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const navbar = useSelector(({ fuse }) => fuse.navbar);
	const card = useSelector(({ scrumboardApp }) => scrumboardApp.card.data);
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
	const { register, watch, control, setValue } = useForm({ mode: 'onChange', defaultValues: card });
	const cardForm = watch();

	const updateCardData = useDebounce((boardId, newCard) => {
		dispatch(updateCard({ boardId, card: { ...newCard } }));
	}, 600);


	const list = card ? _.find(board.lists, _list => _list.idCards.includes(card.id)) : null;
	const [status, setStatus] = card ? useState(list.name) : useState();
	useEffect(() => {
		if (!card) {
			return;
		}
		const newCard = { ...card, ...cardForm };
		if (!_.isEqual(newCard.attachments, card.attachments)) {
			console.log(newCard)
			console.log(card)
			newCard.attachments = card.attachments
			// updateCardData(board.id, card);
			return;
		}

		if (!_.isEqual(newCard.memo, card.memo)) {
			console.log(newCard)
			console.log(card)
			newCard.memo = card.memo
			// updateCardData(board.id, card);
			return;
		}

		console.log(newCard.memo)
		console.log(card.memo)
		console.log(newCard.idMembers3)
		console.log(card.idMembers3)
		if (!_.isEqual(newCard.idMembers, card.idMembers) || !_.isEqual(newCard.idMembers2, card.idMembers2) || !_.isEqual(newCard.idMembers3, card.idMembers3) || !_.isEqual(newCard.idLabels, card.idLabels) || !_.isEqual(newCard.activities, card.activities)) {
			updateCardData(board.id, newCard);
			console.log('up')
		}
	}, [board.id, card, cardForm, updateCardData]);

	const handleChange = (event) => {
		setStatus(event.target.value);
		dispatch(renameStatus({ boardId: board.id, listId: list.id, cardId: card.id, listStatus: event.target.value}));
	};

	useEffect(() => {
		register('idAttachmentCover');
	}, [register]);

	if (!card) {
		return null;
	}

	return (
		<>
			<div className="sticky top-0 z-99">
				<DialogTitle component="div" className="p-0">
					<AppBar position="static" elevation={0}>
						<Toolbar className="flex w-full overflow-x-auto px-8 sm:px-16">
							<div className="flex flex-1">
								<DateSelector card={cardForm} board={board} />
										<Select { ...status }
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={status}
											onChange={handleChange}
										>
											{board.lists.map((list) => (
											<option value={list.name}>{list.name}</option>
											))}
										</Select>
								
								<OptionsMenu
									onRemoveCard={() => dispatch(removeCard({ boardId: board.id, cardId: cardForm.id }))}
								/>
							</div>
							<IconButton color="inherit" onClick={ev => dispatch(closeCardDialog())}>
								<Icon>close</Icon>
							</IconButton>
						</Toolbar>
					</AppBar>
				</DialogTitle>
				<Grid container spacing={0}>
					<Grid item xs={5}>
						<CenteredTabs />
						<Divider orientation="vertical" />
					</Grid>

					<Grid item xs={7} style={{ border: '1px solid rgba(0, 0, 0, 0.05)' }}>
						{/* <DialogContent className="p-16 sm:p-24"> */}
						<div className="flex flex-col sm:flex-row -mx-8">
							<div className="flex-1 mb-0 mx-8">
								<Autocomplete
									className="mt-8 mb-16"
									multiple
									freeSolo
									options={board.labels}
									getOptionLabel={label => {
										return label.name;
									}}
									value={cardForm.idLabels.map(id => _.find(board.labels, { id }))}
									onChange={(event, newValue) => {
										const last = newValue.slice(-1)[0];
										console.log(typeof (last))
										{
											typeof (last) != "string" ? (
												setValue(
													'idLabels',
													newValue.map(item => item.id)
												)
											) : (
												newValue.pop()
											)
										};
									}}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => {
											return (
												<Chip
													label={option.name}
													{...getTagProps({ index })}
													className={clsx('m-3', option.class)}
												/>
											);
										})
									}
									renderInput={params => (
										<TextField
											{...params}
											placeholder="＋ラベルを追加"
											color="#63BFE0"
											InputLabelProps={{
												shrink: true
											}}

										/>
									)}
								/>
							</div>

						</div>
						{/* メンバー設定 */}
						<div className="flex flex-col -mx-8">
							<div className="flex-1 mb-0 mt-0 mx-24 mx-8">
								<Autocomplete
									className="mt-8 mb-16"
									multiple
									freeSolo
									options={board.members}
									getOptionLabel={member => {
										return member.name;
									}}
									value={cardForm.idMembers.map(id => _.find(board.members, { id }))}
									onChange={(event, newValue) => {
										const last = newValue.slice(-1)[0];
										{
											typeof (last) != "string" ? (
												setValue(
													'idMembers',
													newValue.map(item => item.id)
												)
											) : (
												newValue.pop()
											)
										};
									}}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => {
											return (
												<Chip
													label={option.name}
													{...getTagProps({ index })}
													className={clsx('m-3', option.class)}
													avatar={
														<Tooltip title={option.name}>
															<Avatar src={option.avatar} />
														</Tooltip>
													}
												/>
											);
										})
									}
									renderInput={params => (
										<TextField
											{...params}
											placeholder="Select multiple Members"
											label="Members"
											variant="outlined"
											InputLabelProps={{
												shrink: true
											}}
										/>
									)}

								/>
							</div>



							<div className="flex-1 mb-0 mt-0 mx-24 mx-8">
								<Autocomplete
									className="mt-8 mb-16"
									multiple
									freeSolo
									options={board.members}
									getOptionLabel={member => {
										return member.name;
									}}
									value={cardForm.idMembers2.map(id => _.find(board.members, { id }))}
									onChange={(event, newValue) => {
										const last = newValue.slice(-1)[0];
										{
											typeof (last) != "string" ? (
												setValue(
													'idMembers2',
													newValue.map(item => item.id)
												)
											) : (
												newValue.pop()
											)
										};
									}}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => {
											return (
												<Chip
													label={option.name}
													{...getTagProps({ index })}
													className={clsx('m-3', option.class)}
													avatar={
														<Tooltip title={option.name}>
															<Avatar src={option.avatar} />
														</Tooltip>
													}
												/>
											);
										})
									}
									renderInput={params => (
										<TextField
											{...params}
											placeholder="Select multiple Members"
											label="Members2"
											variant="outlined"
											InputLabelProps={{
												shrink: true
											}}
										/>
									)}

								/>
							</div>


							<div className="flex-1 mb-0 mt-0 mx-24 mx-8">
								<Autocomplete
									className="mt-8 mb-16"
									multiple
									freeSolo
									options={board.members}
									getOptionLabel={member => {
										return member.name;
									}}
									value={cardForm.idMembers3.map(id => _.find(board.members, { id }))}
									onChange={(event, newValue) => {
										const last = newValue.slice(-1)[0];
										{
											typeof (last) != "string" ? (
												setValue(
													'idMembers3',
													newValue.map(item => item.id)
												)
											) : (
												newValue.pop()
											)
										};
									}}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => {
											return (
												<Chip
													label={option.name}
													{...getTagProps({ index })}
													className={clsx('m-3', option.class)}
													avatar={
														<Tooltip title={option.name}>
															<Avatar src={option.avatar} />
														</Tooltip>
													}
												/>
											);
										})
									}
									renderInput={params => (
										<TextField
											{...params}
											placeholder="Select multiple Members"
											label="Members3"
											variant="outlined"
											InputLabelProps={{
												shrink: true
											}}
										/>
									)}

								/>
							</div>
						</div>

						<div className="mb-24 mx-24">
							<div className="flex items-center mt-16 mb-12">
								<Icon className="text-20" color="inherit">
									comment
						</Icon>
								<Typography className="font-semibold text-16 mx-8">コメント</Typography>
							</div>
							<div>
								<CardComment
									members={board.members}
									type='comment'
									onCommentAdd={comment => setValue('activities', [comment, ...cardForm.activities])}
								/>
							</div>
						</div>

						<Controller
							name="activities"
							control={control}
							defaultValue={[]}
							render={({ field: { onChange, value } }) => (
								<div>
									{value.length > 0 && (
										<div className="mb-24 mx-24">
											<div className="flex items-center mt-16">
												<Icon className="text-20" color="inherit">
													list
												</Icon>
												<Typography className="font-semibold text-16 mx-8">活動</Typography>
											</div>
											<List className="">
												{value.map(item => (
													<CardActivity item={item} key={item.id} members={board.members} />
												))}
											</List>
										</div>
									)}
								</div>
							)}
						/>
						{/* </DialogContent> */}
					</Grid>
				</Grid>
			</div>
		</>

	);
}

export default BoardCardForm;
