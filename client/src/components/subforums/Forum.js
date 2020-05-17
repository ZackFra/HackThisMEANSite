import React, { useEffect, useCallback } from 'react';
import { Container, Nav, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listPosts, getPosts, postMessage, createPost, useInterval } from '../../actions';
import { verify } from 'jsonwebtoken';
import uuid4 from 'uuid4';
import env from '../../.env';
import { Title } from '../../StyleSheet';

// @todo refacter tf out of this

// generic Forum component
function Forum(props) {
	const { posts, postId, postMongoId, tab, newMessage } = useSelector(state => state.forum);
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
	const createPostSubmit = useCallback( e => {
		e.preventDefault();

		// if createPost fails
		const created = (async () => await createPost(forum))();
		if(created === false) {
			const inval = document.querySelector('[id=invalid]');

			if(title === '') {
				inval.innerText = 'Title cannot be blank.';
			} else if(newMessage === '') {
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
	}, [dispatch, forum, newMessage, posts, title]);

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
	const submitMessage = useCallback( e => {
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

		postMessage(postMongoId, newMessage)
		.then(posted => {
			if(posted === false) {	
				if(newMessage === '') {
					inval.innerText = 'Message cannot be blank.';
				} else {
					inval.innerText = 'Internal server error. Try again later.';
				}
			} else {
				dispatch({type: 'SET_TAB', payload: 'VIEW_POST'});
				dispatch({type: 'UPDATE_MESSAGES', payload: posted});
				dispatch({type: 'SET_POST_ID', payload: 0});
			}
		})
		.catch(err => console.log(err))

		dispatch({type: 'UPDATE_NEW_MESSAGE', payload: ''});
	}, [dispatch, postMongoId, newMessage]);

	// initial post grab
	useEffect( () => {
		getPosts(forum)
		.then(data => {
			if(data !== false) {
				dispatch({type: 'GET_POSTS', payload: data});
			}
		})
		.catch( err => console.log(err));
	}, [forum, dispatch]);

	// get the posts every 20 seconds and update postId
	useInterval( async () => {
		let newPosts = await getPosts(forum);

		if(newPosts !== false) {

			dispatch({type: 'GET_POSTS', payload: newPosts});

			// if the postId should be changed, changed it.
			for(let i = 0; i < newPosts.length; i++) {
				if(postMongoId === newPosts[i]._id) {
					dispatch({type: 'SET_POST_ID', payload: i});
					break;
				}
			}
		}
	}, [20000]);

	// dynamically generate page as tab changes
	switch(tab) {
		case 'CREATE_POST':
			return (
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
			);
		case 'POST_MESSAGE':
			return (
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
										value={newMessage} 
										onChange={e => dispatch({type: 'UPDATE_NEW_MESSAGE', payload: e.target.value})}
										placeholder="message" 
										style={{'width': '100%', 'height': '16rem', 'padding': '0.5rem', 'resize': 'none'}} 
									/>
									<button type="submit" className="btn btn-outline-primary" style={{'float': 'right', 'marginTop': '0.3rem'}}>Submit</button>
								</form>
							</div>
						</div>
					</div>
				</Container>
			);
		case 'VIEW_POST':
			// if new posts have been posted, modify the postId
			// to match the difference in length between the previous
			// posts array and the new one

			return (
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
			);
		default:
			return (
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
			);
	}
}


export default Forum;
