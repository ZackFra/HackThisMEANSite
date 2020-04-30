import React from 'react';


export function Title(props) {
	return <h1 className="pb-2 border-bottom title-color" style={{padding: '7vh 0 5vh 0', margin: '0 6vw 0 2vw', fontFamily: 'Permanent Marker', fontStyle: 'italic'}}>{props.title}</h1>
}
