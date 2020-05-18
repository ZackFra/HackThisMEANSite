const init = {
	posts: [], 
	forum: undefined, 
	postId: undefined, 
	postMongoId: undefined,
	newMessage: '',
	tab: 'STANDARD'
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
		case 'SET_TAB':
			ns.tab = action.payload;
			break;
		case 'SET_POST_ID':
			ns.postId = action.payload;
			break;
		case 'SET_MONGO_ID':
			ns.postMongoId = action.payload;
			break;
		// creating new messages in posts
		case 'UPDATE_MESSAGES':
			ns.posts[ns.postId].content.push(action.payload);
			let post = ns.posts[ns.postId];
			ns.posts.splice(ns.postId, 1);
			ns.posts.unshift(post);
			break;
		case 'UPDATE_NEW_MESSAGE':
			ns.newMessage = action.payload;
			break;
		default:
			break;
	}
	return ns;
}

export default forumReducer;