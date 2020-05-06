const postMessageReducer = (state = {message: '', post: ''}, action) => {
	let ns = {};
	Object.assign(ns, state);
	switch(action.type) {
		case 'SET_POST':
			ns.post = action.payload;
			break;
		case 'UPDATE_POST_MESSAGE':
			ns.message = action.payload;
			break;
		default:
			break;
	}
	return ns;
}

export default postMessageReducer;