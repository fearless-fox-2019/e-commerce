import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Landing from './views/Landing.vue'
import AddItem from './views/AddItem.vue'
import formAdd from './components/formAdd.vue'
import formEdit from './components/formEdit.vue'
import Catalog from './views/Catalog.vue'
import chocoCatalog from './components/catalogChoco.vue'
import Detail from './views/Detail.vue'
import myCart from './views/myCart.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:'/item',
      name:'Item',
      component: AddItem,
      children:[
        {
          path:'add',
          name: 'add',
          component: formAdd
        },
        {
          path:'edit',
          name: 'edit',
          component: formEdit
        },
      ]
    },{
      path:'/catalog',
      name: 'catalog',
      component: Catalog,
      children:[
        {
          path:'chocolate-cake',
          name: 'chocolate-cake',
          component: chocoCatalog
        }
      ]
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/mycart',
      name: 'mycart',
      component: myCart

    }
  ]
})
