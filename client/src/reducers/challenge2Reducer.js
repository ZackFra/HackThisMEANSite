let initialState = {
	postNum: 0,
	insults: [
    	"u rite now <img src='https://images.freeimages.com/images/large-previews/0e8/clown-trinket-1522905.jpg'>",
    	"Haha! you <i>still</i> haven't got it yet?",
    	"I hope you're not in college because you're dumb as a sack of bricks!",
    	"<i>Jeeesus</i> you still don't have it?",
    	"c'mon this took me like 5 minutes to do. <b>Google's your friend, bruh.</b>",
    	"Maybe you need to get yourself some programming socks?",
    	"I heard this rumor that if you google 'how to hack', you'll still fail. You suck."
	],
	insultIndex: 0,
	isAntagonizing: false,
	message: '',
	posts: [],
	tab: 'STANDARD'
}

const challenge2Reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'INCREMENT_POSTNUM':
			return {...state, postNum: state.postNum + 1};
		case 'SET_INSULTS':
			return {...state, insults: action.payload};
		case 'INCREMENT_INSULTS':
			return {...state, insultIndex: (state.insultIndex + 1) % state.insults.length};
		case 'TOGGLE_ANTAGONIZE':
			return {...state, isAntagonizing: !state.isAntagonizing};
		case 'UPDATE_MESSAGE':
			return {...state, message: action.payload};
		case 'UPDATE_POSTS':
			return {...state, posts: [action.payload, ...state.posts]};
		case 'SET_TAB':
			return {...state, tab: action.payload}
		default: 
			return state;
	}
}

export default challenge2Reducer;