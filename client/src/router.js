import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: () => import(/* webpackChunkName: "LandingPage" */ './views/LandingPage.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "Login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "Register" */ './views/Register.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import(/* webpackChunkName: "Cart" */ './views/Cart.vue')
    },
    {
      path: '/detail/:id',
      name: 'DetailProduct',
      component: () => import(/* webpackChunkName: "DetailProduct" */ './views/DetailProduct.vue')
    },
    {
      path: '/adminpage',
      name: 'AdminPage',
      component: () => import(/* webpackChunkName: "AdminPAge" */ './views/AdminPage.vue')
    }
  ]
})
