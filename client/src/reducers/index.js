import { combineReducers } from 'redux';
import challenge0Reducer from './challenge0Reducer';
import challenge1Reducer from './challenge1Reducer';
import challenge2Reducer from './challenge2Reducer';
import passReducer from './passReducer';
import userReducer from './userReducer';
import forumReducer from './forumReducer';

export default combineReducers({
	user: userReducer,
	pass: passReducer,
	forum: forumReducer,
	challenge0: challenge0Reducer,
	challenge1: challenge1Reducer,
	challenge2: challenge2Reducer
});
