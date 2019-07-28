import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
// import Swal from 'vue-sweetalert2'
import Swal from 'sweetalert2'
const baseUrlShoes = `http://localhost:3000/api/shoes/`
const baseUrlCart = `http://localhost:3000/api/carts/`
const baseUrlTransaction = `http://localhost:3000/api/transactions/`
Vue.use(Vuex)
// Vue.use(Swal)

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: '',
    carts: [],
    totalPrice: 0,
    transactions: [],
    shoe: ''
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_ROLE (state, payload) {
      state.role = payload
    },
    ADD_TO_CART (state, payload) {
      state.carts = payload
    },
    GET_TOTAL_PRICE (state, payload) {
      state.totalPrice = payload
    },
    CLEAR_CART (state, payload) {
      state.carts = []
    },
    TRANSACTION_LIST (state, payload) {
      state.transactions = payload
    },
    CLEAR_TOTAL_PRICE (state, payload) {
      state.totalPrice = 0
    },
    GET_SHOE_ID (state, payload) {
      state.shoe = payload
    }
  },
  actions: {
    terserah (context) {
      context.commit('loginTrue')
    },
    addShoe (context, payload) {

    },
    deleteShoe (context, payload) {
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
            axios.delete(`${baseUrlShoes}/${payload}`, {
              headers: {
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
    addToCart (context, payload) {
      console.log(payload, 'ini add to cart')
      // userId: req.body.userId,
      // productId: req.body.productId,
      // quantity: req.body.quantity,
      // checkoutDate: null
      if (payload.quantity > 0) {
        axios.post(`${baseUrlCart}`, {
          userId: localStorage.getItem('id'),
          productId: payload._id,
          quantity: 1
        }, {
          headers: {
            'token': localStorage.getItem('token')
          }
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
      } else {
        Swal.fire({
          type: 'error',
          text: 'out of stock',
          showConfirmButton: false,
          timer: 1000
        })
      }
    },
    cartUser (context, payload) {
      let userId = localStorage.getItem('id')
      axios.get(`${baseUrlCart}/${userId}`, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then((dataFound) => {
          context.commit('ADD_TO_CART', dataFound.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getTotal (context, payload) {
      let price = 0
      let userId = localStorage.getItem('id')
      axios.get(`${baseUrlCart}/${userId}`, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          data.forEach((cart) => {
            price += cart.quantity * cart.productId.price
          })
          context.commit('GET_TOTAL_PRICE', price)
          // console.log(price);
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkoutCart (context, payload) {
      axios.patch(`${baseUrlCart}/checkout`, {
        userId: localStorage.getItem('id')
      }, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.dispatch('createTransaction')
          Swal.fire({
            type: 'success',
            text: 'successfully checked out',
            showConfirmButton: false,
            timer: 1500
          })
          // context.commit('CLEAR_CART')
          // console.log('checked out');
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createTransaction (context, payload) {
      axios.post(`${baseUrlTransaction}`, {
        products: context.state.carts,
        totalPrice: context.state.totalPrice
      }, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('CLEAR_CART')
          context.commit('CLEAR_TOTAL_PRICE')
        })
        .catch(error => {
          console.log(error)
        })
    },
    transactionByUser (context, payload) {
      axios.get(`${baseUrlTransaction}`, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('TRANSACTION_LIST', data)
          // console.log(data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateForm (context, payload) {
      // console.log('asd')
      // console.log(baseUrlShoes)
      // console.log(context.state.shoe)
      axios.patch(`http://localhost:3000/api/shoes/updateData/${context.state.shoe}`, {
        quantity: payload.quantity,
        price: payload.price
      }, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then((updatedData) => {
          router.push('/shoes')
          console.log(updatedData)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
