import React, { useState, Link } from 'react';
import {Container, Badge, Nav} from 'reactstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getPosts, incrementPostNum } from '../../actions';

function OffTopic(props) {
	const {postNum, posts} = useSelector(state => state.forum);
	const dispatch = useDispatch();

	function allowCreation() {
		const {user, token} = localStorage;
		if(user && token) {
			return <a href="#">Create Post</a>
		}
	}

	function listPosts() {
		const styles = {'padding': '1rem', 'margin': '0.1rem', 'width': '95%', 'textAlign': 'left', 'backgroundColor': 'white', 'border': '2px solid black'};
		getPosts('OFFTOPIC')(dispatch);
		

		const postsToRender = posts.map(post => {
			dispatch({type: 'INCREMENT_POSTNUM'});
			return (
				<Badge key={'post' + postNum} href='/OffTopic' className='text-dark' style={styles}>
					{post.title} ~ by {post.author} at {post.date}
				</Badge>
			);
		});

		return postsToRender;
	}

	return (
		<Container>
			<Nav>
				<div className="card" style={{width: '100%', margin: 'auto'}}>
					<div className="card-body bg-light text-dark">
						<h1 className="card-title pb-2 mt-4 border-bottom">Off Topic</h1>
						{allowCreation()}
						<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
							{listPosts()}
						</div>
					</div>
				</div>
			</Nav>
		</Container>
	);
}


export default OffTopic;