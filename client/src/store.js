import Vue from 'vue'
import Vuex from 'vuex'
import axios from  'axios'
import router from './router';
const baseUrlShoes = `http://localhost:3000/api/shoes/`
const baseUrlCart = `http://localhost:3000/api/carts/`
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: '',
    carts: []
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.isLogin = payload
    },
    SET_ROLE(state,payload) {
      state.role  = payload
    },
    ADD_TO_CART(state,payload) {
      state.carts = payload
    }
  },
  actions: {
    terserah(context) {
      context.commit('loginTrue')
    },
    addShoe(context,payload) {

    },
    deleteShoe(context,payload) {
      axios.delete(`${baseUrlShoes}/${payload}`,{
        headers:{
          'token': localStorage.getItem('token')
        }
      })
        .then((data) => {
          console.log('deleted')
          router.push('/shoes')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateShoe(context,payload) {

    },
    addToCart(context,payload) {
      console.log(payload)
      // userId: req.body.userId,
      // productId: req.body.productId,
      // quantity: req.body.quantity,
      // checkoutDate: null
      axios.post(`${baseUrlCart}`, {
        userId: localStorage.getItem('id'),
        productId: payload._id,
        quantity: 1
      })
        .then((cartCreated) => {
          router.push('/cart')
          console.log(cartCreated)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    cartUser(context,payload) {
      let userId = localStorage.getItem('id')
      axios.get(`${baseUrlCart}/${userId}`)
        .then((dataFound) => {
          context.commit('ADD_TO_CART',dataFound.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    


  }
})
