import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import UserForm from './views/User-Form.vue';
import Admin from './views/Admin.vue';
import User from './views/User.vue';
import Products from './views/Product-Detail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user-form',
      name: 'form',
      component: UserForm,
    },
    {
      path: '/admin',
      name: 'admindashboard',
      component: Admin,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-mail') === 'admin@admin.com') {
          next();
        } else {
          console.log('GakBoleh Kena Navigation Guard :p');
          next('/');
        }
      },
    },
    {
      path: '/user',
      name: 'userpage',
      component: User,
      children: [
        {
          path: 'product/:id',
          name: 'product',
          component: Products,
        },
      ],
    },
  ],
});
