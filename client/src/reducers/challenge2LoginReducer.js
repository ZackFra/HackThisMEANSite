const challenge2LoginReducer = (state = {}, action) => {
	switch(action.type) {
		case 'LOGIN_SUCCESS':
			return {success: true};
		case 'LOGIN_FAIL':  
			return {success: false};
		default: 
			return state;
	}
}

export default challenge2LoginReducer;