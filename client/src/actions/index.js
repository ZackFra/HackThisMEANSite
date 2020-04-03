import axios from 'axios';

export const login = data => dispatch => {
	const {user, pass} = data;
	axios.post('/Login/Authenticate', { user, pass })
	.then( (res) => {
		console.log(res);
		dispatch({
			type: 'LOGIN',
			payload: {user}
		});
	})
	.catch( err => console.log(err));
}

export const logout = () => dispatch => {
	dispatch({type: 'LOGOUT'});
}