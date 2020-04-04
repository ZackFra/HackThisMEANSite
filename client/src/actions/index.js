import axios from 'axios';

export const login = data => async dispatch => {
	const {user, pass} = data;
	await axios.post('/Login/Authenticate', { user, pass })
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
	sessionStorage.removeItem('state');
	dispatch({type: 'LOGOUT'});
}