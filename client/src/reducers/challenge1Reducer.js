const challenge1Reducer = (state = {tab: 'STANDARD', pass: ''}, action) => {
	let ns = {};
	Object.assign(ns, state);
	switch(action.type) {
		case 'SET_TAB':
			ns.tab = action.payload;
			break;
		case 'UPDATE_PASS':
			ns.pass = action.payload;
			break;
		default: 
			break;
	}
	return ns;
}

export default challenge1Reducer;