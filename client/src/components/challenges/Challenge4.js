import React, { useCallback, useEffect, useState } from 'react';
import { Container, Button, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Title } from '../../StyleSheet';
import Victory from './Victory';
import basePoems from './Challenge4/poems';
import uuid4 from 'uuid4';

function Challenge4() {
	const {message, title, tab, poems, poemId} = useSelector(state => state.challenge4);
	const dispatch = useDispatch();

	function PoemButton(props) {
		const [state, _] = useState({id: props.id, title: props.title});
		return <Button key={state.id} onClick={() => viewPoem(state.id)}>{`${state.title}.json`}</Button>
	}

	useEffect( () => {
		dispatch({type: 'SET_POEMS', payload: basePoems});
	}, [dispatch]);

	function viewPoem(index) {
		dispatch({type: 'SET_ID', action: index});
		dispatch({type: 'SET_TAB', action: 'VIEW_POEM'});
	}

	switch(tab) {
		case 'VICTORY':
			return <Victory title='CONGRATULATIONS :)' message='You hacked challenge 4' />
		case 'VIEW_POEM':
			return (
				<Container>
					{poems[poemId].title}
					<br />
					{poems[poemId].message}
				</Container>
			);
		case 'POEMS':
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 4' />
					<br />
					<Container>
						<div className="card" style={{width: '60%', margin: 'auto', maxHeight: '90%'}}>
							<div className="card-body secondary-bg text-light">
								<div className="card-title">
									Prototype Pollution
								</div>
								<hr color="lightgray"/>
								{poems.map( (poem, i) => <PoemButton key={uuid4()} id={i} title={poem.title} /> )}
								<br />
							</div>
							<Row>
								<Col xs='2'/>
								<Col>
									<Button color='link' onClick={() => dispatch({type: 'SET_TAB', payload: 'STANDARD'})}>
										Home
									</Button>
								</Col>
								<Col>
									<Button color='link' onClick={() => dispatch({type: 'SET_TAB', payload: 'POEMS'})}>
										Poems
									</Button>
								</Col>
								<Col>
									<Button color='link' onClick={() => dispatch({type: 'SET_TAB', payload: 'SUBMIT_POEM'})}>
										Submit
									</Button>
								</Col>
								<Col xs='2' />
							</Row>
						</div>
					</Container>
				</Container>
			);
		default:
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 4' />
					<br />
					<Container>
						<div className="card" style={{width: '60%', margin: 'auto', maxHeight: '90%'}}>
							<div className="card-body secondary-bg text-light">
								<div className="card-title">
									Prototype Pollution
								</div>
								<hr color="lightgray"/>
								<div className="card-text">
									So this site is a user-submitted poetry collection app. See if you can't embed something malicious in one of the poems.
								</div>
								<br />
							</div>
							<Row>
								<Col xs='2'/>
								<Col>
									<Button color='link' onClick={() => dispatch({type: 'SET_TAB', payload: 'STANDARD'})}>
										Home
									</Button>
								</Col>
								<Col>
									<Button color='link' onClick={() => dispatch({type: 'SET_TAB', payload: 'POEMS'})}>
										Poems
									</Button>
								</Col>
								<Col>
									<Button color='link' onClick={() => dispatch({type: 'SET_TAB', payload: 'SUBMIT_POEM'})}>
										Submit
									</Button>
								</Col>
								<Col xs='2' />
							</Row>
						</div>
					</Container>
				</Container>
			);
	}
}

export default Challenge4;
