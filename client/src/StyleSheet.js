import React from 'react';


export function Title(props) {
	return <h1 className="pb-2 border-bottom title-color title-font" style={{padding: '7vh 0 5vh 0', margin: '0 6vw 0 2vw'}}>{props.title}</h1>
}

export function Content(props) {
	return (
		<div style={{height: '65vh', color: 'white', padding: '4vh 0 5vh 0', margin: '0 6vw 0 2vw', fontFamily: 'Courier New', overflow: 'scroll'}}>
			{props.children}
		</div>
	);
}