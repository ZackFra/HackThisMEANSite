const createPostReducer = (state = {initmessage: '', title: ''}, action) => {
	let ns = {};
	Object.assign(ns, state);
	switch(action.type) {
		case 'CREATE_POST': 
			ns.success = true;
			break;
		case 'UPDATE_CREATE_MESSAGE':
			ns.initmessage = action.payload;
			break;
		case 'UPDATE_TITLE':
			ns.title = action.payload;
			break;
		default:
			break;
	}
	return ns;
}

export default createPostReducer;