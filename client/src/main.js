import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import {  Notification } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';

Vue.use(ElementUI)
Vue.use(Notification)
Vue.use(require('vue-moment'));
Vue.prototype.$notify = Notification
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
