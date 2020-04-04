import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { connect } from 'react-redux';
import { updatePass, login_challenge0 } from '../../actions';

class Challenge0 extends Component {

	componentDidMount() {
		// is actually overwritten, but this gets rid
		// of a warning in the console
		window.eval('function authenticate(){return 1}');
		document.querySelector('form').setAttribute('onsubmit', 'authenticate()');
	}

	// authentication script
	authenticate = e => {
		e.preventDefault();
		this.props.login_challenge0({pass: this.props.pass});
	}

	render() {
		const inject =  "function authenticate() {\n" +
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
		return (
			<Container>
				<script>{inject}</script>
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
								<input className="form-control" type="password" id="password" onChange={this.props.updatePass}/>
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


const mapStatesToProps = state => ({pass: state.pass});
export default connect(mapStatesToProps, {updatePass, login_challenge0})(Challenge0);