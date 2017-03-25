import Vue from 'vue'
import App from './app.vue'
import router from './router'

let vm  = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
