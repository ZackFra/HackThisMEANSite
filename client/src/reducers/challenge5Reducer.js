
let initialState = {
	query: '',
	tab: 'STANDARD',
	added: false
}

const challenge5Reducer = (state = initialState, action) => {
	let ns = {};
	Object.assign(ns, state);

	switch(action.type) {
		case 'SET_QUERY':
			ns.query = action.payload;
			break;
		case 'SET_TAB':
			ns.tab = action.payload;
			break;
		case 'SET_ADDED':
			ns.added = action.payload;
			break;
		default:
			break;
	}

	return ns;
}

export default challenge5Reducer;