import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cart from './views/cart.vue'
import Payment from './views/paymentSummary.vue'
import History from './views/history.vue'

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
      path : '/cart',
      name : 'cart',
      component : Cart,
      children : [
        {
          path: 'payment',
          name : 'payment',
          component : Payment
        }
      ]       
    },
    {
      path : '/history',
      name : 'history',
      component : History
    }
  ]
})
