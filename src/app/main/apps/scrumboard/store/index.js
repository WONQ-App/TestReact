import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import boards from './boardsSlice';
import card from './cardSlice';
import date from './dateSlice';
import sales from './saleSlice'

const scrumboardAppReducers = combineReducers({
	boards,
	board,
	card,
	date,
	sales
});

export default scrumboardAppReducers;
