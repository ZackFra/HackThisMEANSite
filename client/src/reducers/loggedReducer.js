
const loggedReducer = (state = {user: ''}, action) => {
	switch(action.type) {
		case 'LOGIN':
			return {...state, user: action.payload.user }
		case 'LOGOUT':
			return {...state, user: '' };
		default:
			return state;
	}
}

export default loggedReducer;