import React, { Component } from 'react';
import {Container} from 'reactstrap';

class Challenge0 extends Component {
	constructor() {
		super();
		this.inject = 	"function authenticate() {\n" +
						"	const pass = document.getElementById('password');\n" +
						"	const ft=document.querySelector('#invalid');\n" +
						"	if(pass.value === 'L33tHax') {\n" +
						"		ft.class = 'form-text text-success';\n" +
						"		ft.innerText = 'Correct!';\n" +
						"		window.location = '/Victory0';\n" +
						"	} else {\n" +
						"		ft.innerText='Incorrect Password';\n" +
						"		pass.value = '';\n" +
						"	}\n" +
						"}\n";
		this.state = {
			pass: ''
		};
	}

	componentDidMount() {
		document.querySelector('form').setAttribute('onsubmit', 'authenticate()');

		// is actually overwritten by authenticate serverside
		// but gets rid of a warning clientside
		window.eval(this.inject);
	}

	// authentication script
	authenticate = (e) => {
		e.preventDefault();
		if(e.target[0].value === 'L33tHax') {
			const ft = document.querySelector('#invalid')
			ft.className = 'form-text text-success';
			ft.innerText="Correct!";
			window.location = '/Victory0';
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
								Sanity Test
							</div>
							<hr color="lightgray"/>
							<div className="card-text">
								Whoever made this test knows nothing about security. This is as basic as it gets.
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