import React from 'react';
import {Container} from 'reactstrap';
import { Title } from '../StyleSheet';

function Construction() {
	return (
		<Container className='foreground-bg' style={{padding: '0 5vw 5vh 5vw'}}>
			<Title title='Coming soon' />
			<div style={{textAlign: 'center', height: '100%', width: '100%'}}>
				<img className="img-fluid text-center" src='./under_construction.jpg' alt="This site is under construction." style={{width: '70%', height: '70%', marginTop: '1vh', marginLeft: '0'}}></img>
			</div>
		</Container>
	);
}
export default Construction;