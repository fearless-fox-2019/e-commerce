import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: () => import('./views/Transaction.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('checkLogin')
  if (to.fullPath === '/cart') {
    if (!store.state.isLogin) {
      next('/')
    }
  }
  if (to.fullPath === '/admin') {
    if (!store.state.admin) {
      next('/')
    }
  }
  next()
})

export default router
