import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    hotProducts: [],
    isLogin: false,
    isAdmin: false,
    cart: {},
    transaction: [],
    received: []
  },
  mutations: {
    retrieveProduct (state, products) {
      state.products = products
    },
    retrieveHotProducts (state, products) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].hotProducts) {
          state.hotProducts.push(products[i])
        }
      }
    },
    checkLogin (state) {
      if (localStorage.getItem('access_token')) state.isLogin = true
        else state.isLogin = false
      if (localStorage.getItem('admin')) state.isAdmin = true
         else state.isAdmin = false
    },
    retrieveCart (state, cart) {
      state.cart = cart
    },
    retrieveTransaction (state, trx) {      
      state.transaction.push(trx)
    },
    retrieveReceived (state, rcv) {
      state.received.push(rcv)
    },
  },
  actions: {
    retrieveProduct ({ commit }) {
      axios({
        method: 'GET',
        url: `http://localhost:3000/products`,
        responseType: 'json',
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('retrieveProduct', data)
          commit('retrieveHotProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    retrieveCart ({ commit }) {
      let id = localStorage.getItem('userId')
      axios({
        method: 'GET',
        url: `http://localhost:3000/transactions/user/${id}`,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].status === 'Cart') {
            commit('retrieveCart', data[i])
          }
        }
      })
      .catch(({ response }) => {
        console.log(response.data.message)
      })
    },
    retrieveTrx ({ commit }) {
      let id = localStorage.getItem('userId')
      axios({
        method: 'GET',
        url: `http://localhost:3000/transactions/user/${id}`,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].status === 'Paid') {
            commit('retrieveTransaction', data[i])
          }
        }
      })
      .catch(({ response }) => {
        console.log(response.data.message)
      })
    },
    retrieveReceived ({ commit }) {
      let id = localStorage.getItem('userId')
      axios({
        method: 'GET',
        url: `http://localhost:3000/transactions/user/${id}`,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].status === 'Received') {
            commit('retrieveReceived', data[i])
          }
        }
      })
      .catch(({ response }) => {
        console.log(response.data.message)
      })
    },
  }
})
