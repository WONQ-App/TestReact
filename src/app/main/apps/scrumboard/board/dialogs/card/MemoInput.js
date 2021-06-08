import { yupResolver } from '@hookform/resolvers/yup';
import { useDebounce } from '@fuse/hooks';
import { DateTimePicker } from '@material-ui/pickers';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import CardComment from './comment/CardComment';
import _ from '@lodash';
import List from '@material-ui/core/List';
import CardActivity from './activity/CardActivity';
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

function MemoInput(props) {
    const dispatch = useDispatch();
    const card = useSelector(({ scrumboardApp }) => scrumboardApp.card.data);
    const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);


    const [formOpen, setFormOpen] = useState(false);
    const { control, formState, watch, setValue  } = useForm({
        mode: 'onChange',
        defaultValues: card
    });
    const cardForm = watch();

    const updateCardData = useDebounce((boardId, newCard) => {
        dispatch(updateCard({ boardId, card: { ...newCard } }));
    }, 600);

    useEffect(() => {
        if (!card) {
            return;
        }

        const newCard = { ...card, ...cardForm };
      
        if (!_.isEqual(newCard.idMembers, card.idMembers) || !_.isEqual(newCard.idMembers2, card.idMembers2) || !_.isEqual(newCard.idMembers3, card.idMembers3) || !_.isEqual(newCard.idLabels, card.idLabels) || !_.isEqual(newCard.activities, card.activities)) {
			newCard.idMembers = card.idMembers
            newCard.idMembers2 = card.idMembers2
            newCard.idMembers3 = card.idMembers3
            newCard.idLabels = card.idLabels
            newCard.activities = card.activities
		}

 
        console.log(newCard.memo)
        console.log(card.memo)
        if (!_.isEqual(newCard.memo, card.memo)) {
            updateCardData(board.id, newCard);
            console.log('update')
        }
    }, [board.id, card, cardForm, updateCardData]);

    return (
        <div className="w-full mb-24">
            <div className="mb-24">
                <div>
                    <CardComment
                        members={board.members}
                        type = 'log'
                        onCommentAdd={log => setValue('memo', [log, ...cardForm.memo])}
                    />
                </div>
            </div>
            <Controller
                name="memo"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                    <div>
                        {value.length > 0 && (
                            <div className="mb-24">
                                <div className="flex items-center mt-16">
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
        </div>
    )
}

export default MemoInput;