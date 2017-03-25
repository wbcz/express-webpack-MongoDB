import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const error = resolve => require(['~components/error.vue'], resolve)
const index = resolve => require(['./mod/v-index.vue'], resolve)
const list = resolve => require(['./mod/v-list.vue'], resolve)
const own = resolve => require(['./mod/v-own.vue'], resolve)

const routers = new VueRouter({
    routes: [
	    { 
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
        path: '**/*', 
        component: error
      },
    ]
})

export default routers;
