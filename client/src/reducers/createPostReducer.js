const createPostReducer = (state = {initmessage: '', title: ''}, action) => {
	switch(action.type) {
		case 'CREATE_POST': 
			return {...state, success: true};
		case 'UPDATE_CREATE_MESSAGE':
			return {...state, initmessage: action.payload};
		case 'UPDATE_TITLE':
			return {...state, title: action.payload};
		default:
			return state;
	}
}

export default createPostReducer;