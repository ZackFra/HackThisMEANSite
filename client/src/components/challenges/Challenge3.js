import React from 'react';
import { Container, Button, Label } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser3, login3, changePass3 } from '../../actions';
import { verify } from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { Title } from '../../StyleSheet';
import Victory from './Victory';

function Challenge3(props) {
	const { tab, username, password, confirm, throttle } = useSelector( state => state.challenge3 );
	const dispatch = useDispatch();

	// logout function,
	// removes user and token from cookies
	function logout() {
		Cookies.remove('user', {path: ''});
		Cookies.remove('token', {path: ''});
	}

	// boolean function
	// returns whether enough time has passed between 
	// requests to make another one
	// time=2000 by default
	function approved(time=2000) {
		if(throttle) {
			return false;
		}

		dispatch({type: 'TOGGLE_THROTTLE'});
		setTimeout(() => dispatch({type: 'TOGGLE_THROTTLE'}), time);
		return true;
	}

	function showAcc(needsClearing) {
		const token = Cookies.get('token');
		try {
			verify(token, 'secret');
			if(needsClearing) {
				return ( 
					<Button
						color="link"
						onClick={() => {
							clear();
							dispatch({type: 'CLEAR_ALL'}); 
							dispatch({type: 'SET_TAB', payload: 'ACCOUNT'});
					}}>account</Button>
				);
			} else {
				return ( 
					<Button
						color="link"
						onClick={() => {
							dispatch({type: 'CLEAR_ALL'}); 
							dispatch({type: 'SET_TAB', payload: 'ACCOUNT'});
					}}>account</Button>
				);
			}
		} catch(err) {
			if(needsClearing) {
				return ( 
					<Button
						color="link"
						onClick={() => {
							clear();
							dispatch({type: 'CLEAR_ALL'}); 
							dispatch({type: 'SET_TAB', payload: 'LOGIN'});
					}}>login</Button>
				);
			} else {
				return ( 
					<Button
						color="link"
						onClick={() => {
							dispatch({type: 'CLEAR_ALL'}); 
							dispatch({type: 'SET_TAB', payload: 'LOGIN'});
					}}>login</Button>
				);
			}
		}
	}

	function register(e) {
		e.preventDefault();

		if(!approved()) {
			document.getElementById('inval').innerText = 'Too many requests at once. Wait a moment and try again.\n\n';
			return;
		}

		let re = /\s/;
		if(password === '') {
			document.getElementById('inval').innerText='Password cannot be blank.\n\n';
		} else if(username === '') {
			document.getElementById('inval').innerText='User name cannot be blank.\n\n';
		} else if(password !== confirm) {
			document.getElementById('inval').innerText='Passwords must match.\n\n';
		} else if(password.length < 8) {
			document.getElementById('inval').innerText='Password must be at least 8 characters long.\n\n';
		} else if(re.test(password)) {
			document.getElementById('inval').innerText='Password may not contain white spaces.\n\n';
		} else if(re.test(username)) {
			document.getElementById('inval').innerText='User name may not contain white spaces.\n\n';
		}
		else {
			registerUser3({user: username, pass: password})
			.then( res => {
				if(res === true) {
					window.location.reload();
				} else {
					document.getElementById('inval').innerText='User name is taken.\n\n';
				}
			});
		}
	}

	function login(e) {
		e.preventDefault();

		if(!approved(throttle)) {
			document.getElementById('inval').innerText = 'Too many requests at once. Wait a moment and try again.\n\n';
			return;
		}

		login3({user: username, pass: password})
		.then( res => {
			if(res === true) {
				window.location.reload();
			} else {
				document.getElementById('inval').innerText = 'Incorrect password.\n\n';
			}
		});
	}

	// clear any errors
	function clear() {
		document.getElementById('inval').innerText = '';
		document.getElementById('success').innerText = '';
	}

	function changePass(e) {
		e.preventDefault();

		if(!approved()) {
			document.getElementById('inval').innerText = 'Too many requests at once. Wait a moment and try again.\n\n';
			return;
		}


		let re = /\s/;
		if(password === '') {
			document.getElementById('inval').innerText='Password cannot be blank.\n\n';
		} else if(password !== confirm) {
			document.getElementById('inval').innerText='Passwords must match.\n\n';
		} else if(password.length < 8) {
			document.getElementById('inval').innerText='Password must be at least 8 characters long.\n\n';
		} else if(re.test(password)) {
			document.getElementById('inval').innerText='Password may not contain white spaces.\n\n';
		} else {
			changePass3({user: Cookies.get('user'), newPass: password, token: Cookies.get('token')})
			.then( (res) => {
				dispatch({type: 'CLEAR_ALL'});
				if(res === true && Cookies.get('user') === 'admin') {
					logout();
					dispatch({type: 'SET_TAB', payload: 'VICTORY'});
				} else if(res === true) {
					document.getElementById('success').innerText = 'Password changed successfully!';
				} else {
					document.getElementById('inval').innerText = 'Internal error. Try again later.';
				}
			});
		}
	}

	switch(tab) {
		case 'VICTORY':
			return <Victory title='CONGRATULATIONS :)' message='You hacked challenge 3!' />
		case 'CHANGE_PASS':
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 3' />
						<br />
						<Container>
							<div className="card" style={{width: '50%', margin: 'auto'}}>
								<div className="card-body secondary-bg text-light">
									<div className="card-title">
										Change Password
									</div>
									<hr color="lightgray"/>
									<div className="card-text">
										<div className="text-warning" id="inval" />
										<br />
										<form className="form-group" onSubmit={changePass}>	
											<span>							
												<Label for='passReg' style={{'margin':'0','float': 'left', 'width': '35%', 'marginRight': '0'}}>Password: </Label>
												<input 
													value={password}
													onChange={e => dispatch({type: 'UPDATE_PASS', payload: e.target.value})}
													className="form-control" 
													type="password" 
													placeholder="password" 
													style={{'margin': '0', 'width': '65%'}} />
											</span>
											<span>
												<Label for='confirm' style={{'margin': '0.4rem 0 0 0','float': 'left', 'width': '35%'}}>Password (confirm): </Label>
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
											}}>home</Button>
											<Button 
												color="link" 
												onClick={() => {
													clear();
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'REGISTER'})
											}}>register</Button>
											{showAcc(true)}
										</div>
									</div>
									<div className='text-success' id="success" />
									<br />
								</div>
							</div>
						</Container>
					</Container>
				);	
		case 'ACCOUNT':
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 3' />
						<br />
						<Container>
							<div className="card" style={{width: '50%', margin: 'auto'}}>
								<div className="card-body secondary-bg text-light">
									<div className="card-title">
										Account
									</div>
									<hr color="lightgray"/>
									<div className="card-text">
										<Label for='userAcc' style={{'float':'left', 'width': '60%'}}>Username: </Label>
										<div id='userAcc'>{Cookies.get('user')}</div>
										<br />
										<Label for='permissions' style={{'float':'left', 'width': '60%'}}>Permissions: </Label>
										<div id='permissions'>{Cookies.get('user') === 'admin' ? 'God' : 'Peasant'}</div>
										<br />
										<Label for='logout' style={{'float':'left', 'width': '60%'}}>Log out: </Label>
										<Button 
											id='logout' 
											style = {{'margin':'0.4rem 0 0 0', 'width': '20%'}}
											color='primary'
											onClick={ () => {
												logout();
												dispatch({type: 'SET_TAB', payload: 'STANDARD'});
										}}>Logout</Button>
										<br />
										<Label for='reset' style={{'float': 'left', 'width': '60%'}}>Reset Password: </Label>
										<Button 
											id='reset' 
											style = {{'margin':'0.4rem 0 0 0', 'width': '20%'}}
											onClick={ () => 
												dispatch({type: 'SET_TAB', payload: 'CHANGE_PASS'})
										}>Reset</Button>
										<br />
										<br />
										<div style={{'marginLeft': '5%'}}>
											<Button 
												color="link" 
												onClick={() => {
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'STANDARD'})
												}}>home</Button>
											<Button 
												color="link" 
												onClick={() => {
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'REGISTER'})
											}}>register</Button>
											{showAcc(false)}
										</div>
									</div>
									<div className='text-success' id="success"></div>
									<br />
								</div>
							</div>
						</Container>
					</Container>

			);
		case 'LOGIN':
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 3' />
						<br />
						<Container>
							<div className="card" style={{width: '50%', margin: 'auto'}}>
								<div className="card-body secondary-bg text-light">
									<div className="card-title">
										Log in
									</div>
									<hr color="lightgray"/>
									<div className="card-text">
										<div className='text-warning' id="inval" />
										<form className="form-group" onSubmit={login}>
											<span>
												<Label for='userLog' style={{'float': 'left', 'width': '30%'}}>Username: </Label>
												<input 
													id='userLog'
													value={username} 
													className="form-control" 
													placeholder="username" 
													style={{'width': '70%'}} 
													onChange= { e => dispatch({type: 'UPDATE_USER', payload: e.target.value})} 
												/>
											</span>

											<span>
												<Label for='passLog' style={{'marginTop': '0.4rem', 'float': 'left', 'width': '30%'}}>Password: </Label>
												<input 
													id='passLog'
													value={password} 
													className="form-control" 
													type="password" 
													placeholder="password" 
													style={{'marginTop': '0.4rem', 'width': '70%'}} 
													onChange={e => dispatch({type: 'UPDATE_PASS', payload: e.target.value})}
												/>
											</span>
											<br />
											<Button color="primary" type="submit" style={{'float': 'right', 'marginTop': '0.4rem'}}>Submit</Button>
										</form>
										<br />
										<div style={{marginLeft: '5%'}}>
											<Button 
												color="link" 
												onClick={() => {
													clear();
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'STANDARD'})
												}}>home</Button>
											<Button 
												color="link" 
												onClick={() => {
													clear();
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'REGISTER'})
											}}>register</Button>
											{showAcc(true)}
										</div>
									</div>
									<div className='text-success' id="success"></div>
									<br />
								</div>
							</div>
						</Container>
					</Container>
			);

		case 'REGISTER':
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 3' />
						<br />
						<Container>
							<div className="card" style={{width: '50%', margin: 'auto'}}>
								<div className="card-body secondary-bg text-light">
									<div className="card-title">
										Register
									</div>
									<hr color="lightgray"/>
									<div className="card-text">
										<div className="text-warning" id="inval" />
										<form className="form-group" onSubmit={register}>
											<span>
												<Label for='userReg' style={{'float': 'left', 'width': '35%'}}>Username: </Label>
												<input 
													id='userReg'
													value={username}
													onChange={e => dispatch({type: 'UPDATE_USER', payload: e.target.value})}
													className="form-control" 
													placeholder="username" 
													style={{'marginTop': '0.2rem', 'width': '65%'}} />
											</span>
											
											<span>								
												<Label for='passReg' style={{'marginTop':'0.5rem','float': 'left', 'width': '35%'}}>Password: </Label>
												<input 
													value={password}
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
											}}>home</Button>
											<Button 
												color="link" 
												onClick={() => {
													clear();
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'REGISTER'})
											}}>register</Button>
											{showAcc(true)}
										</div>
									</div>
									<div className='text-success' id="success" />
									<br />
								</div>
							</div>
						</Container>
					</Container>
			);
		default:
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 3' />
						<br />
						<Container>
							<div className="card" style={{width: '40%', margin: 'auto'}}>
								<div className="card-body secondary-bg text-light">
									<div className="card-title">
										Session Hi-Jacking
									</div>
									<hr color="lightgray"/>
									<div className="card-text">
										This site has been hi-jacked by some script kiddies. 
										Your job is to jack it back. See if you can't find a
										way to reclaim the admin account.
										<br />
										<br />
										<div style={{marginLeft: '10%'}}>
											<Button 
												color="link" 
												onClick={() => {
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'STANDARD'})
											}}>home</Button>
											<Button 
												color="link" 
												onClick={() => {
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'REGISTER'})
											}}>register</Button>
											{showAcc(false)}
										</div>
									</div>
									<div className='text-success' id="success"></div>
									<br />
								</div>
							</div>
						</Container>
					</Container>
				);

		}
}

export default Challenge3
