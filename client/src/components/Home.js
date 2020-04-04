import React from 'react';
import { connect } from 'react-redux';
import Construction from './Construction'

function Home() {
	return (
		<div>
			<Construction />
		</div>
		
	);
}

export default connect()(Home);