import React, { useCallback } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Title } from '../../StyleSheet';
import Panel from './Panel';
import Victory from './Victory';
import { login6 } from '../../actions';

function Challenge6() {
	const {user, pass, tab, data} = useSelector(state => state.challenge6);
	const dispatch = useDispatch();
	const URL = 'http://167.172.138.178:5000/ClientLogin';

	const authenticate = useCallback( e => {
		e.preventDefault();
		login6(URL, user, pass)
		.then( res => {
			if(res !== false) {
				dispatch({type: 'SET_DATA', payload: res});
				dispatch({type: 'SET_TAB', payload: 'INFO_PANEL'});
			} else {
				document.getElementById('invalid').innerText = 'Invalid username or password';
			}
		})
		.catch( err => {
			document.getElementById('invalid').innerText = 'Internal Server Error';
		})
	}, [dispatch])

	function toMoney(num) {
		// Create our number formatter.
		let formatter = new Intl.NumberFormat('en-US', {
		  style: 'currency',
		  currency: 'USD',
		});
		return formatter.format(num);
	}

	const InfoPanel = useCallback( props => {
		let { user, debt, lastFour, DOB, firstName, lastName } = data;
		return (
		  <div style={{marginLeft: '20px'}} >
			<Row>
			  <Col>Name: </Col>
			  <Col>{firstName + ' ' + lastName}</Col>
			</Row>
			<Row>
			  <Col>Account: </Col>
			  <Col>{user}</Col>
			</Row>
			<Row>
			  <Col>Owed: </Col>
			  <Col>{toMoney(Number(debt))}</Col>
			</Row>
			<Row>
			  <Col>DOB: </Col>
			  <Col>{DOB}</Col>
			</Row>
			<Row>
			  <Col>SSN: </Col>
			  <Col>***-**-{lastFour}</Col>
			</Row>
			<hr style={{borderTop: 'dotted 1px'}} />
		  </div>
		);
	  }, [data]);

	const BankPanel = useCallback( props => {
		return (
			<form className="form-group" onSubmit={authenticate} style={{overflow: 'hidden'}}>
				<Row style={{marginTop: '1vh'}}>
					<label className="form-text text-warning" id="invalid" />
				</Row>
				<Row style={{marginTop: '1vh'}}>
					<Col>
						<label className='form-text' htmlFor='username'>Username</label>
					</Col>
					<Col>
						<input 
							className="form-control"  
							value={user} 
							placeholder='username'
							id='username'
							onChange={e => dispatch({type: 'SET_USER', payload: e.target.value})}	
						/>
					</Col>
				</Row>
				<Row style={{marginTop: '1vh'}}>
					<Col>
						<label className='form-text' htmlFor='password'>Password</label>
					</Col>
					<Col>
						<input 
							className="form-control" 
							type="password" 
							placeholder='password' 
							id='password'
							value={pass} 
							onChange={e => dispatch({type: 'SET_PASS', payload: e.target.value})}	
						/>
					</Col>
				</Row>
				<Row style={{marginTop: '1vh'}}>
					<Col>
						<button 
							className="btn btn-primary"
							type="submit" 
							style={{padding: "0 1rem", marginTop: "0.7rem"}}
						>
							Submit
						</button>
					</Col>
				</Row>
				<LinkPanel style={{marginTop: '1vh'}}/>
			</form>
		);
	}, [dispatch, user, pass, authenticate]);

	const LinkPanel = useCallback( props => {
		function setHome() {
			dispatch({type: 'SET_TAB', payload: 'STANDARD'});
		}
		function setBank() {
			dispatch({type: 'SET_TAB', payload: 'BANK'});
		}
		return (
			<Row style={{width: '80%'}}>
				<Col><Button color='link' onClick={setHome}>Home</Button></Col>
				<Col><Button color='link' onClick={setBank}>Bank</Button></Col>
			</Row>
		);
	}, [dispatch])


	switch(tab) {
		case 'INFO_PANEL':
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 6'/>
					<br />
					<Container>
						<Panel
							title='Account Information'
							content=''
							innerComponent={InfoPanel}
						/>
					</Container>
				</Container>				
			)
		case 'BANK':
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 6'/>
					<br />
					<Container>
						<Panel
							title='EvilBank.com'
							content=''
							innerComponent={BankPanel}
						/>
					</Container>
				</Container>
			)
		default:
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 6' />
					<br />
					<Container>
						<Panel 
							title={'Insecure by Default'} 
							content={'Hello. My name is Lois Gislason. I lost my job and I was wondering if you could help me out? I really cannot afford to keep making my student loan payments, so if you could make that debt go away I would really appreciate it. My username is Gislason84852 and my password is SCSI. I really appreciate this.'}
							innerComponent={LinkPanel} 
						/>
					</Container>
				</Container>
			);
	}
}

export default Challenge6;
