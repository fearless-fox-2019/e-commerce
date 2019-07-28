import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'
import store from './store'
import axios from "axios";
import GAuth from "vue-google-oauth2";
const gauthOption = {
  clientId:
    "867285609478-g49k556cljvfvrb3bdl99rf0qhv7cg68.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account"
};
Vue.use(GAuth, gauthOption);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  GAuth,
  render: h => h(App)
}).$mount('#app')
