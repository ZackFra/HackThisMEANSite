import React from 'react';
import { Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateMsg, updateTitle, updateForum, createPost } from '../actions';

function CreatePost(props) {
	const { message, title } = useSelector(state => state.createPost);
	const dispatch = useDispatch();

	function genOptions() {
		let options = [];
		options.push(<option value="Forum" selected disabled>select forum</option>);
		options.push(<option value="OFFTOPIC">Off Topic</option>);
		for(let i = 1; i <= 10; i++) {
			options.push(<option value={`CHALLENGE${i}`}>{`Challenge ${i}`}</option>)
		}
		return options;
	}

	function onSubmit(e) {
		e.preventDefault();
		createPost();

		// redirect to forum
		const forumToGoTo = document.querySelector('select').value;
		if(forumToGoTo === 'OFFTOPIC')
			window.location = '/OffTopic';
		else {
			const num = forumToGoTo.slice(-1);
			window.location = `/Challenge${num}Forum`;
		}
	}

	return (
		<Container>
			<div className="card" style={{width: '100%', margin: 'auto'}}>
				<div className="card-body bg-light text-dark">
					<h1 className="card-title pb-2 mt-4 border-bottom">Create Post</h1>
					
					<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
						<form className="form-group-sizing-lg" onSubmit={onSubmit}>
							<select className="selectpicker" id='forumChoices' onChange={e => updateForum()(dispatch)}>
								{genOptions()}
							</select>
							{/* @todo add recaptcha */}
							<input className="form-text" value={title} onChange={e => updateTitle(e)(dispatch)} type="text" placeholder="title" style={{'width': '100%', 'padding': '0.5rem'}} />
							<textarea className="form-text" value={message} onChange={e => updateMsg(e)(dispatch)} placeholder="message" style={{'width': '100%', 'height': '16rem', 'padding': '0.5rem', 'resize': 'none'}} />
							<button type="submit" className="btn btn-outline-primary" style={{'float': 'right', 'margin-top': '0.3rem'}}>Submit</button>
						</form>
					</div>
				</div>
			</div>
		</Container>
	);
}


export default CreatePost;