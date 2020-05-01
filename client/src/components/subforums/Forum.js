import React, { useEffect, useCallback } from 'react';
import { Container, Nav, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listPosts, getPosts, postMessage, createPost } from '../../actions';
import { verify } from 'jsonwebtoken';
import uuid4 from 'uuid4';
import env from '../../.env.js';
import { Title } from '../../StyleSheet';

// generic Forum component
function Forum(props) {
	const { posts, postId, view, tab } = useSelector(state => state.forum);
	const { message } = useSelector(state => state.postMessage);
	const { initmessage, title } = useSelector(state => state.createPost);
	const { token } = localStorage;
	const { forum, forumTitle } = props;
	const dispatch = useDispatch();

	// allow post creation if user logged in
	const allowCreation = useCallback( () => {
		const { token } = localStorage;
		try {
			verify(token, env.jwtseed);
			return <Button 
				color="link" 
				onClick={
					() => dispatch({type: 'SET_TAB', payload: 'CREATE_POST'})
				}
			>Create Post</Button>
		} catch(e) {
			return;
		}
	}, [dispatch]);

	// submit handler for creating a post
	const createPostSubmit = useCallback( async e => {
		e.preventDefault();

		// if createPost fails
		const created = await createPost(forum);
		if(created === false) {
			const inval = document.querySelector('[id=invalid]');

			if(title === '') {
				inval.innerText = 'Title cannot be blank.';
			} else if(message === '') {
				inval.innerText = 'Message cannot be blank.';
			} else {
				inval.innerText = 'Internal server error. Try again later.';
			}
		} else {
			posts.unshift(created);
			dispatch({type: 'SET_POST', payload: created._id});
			dispatch({type: 'SET_POST_ID', payload: 0});
			dispatch({type: 'SET_TAB', payload: 'VIEW_POST'});
			dispatch({type: 'UPDATE_TITLE', payload: ''});
			dispatch({type: 'UPDATE_CREATE_MESSAGE', payload: ''})
		}
	}, [dispatch, forum, message, posts, title]);

	// if user logged in, allow them to create message
	const allowMakeMessage = useCallback( post => {
		try {
			verify(token, env.jwtseed);
			return (
				<Button color="link" onClick = {() => {
					dispatch({type: 'SET_TAB', payload: 'POST_MESSAGE'});
				}}>New Message</Button>
			);
		}
		catch(e) {
			return ;
		}
	}, [dispatch, token]);

	// submit a new message to be posted
	const submitMessage = useCallback( async e => {
		e.preventDefault();
		const inval = document.querySelector('[id=invalid]');
		
		// verify that the user is logged in
		try {
			verify(localStorage.getItem('token'), env.jwtseed);
		}
		catch(e) {
			inval.innerText = 'Internal server error. Try again later.';
			return;
		}

		const posted = await postMessage();

		// if createPost fails
		if(posted === false) {	
			if(message === '') {
				inval.innerText = 'Message cannot be blank.';
			} else {
				inval.innerText = 'Internal server error. Try again later.';
			}
		} else {
			dispatch({type: 'SET_TAB', payload: 'VIEW_POST'});
			dispatch({type: 'UPDATE_POST_MESSAGE', payload: ''});
			posts[postId].content.push(posted);
		}
	}, [dispatch, posts, postId, message]);


	// standard view, it takes a second for the initial get request
	// so while the user waits, this jsx is rendered. Might remove later.
	const standard = (
		<Container style={{height: '88vh'}}>
				<Nav>
					<div className="card" style={{width: '100%', margin: 'auto'}}>
						<div className="card-body secondary-bg">
							<Title title={forumTitle} />
							{allowCreation()}
							<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
								<ul className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll', listStyleType: 'none'}}>
									<li key={uuid4()} style={{backgroundColor: '#637074', color: '#8AB0AB', width: '95%', padding: '1rem', border: '1px solid black', borderRadius: '5px'}}>
										<div className='row'>
											<div className='col-sm'>Topic</div>
											<div className='col-sm'>Poster</div>
											<div className='col-sm'>Last Updated</div>
										</div>
									</li>			
								</ul>

							</div>
						</div>
					</div>
				</Nav>
		</Container>
	);

	// dynamically generate page as tab changes
	// wrapped in useEffect to prevent infinite
	// get requests for forum posts
	useEffect( () => {
		switch(tab) {
			case 'CREATE_POST':
				dispatch({type: 'SET_VIEW', payload:
					<Container>
						<div className="card" style={{width: '100%', margin: 'auto', height: '88vh'}}>
							<div className="card-body secondary-bg">
								<Title title='Create Post' />
								<Button color="link" onClick= {() => {
									dispatch({type: 'SET_TAB', payload: 'STANDARD'});
								}}>
								Back</Button>
								<div className="card-body" id='content' style={{'width': '100%', 'overflow': 'scroll', paddingBottom: '0'}}>
									<form className="form-group-sizing-lg" onSubmit={createPostSubmit}>
										<div id='invalid' className='text-warning'/>
	
										{/* @todo add recaptcha */}
										<input 
											className="form-text form-bg" 
											value={title} 
											onChange={e => dispatch({type: 'UPDATE_TITLE', payload: e.target.value})} 
											type="text" 
											placeholder="title" 
											style={{border: '1px', 'width': '100%', 'padding': '0.5rem'}} />
										<textarea 
											className="form-text form-bg" 
											value={initmessage} 
											onChange={e => dispatch({type: 'UPDATE_CREATE_MESSAGE', payload: e.target.value})} 
											placeholder="message" 
											style={{'width': '100%', 'height': '16rem', 'padding': '0.5rem', 'resize': 'none'}} />
										<button type="submit" className="btn btn-outline-primary" style={{'float': 'right', 'marginTop': '0.3rem'}}>Submit</button>
									</form>
								</div>
							</div>
						</div>
					</Container>
				});
				break;
			case 'POST_MESSAGE':
				dispatch({type: 'SET_VIEW', payload:
					<Container style={{height: '88vh'}}>
						<div className="card" style={{width: '100%', margin: 'auto', height: '88vh'}}>
							<div className="card-body secondary-bg">
								<Title title='Post Message' />
								<Button color="link" onClick= {() => {
										dispatch({type: 'SET_TAB', payload: 'VIEW_POST'});
								}}>
								Back</Button>
								<div className="card-body" id='content' style={{'height': '65%', 'width': '100%', 'overflow': 'scroll', paddingBottom: '0'}}>
									<form className="form-group-sizing-lg" onSubmit={submitMessage}>
										<div id='invalid' className='text-warning'/>

										{/* @todo add recaptcha */}
										<textarea 
											className="form-text" 
											value={message} 
											onChange={e => dispatch({type: 'UPDATE_POST_MESSAGE', payload: e.target.value})}
											placeholder="message" 
											style={{'width': '100%', 'height': '16rem', 'padding': '0.5rem', 'resize': 'none'}} 
										/>
										<button type="submit" className="btn btn-outline-primary" style={{'float': 'right', 'marginTop': '0.3rem'}}>Submit</button>
									</form>
								</div>
							</div>
						</div>
					</Container>
				})
				break;
			case 'STANDARD':
				dispatch({type: 'SET_VIEW', payload: 
					<Container>
						<Nav>
							<div className="card" style={{width: '100%', margin: 'auto', height: '88vh'}}>
								<div className="card-body secondary-bg">
									<Title title={forumTitle} />
									{allowCreation()}
									<ul className="card-body" id='content' style={{height:'60%', 'width': '100%', 'overflow': 'scroll', listStyleType: 'none'}}>
										<li key={uuid4()} className = 'title-post-bg title-post-color'style={{width: '95%', padding: '1rem', border: '1px solid black', borderRadius: '5px'}}>
											<div className='row'>
												<div className='col-sm'>Topic</div>
												<div className='col-sm'>Poster</div>
												<div className='col-sm'>Last Updated</div>
											</div>
										</li>
										{listPosts(forum)}			
									</ul>
								</div>
							</div>
						</Nav>
					</Container>
				});
				break;
			case 'VIEW_POST':
				dispatch({type: 'SET_VIEW', payload:
					<Container>
						<Nav>
							<div className="card" style={{width: '100%', margin: 'auto', height: '88vh'}}>
								<div className="card-body secondary-bg">
									<Title title={posts[postId].title} />
									<Button color="link" onClick= {() => {
										dispatch({type: 'SET_TAB', payload: 'STANDARD'})
									}}>
									Back
									</Button>
									{allowMakeMessage(posts[postId])}
									<div className="card-body" id='content' style={{'height': '65%', 'width': '100%', 'overflow': 'scroll'}}>
										{posts[postId].content.map(
											content => {
												const [author, message, date] = content;
												const [day, time] = date.split(',');
												return (
													<div 
														key={uuid4()} 
														className='row message-bg' 
														style={{
															borderRadius: '5px', 
															padding: '1rem',
															marginBottom: '1vh',
															minHeight: '10vw'
													}}>
														<div className='col-3 post-author-color'>
															{author}
															<br />
															{day}
															<br />
															{time}
														</div>
														<div className='post-color col-9'>
															{message}
														</div>
													</div>
												);
											}
										)}
									</div>
								</div>
							</div>
						</Nav>
					</Container>
				});
				break;
			default:
				dispatch({type: 'SET_TAB', payload: 'STANDARD'});
		}
	}, 
	[
		tab,
		message, 
		initmessage, 
		title, 
		allowCreation, 
		allowMakeMessage, 
		dispatch,
		postId,
		submitMessage,
		createPostSubmit,
		forum,
		forumTitle,
		posts
	]); 

	useEffect( () => {
		dispatch({type: 'SET_TAB', payload: 'STANDARD'});
		getPosts(forum);
	}, [forum, dispatch])

	return view || standard;
}


export default Forum;
