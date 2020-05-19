import React, { useCallback } from 'react';
import { Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { login1 } from '../../actions';
import { Title } from '../../StyleSheet';
import Panel from './Panel';
import Victory from './Victory';

function Challenge1() {
	const {pass, tab} = useSelector(state => state.challenge1);
	const dispatch = useDispatch();

	// authentication script
	const authenticate = useCallback(e => {
		e.preventDefault();
		login1({pass: pass})
		.then(res => {
			if(res === true) {
				dispatch({type: 'SET_TAB', payload: 'VICTORY'});
			} else if(res === false) {
				document.getElementById('invalid').innerHTML='Invalid Password';
			}
		})
		.catch(err => {
			document.getElementById('invalid').innerHTML='Internal Server Error';
		});

		dispatch({type: 'UPDATE_PASS', payload: ''});
	}, [pass, dispatch]);

	const InnerPanel = useCallback( props => {
		return (
			<form className="form-group" onSubmit={authenticate}>
				<label className="form-text text-warning" id="invalid" />
				<label className="form-control" htmlFor="password">
					admin
				</label>
				<input 
					className="form-control" 
					type="password" 
					placeholder='password' 
					value={pass} 
					onChange={e => dispatch({type: 'UPDATE_PASS', payload: e.target.value})}	
				/>
				<button 
					className="btn btn-primary"
					type="submit" 
					style={{padding: "0 1rem", marginTop: "0.7rem"}}
					>
					Submit</button>
			</form>
		);
	}, [dispatch, pass, authenticate]);

	switch(tab) {
		case 'VICTORY':
			return <Victory title='CONGRATULATIONS :)' message='You hacked challenge 1' />
		default:
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 1' />
					<br />
					<Container>
						<Panel 
							title={'Gotta Love the Classics'} 
							content={'Did you know you that Mongo databases can be injected too?'}
							innerComponent={InnerPanel} 
						/>
					</Container>
				</Container>
			);
	}
}

export default Challenge1;
