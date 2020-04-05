import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import crypto from 'crypto';
import store from '../store';
import sanitizeHTML from 'sanitize-html';


// general login
export const login = data => async dispatch => {
	const {user, pass} = data;
	await axios.post('/Login/Authenticate', { user, pass })
	.then( (res) => {
		console.log(res);
		dispatch({
			type: 'LOGIN',
			payload: {user}
		});
	})
	.catch( err => console.log(err));
}

export const logout = () => dispatch => {
	dispatch({type: 'LOGOUT'});
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

// update the message to be posted
export const updateMsg = e => dispatch => {
	dispatch({type: 'UPDATE_MESSAGE', payload: e.target.value});
}

// set message to ''
export const clearMsg = () => dispatch => {
	dispatch({type: 'UPDATE_MESSAGE', payload: ''});
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