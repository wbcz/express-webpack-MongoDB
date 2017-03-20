
const goPage = url => {
	window.location.href = window.location.protocol + '//' + window.location.host + url
}

const openUrl = { 
	bind(el, binding,vnode) {
		let options=binding.value;
		el.addEventListener('touchend', ()=> {
			goPage(options.url)
		});
	}
}

export default = openUrl