import React, { Component, useState } from 'react';
import {Container} from 'reactstrap';

// redux stuff
import { login } from '../actions/';
import { connect } from 'react-redux';

function Login(props) {
	const [state, setState] = useState({user: '', pass: ''});

	const onChange = e => {
		switch(e.target.name) {
			case 'user':
				setState(prevState => ({user: e.target.value, pass: prevState.pass}));
			case 'pass':
				setState(prevState => ({user: prevState.user, pass: e.target.value}));
			default:
				return
		}
		console.log(state);
	}

	const authenticate = async e => {
		e.preventDefault();
		console.log(state);
		await props.login(state);
		//window.location = '/';
	}

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
							<label className="form-text text-warning" id="invalid"></label>
							<input 
								className="form-control" 
								name='user'
								value = {state.user}
								onChange = {onChange}
								type="text" 
								placeholder="username" 
								style = {{'marginBottom': '0.7rem'}}
							/> 
							<input 
								className="form-control"
								name='pass'
								value = {state.pass} 
								onChange = {onChange}
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
					</div>
				</div>
			</Container>
		</Container>
	);
}


export default connect(null, { login })(Login);