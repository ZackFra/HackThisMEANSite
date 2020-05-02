import React from 'react';
import {Container} from 'reactstrap';
import { Title } from '../../StyleSheet';

function Victory(props) {
	return (
		<Container className='foreground-bg'>
			<Title title={props.title} />
			<br />
			<p className="text-success" style={{marginLeft: '3vw'}}>{props.message}</p>
		</Container>
	);
}

export default Victory;