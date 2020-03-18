import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import {Container, Button} from 'reactstrap';
import ReactDOM from 'react-dom';

class Challenge0 extends Component {
	constructor() {
		super();
		this.inject = '\n\tfunction auth(e) {\n\t\te.preventDefault()\n\t\tif(e.target[0].value === "1234") {\n\t\t\t// do stuff that you do not need to worry about\n\t\t}\n\t}\n';
	}

	auth = (e) => {
		e.preventDefault();
		console.log(e.target[0].value);
		if(e.target[0].value === '1234') {
			window.location = '/Victory0';
		} else {
			const ft = document.querySelector('[class=form-text]');
			const pass = document.getElementById('password');
			ft.innerHTML='<div class="text-danger">Invalid Password</div>';
			pass.value = '';
		}
	}

	componentDidMount() {
		const form = document.querySelector('form');
	}

	render() {
		return (
			<Container>
				<script>{this.inject}</script>
				<h1 style={{padding: '1rem 0'}}>Welcome to Challenge 0</h1>
				<br />
				<Container>
					<div className="card" style={{width: '18rem', margin: 'auto'}}>
						<div className="card-body">
							<div className="card-title">
								Sanity Test
							</div>
							<hr/>
							<div className="card-text">
								Whoever made this test know's nothing about security. This is as basic as it gets.
							</div>
							<br />
							<form className="form-group" onSubmit={this.auth}>
								<label className="form-text"> </label>
								<label className="form-control" htmlFor="password">
									Password:
								</label>
								<input className="form-control" type="password" id="password"/>
								<Button 
									type="submit" 
									style={{padding: "0 1rem", marginTop: "0.5rem"}}
									>
									Submit</Button>
							</form>
						</div>
					</div>
				</Container>
			</Container>
		);
	}
}

export default Challenge0;