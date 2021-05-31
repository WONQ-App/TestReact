import { combineReducers } from '@reduxjs/toolkit';
import fuse from './fuse';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		fuse,
		...asyncReducers
	});

	/*
	Reset the redux store when user logged out
	 */
	if (action.type === 'auth/user/userLoggedOut') {
		state = undefined;
	}

	return combinedReducer(state, action);
};

export default createReducer;
