import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {loadState, saveState} from './sessionStorage';


const initialState = {account: {user: ''}};
const middleware = [thunk];
const persistedState = loadState();

const store = createStore(
	rootReducer, 
	persistedState || initialState, 
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

store.subscribe( () => {
	saveState(store.getState());
});

export default store