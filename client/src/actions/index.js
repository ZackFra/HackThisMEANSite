import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import crypto from 'crypto';
import store from '../store';
import Cookies from 'js-cookie';
import { Container, Nav, Button } from 'reactstrap';
import { verify } from 'jsonwebtoken';
import uuid4 from 'uuid4';
import env from '../.env';


// general login
export const login = async data  => {
	const {user, pass} = data;
	return await axios.post('/Login/Authenticate', { user, pass })
	.then( (res) => {
		localStorage.setItem('token', res.data);
		localStorage.setItem('user', user);
		return true;
	})
	.catch( err => false );
}

export async function register(data) {
	const {user, pass} = data;
	return await axios.post('/Login/Register', {user, pass})
	.then( res => true )
	.catch( err => false );
}


/** Forums **/

// returns all posts
export async function getPosts(postType) {
	
	// compares the date of each post
	function dateComparator(a, b) {
		return (new Date(b.content[b.content.length-1][2])).getTime() - new Date(a.content[a.content.length-1][2]).getTime();
	}

	return await axios.post('/Forums/GetPosts', {forum: postType})
	.then( res => res.data.sort(dateComparator) )
	.catch( err => false )
}

// returns the jsx that renders a post's content
export const goToPosts = () => {
	const { postId, forum, posts } = store.getState().forum; 

	let contentsOfPost = 
		<Container>
			<Nav>
				<div className="card" style={{width: '100%', margin: 'auto'}}>
					<div className="card-body bg-light text-dark">
						<h1 className="card-title pb-2 mt-4 border-bottom">{posts[postId].title}</h1>
						<Button color="link" onClick= {() => {
							setView(undefined);
							getPosts(forum.toUpperCase())(store.dispatch);
						}}>
						Back
						</Button>
						|
						<Button color="link" onClick = {() => {
							setView(undefined);
						}}>New Message</Button>
						<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
							{posts[postId].content.map(message => <div key={uuid4()} style={{'width': '100%', 'height': '4rem', 'backgroundColor':'cyan'}}>{message}</div>)}
						</div>
					</div>
				</div>
			</Nav>
		</Container>
	return contentsOfPost
}

// sets view to a jsx object
export const setView = jsx => {
	store.dispatch({type: 'SET_VIEW', payload: jsx});
}

// lists all posts in a certain forum
export const listPosts = postType => {
	const dispatch = store.dispatch;
	const { posts } = store.getState().forum;

	// @ todo figure out why I can't set post-color as background
	const styles = {
		padding: '1rem', 
		backgroundColor: '#3F4045', 
		color: '#8693AB', 
		width: '95%', 
		textAlign: 'left', 
		borderWidth: '1px',
		borderStyle: 'solid', 
		borderColor: 'black', 
		borderBottom: '0',
		borderRadius: '5px'
	};

	if(posts.length > 0) {
		let postsToRender = [];
		for(let i = 0; i < posts.length; i++) {
			postsToRender.push(
				// eslint-disable-next-line
				<a key={uuid4()} className='post-bg' href='#' style={{textDecoration: 'none'}}>
					<li
					key={uuid4()} 
					onClick ={e => {
						dispatch({type: 'SET_POST_ID', payload: i});
						dispatch({type: 'SET_TAB', payload: 'VIEW_POST'});
						dispatch({type: 'SET_MONGO_ID', payload: posts[i]._id});
						setView(goToPosts());
					}} 
					style={styles}>
						<div className='row'>
							<div className='col-sm'>{posts[i].title}</div>
							<div className='col-sm'>{posts[i].author}</div>
							<div className='col-sm'>{posts[i].content[posts[i].content.length-1][2]}</div>
						</div>
					</li>
				</a>
			);
		}
		return postsToRender;
	}
		
	return '';
}

export const allowCreation = () => {
	const { token } = localStorage;
	try {
		verify(token, env.jwtseed);
		return <a href="/CreatePost">Create Post</a>
	} catch(e) {
		return;
	}
}

export async function createPost(forum) {
	const { token } = localStorage;
	const {initmessage, title} = store.getState().createPost;
	let user = '';

	try {
		user = verify(token, env.jwtseed).user;
	} 
	catch(e) {
		return false;
	}

	// generates a list of valid forum options
	let validForums = ['OFFTOPIC'];
	for(let i = 0; i <= 10; i++)
		validForums.push(`CHALLENGE${i}`);

	if(initmessage === '' || title === '' || !validForums.includes(forum)) {
		return false;
	}

	const request = {
		title: title,
		content: initmessage,
		date: (new Date()).toGMTString(),
		author: user,
		forum: forum,
		token: token,
	}

	return await axios.post('/Forums/CreatePost', request)
	.then( res => res.data)
	.catch( err => false);
}

export function postMessage(post, message) {
	const { token } = localStorage;
	let user = '';

	// if invalid user, return false
	try {
		user = verify(token, env.jwtseed).user;
	} 
	catch(e) {
		return false;
	}
	const request = {
		user: user,
		content: message,
		id: post,
		token: token,
	}

	return axios.post('/Forums/UpdatePost', request)
	.then( res => res.data )
	.catch( err => false )
}

export const updateForum = () => dispatch => {
	const payload = document.querySelector('select').value;
	dispatch({type: 'UPDATE_FORUM', payload});
}

export const setForum = forum => {
	store.dispatch({type: 'SET_FORUM', payload: forum});
}

/** challenges **/


/* Challenge 1 */
// challenge 1 login
export const login1 = data => {
	const {pass} = data;
	
	let hash = crypto
		.createHash('sha256')
		.update(pass)
		.digest('hex');
	const request = {user: 'admin', pass: hash};


	return axios.post('/Challenge1/login', request) 
	.then( res =>  res.data.length > 0);
}

// sets the mutationObserver, and calls
// onMutation when the sub-DOM is modified
// onMutation is a callback that respoonds to changes
export const setMutationObserver = (id, onMutation) => {

	const rootNode = document.getElementById(id);

	const mutationObserver = new MutationObserver(mutations => {
	    mutations.forEach(mutation => {
	    	const newNodes = mutation.addedNodes;
	        newNodes.forEach(node => {
	        	onMutation(node);
	        })
	    })
	});

	mutationObserver.observe(rootNode, {
	    attributes: true,
	    characterData: false,
	    childList: true,
	    subtree: true,
	    attributeOldValue: false,
	    characterDataOldValue: false
	});
}

/* Challenge 3 */


export const login3 = async data => {
	const {user, pass} = data;
	return await axios.post('/Challenge3/Login', { user, pass })
	.then( res => {
		console.log(res);
		Cookies.set('token', res.data);
		Cookies.set('user', user);
		return true;
	})
	.catch( err => {
		return false;
	});
}


export const registerUser3 = async request => {
	const {user, pass} = request;

	return await axios.post('/Challenge3/Register', {user, pass})
	.then( res => true )
	.catch( err => false );
}

export const changePass3 = async request => {
	const {user, newPass, token} = request;

	return await axios.post('/Challenge3/ChangePass', {user, newPass, token})
	.then( res => true )
	.catch( err => false );
}

// Challenge 6

export async function login6(URL, user, pass) {
	return await axios.post(URL, {user, pass})
	.then( res => {
		return res;
	})
	.catch(err => {
		return false;
	})
}

// @todo get rid of these
/** these are generic onChange handlers **/
export const updatePass = e => dispatch => {
	dispatch({type: 'UPDATE_PASS', payload: e.target.value});
}

export const clearPass = () => dispatch => {
	dispatch({type: 'UPDATE_PASS', payload: ''});
}

export const updateUser = e => dispatch => {
	dispatch({type: 'UPDATE_USER', payload: e.target.value});
}

export const clearUser= () => dispatch => {
	dispatch({type: 'UPDATE_USER', payload: ''});
}

// update the message to be posted
export const updateMsg = e => dispatch => {
	dispatch({type: 'UPDATE_MESSAGE', payload: e.target.value});
}

// set message to ''
export const clearMsg = () => dispatch => {
	dispatch({type: 'UPDATE_MESSAGE', payload: ''});
}

export const updateTitle = e => dispatch => {
	dispatch({type: 'UPDATE_TITLE', payload: e.target.value});
}

export function useInterval(callback, delay) {
	const savedCallback = useRef();

	// remember the latest callback
	useEffect( () => {
		savedCallback.current = callback;
	});

	useEffect( () => {
		function tick() {
			savedCallback.current();
		}
		if(delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}