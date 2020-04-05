import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { connect } from 'react-redux';
import { post, setAntagonize, watchPosts, setInsults, updateMsg, clearMsg } from '../../actions';

class Challenge2 extends Component {

	post = e => {
    	e.preventDefault();
    	this.props.post(this.props.message);
      	this.props.clearMsg();
    }

	componentDidMount() {
		// set the insults
		let insults = [
	    	"u rite now <img src='https://images.freeimages.com/images/large-previews/0e8/clown-trinket-1522905.jpg'>",
	    	"Haha! you <i>still</i> haven't got it yet?",
	    	"I hope you're not in college because you're dumb as a sack of bricks!",
	    	"<i>Jeeesus</i> you still don't have it?",
	    	"c'mon this took me like 5 minutes to do. <b>Google's your friend, bruh.</b>",
	    	"Maybe you need to get yourself some programming socks?",
	    	"I heard this rumor that if you google 'how to hack', you'll still fail. You suck."
		]
		this.props.setInsults(insults);

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
								<textarea placeholder="message" value={this.props.message} style={{'width': '100%', 'resize': 'none', 'padding': '0.75rem'}} onChange={this.props.updateMsg}/>
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

const mapStateToProps = state =>  ({message: state.challenge2.message});

export default connect(mapStateToProps, { post, setAntagonize, watchPosts, setInsults, updateMsg, clearMsg })(Challenge2);
