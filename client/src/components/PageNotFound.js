import React from 'react';
import {Container} from 'reactstrap';
import { Title } from '../StyleSheet';

function PageNotFound() {
	return (
		<Container className='foreground-bg' style={{padding: '0 5vw 5vh 5vw'}}>
			<Title title='Page Not Found' />
			<img className="img-fluid" src='./page_not_found.jpg' alt="This site is under construction." style={{width: '100%', height: '80%', marginTop: '1vh'}}></img>
		</Container>
	);
}
export default PageNotFound;