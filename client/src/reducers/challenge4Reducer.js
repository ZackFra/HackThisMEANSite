let initialState = {
	tab: 'STANDARD',
	title: '',
	message: '',
	poems: [],
	poemId: 0
}

const challenge4Reducer = (state = initialState, action) => {
	let ns = {};
	Object.assign(ns, state);
	switch(action.type) {
		case 'SET_TAB':
			ns.tab = action.payload;
			break;
		case 'SET_TITLE':
			ns.title = action.payload
			break;
		case 'SET_MESSAGE':
			ns.message = action.payload;
			break;
		case 'UPDATE_POEMS':
			ns.poems.push(action.payload);
			break;
		case 'SET_POEMS':
			ns.poems = action.payload;
			break;
		case 'SET_ID':
			ns.poemId = action.payload;
			break;
		default: 
			break;
	}
	return ns;
}

export default challenge4Reducer;