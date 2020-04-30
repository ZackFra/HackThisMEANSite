import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Title } from '../../StyleSheet';

function Challenge0() {
	const { pass } = useSelector(state => state);
	const dispatch = useDispatch();


	// onsubmit added for realism
	useEffect( () => {
		// eslint-disable-next-line
		window.eval('function authenticate(){return 1}');
		document.querySelector('form').setAttribute('onsubmit', 'authenticate()');
	}, []);

	function login(e) {
		e.preventDefault();

		const ft = document.querySelector('#invalid');
		if(pass === 'L33tHax') {
			dispatch({type: 'LOGIN_SUCCESS'});
			ft.className = 'form-text text-success';
			ft.innerText="Correct!";
			window.location = '/Victory0';
		} else {
			dispatch({type: 'LOGIN_FAIL'});
			ft.innerText="Incorrect Password";
		}

		dispatch({type: 'UPDATE_PASS', payload: ''});
	}

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
		<Container className='foreground-bg'>
			<script>{inject}</script>
			<Title title='Welcome to Challenge 0' />
			<br />
			<Container>
				<div className="card" style={{width: '18rem', margin: 'auto'}}>
					<div className="card-body secondary-bg text-light">
						<div className="card-title">
							Sanity Test
						</div>
						<hr color="lightgray"/>
						<div className="card-text">
							Whoever made this test knows nothing about security. This is as basic as it gets.
						</div>
						<br />
						<form className="form-group" onSubmit={e => login(e)}>
							<label className="form-text text-warning" id="invalid"></label>
							<label className="form-control" htmlFor="password">
								admin
							</label>
							<input className="form-control" type="password" placeholder='password' value={pass} onChange={e => dispatch({type: 'UPDATE_PASS', payload: e.target.value})}/>
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


export default Challenge0;