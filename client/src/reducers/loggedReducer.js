
const loggedReducer = (state = {}, action) => {
	switch(action.type) {
		case 'LOGIN':
			return { user: action.payload.user }
		case 'LOGOUT':
			return { user: '' };
		default:
			return state;
	}
}

export default loggedReducer;