

const regexWorker = () => {
	// eslint-disable-next-line no-restricted-globals
	self.addEventListener('message', e => {
		if(!e) return;

		let data = e.data;
		let regex = /^([a-zA-Z0-9])(([-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/;

		postMessage(regex.test(data));
	});
}

export default regexWorker;