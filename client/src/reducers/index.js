import { combineReducers } from 'redux';
import { presistReducer } from 'redux-persist';
import loggedReducer from './loggedReducer';

export default combineReducers({
	account: loggedReducer
});
