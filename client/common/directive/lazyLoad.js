
const registerEvent = (evt, fn, delay, MustTime, el) =>  {
	window.addEventListener(evt, _throttle(fn, delay, MustTime, el));
}

const _throttle = (fn, delay, MustTime, el) => {
	let timer = null;
	let previous = null;
	return function() {
		let context = this;
		let current = +new Date();

		if(!previous) previous = current;
		let remainTime = current - previous;

		if(MustTime && remainTime >= MustTime) {
			fn.call(context, el);
			previous = current;
		} else {
	        clearTimeout(timer)
			timer = setTimeout(() => {
				fn.call(context, el);
			}, delay);
		}
	}
}

const _isLoaded = (el) => {
	let cors = el.getBoundingClientRect();
	return (cors.top > 0) && (cors.top < $(window).scrollTop())
}

const _loadImage = (el) => {
	if(_isLoaded(el)) {
		if($(el).attr('src') === './img/loading.gif') {
			let updateSrc = $(el).attr('data-src');
			console.log(updateSrc)
			$(el).attr('src', updateSrc);
		}
	}
}

const lazy = {
	bind: (el, binding, vnode) => {
		_loadImage(el);
		registerEvent('scroll', _loadImage, 500, 1000, el);
	}
}

export default lazy
