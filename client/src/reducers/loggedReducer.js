
const loggedReducer = (state = {user: '', pass: '', throttle: false, tab: 'STANDARD', confirm: ''}, action) => {
	let ns = {};
	Object.assign(ns, state);
	switch(action.type) {
		case 'UPDATE_PASS':
			ns.pass = action.payload;
			break;
		case 'UPDATE_USER':
			ns.user = action.payload;
			break;
		case 'UPDATE_CONFIRM':
			ns.confirm = action.payload;
			break;
		case 'TOGGLE_THROTTLE':
			ns.throttle = !state.throttle;
			break;
		case 'SET_TAB':
			ns.tab = action.payload;
			break;
		case 'CLEAR':
			ns.user = '';
			ns.pass = '';
			ns.confirm = '';
			break;
		default:
			break;
	}
	return ns;
}

export default loggedReducer;