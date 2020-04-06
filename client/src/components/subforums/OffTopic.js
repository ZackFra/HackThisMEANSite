import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Container, Badge, Nav } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts} from '../../actions';

function OffTopic(props) {
	const { posts } = useSelector(state => state.forum);
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
		
		let i = 0;
		const postsToRender = posts.map(post => {
			i++;
			return (
				<Badge key={'post' + i} href='/OffTopic' className='text-dark' style={styles}>
					{post.title} ~ by {post.author} at {post.date}
				</Badge>
			);
		});

		return postsToRender;
	}
	
	useEffect( () => {
		ReactDOM.render(listPosts(), document.getElementById('content'));
	}, [posts.length]); 

	return (
		<Container>
			<Nav>
				<div className="card" style={{width: '100%', margin: 'auto'}}>
					<div className="card-body bg-light text-dark">
						<h1 className="card-title pb-2 mt-4 border-bottom">Forum: Off Topic</h1>
						{allowCreation()}
						<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>

						</div>
					</div>
				</div>
			</Nav>
		</Container>
	);
}


export default OffTopic;