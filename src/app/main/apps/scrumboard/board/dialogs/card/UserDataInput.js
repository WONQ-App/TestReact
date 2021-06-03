import { yupResolver } from '@hookform/resolvers/yup';
import { useDebounce } from '@fuse/hooks';
import { DateTimePicker } from '@material-ui/pickers';
import { Controller, useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import { newCard } from '../../../store/boardSlice';
import DueMenu from './toolbar/DueMenu';
import { closeCardDialog, removeCard, updateCard } from '../../../store/cardSlice';

const defaultValues = {
  title: ''
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a title')
});

function UserDataInput(props) {
  const dispatch = useDispatch();
  const card = useSelector(({ scrumboardApp }) => scrumboardApp.card.data);
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);


  const [formOpen, setFormOpen] = useState(false);
  const { control, formState, watch, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: card
  });
  const cardForm = watch();

  const updateCardData = useDebounce((boardId, newCard) => {
    dispatch(updateCard({ boardId, card: { ...newCard } }));
  }, 600);

  const { isValid, dirtyFields, errors } = formState

  function handleOpenForm(ev) {
    //ev.stopPropagation();
    setFormOpen(true);
  }

  function handleCloseForm() {
    setFormOpen(false);
  }

  function onSubmit(data) {
    formOpen = flase
  }

  useEffect(() => {
    if (!card) {
      return;
    }

    const newCard = { ...card, ...cardForm };
    console.log(newCard, 'ss')
    console.log(cardForm, 'sss')
    if (!_.isEqual(newCard.lineid, card.lineid) || !_.isEqual(newCard.seikan, card.seikan) || !_.isEqual(newCard.meikan, card.meikan) || !_.isEqual(newCard.seikana, card.seikana) || !_.isEqual(newCard.meikana, card.meikana) || !_.isEqual(newCard.seibetsu, card.seibetsu) || !_.isEqual(newCard.birthday, card.birthday) || !_.isEqual(newCard.number, card.number)) {
      updateCardData(board.id, newCard);
    }
  }, [board.id, card, cardForm, updateCardData]);

  return (
    <div className="w-full">
      {formOpen ? (
        <ClickAwayListener onClickAway={handleCloseForm}>
          <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="lineid"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  className="mb-8"
                  //required
                  fullWidth
                  label="LINE ID"
                  autoFocus
                />
              )}
            />
            <Controller
              name="seikan"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  className="mb-8"
                  //required
                  fullWidth
                  label="姓（漢字）"
                  autoFocus
                />
              )}
            />
            <Controller
              name="meikan"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  className="mb-8"
                  //required
                  fullWidth
                  label="名（漢字）"
                  autoFocus
                />
              )}
            />
            <Controller
              name="seikana"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  className="mb-8"
                  //required
                  fullWidth
                  label="姓（カナ）"
                  autoFocus
                />
              )}
            />
            <Controller
              name="meikana"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  className="mb-8"
                  //required
                  fullWidth
                  label="名（カナ）"
                  autoFocus
                />
              )}
            />
            <Controller
              name="seibetsu"
              control={control}
              render={({ field }) => (
                <Select　{...field}
                  native
                  className="mb-8"
                  fullWidth
                  label="性別"
                  autoFocus
                >
                  <option aria-label="性別" value="" />
                  <option value={'男性'}>男性</option>
                  <option value={'女性'}>女性</option>
                </Select>

              )}
            />
            <Controller
              name="birthday"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DateTimePicker {...field} className="mb-8"　label="生年月日"　fullWidth　autoFocus/>
              )}
            />

            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  className="mb-8"
                  //required
                  fullWidth
                  label="電話番号"
                  autoFocus
                />
              )}
            />

            <div className="flex justify-between items-center">
              <Button
                onClick={handleCloseForm}
                variant="contained"
                color="secondary"
                type="submit"
              //disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                保存
							</Button>
            </div>
          </form>
        </ClickAwayListener>
      ) : (
        <div style={{ background: 'white' }}>
          <Box textAlign="left" fontSize={6} fontColor={'#818181'} fontWeight="fontWeightLight" mt={1}>
            No
        </Box>
          <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
            {card.id}
          </Box>
          <Box textAlign="left" fontSize={6} fontColor={'#818181'} fontWeight="fontWeightLight" mt={1}>
            作成日時
        </Box>
          {card.tourokuday ? (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              {card.tourokuday}
            </Box>
          ) : (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              -
            </Box>
          )}
          <Box textAlign="left" fontSize={6} fontColor={'#818181'} fontWeight="fontWeightLight" mt={1}>
            LINE ID
        </Box>
          {card.lineid ? (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              {card.lineid}
            </Box>
          ) : (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              -
            </Box>
          )}
          <Box textAlign="left" fontSize={6} fontColor={'#818181'} fontWeight="fontWeightLight" mt={1}>
            姓（漢字）
        </Box>
          {card.seikan ? (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              {card.seikan}
            </Box>
          ) : (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              -
            </Box>
          )}
          <Box textAlign="left" fontSize={6} fontColor={'#818181'} fontWeight="fontWeightLight" mt={1}>
            名（漢字）
        </Box>
          {card.meikan ? (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              {card.meikan}
            </Box>
          ) : (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              -
            </Box>
          )}
          <Box textAlign="left" fontSize={6} fontColor={'#818181'} fontWeight="fontWeightLight" mt={1}>
            姓（カナ）
        </Box>
          {card.seikana ? (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              {card.seikana}
            </Box>
          ) : (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              -
            </Box>
          )}
          <Box textAlign="left" fontSize={6} fontColor={'#818181'} fontWeight="fontWeightLight" mt={1}>
            名（カナ）
        </Box>
          {card.meikana ? (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              {card.meikana}
            </Box>
          ) : (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              -
            </Box>
          )}
          <Box textAlign="left" fontSize={6} fontColor={'#818181'} fontWeight="fontWeightLight" mt={1}>
            性別
        </Box>
          {card.seibetsu ? (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              {card.seibetsu}
            </Box>
          ) : (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              -
            </Box>
          )}
          <Box textAlign="left" fontSize={6} fontColor={'#818181'} fontWeight="fontWeightLight" mt={1}>
            生年月日
        </Box>
          {card.birthday ? (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              {card.birthday}
            </Box>
          ) : (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              -
            </Box>
          )}
          <Box textAlign="left" fontSize={6} fontColor={'#818181'} fontWeight="fontWeightLight" mt={1}>
            電話番号
        </Box>
          {card.number ? (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              {card.number}
            </Box>
          ) : (
            <Box textAlign="left" fontSize={12} fontColor={'black'} fontWeight="fontWeightLight" m={0}>
              -
            </Box>
          )}

          <Button
            onClick={handleOpenForm}
            classes={{
              root: 'font-medium w-full px-16 rounded-none h-48',
              label: 'justify-start'
            }}
          >
            <Icon className="text-20">settings</Icon>
            <span className="mx-8">編集</span>
          </Button>
        </div>


      )}
    </div>
  );
}

export default UserDataInput;