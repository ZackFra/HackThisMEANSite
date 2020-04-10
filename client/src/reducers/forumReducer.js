const forumReducer = (state = {posts: []}, action) => {
	switch(action.type) {
		case 'GET_POSTS': 
			return {...state, posts: action.payload};
		default:
			return state;
	}
}

export default forumReducer;