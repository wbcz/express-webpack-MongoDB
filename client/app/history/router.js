import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const error = resolve => require(['~components/error.vue'], resolve)
const index = resolve => require(['./mod/v-index.vue'], resolve)
const list = resolve => require(['./mod/v-list.vue'], resolve)
const own = resolve => require(['./mod/v-own.vue'], resolve)

const routers = new VueRouter({
	mode: 'history',
	routes: [
		{
			//把当前文件路径看做一个参数来匹配，因为history模式是对host之后所有的路径，并不是当前路径之后的所有路径进行匹配
			//history刷新会导致页面报404，配置后端去到自定义的404页面，所以这点比hash坑，只是hash路径看上去不优雅，但是hash兼容性好
			path: '/:id', component: require('./mod/v-index.vue') 
		},
		{ 
			path: '/chat/list/:id',
			component: require('./mod/v-list.vue')
		},
		{ 
			path: '/chat/own', 
			component: require('./mod/v-own.vue')
		}
	]
})

export default routers;
