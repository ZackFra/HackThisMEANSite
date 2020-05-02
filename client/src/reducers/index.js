import { combineReducers } from 'redux';
import challenge0Reducer from './challenge0Reducer';
import challenge1Reducer from './challenge1Reducer';
import challenge2Reducer from './challenge2Reducer';
import challenge3Reducer from './challenge3Reducer';
import challenge4Reducer from './challenge4Reducer';
import passReducer from './passReducer';
import userReducer from './userReducer';
import forumReducer from './forumReducer';
import createPostReducer from './createPostReducer';
import postMessageReducer from './postMessageReducer';
import loggedReducer from './loggedReducer';

export default combineReducers({
	user: userReducer,
	pass: passReducer,
	login: loggedReducer,
	forum: forumReducer,
	createPost: createPostReducer,
	postMessage: postMessageReducer,
	challenge0: challenge0Reducer,
	challenge1: challenge1Reducer,
	challenge2: challenge2Reducer,
	challenge3: challenge3Reducer,
	challenge4: challenge4Reducer
});
