import React from 'react';


export function Title(props) {
	return <h1 className="pb-2 mt-4 border-bottom title-color" style={{padding: '1rem 0', fontFamily: 'Permanent Marker', fontStyle: 'italic'}}>{props.title}</h1>
}
