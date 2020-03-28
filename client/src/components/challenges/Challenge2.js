import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'reactstrap';
import sanitizeHTML from 'sanitize-html';

class Challenge2 extends Component {
	state = {
		nodeList: [],
		postNum: 0
	}

	constructor() {
    	super();
    	sanitizeHTML.defaults.allowedTags = [
    		'img', 
      		'i', 
      		'b',
      		'blockquote',
      		'em',
      		'br',
      		'cite',
      		'code',
      		'kbd',
      		'del',
      		'font',
      		'u',
      		'video',
      		'strong'
      	];
    	sanitizeHTML.defaults.allowedAttributes = 
    	{
     		img: ['src', 'alt', 'onerror'],
     		font: ['size', 'color'],
      		video: ['src', 'onerror']
    	};
  	}

	post = (e) => {
    	e.preventDefault();

    	let output = [
			<div key = {"post" + this.state.postNum} className="bg-light" style={{'color': 'black', "borderRadius": "25px"}}>
				<div className="card bg-light" style={{"marginBottom": "0.7rem"}}>
	      			<div className="card-body" id={"post" + this.state.postNum}>
	      			</div>
	      		</div>
	      	</div>
      	];

      	console.log(e.target[0].value);

    	const posts = document.getElementById('posts');
    	const post = posts.appendChild(document.createElement("li"));
    	post.style = 'margin-left: 2rem';
    	ReactDOM.render(output, post);

    	const newPost = document.getElementById('post' + this.state.postNum);
    	newPost.innerHTML = sanitizeHTML(e.target[0].value);

    	this.setState(
      		{
      			nodeList: this.state.nodeList,
      			postNum: this.state.postNum + 1
      		}
      	);
      	e.target[0].value = '';
    }

	componentDidMount() {
	    // create a mutation observer to watch for changes
	    // if a link is created in the chat, change it's 
	    // address to the victory page
	    const nodeList = document.querySelector('[id=posts]');
	    this.setState({nodeList});

	    const mutationObserver = new MutationObserver(mutations => {
	      mutations.forEach(mutation => {
	        const newNodes = mutation.addedNodes;
	        newNodes.forEach(node => {
	          if(node.href !== undefined) {
	            node.href='/Victory2';
	            document.getElementById('success').innerText="Click the link";
	          }

	          if(node.nodeName === 'IMG' || node.nodeName === 'VIDEO') {
	          	node.style = 'max-height: 100%; max-width: 100%';
	          }
	        })
	      })
	    });

	    mutationObserver.observe(document.body, {
	      attributes: true,
	      characterData: false,
	      childList: true,
	      subtree: true,
	      attributeOldValue: false,
	      characterDataOldValue: false
	    });
	}

	render() {
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
								Someone built a LiveChat app that allows for HTML styling. Though they were smart enough to disallow certain tags, they weren't that smart. See if you can inject a nefarious link into a post.
							</div>
							<div className='text-success' id="success"></div>
							<br />
						</div>
						<div className="card-body bg-dark text-light">
							<div className="card-title">
								LiveChat
							</div>
							<form className="form-group" onSubmit={this.post}>
								<label className="form-text text-warning" id="invalid"></label>
								<textarea placeholder="message" style={{'width': '100%'}}/>
								<button 
									className="btn btn-primary"
									type="submit" 
									style={{padding: "0 1rem", marginTop: "0.7rem"}}
									>
									Post</button>
							</form>
							<hr color="lightgray"/>
							<ul id="posts" style={{'listStyleType': 'none', 'paddingLeft': '0'}}>
								<li key ="intro Post" className="bg-light" style={{'color': 'black', "borderRadius": "25px", 'marginRight': '2rem'}}>
									<div className="card bg-light" style={{"marginBottom": "0.7rem"}}>
      									<div className="card-body">
      										Click post to send a new message! 
      									</div>
      								</div>
      							</li>
							</ul>
						</div>
					</div>
				</Container>
			</Container>
		);
	}
}

export default Challenge2;
