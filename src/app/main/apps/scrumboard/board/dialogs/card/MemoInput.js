import { yupResolver } from '@hookform/resolvers/yup';
import { useDebounce } from '@fuse/hooks';
import { DateTimePicker } from '@material-ui/pickers';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
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
    const { control, formState, watch, handleSubmit } = useForm({
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
        console.log(newCard, 'ss')
        console.log(cardForm, 'sss')
        if (!_.isEqual(newCard.description, card.description)) {
            updateCardData(board.id, newCard);
        }
    }, [board.id, card, cardForm, updateCardData]);

    return (
        <div className="w-full mb-24">
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="メモ" multiline rows="12" variant="outlined" fullWidth />
                )}
            />
        </div>
    )
}

export default MemoInput;