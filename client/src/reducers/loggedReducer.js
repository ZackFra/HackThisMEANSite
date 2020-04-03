import axios from 'axios';

const loggedReducer = (state = {}, action) => {
	switch(action.type) {
		case 'LOGIN':
			const {username, password} = action.payload;
			axios.post('/Login/Authenticate', 
			{ 
				user: username,
				pass: password
			})
			.then( (res) => {
				state = {username, password};
				console.log(res);
				window.location = '/home';
			})
			.catch( (err) => {
				console.log(err);
			});
		default:
			return state;
	}
}

export default loggedReducer;