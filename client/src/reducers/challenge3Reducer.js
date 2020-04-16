let initialState = {
	tab: 'STANDARD',
	password: '',
	confirm: '',
	username: '',
	throttle: false
}

const challenge3Reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_TAB':
			return {...state, tab: action.payload};
		case 'UPDATE_PASS':
			return {...state, password: action.payload};
		case 'UPDATE_CONFIRM':
			return {...state, confirm: action.payload};
		case 'UPDATE_USER':
			return {...state, username: action.payload};
		case 'CLEAR_ALL':
			return {...state, username: '', password: '', confirm: ''};
		case 'TOGGLE_THROTTLE':
			return {...state, throttle: !state.throttle};
		default: 
			return state;
	}
}

export default challenge3Reducer;