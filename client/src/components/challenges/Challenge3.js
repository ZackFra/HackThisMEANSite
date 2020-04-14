import React from 'react';
import { Container, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

function Challenge3(props) {
	const { tab, username, password, confirm } = useSelector( state => state.challenge3 );
	const dispatch = useDispatch();


	function register(e) {
		e.preventDefault();
		let re = /\s/;
		if(password === '') {
			document.getElementById('invalReg').innerText='Passwords cannot be blank.';
		} else if(password !== confirm) {
			document.getElementById('invalReg').innerText='Passwords must match.';
		} else if(password.length < 8) {
			document.getElementById('invalReg').innerText='Passwords must be at least 8 characters long.';
		} else if(re.test(password)) {
			document.getElementById('invalReg').innerText='Passwords may not contain white spaces.';
		} else {
			// @todo add actual call to back-end
			localStorage.setItem('username', {username, password});
			window.location.reload();
		}
	}

	switch(tab) {
		case 'LOGIN':
			return (
				<Container>
					<h1 className="pb-2 mt-4 border-bottom" style={{padding: '1rem 0'}}>Welcome to Challenge 4</h1>
						<br />
						<Container>
							<div className="card" style={{width: '18rem', margin: 'auto'}}>
								<div className="card-body bg-dark text-light">
									<div className="card-title">
										Log in
									</div>
									<hr color="lightgray"/>
									<div className="card-text">
										<div id="invalLog" />
										<form className="form-group">
											<input 
												value={username} 
												className="form-control" 
												placeholder="username" 
												style={{'marginTop': '0.2rem'}} 
												onChange= { e => dispatch({type: 'UPDATE_USER', payload: e.target.value})} 
											/>
											<input 
												value={password} 
												className="form-control" 
												type="password" 
												placeholder="password" 
												style={{'marginTop': '0.4rem'}} 
												onChange={e => dispatch({type: 'UPDATE_PASS', payload: e.target.value})}
											/>
											<Button color="primary" type="submit" style={{'marginLeft': '69%', 'marginTop': '0.4rem', 'display': 'inline-block'}}>Submit</Button>
										</form>
										<div style={{marginLeft: '10%'}}>
											<Button 
												color="link" 
												onClick={() => {
													dispatch({type: 'CLEAR_ALL'}); 
													dispatch({type: 'SET_TAB', payload: 'STANDARD'})
												}}>return
											</Button>
											<Button color="link" onClick={() => {dispatch({type: 'CLEAR_ALL'}); dispatch({type: 'SET_TAB', payload: 'REGISTER'})}}>register</Button>
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
					<h1 className="pb-2 mt-4 border-bottom" style={{padding: '1rem 0'}}>Welcome to Challenge 4</h1>
						<br />
						<Container>
							<div className="card" style={{width: '18rem', margin: 'auto'}}>
								<div className="card-body bg-dark text-light">
									<div className="card-title">
										Register
									</div>
									<hr color="lightgray"/>
									<div className="card-text">
										<div className="text-warning" id="invalReg" />
										<form className="form-group" onSubmit={register}>
											<input 
												value={username}
												onChange={e => dispatch({type: 'UPDATE_USER', payload: e.target.value})}
												className="form-control" 
												placeholder="username" 
												style={{'marginTop': '0.2rem'}} />
											<input 
												value={password}
												onChange={e => dispatch({type: 'UPDATE_PASS', payload: e.target.value})}
												className="form-control" 
												type="password" 
												placeholder="password" 
												style={{'marginTop': '0.4rem'}} />
											<input 
												value={confirm}
												onChange={e => dispatch({type: 'UPDATE_CONFIRM', payload: e.target.value})}
												className="form-control" 
												type="password" 
												placeholder="confirm password" 
												style={{'marginTop': '0.4rem'}} />
											<Button color="primary" type="submit" style={{'marginLeft': '69%', 'marginTop': '0.4rem'}}>Submit</Button>
										</form>
										<div style={{marginLeft: '10%'}}>
											<Button 
												color="link" 
												onClick={ () => {
													dispatch({type: 'SET_TAB', payload: 'STANDARD'});
													dispatch({type: 'CLEAR_ALL'});
											}}>return</Button>
											<Button 
												color="link" 
												onClick={() => {
													dispatch({type: 'SET_TAB', payload: 'LOGIN'});
													dispatch({type: 'CLEAR_ALL'});
											}}>login</Button>
										</div>
									</div>
									<div className='text-success' id="success"></div>
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
							<div className="card" style={{width: '18rem', margin: 'auto'}}>
								<div className="card-body bg-dark text-light">
									<div className="card-title">
										Cookie Stealing
									</div>
									<hr color="lightgray"/>
									<div className="card-text">
										This site has been hi-jacked by some script kiddies. 
										You're job is to jack it back. See if you can't find a
										way to reclaim the admin account.
										<br />
										<div style={{marginLeft: '10%'}}>
											<Button 
												color="link" 
												onClick={() => dispatch({type: 'SET_TAB', payload: 'REGISTER'})}
												>register
											</Button>
											<Button 
												color="link" 
												onClick={() => dispatch({type: 'SET_TAB', payload: 'LOGIN'})}
												>login
											</Button>
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
