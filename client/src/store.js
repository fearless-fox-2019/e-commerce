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
      state.allProducts.products = payload
      if(payload.length > 0){
        payload.forEach(el => {
          if(!state.allProducts[el.category]){
            state.allProducts[el.category] = []
          }
          state.allProducts[el.category].push(el)
        });
      }
    }

  },
  actions: {
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
    }
  }
})
