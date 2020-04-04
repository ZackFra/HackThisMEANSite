import { combineReducers } from 'redux';
import loggedReducer from './loggedReducer';
import challenge0LoginReducer from './challenge0LoginReducer';
import challenge1LoginReducer from './challenge1LoginReducer';
import passReducer from './passReducer';
import userReducer from './userReducer';

export default combineReducers({
	user: userReducer,
	pass: passReducer,
	account: loggedReducer,
	challenge0: challenge0LoginReducer,
	challenge1: challenge1LoginReducer
});
