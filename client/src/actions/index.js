import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import crypto from 'crypto';
import store from '../store';
import sanitizeHTML from 'sanitize-html';
import { Badge, Container, Nav, Button } from 'reactstrap';


// general login
export const login = data => async dispatch => {
	const {user, pass} = data;
	await axios.post('/Login/Authenticate', { user, pass })
	.then( (res) => {
		localStorage.setItem('token', res.data);
		localStorage.setItem('user', user);
	})
	.catch( err => console.log(err));
}

export const logout = () => dispatch => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
}

/** Forums **/

// returns all posts
export const getPosts = postType => dispatch => {
	axios.post('/Forums/GetPosts', {forum: postType})
	.then( res => {
		dispatch({type: 'GET_POSTS', payload: res.data});
	})
	.catch( err => console.log(err));
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
							{posts[postId].content.map(message => <div key={message} style={{'width': '100%', 'height': '4rem', 'backgroundColor':'cyan'}}>{message}</div>)}
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
	const { posts, forum } = store.getState().forum;

	const styles = {'padding': '1rem', 'margin': '0.1rem', 'width': '95%', 'textAlign': 'left', 'backgroundColor': 'white', 'border': '2px solid black'};
	getPosts(postType)(dispatch);

	if(posts.length > 0) {
		let i = -1;
		const postsToRender = posts.map(post => {
			i++;
			return (
				<Badge key={'post' + i} id={i} href='#' 
				onClick ={e => {
					setPostId(e.target.id);
					dispatch({type: 'SET_TAB', payload: 'VIEW_POST'});
					setView(goToPosts());
					//clearPosts();
				}} 
				className='text-dark' style={styles}>
					{post.title} ~ by {post.author} at {post.date}
				</Badge>
			);
		});
		return postsToRender;
	}
		
	return '';
}

export const allowCreation = () => {
	const {user, token} = localStorage;
	if(user && token) {
		return <a href="/CreatePost">Create Post</a>
	}
}

export const createPost = () => {
	const {user, token} = localStorage;
	const {message, title, forum} = store.getState().createPost;

	let validForums = ['OFFTOPIC'];
	for(let i = 0; i <= 10; i++)
		validForums.push(`CHALLENGE${i}`);

	if(message === '' || title === '' || !validForums.includes(forum)) {
		return false;
	}

	const request = {
		title: title,
		content: message,
		date: (new Date()).toGMTString(),
		author: user,
		forum: forum,
		token: token,
	}

	return axios.post('/Forums/CreatePost', request)
	.then( res => true)
	.catch( err => false);
}

export const updateForum = () => dispatch => {
	const payload = document.querySelector('select').value;
	dispatch({type: 'UPDATE_FORUM', payload});
}

export const setForum = forum => {
	store.dispatch({type: 'SET_FORUM', payload: forum});
}

export const setPostId = id => {
	store.dispatch({type: 'SET_POST_ID', payload: id});
}

export const clearPosts = () => {
	store.dispatch({type: 'CLEAR_POSTS'});
}

/** challenges **/


/* Challenge 0 */
// challenge 0 login 
export const login_challenge0 = data => dispatch => {
	const { pass } = data;
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
}

/* Challenge 1 */
// challenge 1 login
export const login_challenge1 = data => dispatch => {
	const {pass} = data;
	let hash = crypto
		.createHash('sha256')
		.update(pass)
		.digest('hex');
	const request = {user: 'admin', pass: hash};


	axios.post('/Challenge1/login', request) 
	.then( res => {
		if(res.data.length > 0) {
			const ft = document.querySelector('#invalid')
			ft.className = 'form-text text-success';
			ft.innerText="Correct!";
			dispatch({type: 'LOGIN_SUCCESS'});
			window.location = '/Victory1';
		} else {
			const ft = document.querySelector('#invalid');
			const pass = document.getElementById('password');
			ft.innerText="Incorrect Password";
			pass.value = '';
			dispatch({type: 'LOGIN_FAIL'});
		}
		console.log({"url": res.config.url, "method": res.config.method, "data": res.config.data});		
	});
}

/* challenge 2 */

sanitizeHTML.defaults.allowedTags = [ 'img', 'i', 'b', 'blockquote', 'em',
	'br', 'cite', 'code', 'kbd', 'del', 'font', 'u', 'strong']; 
sanitizeHTML.defaults.allowedAttributes = 
    { img: ['src', 'alt', 'onerror'], font: ['size', 'color'] };

// set insults to array of insults
export const setInsults = arr => dispatch => {
	dispatch({type: 'SET_INSULTS', payload: arr});
}

// posting to chat function
export const post = text => dispatch => {
	const { postNum } = store.getState().challenge2; 

    let output = [
		<div key = {"post" + postNum} className="bg-light" style={{'color': 'black', "borderRadius": "25px"}}>
			<div className="card bg-light" style={{"marginBottom": "0.7rem"}}>
	     			<div className="card-body" id={"post" + postNum}>
	     			</div>
	   		</div>
	  	</div>
    ];

	const posts = document.getElementById('posts');
	const post = posts.appendChild(document.createElement("li"));
	post.style = 'margin-left: 2rem';
	ReactDOM.render(output, post);

	const newPost = document.getElementById('post' + postNum);
	newPost.innerHTML = sanitizeHTML(text);

	dispatch({type: 'INCREMENT_POSTNUM'});
}

// computer posting function
export const cPost = text => dispatch => {
	const { postNum } = store.getState().challenge2;
		
	let output = [
		<div key = {"post" + postNum} style={{'color': 'black', 'borderRadius': '25px'}}>
			<div className="card" style={{"marginBottom": "0.7rem"}}>
	      		<div className="card-body" id={"post" + postNum} style={{'backgroundColor': 'lightblue'}}>
	      		</div>
	      	</div>
	    </div>
	];

	const posts = document.getElementById('posts');
	const post = posts.appendChild(document.createElement("li"));
	post.style = 'margin-right: 2rem';
	ReactDOM.render(output, post);

	const newPost = document.getElementById('post' + postNum);
	newPost.innerHTML = sanitizeHTML(text);
	dispatch({type: 'INCREMENT_POSTNUM'});
}

// set the anatagonize timer
export const setAntagonize = () => dispatch => {
	dispatch({
		type: 'ANTAGONIZE', 
		payload: setInterval(() => {
			const { insults, insultIndex } = store.getState().challenge2;
			cPost(insults[insultIndex])(dispatch);
			dispatch({type: 'INCREMENT_INSULTS'});
		}, 20000)
	});
}

// sets the mutationObserver, and calls
// onMutation when the sub-DOM is modified
// onMutation is a callback that respoonds to changes
export const setMutationObserver = (id, onMutation) => dispatch => {

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

// watches the posts DOM
export const watchPosts = () => dispatch => {
	const onMutation = node => {
		if(node.href !== undefined) {
	        node.href='/Victory2';
	        document.getElementById('success').innerText="Click the link";
	        dispatch({type: 'STOP_ANTAGONIZING'});
	    }

	    if(node.nodeName === 'IMG') {
	        node.style = 'max-height: 100%; max-width: 100%';
	   	}
	}
	setMutationObserver('posts', onMutation)(dispatch);
}

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