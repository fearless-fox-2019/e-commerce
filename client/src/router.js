import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'loginChecker',
      component: () => import('./views/loginChecker.vue')
    },
    {
      path: '/login',
      name: 'loginPage',
      component: () => import('./views/loginPage.vue')
    },
  ]
})
