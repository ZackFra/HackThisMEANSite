import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateMsg, updateTitle, updateForum, postMessage } from '../actions';
import { verify } from 'jsonwebtoken';
import env from '../.env.js';

// @todo put this functionality in forum

function PostMessage(props) {
	const { message, title } = useSelector(state => state.postMessage);
	const dispatch = useDispatch();

	async function onSubmit(e) {
		e.preventDefault();

		// if createPost fails
		const posted = await postMessage();
		if(!posted) {
			const inval = document.querySelector('[id=invalid]');
			
			if(message === '') {
				inval.innerText = 'Message cannot be blank.';
			} else {
				inval.innerText = 'Internal server error. Try again later.';
			}
		} else {
			// undefined
		}
	}

	// if post defined, save it
	// else change location to home
	useEffect( () => {
		const {post} = localStorage;
		if(post) {
			dispatch({type: 'SET_POST', payload: post });
			localStorage.removeItem('post');
		} else {
			window.location = '/home';
		}
	}, []);

	return (
		<Container>
			<div className="card" style={{width: '100%', margin: 'auto'}}>
				<div className="card-body bg-light text-dark">
					<h1 className="card-title pb-2 mt-4 border-bottom">Post Message</h1>
					
					<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
						<form className="form-group-sizing-lg" onSubmit={onSubmit}>
							<div id='invalid' className='text-danger'/>

							{/* @todo add recaptcha */}
							<textarea className="form-text" value={message} onChange={e => updateMsg(e)(dispatch)} placeholder="message" style={{'width': '100%', 'height': '16rem', 'padding': '0.5rem', 'resize': 'none'}} />
							<button type="submit" className="btn btn-outline-primary" style={{'float': 'right', 'marginTop': '0.3rem'}}>Submit</button>
						</form>
					</div>
				</div>
			</div>
		</Container>
	);
}


export default PostMessage;