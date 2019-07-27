import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Landing from './views/Landing.vue'
import AddItem from './views/AddItem.vue'
import formAdd from './components/formAdd.vue'
import formEdit from './components/formEdit.vue'
import Catalog from './views/Catalog.vue'
import Detail from './views/Detail.vue'
import myCart from './views/myCart.vue'
import custTransaction from './views/custTransaction.vue'
import Transaction from './views/Transaction.vue'


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
    },
    {
      path:'/cake',
      name: 'cake-catalog',
      component: () => import(/* webpackChunkName: "Stats" */ './views/catalogLanding.vue'),
      children:[
        {
          path:'chocolate',
          name: 'chocolate',
          component: () => import(/* webpackChunkName: "Stats" */ './components/catalogChoco.vue'),
        },
        {
          path: 'cheese',
          name:'cheese',
          component: () => import(/* webpackChunkName: "Stats" */ './components/catalogCheese.vue'),
        },
        {
          path: 'icecream',
          name:'icecream',
          component: () => import(/* webpackChunkName: "Stats" */ './components/catalogIceCream.vue'),
        },
        {
          path: 'nougat',
          name:'nougat',
          component: () => import(/* webpackChunkName: "Stats" */ './components/catalogNougat.vue'),
        },
        {
          path: 'classic',
          name:'classic',
          component: () => import(/* webpackChunkName: "Stats" */ './components/catalogClassic.vue'),
        },
        {
          path: 'wedding',
          name:'wedding',
          component: () => import(/* webpackChunkName: "Stats" */ './components/catalogWedding.vue'),
        }
      ]
    },
    {
      path:'/catalog',
      name: 'catalog',
      component: Catalog,
      children:[
        {
          path:'chocolate-cake',
          name: 'chocolate-cake',
          component: () => import(/* webpackChunkName: "Stats" */ './components/catalogChoco.vue'),
        },
        {
          path: 'cheese-cake',
          name:'cheese-cake',
          component: () => import(/* webpackChunkName: "Stats" */ './components/catalogCheese.vue'),
        },
        {
          path: 'icecream-cake',
          name:'icecream-cake',
          component: () => import(/* webpackChunkName: "Stats" */ './components/catalogIceCream.vue'),
        },
        {
          path: 'nougat-cake',
          name:'nougat-cake',
          component: () => import(/* webpackChunkName: "Stats" */ './components/catalogNougat.vue'),
        },
        {
          path: 'classic-cake',
          name:'classic-cake',
          component: () => import(/* webpackChunkName: "Stats" */ './components/catalogClassic.vue'),
        },
        {
          path: 'wedding-cake',
          name:'wedding-cake',
          component: () => import(/* webpackChunkName: "Stats" */ './components/catalogWedding.vue'),
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
    },
    { 
      path: '/mytransaction',
      name: 'mytransaction',
      component: custTransaction
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: Transaction,
      children: [
        {
          path: 'all',
          name: 'all-transaction',
          component: () => import(/* webpackChunkName: "Stats" */ './components/transactionAllTable.vue')
        },
        {
          path: 'unpaid',
          name: 'unpaid-transaction',
          component: () => import(/* webpackChunkName: "Stats" */ './components/transactionUnpaidTable.vue')
        },
        {
          path: 'paid',
          name: 'paid-transaction',
          component: () => import(/* webpackChunkName: "Stats" */ './components/transactionPaidTable.vue')
        },
        {
          path: 'complete',
          name: 'complete-transaction',
          component: () => import(/* webpackChunkName: "Stats" */ './components/transactionCompleteTable.vue')
        }
      ]
    }
  ]
})
