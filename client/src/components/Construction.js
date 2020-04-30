import React from 'react';
import {Container} from 'reactstrap';
import { Title } from '../StyleSheet';

function Construction() {
	return (
		<Container className='foreground-bg' style={{padding: '0 5vw 5vh 5vw'}}>
			<Title title='Coming soon' />
			<img className="img-fluid" src='./under_construction.jpg' alt="This site is under construction." style={{width: '100%', height: '80%', marginTop: '1vh'}}></img>
		</Container>
	);
}
export default Construction;