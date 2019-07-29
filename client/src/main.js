import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueSweetalert2 from 'vue-sweetalert2';
import Vuex from 'vuex'

import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserSecret);
Vue.component('font-awesome-icon', FontAwesomeIcon);


import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(Vuex);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresToken)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn){
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
