import React from 'react';
import { Container, Label, Button } from 'reactstrap';
import { login, updatePass, updateUser, register } from '../actions/';
import { useSelector, useDispatch } from 'react-redux';

function Login(props) {

	const { user, pass, confirm, throttle, tab } = useSelector( state => state.login );
	const dispatch = useDispatch();

	async function authenticate(e) {
		e.preventDefault();
		if(!approved()) {
			document.getElementById('invalid').innerText = 'Too many requests at once. Try again in a moment.';
			return; 
		}
		const validated = await login({user, pass});

		if(validated) {
			window.location = '/home';
		} else {
			document.getElementById('invalid').innerText = 'Invalid user name or password.';
		}
	}

	function handleRegistration(e) {
		e.preventDefault();

		if(!approved(throttle)) {
			document.getElementById('invalid').innerText = 'Too many requests at once. Wait a moment and try again.\n\n';
			return;
		}

		let re = /\s/;
		if(pass === '') {
			document.getElementById('invalid').innerText='Password cannot be blank.\n\n';
		} else if(user === '') {
			document.getElementById('invalid').innerText='User name cannot be blank.\n\n';
		} else if(pass !== confirm) {
			document.getElementById('invalid').innerText='Passwords must match.\n\n';
		} else if(pass.length < 8) {
			document.getElementById('invalid').innerText='Password must be at least 8 characters long.\n\n';
		} else if(pass.length < 8) {
			document.getElementById('invalid').innerText='User name must be at least 8 characters long.\n\n';
		} else if(re.test(pass)) {
			document.getElementById('invalid').innerText='Password may not contain white spaces.\n\n';
		} else if(re.test(user)) {
			document.getElementById('invalid').innerText='User name may not contain white spaces.\n\n';
		} else {
			register({user, pass})
			.then( res => {
				if(res === true) {
					window.location.reload();
				} else {
					document.getElementById('invalid').innerText='User name is taken.\n\n';
				}
			});
		}
	}

	function clear() {
		document.getElementById('invalid').innerText = '';
		dispatch({type: 'CLEAR'});
	}

	// boolean function
	// returns whether enough time has passed between 
	// requests to make another one
	// time=1000 by default
	function approved(time=1000) {
		if(throttle) {
			return false;
		}

		dispatch({type: 'TOGGLE_THROTTLE'});
		setTimeout(() => dispatch({type: 'TOGGLE_THROTTLE'}), time);
		return true;
	}

	switch(tab) {
		case 'REGISTER':
			return (
				<Container>
					<h1 className="pb-2 mt-4 border-bottom" style={{padding: '1rem 0'}}>Registration</h1>
					<br />
					<Container>
						<div className="card" style={{width: '50%', margin: 'auto'}}>
							<div className="card-body bg-dark text-light">
								<div className="card-title">
									Register
								</div>
								<hr color="lightgray"/>
								<div className="card-text">
									<div className="text-warning" id="invalid" />
									<form className="form-group" onSubmit={handleRegistration}>
										<span>
											<Label for='userReg' style={{'float': 'left', 'width': '35%'}}>Username: </Label>
											<input 
												id='userReg'
												value={user}
												onChange={e => dispatch({type: 'UPDATE_USER', payload: e.target.value})}
												className="form-control" 
												placeholder="username" 
												style={{'marginTop': '0.2rem', 'width': '65%'}} />
										</span>
										
										<span>								
											<Label for='passReg' style={{'marginTop':'0.5rem','float': 'left', 'width': '35%'}}>Password: </Label>
											<input 
												value={pass}
												onChange={e => dispatch({type: 'UPDATE_PASS', payload: e.target.value})}
												className="form-control" 
												type="password" 
												placeholder="password" 
												style={{'marginTop': '0.4rem', 'width': '65%'}} />
										</span>

										<span>
											<Label for='confirm' style={{'marginTop': '0.5rem','float': 'left', 'width': '35%'}}>Password (confirm): </Label>
											<input 
												id='confirm'
												value={confirm}
												onChange={e => dispatch({type: 'UPDATE_CONFIRM', payload: e.target.value})}
												className="form-control" 
												type="password" 
												placeholder="confirm password" 
												style={{'marginTop': '0.4rem', 'width': '65%'}} />
										</span>
										<Button color="primary" type="submit" style={{'float': 'right', 'marginTop': '0.4rem'}}>Submit</Button>
									</form>
									<br />
									<div style={{'marginLeft': '5%'}}>
										<Button 
											color="link" 
											onClick={() => {
												clear();
												dispatch({type: 'CLEAR_ALL'}); 
												dispatch({type: 'SET_TAB', payload: 'STANDARD'})
										}}>login</Button>
										<Button 
											color="link" 
											onClick={() => {
												clear();
												dispatch({type: 'CLEAR_ALL'}); 
												dispatch({type: 'SET_TAB', payload: 'REGISTER'})
										}}>register</Button>
									</div>
								</div>
								<br />
							</div>
						</div>
					</Container>
				</Container>
			);
		default:
			return (
				<Container>
					<h1 className="pb-2 mt-4 border-bottom" style={{padding: '1rem 0'}}>Login Page</h1>
					<br />
					<Container>
						<div className="card" style={{width: '18rem', margin: 'auto'}}>
							<div className="card-body bg-dark text-light">
								<div className="card-title">
									Login
								</div>
								<hr color="lightgray"/>
								<div className="card-text">
									This is the one form you're not allowed to hack!
								</div>
								<br />
								<form className="form-group" onSubmit={authenticate}>
									<label className="form-text text-warning" id="invalid" />
									<input 
										className="form-control" 
										name='user'
										value = {user}
										onChange = {e => dispatch({type: 'UPDATE_USER', payload: e.target.value})}
										type="text" 
										placeholder="username" 
										style = {{'marginBottom': '0.7rem'}}
									/> 
									<input 
										className="form-control"
										name='pass'
										value = {pass} 
										onChange = {e => dispatch({type: 'UPDATE_PASS', payload: e.target.value})}
										type="password" 
										placeholder="password" 
									/>
									<button 
										className="btn btn-primary"
										type="submit" 
										style={{padding: "0 1rem", marginTop: "0.7rem"}}
										>
										Submit</button>
								</form>
								<div style={{'marginLeft': '5%'}}>
									<Button 
										color="link" 
										onClick={() => {
											clear();
											dispatch({type: 'CLEAR_ALL'}); 
											dispatch({type: 'SET_TAB', payload: 'STANDARD'})
									}}>login</Button>
									<Button 
										color="link" 
										onClick={() => {
											clear();
											dispatch({type: 'CLEAR_ALL'}); 
											dispatch({type: 'SET_TAB', payload: 'REGISTER'})
									}}>register</Button>
								</div>
							</div>
						</div>
					</Container>
				</Container>
			);
		}
}

export default Login;