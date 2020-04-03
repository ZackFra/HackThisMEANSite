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
	window.location = '/';
}