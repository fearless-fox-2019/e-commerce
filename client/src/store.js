import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
Vue.use(Vuex)
const baseUrl = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    cart: [],
    loggedUser: {},
    transactions: [],
    isAdmin: false
  },
  mutations: {
    setLogin (state, payload) {
      state.isLogin = payload
      if (localStorage.username === 'admin' && payload === true) {
        state.isAdmin = true
      } else {
        state.isAdmin = false
      }
    },
    setProducts (state, payload) {
      state.products = payload
      router.push('/')
    },
    addToCart (state, payload) {
      console.log('selesai')
    },
    setCart (state, payload) {
      state.cart = payload
    },
    updateItem (state) {
      console.log('masuk sini')
    },
    getLoggedUser (state, payload) {
      state.loggedUser = payload
    },
    updateTransaction (state, payload) {
      console.log('masuk')
    },
    getTransaction (state, payload) {
      state.transactions = payload
    }
  },
  actions: {
    getProducts ({ commit, state }) {
      axios({
        method: 'get',
        url: baseUrl + '/products'
      })
        .then(({ data }) => {
          commit('setProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart ({ commit, state }, payload) {
      state.cart.push(payload)
      axios({
        method: 'patch',
        url: baseUrl + '/users/cart',
        data: {
          cart: state.cart
        },
        headers: { 'token': localStorage.getItem('token') }
      })
        .then(() => {
          commit('addToCart')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getLoggedUser ({ commit, state }) {
      axios({
        method: 'get',
        url: baseUrl + '/users/findById',
        headers: { 'token': localStorage.getItem('token') }
      })
        .then(({ data }) => {
          commit('getLoggedUser', data.data)
          commit('setCart', data.data.cart)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeItem ({ commit, state }, payload) {
      let found = state.cart.filter(el => {
        if (el._id !== payload) {
          return el
        }
      })
      axios({
        method: 'patch',
        url: baseUrl + '/users/cart',
        data: {
          cart: found
        },
        headers: { 'token': localStorage.getItem('token') }
      })
        .then(() => {
          commit('setCart', found)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    emptyBucket ({ commit, state }, payload) {
      axios({
        method: 'patch',
        url: baseUrl + '/users/cart',
        data: {
          cart: []
        },
        headers: { 'token': localStorage.getItem('token') }
      })
        .then(() => {
          commit('setCart', [])
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateQuantity ({ commit, state }, payload) {
      axios({
        method: 'patch',
        url: baseUrl + `/products/${payload.id}`,
        headers: { 'token': localStorage.getItem('token') },
        data: {
          quantity: payload.quantity
        }
      })
        .then(() => {
          commit('updateItem')
        })
        .catch(err => {
          console.log(err)
        })
    },
    makeTransaction ({ commit }, payload) {
      axios({
        method: 'post',
        url: baseUrl + `/transactions`,
        headers: { 'token': localStorage.getItem('token') },
        data: {
          items: payload.items,
          totalPrice: payload.totalPrice
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('updateTransaction', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getTransaction ({ commit, state }) {
      axios({
        method: 'get',
        url: baseUrl + '/transactions',
        headers: { 'token': localStorage.getItem('token') }
      })
        .then(({ data }) => {
          commit('getTransaction', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllTransaction ({ commit }) {
      axios({
        method: 'get',
        url: baseUrl + '/transactions/all',
        headers: { 'token': localStorage.getItem('token') }
      })
        .then(({ data }) => {
          commit('getTransaction', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
