import axios from 'axios';
import crypto from 'crypto';


// general login
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

// challenges

// challenge 0 login

export const login_challenge0 = data => dispatch => {
	const { pass } = data;
	const ft = document.querySelector('#invalid');
	if(pass === 'L33tHax') {
		dispatch({type: 'LOGIN_SUCCESS'});
		ft.className = 'form-text text-success';
		ft.innerText="Correct!";
		window.location = '/Victory0';
	} else {
		dispatch({type: 'LOGIN_FAIL'});
		ft.innerText="Incorrect Password";
	}
}

// challenge 1 login
export const login_challenge1 = data => dispatch => {
	const {pass} = data;
	let hash = crypto
		.createHash('sha256')
		.update(pass)
		.digest('hex');
	const request = {user: 'admin', pass: hash};


	axios.post('/Challenge1/login', request) 
	.then( res => {
		if(res.data.length > 0) {
			const ft = document.querySelector('#invalid')
			ft.className = 'form-text text-success';
			ft.innerText="Correct!";
			dispatch({type: 'LOGIN_SUCCESS'});
			window.location = '/Victory1';
		} else {
			const ft = document.querySelector('#invalid');
			const pass = document.getElementById('password');
			ft.innerText="Incorrect Password";
			pass.value = '';
			dispatch({type: 'LOGIN_FAIL'});
		}
		console.log({"url": res.config.url, "method": res.config.method, "data": res.config.data});		
	});
}

// these are explicitly meant for onChange handlers
export const updatePass = e => dispatch => {
	dispatch({type: 'UPDATE_PASS', payload: e.target.value});
}

export const updateUser = e => dispatch => {
	dispatch({type: 'UPDATE_USER', payload: e.target.value});
}