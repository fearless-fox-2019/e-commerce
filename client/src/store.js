import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      count: 0,
      cart: []
    },
    mutations: {
      addToCartStore (state, payload) {
        console.log(payload)
        state.cart.push({ payload })
      }
    }
  })