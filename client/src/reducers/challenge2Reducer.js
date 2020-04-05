let initialState = {
	postNum: 0,
	insults: [],
	insultIndex: 0,
	interval: undefined,
	message: ''
}

const challenge2Reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'INCREMENT_POSTNUM':
			return {...state, postNum: state.postNum + 1};
		case 'SET_INSULTS':
			return {...state, insults: action.payload};
		case 'INCREMENT_INSULTS':
			return {...state, insultIndex: (state.insultIndex + 1) % state.insults.length};
		case 'ANTAGONIZE':
			return {...state, interval: action.payload};
		case 'STOP_ANTAGONIZING':
			clearInterval(state.interval);
			return {...state, interval: null};
		case 'UPDATE_MESSAGE':
			return {...state, message: action.payload};
		default: 
			return state;
	}
}

export default challenge2Reducer;