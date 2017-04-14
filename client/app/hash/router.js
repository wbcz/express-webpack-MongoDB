import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const error = resolve => require(['~components/error.vue'], resolve)
const index = resolve => require(['./mod/v-index.vue'], resolve)
const list = resolve => require(['./mod/v-list.vue'], resolve)
const own = resolve => require(['./mod/v-own.vue'], resolve)
const detail = resolve => require(['./mod/v-detail.vue'], resolve)
const login = resolve => require(['./mod/v-login.vue'], resolve)

const routers = new VueRouter({
    routes: [
	    { 
	    	name: 'index',
	    	path: '/', component: index
		},
	    { 
	    	path: '/list/:id',
	    	component: list
	    },
	    { 
	    	path: '/own', 
	    	component: own
	    },
	    { 
	    	name: 'detail',
	    	path: '/detail/:detailsId', 
	    	component: detail
	    },
		{
			name: 'login',
			path: '/login', 
			component: login
		},
		{
			path: '**/*', 
			component: error
		}
    ]
})

//验证 token，存在才跳转
routers.beforeEach((to, from, next) => {
	if(localStorage.getItem('user')) {
		if(to.name === 'login') {
			next('/')
		}
	} else {
		if(to.name !== 'login') {
			next('/login')
		}
	}
	next()
})

export default routers;
