import React from 'react';

export function Title(props) {
	return <h1 className="pb-2 border-bottom title-color title-font" style={{padding: '7vh 0 5vh 0', margin: '0 6vw 0 2vw'}}>{props.title}</h1>
}

export function Content(props) {
	return (
		<div className='content-font overflow-auto' style={{height: '65vh', padding: '4vh 0 5vh 0', margin: '0 6vw 0 2vw', fontFamily: 'monospace'}}>
			{props.children}
		</div>
	);
}