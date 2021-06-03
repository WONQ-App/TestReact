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
import React, { useRef } from "react";
import { render } from "react-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';


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

function AttachimentInput(props) {
  const dispatch = useDispatch();
  const card = useSelector(({ scrumboardApp }) => scrumboardApp.card.data);
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  const { register, watch, control, setValue } = useForm({ mode: 'onChange', defaultValues: card });
  const cardForm = watch();

  const [files, setFiles] = useState();
  const [selectFile, setSelectFile] = useState(false);
  const inputRef = useRef(null);

  const [attach, setAttach] = useState(card.attachments);

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

  const updateCardData = useDebounce((boardId, newCard) => {
    dispatch(updateCard({ boardId, card: { ...newCard } }));
  }, 600);

  useEffect(() => {
    if (!card) {
      return;
    }
    const newCard = { ...card, ...cardForm };
    if (!_.isEqual(newCard.attachments, card.attachments)) {
      setAttach(card.attachments)
      console.log('222')
      newCard.attachments = card.attachments
      return;
    }
    // if (!_.isEqual(newCard.attachments, card.attachments)) {
    //     updateCardData(board.id, newCard);
    // }
  }, [board.id, card, cardForm, updateCardData]);

  useEffect(() => {
    register('idAttachmentCover');
  }, [register]);

  if (!card) {
    return null;
  }

  return (
    <div className="sticky top-0 z-99">

      <Controller
        name="attachments"
        control={control}
        type="file"
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <>
            <IconButton color="inherit" onClick={fileUpload}>
              <Icon>attachment</Icon>
            </IconButton>
            <input
              hidden
              ref={inputRef}
              type="file"
              //multiple
              onChange={onFileInputChange}
            />
            {selectFile ? (
              <div>
                <Button
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
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
                  <StyledMenuItem>
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
            ) : (<></>)}

          </>
        )}
      />
      {cardForm.attachments && cardForm.attachments.length > 0 && (
        <div className="mb-24">
          <div className="flex items-center mt-16 mb-12">
            <Icon className="text-20" color="inherit">
              attachment
							</Icon>
            <Typography className="font-semibold text-16 mx-8">Attachments</Typography>
          </div>
          {attach != null ? (
            <div className="flex flex-col sm:flex-row flex-wrap -mx-16">
              {attach.map((item, index) => (
                <CardAttachment
                  item={item}
                  card={cardForm}
                  index={index}
                  key={item.id}
                  set={setAttach}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  )
}
export default AttachimentInput;