import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import boards from './boardsSlice';
import card from './cardSlice';
import date from './dateSlice';

const scrumboardAppReducers = combineReducers({
	boards,
	board,
	card,
	date
});

export default scrumboardAppReducers;
