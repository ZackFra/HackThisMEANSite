import React, { useEffect, useCallback } from 'react';
import { Container, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Title } from '../../StyleSheet';
import Victory from './Victory';
import Panel from './Panel';
import regexWorker from './Challenge5/regexWorker';
import WebWorker from './Challenge5/setupWorker';

function Challenge5() {
	const {query, tab, added} = useSelector( state => state.challenge5 );
	const dispatch = useDispatch();

	const submit = useCallback( e => {
		e.preventDefault();

		// here we create the WebWorker modelled off of
		// https://www.newline.co/fullstack-react/articles/introduction-to-web-workers-with-react
		let worker = new WebWorker(regexWorker);
		
		// kill the worker if it takes too long
		// set the screen to victory
		let killWorker = setTimeout(() => {
			worker.terminate();
			dispatch({type: 'SET_TAB', payload: 'VICTORY'});
		}, 45000);
		
		// when the worker responds
		// tell the worker to kill itself
		worker.onmessage = e => {
			clearTimeout(killWorker);
			dispatch({type: 'SET_QUERY', payload: ''});
			dispatch({type: 'SET_ADDED', payload: e.data});
			dispatch({type: 'SET_TAB', payload: 'DONE'});

			// tell it to kill itself
			worker.terminate()
		};

		worker.postMessage(query);

		dispatch({type: 'SET_TAB', payload: 'WAITING'});

	})

	const InnerPanel = useCallback(() => {
		if(window.Worker) {
			return (
				<form className="form-group" onSubmit={submit}>
					<input 
						className='form-control'
						placeholder='email@website.com' 
						value={query} 
						onChange={e => dispatch({type: 'SET_QUERY', payload: e.target.value})}
					/>
					<Button color='primary' type='submit' style={{marginTop: '0.5rem'}}>Submit</Button>
				</form>
			);
		}

		return (
			<div className='text-warning'>
				Unfortunately you need web workers in order to run this challenge.
				Please try this page again with a more recent browser.
			</div>
		)
	}, [query, dispatch, submit]);

	const DonePanel = useCallback( () => {
		return (
			<Button 
				color='link' 
				onClick={() => {
					dispatch({type: 'SET_ADDED', payload: false});
					dispatch({type:'SET_TAB', payload: 'STANDARD'});
				}}
				>Back
			</Button>
		);
	}, [dispatch]);

	// waiting for regex to respond panel
	function WaitingPanel() {
		return (
			<div>Verifying...</div>
		)
	}

	switch(tab) {
		case 'VICTORY':
			return <Victory title='CONGRATULATIONS :)' message='You hacked challenge 5!' />
		case 'WAITING':
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 5' />
					<br />
					<Panel 
						title='ReDoS attack' 
						content='This should only take a second.'
						innerComponent={WaitingPanel}
					/>
				</Container>
			);
		case 'DONE':
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 5' />
					<br />
					<Panel 
						title='ReDoS attack' 
						content={added ? 'Finished! :)' : 'Invalid email: failed to add to mailing list :('}
						innerComponent={DonePanel}
					/>
				</Container>
			);
		default:
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 5' />
					<br />
					<Panel 
						title='ReDoS attack' 
						content='Hey! Welcome to EvilRegex.com! If you would like to add yourself to our mailing list, enter your email right here! :)'
						innerComponent={InnerPanel}
					/>
				</Container>
			);
	}
}


export default Challenge5;