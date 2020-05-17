import React from 'react';
import {Container} from 'reactstrap';
import { Title } from '../StyleSheet';

function PageNotFound() {
	return (
		<Container className='foreground-bg' style={{padding: '0 5vw 5vh 5vw'}}>
			<Title title='404 Page Not Found' />
			<div style={{textAlign: 'center', height: '100%', width: '100%'}}>
				<img 
					className="img-fluid text-center" 
					src='./PageNotFound.jpg' 
					alt="Page Not Found :(" 
					style={{width: '70%', height: '70%', marginTop: '1vh', marginLeft: '0'}} 
				/>
			</div>
		</Container>
	);
}
export default PageNotFound;