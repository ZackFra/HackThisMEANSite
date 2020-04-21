const postMessageReducer = (state = {message: '', title: '', post: ''}, action) => {
	switch(action.type) {
		case 'SET_POST':
			return {...state, post: action.payload};
		case 'UPDATE_MESSAGE':
			return {...state, message: action.payload};
		case 'UPDATE_TITLE':
			return {...state, title: action.payload};
		default:
			return state;
	}
}

export default postMessageReducer;