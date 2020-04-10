const createPostReducer = (state = {message: '', title: '', forum: 'None'}, action) => {
	switch(action.type) {
		case 'CREATE_POST': 
			return {...state, success: true};
		case 'UPDATE_MESSAGE':
			return {...state, message: action.payload};
		case 'UPDATE_TITLE':
			return {...state, title: action.payload};
		case 'UPDATE_FORUM':
			return {...state, forum: action.payload};
		default:
			return state;
	}
}

export default createPostReducer;