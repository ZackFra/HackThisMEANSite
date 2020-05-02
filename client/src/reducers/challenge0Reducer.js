const challenge0Reducer = (state = {tab: 'STANDARD', pass: ''}, action) => {
	switch(action.type) {
		case 'SET_TAB':
			return {...state, tab: action.payload}
		case 'UPDATE_PASS':
			return {...state, pass: action.payload}
		default: 
			return state;
	}
}

export default challenge0Reducer;