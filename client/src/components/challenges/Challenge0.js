import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import {Container, Button} from 'reactstrap';
import ReactDOM from 'react-dom';

class Challenge0 extends Component {
	constructor() {
		super();
		this.inject = "auth = (e) => {\n\te.preventDefault();\n\tif(e.target[0].value === 'L33tHax') {\n\t\twindow.location = '/Victory0';\n\t} else {\n\t\tconst ft = document.querySelector('[class=text-danger]');\n\t\tconst pass = document.getElementById('password');\n\t\tft.innerText=`Invalid Password`;\n\t\tpass.value = '';\n\t}\n}";
	}

	// authentication script
	auth = (e) => {
		e.preventDefault();
		if(e.target[0].value === 'L33tHax') {
			window.location = '/Victory0';
		} else {
			const ft = document.querySelector('[class=text-danger]');
			const pass = document.getElementById('password');
			ft.innerText="Invalid Password";
			pass.value = '';
		}
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
								Whoever made this test knows nothing about security. This is as basic as it gets.
							</div>
							<br />
							<form className="form-group" onSubmit={this.auth}>
								<label className="form-text"><div className='text-danger'></div></label>
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