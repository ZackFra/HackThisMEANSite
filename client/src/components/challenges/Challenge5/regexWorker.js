
// @todo make this verify something
// break this so ReDoS attack destroys it
const regexWorker = () => {
	// eslint-disable-next-line no-restricted-globals
	self.addEventListener('message', e => {
		if(!e) return;

		let data = e.data;
		let regex = /^(([a-z])+.)+[A-Z]([a-z])+$/;

		postMessage(regex.test(data));
	});
}

export default regexWorker;