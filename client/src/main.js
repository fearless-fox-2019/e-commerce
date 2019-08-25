import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'

Vue.use(VueAxios, axios)
Vue.use(Buefy)
Vue.use(VueSweetalert2)
Vue.use(require('vue-moment'))

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
