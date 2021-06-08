import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CommentModel from 'app/main/apps/scrumboard/model/CommentModel';
import MemoModel from 'app/main/apps/scrumboard/model/MemoModel';
import React, { useRef } from "react";
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	message: yup.string().required('You must enter a comment')
});

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #ffd700',
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));


const StyledMenuItem = withStyles((theme) => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

function CardComment(props) {
	const defaultValues = {
		idMember: '36027j1930450d8bf7b10158',
		message: '',
		attachments: []
	};
	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	const user = _.find(props.members, { id: defaultValues.idMember });

	const [files, setFiles] = useState();
	const [selectFile, setSelectFile] = useState(false);
	const inputRef = useRef(null);


	function onSubmit(data) {
		if (props.type == 'comment') {
			props.onCommentAdd(CommentModel({ ...defaultValues, ...data }));
			console.log(props.type)
			reset(defaultValues);
			return;
		}
		if (props.type == 'log') {
			console.log(props.type)
			props.onCommentAdd(MemoModel({ ...defaultValues, ...data }));
			reset(defaultValues);
			return;
		}
	}

	function previewFile(file) {
		// プレビュー画像を追加する要素
		const preview = document.getElementById('preview');

		// FileReaderオブジェクトを作成
		const reader = new FileReader();

		// ファイルが読み込まれたときに実行する
		reader.onload = function (e) {
			const imageUrl = e.target.result; // 画像のURLはevent.target.resultで呼び出せる
			const img = document.createElement("img"); // img要素を作成
			img.src = imageUrl; // 画像のURLをimg要素にセット
			preview.appendChild(img); // #previewの中に追加
		}

		// いざファイルを読み込む
		reader.readAsDataURL(file);
	}


	const onFileInputChange = (event) => {

		console.log("onChange!");
		setFiles(event.target.files[0]);
		console.log(event.target.files[0])
		setSelectFile(true)

		// console.log(files.name)
	};
	const fileUpload = () => {
		console.log(inputRef.current);
		inputRef.current.click();
	};

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const deleteFile = () => {
		setFiles()
		setSelectFile(false)
	}

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', files);

		fetch(
			'assets/images',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return (
		<>
			{props.type == 'log' ? (
				<form onSubmit={handleSubmit(onSubmit)} className="flex -mx-8">
					<div className="flex flex-col items-start flex-1 mx-8">
						<Controller
							name="message"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="flex flex-1"
									fullWidth
									error={!!errors.message}
									helperText={errors?.message?.message}
									label="Multiline"
									multiline
									row={5}
									variant="outlined"
									label="メモ"
									placeholder="メモを入力"
								/>
							)}
						/>
						<div className="w-full flex justify-between">
							<div>
								<Button
									className="mt-16"
									aria-label="save"
									variant="contained"
									color="secondary"
									type="submit"
									size="small"
									disabled={_.isEmpty(dirtyFields) || !isValid}
								>
									送信
								</Button>
							</div>

							{selectFile ? (
								<div>
									<Button
										//aria-controls="customized-menu"
										//aria-haspopup="true"
										//variant="contained"
										//color="primary"
										size='small'
										color="primary"
										style={{ fontSize: '3px' }}
										onClick={handleClick}
									>
										{files.name}
									</Button>
									<StyledMenu
										id="customized-menu"
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}
										onClose={handleClose}
									>
										<StyledMenuItem type='sumbit' onClick={() => deleteFile(files)}>
											<ListItemIcon>
												<SendIcon fontSize="small" />
											</ListItemIcon>
											<ListItemText primary="remove" />
										</StyledMenuItem>
										<StyledMenuItem type='sumbit' onClick={() => previewFile(files)}>
											<ListItemIcon>
												<DraftsIcon fontSize="small" />
											</ListItemIcon>
											<ListItemText primary="send" />
										</StyledMenuItem>
									</StyledMenu>
									<div id="preview"></div>
								</div>
							) : (
								<div>
									<Controller
										name="attachments"
										control={control}
										type="file"
										defaultValue={[]}
										render={({ field: { onChange, value } }) => (
											<>
												<Button size="small" color="inherit" onClick={fileUpload}>
													<Icon fontSize="small">attachment</Icon>

									ファイルを追加
									</Button>
												<input
													hidden
													ref={inputRef}
													type="file"
													//multiple
													onChange={onFileInputChange}
												/>


											</>
										)}
									/>
								</div>
							)}
						</div>

					</div>
				</form>
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className="flex -mx-8">
					<Avatar className="w-32 h-32 mx-8" alt={user.name} src={user.avatar} />
					<div className="flex flex-col items-start flex-1 mx-8">
						<Controller
							name="message"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="flex flex-1"
									fullWidth
									error={!!errors.message}
									helperText={errors?.message?.message}
									label="Multiline"
									multiline
									row={5}
									variant="outlined"
									label="コメント"
									placeholder="コメントを入力"
								/>
							)}
						/>

						<Button
							className="mt-16"
							aria-label="save"
							variant="contained"
							color="secondary"
							type="submit"
							size="small"
							disabled={_.isEmpty(dirtyFields) || !isValid}
						>
							送信
						</Button>
					</div>
				</form>
			)

			}
		</>
	)
}

export default CardComment;
