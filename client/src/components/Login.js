import React, { Component } from 'react';
import {Container} from 'reactstrap';

class Login extends Component {

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
								<input className="form-control" type="text" placeholder="username" style = {{'marginBottom': '0.7rem'}}/> 
								<input className="form-control" type="password" placeholder="password" />
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

export default Login;