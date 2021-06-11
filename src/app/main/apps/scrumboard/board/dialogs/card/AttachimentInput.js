import { useDebounce } from '@fuse/hooks';
import _ from '@lodash';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCardDialog, removeCard, updateCard } from '../../../store/cardSlice';
import CardAttachment from './attachment/CardAttachment';
import React, { useRef } from "react";

function AttachimentInput(props) {
  const dispatch = useDispatch();
  const card = useSelector(({ scrumboardApp }) => scrumboardApp.card.data);
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  const { register, watch, control, setValue } = useForm({ mode: 'onChange', defaultValues: card });
  const cardForm = watch();


  const [attach, setAttach] = useState(card.attachments);




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
      {cardForm.attachments && cardForm.attachments.length > 0 && (
        <div className="mb-24">
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