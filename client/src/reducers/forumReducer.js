const forumReducer = (state = {posts: [], postNum: 0}, action) => {
	switch(action.type) {
		case 'GET_POSTS': 
			return {...state, posts: action.payload};
		case 'INCREMENT_POST_NUM':
			return {...state, postNum: state.postNum + 1};
		default:
			return state;
	}
}

export default forumReducer;