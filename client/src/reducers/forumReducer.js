const forumReducer = (state = {posts: [], postNum: 0}, action) => {
	switch(action.type) {
		case 'GET_POSTS': 
			return {...state, posts: action.payload};
		default:
			return state;
	}
}

export default forumReducer;