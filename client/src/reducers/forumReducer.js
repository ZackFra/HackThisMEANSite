const init = {
	delta: 0,
	posts: [], 
	forum: undefined, 
	postId: undefined, 
	viewPost: undefined, 
	tab: undefined
};

const forumReducer = (state = init, action) => {
	let ns = {};
	Object.assign(ns, state);
	switch(action.type) {
		case 'GET_POSTS': 
			ns.posts = action.payload;
			break;
		case 'SET_FORUM':
			ns.forum = action.payload;
			break;
		case 'SET_VIEW':
			ns.view = action.payload;
			break;
		case 'SET_TAB':
			ns.tab = action.payload;
			break;
		case 'SET_POST_ID':
			ns.postId = action.payload;
			break;
		case 'CLEAR_POSTS':
			ns.posts = [];
			break;
		case 'UPDATE_POST_ID':
			ns.postId = ns.postId + ns.payload;
			break;
		case 'SET_DELTA':
			ns.delta = ns.payload;
			break;
		default:
			break;
	}
	return ns;
}

export default forumReducer;