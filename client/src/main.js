import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import moment from 'vue-moment'

Vue.config.productionTip = false

Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  moment,
  // VueSweetalert2,
  render: h => h(App)
}).$mount('#app')
