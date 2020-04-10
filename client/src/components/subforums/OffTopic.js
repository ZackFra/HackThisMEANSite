import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Container, Nav } from 'reactstrap';
import { useSelector } from 'react-redux';
import { listPosts, allowCreation } from '../../actions';

function OffTopic(props) {
	const { posts } = useSelector(state => state.forum);

	useEffect( () => {
		ReactDOM.render(listPosts('OFFTOPIC'), document.getElementById('content'));
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