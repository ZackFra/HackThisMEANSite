const postMessageReducer = (state = {message: '', post: ''}, action) => {
	switch(action.type) {
		case 'SET_POST':
			return {...state, post: action.payload};
		case 'UPDATE_POST_MESSAGE':
			return {...state, message: action.payload};
		default:
			return state;
	}
}

export default postMessageReducer;