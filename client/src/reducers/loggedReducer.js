
const loggedReducer = (state = {user: '', pass: '', throttle: false, tab: 'STANDARD', confirm: ''}, action) => {
	switch(action.type) {
		case 'UPDATE_PASS':
			return {...state, pass: action.payload};
		case 'UPDATE_USER':
			return {...state, user: action.payload};
		case 'UPDATE_CONFIRM':
			return {...state, confirm: action.payload};
		case 'TOGGLE_THROTTLE':
			return {...state, throttle: !state.throttle};
		case 'SET_TAB':
			return {...state, tab: action.payload};
		case 'CLEAR':
			return {...state, user: '', pass: '', confirm: ''};
		default:
			return state;
	}
}

export default loggedReducer;