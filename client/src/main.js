import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import VueSweetalert2 from 'vue-sweetalert2';
import VueTruncate from 'vue-truncate-filter'
import GSignInButton from 'vue-google-signin-button'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

import "bulma-badge/dist/css/bulma-badge.min.css"
import 'buefy/dist/buefy.css'

Vue.use(GSignInButton)
Vue.use(VueTruncate)
Vue.use(Buefy)
Vue.use(VueSweetalert2);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
