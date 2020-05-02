let initialState = {
	tab: 'STANDARD',
	title: '',
	message: '',
	poems: [],
	poemId: 0
}

const challenge4Reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_TAB':
			return {...state, tab: action.payload};
		case 'SET_TITLE':
			return {...state, title: action.payload};
		case 'SET_MESSAGE':
			return {...state, message: action.payload};
		case 'UPDATE_POEMS':
			return {...state, poems: [...state.poems, action.payload]};
		case 'SET_POEMS':
			return {...state, poems: action.payload};
		case 'SET_ID':
			return {...state, poemId: action.payload};
		default: 
			return state;
	}
}

export default challenge4Reducer;