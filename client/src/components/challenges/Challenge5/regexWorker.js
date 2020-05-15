

const regexWorker = () => {
	// eslint-disable-next-line no-restricted-globals
	self.addEventListener('message', e => {
		if(!e) return;

		let data = e.data;

		postMessage(data.match(/^.*a*b$/g));
	});
}

export default regexWorker;