const createPostReducer = (state = {message: ''}, action) => {
	switch(action.type) {
		case 'CREATE_POST': 
			return {...state, success: true};
		case 'UPDATE_MESSAGE':
			return {...state, message: action.payload};
		default:
			return state;
	}
}

export default createPostReducer;