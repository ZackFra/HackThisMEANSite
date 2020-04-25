import React, { useEffect } from 'react';
import { Container, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import sanitizeHTML from 'sanitize-html';
import { setMutationObserver, useInterval } from '../../actions';
import uuid4 from 'uuid4';


function Challenge2() {

	const { 
		message, 
		postNum, 
		insults, 
		insultIndex, 
		posts, 
		isAntagonizing,
		tab
	} = useSelector(state => state.challenge2);

	const dispatch = useDispatch();

	// computer posting function
	function cPost(text) {
		let output = (
			<li key = {uuid4()} style={{'marginRight': '2rem', 'color': 'black', 'borderRadius': '25px'}}>
				<div className="card" style={{"marginBottom": "0.7rem"}}>
		      		<div className="card-body" id={`post${postNum}`}
		      			style={{'backgroundColor': 'lightblue', 'width': '100%', 'height': '100%'}}
		      			dangerouslySetInnerHTML={{__html: sanitizeHTML(text)}} 
		      		/>
		      	</div>
		    </li>
		);

		dispatch({type: 'UPDATE_POSTS', payload: output});
		dispatch({type: 'INCREMENT_POSTNUM'});
	}

	// every twenty seconds antagonize the user
	useInterval(() => {
		cPost(insults[insultIndex]);
		dispatch({type: 'INCREMENT_INSULTS'});
	}, isAntagonizing ? 20000 : null);


	// handle challenge setup
	useEffect( () => {

		// allow certain unsanitized html tags and attributes
		sanitizeHTML.defaults.allowedTags = [ 'img', 'i', 'b', 'blockquote', 'em',
			'br', 'cite', 'code', 'kbd', 'del', 'font', 'u', 'strong']; 
		sanitizeHTML.defaults.allowedAttributes = 
    		{ img: ['src', 'alt', 'onerror'], font: ['size', 'color'] };

    	// add initial posting to app
		posts.unshift(
			<li key ="intro Post" className="bg-light" style={{'color': 'black', "borderRadius": "25px", 'marginRight': '2rem'}}>
				<div className="card" style={{"marginBottom": "0.7rem", 'backgroundColor': 'lightblue'}}>
			      	<div className="card-body" style={{'backgroundColor': 'lightblue'}} id={`post${postNum}`}
			      		dangerouslySetInnerHTML={{__html: "Click post to send a new message!"}} 
			      	/>
	      		</div>
	      	</li>
	    );
	    dispatch({type: 'INCREMENT_POSTNUM'});

	}, []);

	useEffect( () => {
	    // set mutation observer to watch for nodes added to the DOM
	    setMutationObserver("posts", node => {

			// recursively gather every new node created
	    	// from the user's input
	    	function getAllNewNodes(node) {
	    		let mutations = [];
	    		function helper(node) {
		    		mutations.push(node);
		    		if(node.children !== undefined) {
			    		for(let i = 0; i < node.children.length; i++) {
			    			helper(node.children[i]);
			    		}
			    	}
			    }
			    helper(node);
			    return mutations;
	    	}

	    	let mutations = getAllNewNodes(node);

	    	// if a new node was added, gather all the nodes
	    	// if any of them are images, resize them
	    	// if one of them is an anchor tag with a href
	    	// attribute, the user has won

	    	for(let i = 0; i < mutations.length; i++) {

				if(mutations[i].nodeName === 'A' && mutations[i].href !== undefined) {
			        mutations[i].href='/Victory2';
			        document.getElementById('success').innerText="Click the link";
			        dispatch({type: 'TOGGLE_ANTAGONIZE'});
			    }

			    if(mutations[i].nodeName === 'IMG') {
			        mutations[i].style = 'max-height: 100%; max-width: 100%';
			   	}
			}
		})
	}, [tab]);


	// posting to chat function
	function post(e) {
		e.preventDefault();

	    let output = (
			<div key = {"post" + postNum} className="bg-light" style={{'marginLeft': '2rem','color': 'black', "borderRadius": "25px"}}>
				<div className="card bg-light" style={{"marginBottom": "0.7rem"}}>
		     			<div className="card-body" 
		     				id={`post${postNum}`} 
		     				dangerouslySetInnerHTML={{__html: sanitizeHTML(message)}}
		     			/>
		     			
		   		</div>
		  	</div>
	    );

		dispatch({type: 'UPDATE_POSTS', payload: output});
		dispatch({type: 'INCREMENT_POSTNUM'});
		dispatch({type: 'UPDATE_MESSAGE', payload: ''});
	}

	switch(tab) {
		case 'LIVE_CHAT':
			return (
				<Container>
					<br />
					<div className="card" style={{width: '24rem', margin: 'auto'}}>
						<div className="card-body bg-dark text-light">
							<div className="card-title">
								LiveChat
							</div>
							<div className='text-success' id="success" />
							<form className="form-group" onSubmit={post}>
								<label className="form-text text-warning" id="invalid"></label>
								<textarea 
									placeholder="message" 
									value={message} 
									style={{'width': '100%', 'resize': 'none', 'padding': '0.75rem'}} 
									onChange={e => dispatch({type: 'UPDATE_MESSAGE', payload: e.target.value})}
								/>
								<button 
									className="btn btn-primary"
									type="submit" 
									style={{padding: "0 1rem", marginTop: "0.7rem"}}
									>
									Post</button>
							</form>
							<hr color="lightgray"/>
							<ul id="posts" style={{'listStyleType': 'none', 'height': '40vh', 'overflow': 'scroll', 'paddingLeft': '0'}}>
								{posts}
							</ul>
						</div>
					</div>
				</Container>
			);
		default:
			return (
				<Container>
					<h1 className="pb-2 mt-4 border-bottom" style={{padding: '1rem 0'}}>Welcome to Challenge 2</h1>
					<br />
					<Container>
						<div className="card" style={{width: '18rem', margin: 'auto'}}>
							<div className="card-body bg-dark text-light">
								<div className="card-title">
									XSS Attack
								</div>
								<hr color="lightgray"/>
								<div className="card-text">
									Someone built a LiveChat app that allows for HTML styling. Though they were smart enough to disallow most tags, they weren't that smart. See if you can inject a nefarious link into a post.
								</div>
								<div id="posts" />
								<Button 
									color="link" 
									onClick={e => {
										dispatch({type: 'TOGGLE_ANTAGONIZE'});
										dispatch({type: 'SET_TAB', payload: 'LIVE_CHAT'});
									}}
								>Live Chat</Button>
								<br />
							</div>
						</div>
					</Container>
				</Container>
			);
		}
}

export default Challenge2;
