import React, { useEffect, useCallback } from 'react';
import { Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Title } from '../../StyleSheet';
import Victory from './Victory';
import Panel from './Panel';

function Challenge0() {
	const { pass, tab } = useSelector(state => state.challenge0 );
	const dispatch = useDispatch();


	// handles login auth
	const login = useCallback( e => {
		e.preventDefault();

		const ft = document.querySelector('#invalid');
		if(pass === 'L33tHax') {
			dispatch({type: 'LOGIN_SUCCESS'});
			ft.className = 'form-text text-success';
			ft.innerText="Correct!";
			dispatch({type: 'SET_TAB', payload: 'VICTORY'});
		} else {
			dispatch({type: 'LOGIN_FAIL'});
			ft.innerText="Incorrect Password";
		}

		dispatch({type: 'UPDATE_PASS', payload: ''});
	}, [dispatch, pass]);

	const innerPanel = useCallback(() => {
		return (
			<form className="form-group" onSubmit={e => login(e)} dangerouslysetattributes={{onsubmit: 'authenticate()'}}>
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
		);
	}, [dispatch, login, pass]);

	// onsubmit added for realism
	useEffect( () => {
		// eslint-disable-next-line
		window.eval('function authenticate(){return 1}');
	}, [innerPanel]);

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

	switch(tab) {
		case 'VICTORY':
			return <Victory title='CONGRATULATIONS :)' message='You hacked challenge 0!' />
		default:
			return (
				<Container className='foreground-bg'>
					<script>{inject}</script>
					<Title title='Welcome to Challenge 0' />
					<br />
					<Panel 
						title='Sanity Test' 
						content='Whoever made this test knows nothing about security. This is as basic as it gets.'
						innerComponent={innerPanel}
					/>
				</Container>
			);
	}
}


export default Challenge0;