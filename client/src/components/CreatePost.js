import React from 'react';
import { Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateMsg, updateTitle, updateForum, createPost } from '../actions';

function CreatePost(props) {
	const { message, title, forum } = useSelector(state => state.createPost);
	const dispatch = useDispatch();

	function genOptions() {
		let options = [];
		options.push(<option key='option0' value="Forum" disabled>select forum</option>);
		options.push(<option key='option1' value="OFFTOPIC">Off Topic</option>);
		for(let i = 1; i <= 10; i++) {
			options.push(<option key={`option${i+1}`} value={`CHALLENGE${i}`}>{`Challenge ${i}`}</option>)
		}
		return options;
	}

	async function onSubmit(e) {
		e.preventDefault();

		let validForums = ['OFFTOPIC'];
		for(let i = 1; i <= 10; i++)
			validForums.push(`CHALLENGE${i}`);

		// if createPost fails
		const created = await createPost();
		if(!created) {
			const inval = document.querySelector('[id=invalid]');

			if(!validForums.includes(forum)) {
				inval.innerText = 'Select a forum to post to.';
			} else if(title === '') {
				inval.innerText = 'Title cannot be blank.';
			} else if(message === '') {
				inval.innerText = 'Message cannot be blank.';
			} else {
				inval.innerText = 'Internal server error. Try again later.';
			}
		} else {
			if(forum === 'OFFTOPIC') {
				window.location = '/OffTopic';
			} else {
				const num = forum.slice(-1);
				window.location = `/Challenge${num}Forum`;
			}
		}
	}

	return (
		<Container>
			<div className="card" style={{width: '100%', margin: 'auto'}}>
				<div className="card-body bg-light text-dark">
					<h1 className="card-title pb-2 mt-4 border-bottom">Create Post</h1>
					
					<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
						<form className="form-group-sizing-lg" onSubmit={onSubmit}>
							<div id='invalid' className='text-danger'/>
							<select className="selectpicker" id='forumChoices' defaultValue='Forum' onChange={e => updateForum()(dispatch)}>
								{genOptions()}
							</select>
							{/* @todo add recaptcha */}
							<input className="form-text" value={title} onChange={e => updateTitle(e)(dispatch)} type="text" placeholder="title" style={{'width': '100%', 'padding': '0.5rem'}} />
							<textarea className="form-text" value={message} onChange={e => updateMsg(e)(dispatch)} placeholder="message" style={{'width': '100%', 'height': '16rem', 'padding': '0.5rem', 'resize': 'none'}} />
							<button type="submit" className="btn btn-outline-primary" style={{'float': 'right', 'marginTop': '0.3rem'}}>Submit</button>
						</form>
					</div>
				</div>
			</div>
		</Container>
	);
}


export default CreatePost;