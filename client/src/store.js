import Vue from 'vue'
import Vuex from 'vuex'
import axios from  'axios'
import router from './router';
// import Swal from 'vue-sweetalert2'
import Swal from 'sweetalert2'
const baseUrlShoes = `http://localhost:3000/api/shoes/`
const baseUrlCart = `http://localhost:3000/api/carts/`
Vue.use(Vuex)
// Vue.use(Swal)

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: '',
    carts: [],
    totalPrice: 0
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
    },
    GET_TOTAL_PRICE(state,payload) {
      state.totalPrice = payload
    }
  },
  actions: {
    terserah(context) {
      context.commit('loginTrue')
    },
    addShoe(context,payload) {

    },
    deleteShoe(context,payload) {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.value) {
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
        }
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
          Swal.fire({
            type: 'success',
            text: 'Product added to cart',
            showConfirmButton: false,
            timer: 1500
          })
          // router.push('/cart')
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
    getTotal(context,payload) {
      let price = 0
      let userId = localStorage.getItem('id')
      axios.get(`${baseUrlCart}/${userId}`)
        .then(({data}) =>{
          data.forEach((cart) => {
            price += cart.quantity * cart.productId.price
          })
          context.commit('GET_TOTAL_PRICE',price)
          // console.log(price);
        })
        .catch(error=> {
          console.log(error)
        })
    }
    


  }
})
