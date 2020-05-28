
let initialState = {
	tab: 'STANDARD',
    user: '',
    pass: '',
    data: undefined
    
}

const challenge5Reducer = (state = initialState, action) => {
	let ns = {};
	Object.assign(ns, state);

	switch(action.type) {
		case 'SET_TAB':
			ns.tab = action.payload;
			break;
		case 'SET_PASS':
			ns.pass = action.payload;
            break;
        case 'SET_USER':
            ns.user = action.payload;
            break;
        case 'SET_DATA':
            ns.data = action.payload;
            break;
		default:
			break;
	}

	return ns;
}

export default challenge5Reducer;