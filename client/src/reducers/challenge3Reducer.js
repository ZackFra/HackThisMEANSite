let initialState = {
	tab: 'STANDARD',
	password: '',
	confirm: '',
	username: '',
	throttle: false
}

const challenge3Reducer = (state = initialState, action) => {
	let ns = {};
	Object.assign(ns, state);
	switch(action.type) {
		case 'SET_TAB':
			ns.tab = action.payload;
			break;
		case 'UPDATE_PASS':
			ns.password = action.payload;
			break;
		case 'UPDATE_CONFIRM':
			ns.confirm = action.payload;
			break;
		case 'UPDATE_USER':
			ns.username = action.payload;
			break;
		case 'CLEAR_ALL':
			ns.username = '';
			ns.password = '';
			ns.confirm = '';
			break;
		case 'TOGGLE_THROTTLE':
			ns.throttle = !ns.throttle;
			break;
		default: 
			break;
	}
	return ns;
}

export default challenge3Reducer;