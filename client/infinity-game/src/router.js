import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cart from './views/cart.vue'
import Detail from './views/detail.vue'

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
          path : ':id',
          component : Detail,
          props : true
        }
      ]    
    }
  ]
})
