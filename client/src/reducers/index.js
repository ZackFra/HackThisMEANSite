import { combineReducers } from 'redux';
import loggedReducer from './loggedReducer';
import challenge0Reducer from './challenge0Reducer';
import challenge1Reducer from './challenge1Reducer';
import challenge2Reducer from './challenge2Reducer';
import passReducer from './passReducer';
import userReducer from './userReducer';

export default combineReducers({
	user: userReducer,
	pass: passReducer,
	account: loggedReducer,
	challenge0: challenge0Reducer,
	challenge1: challenge1Reducer,
	challenge2: challenge2Reducer
});
