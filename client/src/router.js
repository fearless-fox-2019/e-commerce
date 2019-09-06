import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import(/* webpackChunkName: "allproducts" */ './views/products.vue'),
      children: [
        {
          path: '',
          component: () => import('./views/allProducts.vue')
        },
        {
          path: 'search',
          component: () => import('./views/pageSearch.vue')
        },
        {
          path: ':id',
          component: () => import('./views/detailItem.vue')
        }
      ]
    },
    {
      path: '/carts',
      name: 'carts',
      component: () => import('./views/cart.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register.vue')
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('./views/profile.vue')
    }
  ]
})
