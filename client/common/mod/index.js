/**
 * author wbcz
 */

import ajax from './ajax'
import device from './device'
import share from './share'
import utils from './utils'
import errorLog from './errorLog'

class Wb {
	constructor() {
		this.init()
	}
	init() {
	}
	static device() {
		return device
	}
	static share() {
		return request
	}
	static ajax() {
		return ajax
	}
}

export default Wb
