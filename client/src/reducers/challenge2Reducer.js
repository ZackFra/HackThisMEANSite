let initialState = {
	nodeList: [],
	postNum: 0,
	post: {},
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
	interval: undefined
}

const challenge2Reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'UPDATE_NODELIST':
			return {...state, nodeList: action.payload};
		case 'INCREMENT_POSTNUM':
			return {...state, postNum: state.postNum + 1};
		case 'UPDATE_INSULTS':
			return {...state, insults: action.payload};
		case 'INCREMENT_INSULTS':
			return {...state, insultIndex: (state.insultIndex + 1) % state.insults.length};
		case 'ANTAGONIZE':
			return {...state, interval: action.payload};
		case 'STOP_ANTAGONIZING':
			clearInterval(state.interval);
			return {...state, interval: null}
		case 'LOGIN_SUCCESS':
			return {...state, success: true};
		case 'LOGIN_FAIL':  
			return {...state, success: false};
		default: 
			return state;
	}
}

export default challenge2Reducer;