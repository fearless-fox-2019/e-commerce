import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAlertify from "vue-alertify"

Vue.use(VueAlertify)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
