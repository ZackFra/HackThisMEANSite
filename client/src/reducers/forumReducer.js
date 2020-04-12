const forumReducer = (state = {posts: [], forum: undefined, postId: undefined, viewPost: undefined}, action) => {
	switch(action.type) {
		case 'GET_POSTS': 
			return {...state, posts: action.payload};
		case 'SET_FORUM':
			return {...state, forum: action.payload};
		case 'SET_VIEW':
			return {...state, view: action.payload};
		case 'SET_POST_ID':
			return {...state, postId: action.payload};
		case 'CLEAR_POSTS':
			return {...state, posts: []};
		default:
			return state;
	}
}

export default forumReducer;