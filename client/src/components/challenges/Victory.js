import React from 'react';
import {Container} from 'reactstrap';
import { Title, Content } from '../../StyleSheet';

function Victory(props) {
	return (
		<Container className='foreground-bg'>
			<Title title={props.title} />
			<Content>
				<p className="text-success">{props.message}</p>
			</Content>
		</Container>
	);
}

export default Victory;