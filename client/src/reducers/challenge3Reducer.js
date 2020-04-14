let initialState = {
	tab: 'STANDARD',
	password: '',
	confirm: '',
	username: '',
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
		default: 
			return state;
	}
}

export default challenge3Reducer;