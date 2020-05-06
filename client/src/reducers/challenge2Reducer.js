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
	let ns = {};
	Object.assign(ns, state);
	switch(action.type) {
		case 'INCREMENT_POSTNUM':
			ns.postNum++;
			break;
		case 'SET_INSULTS':
			ns.insults = action.payload;
			break;
		case 'INCREMENT_INSULTS':
			ns.insultIndex = (ns.insultIndex + 1) % ns.insults.length;
			break;
		case 'TOGGLE_ANTAGONIZE':
			ns.isAntagonizing = !ns.isAntagonizing;
			break;
		case 'UPDATE_MESSAGE':
			ns.message = action.payload;
			break;
		case 'UPDATE_POSTS':
			ns.posts.unshift(action.payload);
			break;
		case 'SET_TAB':
			ns.tab = action.payload;
			break;
		default: 
			break;
	}
	return ns;
}

export default challenge2Reducer;