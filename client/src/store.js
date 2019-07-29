import Vue from 'vue'
import Vuex from 'vuex'
import axios from './api/axios'
import { stat } from 'fs';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('access_token') ? true : false,
    isAdmin: localStorage.getItem('role') === 'admin' ? true : false,
    isError: '',
    allProducts: {},
    myCart: [],
    myTransaction: [],
    allTransaction: []

  },
  mutations: {
    changeIsLogin(state, payload){
      state.isLogin = payload
      state.isAdmin = false
      if(localStorage.getItem('role') === 'admin'){
        state.isAdmin = true
      }
    },
    getError(state, payload){
      state.isError = payload
    },
    fillProduct(state, payload){
      state.allProducts = {}
      state.allProducts.products = payload
      if(payload.length > 0){
        payload.forEach(el => {
          if(!state.allProducts[el.category]){
            state.allProducts[el.category] = []
          }
          state.allProducts[el.category].push(el)
        });
      }
    },
    myCart(state, payload){
      state.myCart = payload
    },
    myTrans(state, payload){
      state.myTransaction = payload
    },
    allTrans(state, payload){
      state.allTransaction = payload
    }

  },
  actions: {
    signInGoogle(context, payload){
      return new Promise ((resolve, reject) => {
        console.log('payload signin : ', payload);
        axios({
          method: 'POST',
          url: '/user/googleLogin',
          headers: {
            access_token : payload
          }
        })
          .then(({data}) => {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('role', data.user.role)
            localStorage.setItem('userId', data.user._id)
            localStorage.setItem('email', data.user.email)
            context.commit('changeIsLogin', true)
            resolve('welcome ', data.username)
          })
          .catch((err) => {
            console.log('err: ini errornya', err.response.data.message);
            context.commit('getError', err.response.data.message)
            reject(err.response.data.message)
          })
      })
    },
    signIn(context, payload){
      return new Promise ((resolve, reject) => {
        console.log('payload signin : ', payload);
        axios({
          method: 'POST',
          url: '/user/login',
          data: payload
        })
          .then(({data}) => {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('role', data.user.role)
            localStorage.setItem('userId', data.user._id)
            localStorage.setItem('email', data.user.email)
            context.commit('changeIsLogin', true)
            resolve('welcome ', data.username)
          })
          .catch((err) => {
            console.log('err: ini errornya', err.response.data.message);
            context.commit('getError', err.response.data.message)
            reject(err.response.data.message)
          })
      })
    },
    signUp(context, payload){
      return new Promise ((resolve, reject) => {
        console.log('payload signup : ', payload);
        axios({
          method: 'POST',
          url: '/user/register',
          data: payload
        })
          .then(({data}) => {
            return axios({
              method: 'POST',
              url: '/user/login',
              data: {
                email: data.email,
                password: payload.password
              }
            })  
          })
          .then(({data}) => {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('role', data.user.role)
            localStorage.setItem('userId', data.user._id)
            localStorage.setItem('email', data.user.email)
            context.commit('changeIsLogin', true)
            resolve(true)
          })
          .catch((err) => {
            console.log('err: ini errornya', err.response.data.message);
            context.commit('getError', err.response.data.message)
            reject(false)
          })
      })
    },
    logout(context, payload){
      localStorage.clear()
      context.commit('changeIsLogin', false)
    },
    getProducts(context, payload){
      return new Promise ((resolve, reject) => {
        if(payload){
          axios({
            url: '/products'
          })
            .then(({data}) => {
              console.log('data dari store actions: ', data);
              context.commit('fillProduct', data)
              resolve(true)
            })
            .catch(err => {
              context.commit('getError', err.response.data.message)
              reject(false)
            })
        } else {
          axios({
            url: `/products/?q=${payload}`
          })
            .then(({data}) => {
              console.log('data dari store actions: ', data);
              context.commit('fillProduct', data)
              resolve(true)
            })
            .catch(err => {
              context.commit('getError', err.response.data.message)
              reject(false)
            })
        }
      })
    },
    addProduct(context, payload){
      return new Promise ((resolve, reject) => {
        let formData = new FormData()
        let keys = Object.keys(payload)
        keys.forEach(el => {
          formData.append(el, payload[el])
        })
        axios({
          url: '/products',
          method: 'POST',
          data: formData,
          headers: {
            access_token : localStorage.getItem('access_token')
          }
        })
          .then(({data}) => {
            console.log('data create products: ', data);
            context.dispatch("getProducts")
            resolve(true)
          })
          .catch(err => {
            context.commit('getError', err.response.data.message)
            reject(false)
          })
      })
    },
    addToCart(context, payload){
      return new Promise ((resolve, reject) => {
        axios({
          url: '/carts',
          method: 'POST',
          data: payload,
          headers: {
            access_token : localStorage.getItem('access_token')
          }
        })
          .then(({data}) => {
            console.log('data: ', data);
            context.dispatch('getMyCart', data.userId)
            resolve(true)
          })
          .catch(err => {
            console.log('err: ', err);
            console.log('err.response.data.message: ', err.response.data.message);
            context.commit('getError', err.response.data.message)
            reject(false)
          })
      })
    },
    getMyCart(context, payload){
      return new Promise ((resolve, reject) => {
        axios({
          url: `/carts/${payload}`,
          headers: {
            access_token : localStorage.getItem('access_token')
          }
        })
          .then(({data}) => {
            console.log('data: ', data);
            context.commit('myCart', data)
            resolve(true)
          })
          .catch(err => {
            console.log('err: ', err);
            console.log('err.response.data.message: ', err.response.data.message);
            context.commit('getError', err.response.data.message)
            reject(false)
          })
      })
    },
    createTransaction(context, payload){
      return new Promise ((resolve, reject) => {
        let obj = {}
        obj.cartIds = []
        obj.products = []
        obj.totalPrice = 0
        payload[0].forEach(el =>{
          obj.cartIds.push(el._id)
          el.productId.amount = el.amount
          obj.products.push(el.productId)
          obj.totalPrice += el.amount*el.productId.price
        })
        let keys = Object.keys(payload[1])
        keys.forEach(el => {
          obj[el] = payload[1][el]
        })
        
        axios({
          url: '/trans',
          method: 'POST',
          data : obj,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({data}) => {
          console.log('data: ', data);
          context.dispatch('getMyCart', localStorage.getItem('userId'))
          context.dispatch('getMyTransaction')
          resolve(true)
        })
        .catch(err => {
          console.log('err: ', err);
          console.log('err.response.data.message: ', err.response);
          context.commit('getError', err.response.data.message)
          reject(false)
        })


      })
    },
    getMyTransaction(context, payload){
      return new Promise ((resolve, reject) => {
        axios({
          url: `/trans/${localStorage.getItem('userId')}`,
          headers : {
            access_token : localStorage.getItem('access_token')
          }
        })
          .then(({data}) => {
            console.log('data: ', data);
            context.commit('myTrans', data)
            resolve(true)
          })
          .catch(err => {
            context.commit('getError', err.response.data.message)
            reject(false)
          })
      })
    },
    getAllTransaction(context, payload){
      return new Promise ((resolve, reject) => {
        axios({
          url: '/trans',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({data}) => {
          context.commit('allTrans', data)
          resolve(true)
        })
        .catch(err => {
          context.commit('getError', err.response.data.message)
          reject(false)
        })
      })
    },
    deleteCart(context, payload){
      return new Promise ((resolve, reject) => {
        axios({
          url: `/carts/${payload}`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({data}) => {
          console.log('data: ', data);
          context.dispatch('getMyCart', localStorage.getItem('userId'))
          resolve(true)
        })
        .catch(err => {
          console.log('err: ', err);
          console.log('err.response.data.message: ', err.response.data.message);
          context.commit('getError', err.response.data.message)
          reject(err.response.data.message)
        })
      })
    },
    deleteProduct(context, payload){
      return new Promise ((resolve, reject) => {
        axios({
          url: `/products/${payload}`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({data}) => {
          console.log('data: ', data);
          context.dispatch('getProducts', '')
          resolve(true)
        })
        .catch(err => {
          console.log('err: ', err);
          console.log('err.response.data.message: ', err.response.data.message);
          context.commit('getError', err.response.data.message)
          reject(err.response.data.message)
        })
      })
    },
    editProduct(context, payload){
      return new Promise ((resolve, reject) => {
        axios({
          url: `/products/${payload._id}`,
          method: 'put',
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({data}) => {
          console.log('data: ', data);
          context.dispatch('getProducts', '')
          resolve(true)
        })
        .catch(err => {
          console.log('err: ', err);
          console.log('err.response.data.message: ', err.response);
          context.commit('getError', err.response.data.message)
          reject(err.response.data.message)
        })
      })
    }
  }
})
