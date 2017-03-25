import Vue from 'vue'
import App from './app.vue'

let vm  = new Vue({
  render: h => h(App)
}).$mount('#app')