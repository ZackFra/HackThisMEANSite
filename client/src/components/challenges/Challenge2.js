import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'reactstrap';
import sanitizeHTML from 'sanitize-html';

class Challenge2 extends Component {

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
      		'strong'
      	];
    	sanitizeHTML.defaults.allowedAttributes = 
    	{
     		img: ['src', 'alt', 'onerror'],
     		font: ['size', 'color'],
    	};

    	this.state = {
			nodeList: [],
			postNum: 0,
			post: {},
			insults: [],
			insultIndex: 0,
			interval: undefined
		}
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

    	const posts = document.getElementById('posts');
    	const post = posts.appendChild(document.createElement("li"));
    	post.style = 'margin-left: 2rem';
    	ReactDOM.render(output, post);

    	const newPost = document.getElementById('post' + this.state.postNum);
    	newPost.innerHTML = sanitizeHTML(e.target[0].value);

    	this.setState({postNum: this.state.postNum + 1});
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
	            clearInterval(this.state.interval);
	          }

	          if(node.nodeName === 'IMG') {
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

	    // create the state.post method here because
	    // it requires methods that wouldn't exist
	    // yet if we created it in the constructor
	    this.setState(
	    	{
	    		post: (text) => {
	    			let output = [
							<div key = {"post" + this.state.postNum} style={{'color': 'black', 'borderRadius': '25px'}}>
								<div className="card" style={{"marginBottom": "0.7rem"}}>
	      							<div className="card-body" id={"post" + this.state.postNum} style={{'backgroundColor': 'lightblue'}}>
	      							</div>
	      						</div>
	      					</div>

      					];

				    	const posts = document.getElementById('posts');
				    	const post = posts.appendChild(document.createElement("li"));
				    	post.style = 'margin-right: 2rem';
				    	ReactDOM.render(output, post);

				    	const newPost = document.getElementById('post' + this.state.postNum);
				    	newPost.innerHTML = sanitizeHTML(text);

				    	this.setState({postNum: this.state.postNum + 1});
	    			},
	    		insults: [
	    			"u rite now <img src='https://images.freeimages.com/images/large-previews/0e8/clown-trinket-1522905.jpg'>",
	    			"Haha! you <i>still</i> haven't got it yet?",
	    			"I hope you're not in college because you're dumb as a sack of bricks!",
	    			"<i>Jeeesus</i> you still don't have it?",
	    			"c'mon this took me like 5 minutes to do. <b>Google's your friend, bruh.</b>",
	    			"Maybe you need to get yourself some programming socks?",
	    			"I heard this rumor that if you google 'how to hack', you'll still fail. You suck."
	    		]
	    	}
	    );

	    // every twenty seconds antagonize the user
	    this.setState({interval:
		    setInterval(() => {
		    	this.state.post(this.state.insults[this.state.insultIndex]);
		    	this.setState({insultIndex: ((this.state.insultIndex + 1) % this.state.insults.length)});  
	    	}, 20000)
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
								Someone built a LiveChat app that allows for HTML styling. Though they were smart enough to disallow most tags, they weren't that smart. See if you can inject a nefarious link into a post.
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
								<textarea placeholder="message" style={{'width': '100%', 'resize': 'none', 'padding': '0.75rem'}}/>
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
									<div className="card" style={{"marginBottom": "0.7rem", 'backgroundColor': 'lightblue'}}>
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
