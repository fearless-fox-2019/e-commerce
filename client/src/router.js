import Vue from 'vue';
import Router from 'vue-router';
import AdminAddProduct from './views/AdminAddProduct.vue';
import AdminListProduct from './views/AdminListProduct.vue';
import AdminEditProduct from './views/AdminEditProduct.vue';
import AdminOrders from './views/AdminOrders.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Product from './views/Product.vue';
import ProductDetail from './views/ProductDetail.vue';
import Cart from './views/Cart.vue';
import Checkout from './views/Checkout.vue';
import User from './views/User.vue';
import UserTransaction from './components/UserTransaction.vue';
import UserProfile from './components/UserProfile.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin/add-product',
      name: 'admin-add-product',
      component: AdminAddProduct,
    },
    {
      path: '/admin/list-product',
      name: '/admin/list-product',
      component: AdminListProduct,
    },
    {
      path: '/admin/edit-product/:id',
      name: 'admin-edit-product',
      component: AdminEditProduct,
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: AdminOrders,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/products',
      name: 'products',
      component: Product,
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetail,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
    {
      path: '/user/:id',
      component: User,
      children: 
      [
        {
          path: 'profile',
          component: UserProfile,
        },
        {
          path: 'transaction',
          component: UserTransaction,
        },
      ]
    },
  ],
});
