import React, { Component, useState } from 'react';
import {Container} from 'reactstrap';

// redux stuff
import { login } from '../actions/';
import { connect } from 'react-redux';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			pass: ''
		}
	}

	onChange = e => {
		this.setState({[e.target.name]: e.target.value})
	}

	authenticate = async e => {
		e.preventDefault();
		await this.props.login(this.state);
	}

	render() {
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
							<form className="form-group" onSubmit={this.authenticate}>
								<label className="form-text text-warning" id="invalid"></label>
								<input 
									className="form-control" 
									name='user'
									value = {this.state.user}
									onChange = {this.onChange}
									type="text" 
									placeholder="username" 
									style = {{'marginBottom': '0.7rem'}}
								/> 
								<input 
									className="form-control"
									name='pass'
									value = {this.state.pass} 
									onChange = {this.onChange}
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
}

const mapStateToProps = state => ({ user: state.account.user });

export default connect(mapStateToProps, { login })(Login);