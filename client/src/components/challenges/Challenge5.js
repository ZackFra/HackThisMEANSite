import React, { useEffect, useCallback } from 'react';
import { Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Title } from '../../StyleSheet';
import Victory from './Victory';
import Panel from './Panel';
import regexWorker from './Challenge5/regexWorker';
import WebWorker from './Challenge5/setupWorker';

function Challenge5() {
	const {query, tab} = useSelector( state => state.challenge5 );
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
		}, 10000);
		
		// when the worker responds
		// tell the worker to kill itself
		worker.onmessage = e => {
			clearTimeout(killWorker);
			dispatch({type: 'SET_TAB', payload: 'STANDARD'});

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
						placeholder='search' 
						value={query} 
						onChange={e => dispatch({type: 'SET_QUERY', payload: e.target.value})}
					/>
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

	// waiting for regex to respond panel
	function WaitingPanel() {
		return (
			<div>Waiting...</div>
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
						content='So this search bar seems to verify results via a regex... you know what to do.'
						innerComponent={WaitingPanel}
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
						content='So this search bar seems to verify results via a regex... you know what to do.'
						innerComponent={InnerPanel}
					/>
				</Container>
			);
	}
}


export default Challenge5;