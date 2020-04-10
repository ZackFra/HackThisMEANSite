import React, { useSelector } from 'react';
import ReactDOM from 'react-dom';
import {Container, Label} from 'reactstrap';
import { updateMsg } from '../actions';
import axios from 'axios';

function CreatePost(props) {
	const { message } = useSelector(state => state.createPost);

	function genOptions() {
		let options = [];
		options.push(<option value="Forum" selected disabled>select forum</option>);
		options.push(<option value="Off Topic">Off Topic</option>);
		for(let i = 1; i <= 10; i++) {
			options.push(<option value={`Challenge${i}`}>{`Challenge ${i}`}</option>)
		}
		return options;
	}

	function onSubmit() {

	}

	return (
		<Container>
			<div className="card" style={{width: '100%', margin: 'auto'}}>
				<div className="card-body bg-light text-dark">
					<h1 className="card-title pb-2 mt-4 border-bottom">Create Post</h1>
					
					<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
						<form className="form-group-sizing-lg" onSubmit={onSubmit}>
							<select className="selectpicker" id='forumChoices'>
								{genOptions()}
							</select>
							{/* @todo add recaptcha */}
							<input value={message} onChange={updateMsg} className="form-text" type="text" placeholder="title" style={{'width': '100%', 'padding': '0.5rem'}} />
							<textarea className="form-text" placeholder="message"style={{'width': '100%', 'height': '16rem', 'padding': '0.5rem', 'resize': 'none'}} />
							<button type="submit" className="btn btn-outline-primary" style={{'float': 'right', 'margin-top': '0.3rem'}}>Submit</button>
						</form>
					</div>
				</div>
			</div>
		</Container>
	);
}


export default CreatePost;