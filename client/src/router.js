import Vue from 'vue';
import Router from 'vue-router';
import Landing from './views/Landing.vue';
import Cart from './views/Cart.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
      meta: {
        requiresToken: true
      }
    }
  ],
});
