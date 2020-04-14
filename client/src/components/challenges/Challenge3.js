import React from 'react';
import { Container, Button, Label } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

function Challenge3(props) {
	const { tab, username, password, confirm } = useSelector( state => state.challenge3 );
	const dispatch = useDispatch();


	function register(e) {
		e.preventDefault();
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
			// @todo add actually call to back-end
			localStorage.setItem('account', JSON.stringify({username, password}));
			window.location.reload();
		}
	}

	function login(e) {
		e.preventDefault();
		let acc = JSON.parse(localStorage.getItem('account'));
		if(username === acc.username && password === acc.password) {
			document.cookie += `username=${username}`;
			window.location.reload();
		} else {
			document.getElementById('inval').innerText = 'Incorrect password.\n\n';
		}
		// @todo add login functionality
	}

	// clear any errors
	function clear() {
		document.getElementById('inval').innerText = '';
	}

	function changePass(e) {
		let re = /\s/;
		if(password === '') {
			document.getElementById('inval').innerText='Password cannot be blank.\n\n';
		} else if(password !== confirm) {
			document.getElementById('inval').innerText='Passwords must match.\n\n';
		} else if(password.length < 8) {
			document.getElementById('inval').innerText='Password must be at least 8 characters long.\n\n';
		} else if(re.test(password)) {
			document.getElementById('inval').innerText='Password may not contain white spaces.\n\n';
		} else if(username === 'admin') {
			window.location = '/Victory3';
		} else {
			// do change password stuff
		}
	}

	switch(tab) {
		case 'CHANGE_PASS':
			return (
				<Container>
					<h1 className="pb-2 mt-4 border-bottom" style={{padding: '1rem 0'}}>Welcome to Challenge 3</h1>
						<br />
						<Container>
							<div className="card" style={{width: '50%', margin: 'auto'}}>
								<div className="card-body bg-dark text-light">
									<div className="card-title">
										Change Password
									</div>
									<hr color="lightgray"/>
									<div className="card-text">
										<div className="text-warning" id="inval" />
										<form className="form-group" onSubmit={register}>								
											<Label for='passReg' style={{'margin':'0','float': 'left', 'width': '30%', 'marginRight': '0'}}>Password: </Label>
											<input 
												value={password}
												onChange={e => dispatch({type: 'UPDATE_PASS', payload: e.target.value})}
												className="form-control" 
												type="password" 
												placeholder="password" 
												style={{'margin': '0', 'width': '70%'}} />

											<Label for='confirm' style={{'margin': '0.4rem 0 0 0','float': 'left', 'width': '30%'}}>Password (confirm): </Label>
											<input 
												id='confirm'
												value={confirm}
												onChange={e => dispatch({type: 'UPDATE_CONFIRM', payload: e.target.value})}
												className="form-control" 
												type="password" 
												placeholder="confirm password" 
												style={{'marginTop': '0.4rem', 'width': '70%'}} />
											<Button color="primary" type="submit" style={{'marginLeft': '86%', 'marginTop': '0.4rem'}}>Submit</Button>
										</form>
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
											<Button
												color="link"
												onClick={() => {
													clear();
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'LOGIN'});
											}}>login</Button>
											<Button 
												color="link" 
												onClick={() => {
													clear();
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'ACCOUNT'})
											}}>account</Button>
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
				<Container>
					<h1 className="pb-2 mt-4 border-bottom" style={{padding: '1rem 0'}}>Welcome to Challenge 3</h1>
						<br />
						<Container>
							<div className="card" style={{width: '50%', margin: 'auto'}}>
								<div className="card-body bg-dark text-light">
									<div className="card-title">
										Account
									</div>
									<hr color="lightgray"/>
									<div className="card-text">
										<Label for='userAcc' style={{'float':'left', 'width': '60%'}}>Username: </Label>
										<div id='userAcc'>Placeholder</div>
										<br />
										<Label for='since' style={{'float':'left', 'width': '60%'}}>User since: </Label>
										<div id='since'>Placeholder</div>
										<br />
										<Label for='reset' style={{'float': 'left', 'width': '60%'}}>Reset Password: </Label>
										<Button 
											id='reset' 
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
											<Button
												color="link"
												onClick={() => {
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'LOGIN'});
											}}>login</Button>
											<Button 
												color="link" 
												onClick={() => {
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'ACCOUNT'})
											}}>account</Button>
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
				<Container>
					<h1 className="pb-2 mt-4 border-bottom" style={{padding: '1rem 0'}}>Welcome to Challenge 3</h1>
						<br />
						<Container>
							<div className="card" style={{width: '50%', margin: 'auto'}}>
								<div className="card-body bg-dark text-light">
									<div className="card-title">
										Log in
									</div>
									<hr color="lightgray"/>
									<div className="card-text">
										<div className='text-warning' id="inval" />
										<form className="form-group" onSubmit={login}>
											<Label for='userLog' style={{'float': 'left', 'width': '30%'}}>Username: </Label>
											<input 
												id='userLog'
												value={username} 
												className="form-control" 
												placeholder="username" 
												style={{'width': '70%'}} 
												onChange= { e => dispatch({type: 'UPDATE_USER', payload: e.target.value})} 
											/>
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
											<br />
											<Button color="primary" type="submit" style={{'marginLeft': '86%', 'marginTop': '0.4rem', 'display': 'inline-block'}}>Submit</Button>
										</form>
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
											<Button
												color="link"
												onClick={() => {
													clear();
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'LOGIN'});
											}}>login</Button>
											<Button 
												color="link" 
												onClick={() => {
													clear();
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'ACCOUNT'})
											}}>account</Button>
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
				<Container>
					<h1 className="pb-2 mt-4 border-bottom" style={{padding: '1rem 0'}}>Welcome to Challenge 3</h1>
						<br />
						<Container>
							<div className="card" style={{width: '50%', margin: 'auto'}}>
								<div className="card-body bg-dark text-light">
									<div className="card-title">
										Register
									</div>
									<hr color="lightgray"/>
									<div className="card-text">
										<div className="text-warning" id="inval" />
										<form className="form-group" onSubmit={register}>
											<Label for='userReg' style={{'float': 'left', 'width': '35%'}}>Username: </Label>
											<input 
												id='userReg'
												value={username}
												onChange={e => dispatch({type: 'UPDATE_USER', payload: e.target.value})}
												className="form-control" 
												placeholder="username" 
												style={{'marginTop': '0.2rem', 'width': '65%'}} />
																					
											<Label for='passReg' style={{'marginTop':'0.5rem','float': 'left', 'width': '35%'}}>Password: </Label>
											<input 
												value={password}
												onChange={e => dispatch({type: 'UPDATE_PASS', payload: e.target.value})}
												className="form-control" 
												type="password" 
												placeholder="password" 
												style={{'marginTop': '0.4rem', 'width': '65%'}} />

											<Label for='confirm' style={{'marginTop': '0.5rem','float': 'left', 'width': '35%'}}>Password (confirm): </Label>
											<input 
												id='confirm'
												value={confirm}
												onChange={e => dispatch({type: 'UPDATE_CONFIRM', payload: e.target.value})}
												className="form-control" 
												type="password" 
												placeholder="confirm password" 
												style={{'marginTop': '0.4rem', 'width': '65%'}} />
											<Button color="primary" type="submit" style={{'marginLeft': '86%', 'marginTop': '0.4rem'}}>Submit</Button>
										</form>
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
											<Button
												color="link"
												onClick={() => {
													clear();
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'LOGIN'});
											}}>login</Button>
											<Button 
												color="link" 
												onClick={() => {
													clear();
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'ACCOUNT'})
											}}>account</Button>
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
				<Container>
					<h1 className="pb-2 mt-4 border-bottom" style={{padding: '1rem 0'}}>Welcome to Challenge 3</h1>
						<br />
						<Container>
							<div className="card" style={{width: '40%', margin: 'auto'}}>
								<div className="card-body bg-dark text-light">
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
											<Button
												color="link"
												onClick={() => {
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'LOGIN'});
											}}>login</Button>
											<Button 
												color="link" 
												onClick={() => {
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'ACCOUNT'})
											}}>account</Button>
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
