
const touch = {
	bind: function(el, binding, vnode) {
		const options = binding.value
		const setBgColor = e.target.style.backgroundColor
		el.addEventListener('touchstart', (e) => {
			e.target.style.backgroundColor = options.backgroundStart;
		},false)
		el.addEventListener('touchmove', (e) => {
			e.target.style.backgroundColor = options.backgroundEnd;
		},false);
		el.addEventListener('touchend', (e) => {
			e.target.style.backgroundColor = options.backgroundEnd;
		},false);
	},
}

export default touch