import React, { Component } from 'react';
import {Container} from 'reactstrap';
import axios from 'axios';

class Challenge0 extends Component {

	// authentication script
	authenticate = (e) => {
		e.preventDefault();
		const request = {user: 'admin', pass: e.target[0].value};

		axios.post('/Challenge1/login', request)
			.then( res => {
				if(res.data.length > 0) {
					const ft = document.querySelector('#invalid')
					ft.className = 'form-text text-success';
					ft.innerText="Correct!";
					window.location = '/Victory1';
				} else {
					res.config.url = "localhost:5000" + res.config.url;
					const ft = document.querySelector('#invalid');
					const pass = document.getElementById('password');
					ft.innerText="Incorrect Password";
					pass.value = '';
				}
				console.log(res.config);
			})
			.catch( err => console.log(err));
	}

	render() {
		return (
			<Container>
				<script>{this.inject}</script>
				<h1 className="pb-2 mt-4 border-bottom" style={{padding: '1rem 0'}}>Welcome to Challenge 1</h1>
				<br />
				<Container>
					<div className="card" style={{width: '18rem', margin: 'auto'}}>
						<div className="card-body bg-dark text-light">
							<div className="card-title">
								Gotta Love the Classics
							</div>
							<hr color="lightgray"/>
							<div className="card-text">
								It looks like someone goofed and left a console.log somewhere while developing this site. Also, did you know you that MongoDB can be injected just like a SQL database?
							</div>
							<br />
							<form className="form-group" onSubmit={this.authenticate}>
								<label className="form-text text-warning" id="invalid"></label>
								<label className="form-control" htmlFor="password">
									User: admin
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
