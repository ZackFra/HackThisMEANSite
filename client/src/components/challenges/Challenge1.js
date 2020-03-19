import React, { Component } from 'react';
import {Container} from 'reactstrap';

class Challenge0 extends Component {

	// authentication script
	authenticate = (e) => {
		e.preventDefault();
		if(e.target[0].value === '{$exists: true}') {
			const ft = document.querySelector('#invalid')
			ft.className = 'form-text text-success';
			ft.innerText="Correct!";
			window.location = '/Victory1';
		} else {
			const ft = document.querySelector('#invalid');
			const pass = document.getElementById('password');
			ft.innerText="Incorrect Password";
			pass.value = '';
		}
	}

	render() {
		return (
			<Container>
				<script>{this.inject}</script>
				<h1 className="pb-2 mt-4 border-bottom" style={{padding: '1rem 0'}}>Welcome to Challenge 0</h1>
				<br />
				<Container>
					<div className="card" style={{width: '18rem', margin: 'auto'}}>
						<div className="card-body bg-dark text-light">
							<div className="card-title">
								Gotta Love the Classics
							</div>
							<hr color="lightgray"/>
							<div className="card-text">
								Did you know that Mongo databases can be injected just like SQL databases?
							</div>
							<br />
							<form className="form-group" onSubmit={this.authenticate}>
								<label className="form-text text-warning" id="invalid"></label>
								<label className="form-control" htmlFor="password">
									Password:
								</label>
								<input className="form-control" type="password" id="password"/>
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

export default Challenge0;