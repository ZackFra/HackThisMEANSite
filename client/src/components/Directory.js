import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Container, Badge, Nav} from 'reactstrap';

function Directory() {
	function listSubforums() {
		let subs = [];
		let styles = {'padding': '1rem', 'margin': '0.1rem', 'width': '95%', 'textAlign': 'left', 'backgroundColor': 'white', 'border': '2px solid black'};
		subs.push(
			<Badge href='#OffTopic' className='text-dark' style={styles}>
				Off Topic
			</Badge>
		);

		for(let i = 0; i <= 10; i++) {
			subs.push(
				<Badge href={'#Challenge' + i} className = 'text-dark' style={styles}>
					Challenge {i}
				</Badge>
			);
		}

		return subs;
	}

	return (
		<Container>
			<Nav>
				<div className="card" style={{width: '100%', margin: 'auto'}}>
					<div className="card-body bg-light text-dark">
						<h1 className="card-title pb-2 mt-4 border-bottom">Directory</h1>
						<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
							{listSubforums()}
						</div>
					</div>
				</div>
			</Nav>
		</Container>
	);
}

export default Directory;