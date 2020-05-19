import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Container, Button, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { postPoem } from '../../actions';
import { Title } from '../../StyleSheet';
import Victory from './Victory';
import basePoems from './Challenge4/poems';
import uuid4 from 'uuid4';

function Challenge4() {
	const {message, title, tab, poems, poemId} = useSelector(state => state.challenge4);
	const dispatch = useDispatch();

	// component to link to a rendered poem
	function PoemButton(props) {
		const state = useState({id: props.id, title: props.title})[0];
		return (
			<Button 
				key={state.id} 
				onClick={() => viewPoem(state.id)}
				style={{margin: '0.1rem', width: '90%', textAlign: 'left'}}>
				{`${state.title}.json`}
			</Button>
		);
	}

	useEffect( () => {
		console.warn("./src/components/challenges/Challenge4.js\nLine 133:28:  eval can be harmful  no-eval");
		dispatch({type: 'SET_POEMS', payload: basePoems});
	}, [dispatch]);

	useEffect( () => {

		if(tab === 'VIEW_POEM') {
			const poem = document.getElementById('poem');
			for(let child of poem.children) {
				if(child.children.length > 0) {
					ReactDOM.render(<Button color='link' onClick={e => dispatch({type: 'SET_TAB', payload: 'VICTORY'})}>Click me</Button>, document.getElementById('success'));
					break;
				}
			}
		}
	}, [dispatch, tab]);

	function viewPoem(index) {
		dispatch({type: 'SET_ID', payload: index});
		dispatch({type: 'SET_TAB', payload: 'VIEW_POEM'});
	}

	switch(tab) {
		case 'VICTORY':
			return <Victory title='CONGRATULATIONS :)' message='You hacked challenge 4' />
		case 'VIEW_POEM':
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 4' />
					<Row>
						<Col sm='1'>
							<Button style = {{marginLeft: '1rem'}} color='link' onClick={() => dispatch({type: 'SET_TAB', payload: 'POEMS'})}>
								Back
							</Button>
						</Col>
						<Col sm='2'>
							<div id='success' />
						</Col>
					</Row>
					<div className='overflow-auto' style={{color: 'white', height: '60vh', marginLeft: '2vw'}}>
						<br />
						<h2><div dangerouslySetInnerHTML = {{__html: poems[poemId].title }}/></h2>
						<br />
						<div id='poem'>
							{ (poems[poemId].message !== undefined) ? poems[poemId].message.split('\n').map(line => <div key={uuid4()} dangerouslySetInnerHTML = {{__html: line}} />) : <div className='text-warning'>Error Reading Poem</div>}
						</div>
					</div>
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
								<hr color="lightgray" />
								<div className='overflow-auto' style={{height: '40vh'}}>
								{poems.map( (poem, i) => <div key={uuid4()}><PoemButton key={uuid4()} id={i} title={poem.title} /><br /></div> )}
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
										<Button color='link' onClick={() => dispatch({type: 'SET_TAB', payload: 'SUBMIT'})}>
											Submit
										</Button>
									</Col>
									<Col xs='2' />
								</Row>
							</div>
						</div>
					</Container>
				</Container>
			);
		case 'SUBMIT':
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 4' />
					<br />
					<Container>
						<div className="card" style={{width: '60%', margin: 'auto', maxHeight: '90%'}}>
							<div className="card-body secondary-bg text-light">
								<div className="card-title">
									Submit a poem :)
								</div>
								<hr color="lightgray"/>
								<div className="card-text">
									<form className='form-group' onSubmit= {
										async e => {
											e.preventDefault();
											try {
												// escape all the new lines before the eval	
												// eslint-disable-next-line	
												let JSONpoem = eval(`(function () { return '{"title": "${title.replace(/\r?\n/g, "\\n")}", "message": "${message.replace(/\r?\n/g, "\\n")}"}'})()`);

												// escape new lines created by the eval
												JSONpoem = JSONpoem.replace(/\r?\n/g, "\\n");
												
												const poem = await postPoem(JSONpoem);

												dispatch({type: 'UPDATE_POEMS', payload: poem});
												dispatch({type: 'SET_TAB', payload: 'POEMS'});
											}
											catch(e) {
												console.error(e);
												dispatch({type: 'SET_TAB', payload: 'POEMS'});
											}
										}
									}>
										<input className='form-control' value={title} type='text' placeholder='title' onChange={e => dispatch({type: 'SET_TITLE', payload: e.target.value})}/>
										<textarea className='form-control form-text' value={message} style={{resize: 'none'}} placeholder='message' onChange={e => dispatch({type: 'SET_MESSAGE', payload: e.target.value})}/>
										<Button color='primary' type='submit' style={{marginTop: '0.2rem'}}>Submit</Button>
									</form>
								</div>
								<br />
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
										<Button color='link' onClick={() => dispatch({type: 'SET_TAB', payload: 'SUBMIT'})}>
											Submit
										</Button>
									</Col>
									<Col xs='2' />
								</Row>
							</div>
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
									So this site is a user-submitted poetry collection. See if you can't embed something malicious in one of the poems.
								</div>
								<br />
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
										<Button color='link' onClick={() => dispatch({type: 'SET_TAB', payload: 'SUBMIT'})}>
											Submit
										</Button>
									</Col>
									<Col xs='2' />
								</Row>
							</div>
						</div>
					</Container>
				</Container>
			);
	}
}

export default Challenge4;
