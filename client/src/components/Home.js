import React from 'react';
import {Container} from 'reactstrap';
import { Title, Content } from '../StyleSheet';

function Home() {
	return (
		<Container className='foreground-bg' style={{padding: '0 5vw 5vh 5vw'}}>
			<Title title='Welcome Home' />
			<Content>
				<h2>WHOAMI</h2>
				<p>HackThisMEANSite is a free and legal training ground for Javascript hackers who want to develop their hacking skills
				in a safe and realistic environment. This site is intended for everyone, whether you're a web developer who wants to 
				learn more about cybersecurity or just a bored kid with too much free time on your hands. I believe that education should 
				be free and readily available for those who seek it regardless of any ethical arguments against it.</p>
				<aside>
				<h2>DISCLAIMER</h2>
					<p>We are not affiliated with <a href='http://hackthissite.org'>HackThisSite.org</a>, although
					we were heavily inspired by their mission and acheivements. If you enjoy your experience here, I suggest you check out 
					their site as well. Their project is rather inspiring and any fan of this site would probably enjoy theirs also.</p>
				</aside>
			</Content>
		</Container>
	);
}

export default Home;