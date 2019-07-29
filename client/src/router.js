import Vue from 'vue';
import Router from 'vue-router';
import Landing from './views/Landing.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('./views/sign.vue')
    },
    {
      path: '/profile',
      name: 'userPage',
      component: () => import('./views/customerPage.vue')
    },
    {
      path: '/admin',
      name: 'admnPage',
      component: () => import('./views/adminPage.vue')
    },
    {
      path: '/product',
      // name: 'product',
      component: () => import('./views/product.vue'),
      children: [
      {
        path: '',
        component: () => import('./views/allProduct.vue')
      },
      {
        path: 'search',
        component: () => import('./views/search.vue')
      },
      {
        path: 'category/:searchquery',
        component: () => import('./views/category.vue')
      },
      {
        path: ':itemId',
        component: () => import('./views/detailItem.vue')
      }]
    }
  ],
});
