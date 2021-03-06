import Vue from 'vue'
import App from './app.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import logger from 'wblogger'
import VueSocketio from 'vue-socket.io'
import sockeioClient from 'vue-sockeio-client'

Vue.use(VueSocketio, 'http://localhost:3000')
Vue.use(logger, { prefix: new Date(), dev: true })
Vue.use(ElementUI)

let vm  = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
