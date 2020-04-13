import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Container, Nav, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listPosts, getPosts, allowCreation, setForum } from '../../actions';

function Challenge0Forum(props) {
	const { posts, postId, view, tab, forum } = useSelector(state => state.forum);
	const dispatch = useDispatch();
	const standard = (
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

	// dynamically generate page as tab changes
	useEffect( () => {
		switch(tab) {
			case 'STANDARD':
				dispatch({type: 'SET_VIEW', payload: 
					<Container>
						<Nav>
							<div className="card" style={{width: '100%', margin: 'auto'}}>
								<div className="card-body bg-light text-dark">
									<h1 className="card-title pb-2 mt-4 border-bottom">Forum: Challenge 2</h1>
									{allowCreation()}
									<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
										{listPosts(forum)}			
									</div>
								</div>
							</div>
						</Nav>
					</Container>
				});
				break;
			case 'VIEW_POST':
				dispatch({type: 'SET_VIEW', payload:
					<Container>
						<Nav>
							<div className="card" style={{width: '100%', margin: 'auto'}}>
								<div className="card-body bg-light text-dark">
									<h1 className="card-title pb-2 mt-4 border-bottom">{posts[postId].title}</h1>
									<Button color="link" onClick= {() => {
										dispatch({type: 'SET_TAB', payload: 'STANDARD'})
										getPosts(forum.toUpperCase())(dispatch);
									}}>
									Back
									</Button>
									|
									<Button color="link">New Message</Button>
									<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
										{posts[postId].content.map(message => <div key={message} style={{'width': '100%', 'height': '4rem', 'backgroundColor':'cyan'}}>{message}</div>)}
									</div>
								</div>
							</div>
						</Nav>
					</Container>
				});
				break;
			default:
				dispatch({type: 'SET_TAB', payload: 'STANDARD'});
		}
	}, [tab, posts.length]); 

	useEffect( () => {
		dispatch({type: 'SET_TAB', payload: 'STANDARD'});
		setForum('CHALLENGE2');
	}, [])

	return view || standard;
}
export default Challenge0Forum;