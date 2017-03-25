import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const index = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['./mod/v-index.vue'], () => {
    resolve(require('./mod/v-index.vue'))
  })
}

const list = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['./mod/v-list.vue'], () => {
    resolve(require('./mod/v-list.vue'))
  })
}

const own = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['./mod/v-own.vue'], () => {
    resolve(require('./mod/v-own.vue'))
  })
}

const routers = new VueRouter({
    routes: [
	    { 
	    	path: '/', 
	    	component: index
	    },
	    { 
	    	path: '/list',
	    	component: list
	    },
	    { 
	    	path: '/own', 
	    	component: own
	    }
    ]
})

export default routers;
