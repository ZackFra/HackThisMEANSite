import React from 'react';
import { Container } from 'reactstrap';

export default function Panel(props) {
	return 	(
		<Container>
			<div className="card" style={{width: '35vw', height: '55vh', margin: 'auto'}}>
				<div className="card-body secondary-bg text-light">
					<div className="card-title">
						{props.title}
					</div>
					<hr color="lightgray"/>
					<div className="card-text">
						{props.content}
					</div>
					<br />
					<div className='overflow-auto'>
						{props.innerComponent()}
					</div>
				</div>
			</div>
		</Container>
	);
}