
const loggedReducer = (state = {}, action) => {
	switch(action.type) {
		case 'LOGIN':
			return { user: action.payload.user }
		default:
			return state;
	}
}

export default loggedReducer;