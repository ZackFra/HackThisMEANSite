import React from 'react';
import {Container} from 'reactstrap';
import { connect } from 'react-redux';

function Victory1() {
	return (
		<Container>
			<h1 className="pb-2 mt-4 border-bottom text-success" style={{padding: '1rem 0'}}>CONGRATULATIONS! :)</h1>
			<p className="text-success">You hacked challenge 1!</p>
		</Container>
	);
}

export default connect()(Victory1);