const passReducer = (state = '', action) => {

	switch(action.type) {
		case 'UPDATE_PASS': 
			return action.payload;
		default:
			return state;
	}
}

export default passReducer;