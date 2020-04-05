import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'reactstrap';
import { connect } from 'react-redux';
import sanitizeHTML from 'sanitize-html';
import { post, setAntagonize, watchPosts } from '../../actions';

sanitizeHTML.defaults.allowedTags = [ 'img', 'i', 'b', 'blockquote', 'em',
	'br', 'cite', 'code', 'kbd', 'del', 'font', 'u', 'strong']; 
    sanitizeHTML.defaults.allowedAttributes = 
{ img: ['src', 'alt', 'onerror'], font: ['size', 'color'] };

class Challenge2 extends Component {

	constructor() {
    	super();

    	this.state = {
			nodeList: [],
			postNum: 0,
			post: {},
			insults: [],
			insultIndex: 0,
			interval: undefined
		}
  	}

	post = e => {
    	e.preventDefault();
    	this.props.post(e.target[0].value);
      	e.target[0].value = '';
    }

	componentDidMount() {

		this.props.watchPosts();

	    // create a mutation observer to watch for changes
	    // if a link is created in the chat, change it's 
	    // address to the victory page
	    // const nodeList = document.querySelector('[id=posts]');
	    // this.setState({nodeList});

	    // const mutationObserver = new MutationObserver(mutations => {
	    //   mutations.forEach(mutation => {
	    //     const newNodes = mutation.addedNodes;
	    //     newNodes.forEach(node => {
	    //       if(node.href !== undefined) {
	    //         node.href='/Victory2';
	    //         document.getElementById('success').innerText="Click the link";
	    //         clearInterval(this.state.interval);
	    //       }

	    //       if(node.nodeName === 'IMG') {
	    //       	node.style = 'max-height: 100%; max-width: 100%';
	    //       }
	    //     })
	    //   })
	    // });

	    // mutationObserver.observe(document.body, {
	    //   attributes: true,
	    //   characterData: false,
	    //   childList: true,
	    //   subtree: true,
	    //   attributeOldValue: false,
	    //   characterDataOldValue: false
	    // });

	    // every twenty seconds antagonize the user
	    this.props.setAntagonize();
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

const mapStateToProps = state => ({
	nodeList: state.challenge2.nodeList,
	postNum: state.challenge2.postNum,
	post: state.challenge2.post,
	insults: state.challenge2.insults,
	insultIndex: state.challenge2.insultIndex,
	interval: state.challenge2.interval
})

export default connect(mapStateToProps, { post, setAntagonize, watchPosts })(Challenge2);
