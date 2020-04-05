import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { connect } from 'react-redux';
import { post, setAntagonize, watchPosts } from '../../actions';

class Challenge2 extends Component {

	post = e => {
    	e.preventDefault();
    	this.props.post(e.target[0].value);
      	e.target[0].value = '';
    }

	componentDidMount() {

		// set the mutationObserver to observe new posts
		this.props.watchPosts();

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

export default connect(null, { post, setAntagonize, watchPosts })(Challenge2);
