import { combineReducers } from 'redux';
import challenge0Reducer from './challenge0Reducer';
import challenge1Reducer from './challenge1Reducer';
import challenge2Reducer from './challenge2Reducer';
import challenge3Reducer from './challenge3Reducer';
import passReducer from './passReducer';
import userReducer from './userReducer';
import forumReducer from './forumReducer';
import createPostReducer from './createPostReducer';
import loggedReducer from './loggedReducer';

export default combineReducers({
	user: userReducer,
	pass: passReducer,
	login: loggedReducer,
	forum: forumReducer,
	createPost: createPostReducer,
	challenge0: challenge0Reducer,
	challenge1: challenge1Reducer,
	challenge2: challenge2Reducer,
	challenge3: challenge3Reducer
});
