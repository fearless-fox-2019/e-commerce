import Vue from 'vue';
import Vuex from 'vuex';
import axi from './axiosApi.js';
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allItem: [],
    signupErr: {},
    isLogin: false,
    logedUser : {}
  },
  mutations: {
    fetchItem(state, payload){
      console.log('masuk comit');
      console.log('ini di action')
      state.allItem = payload
    },
    changeStatus(state, payload){
      state.isLogin = payload
    },
    logedUser(state,payload){
      console.log(payload, 'ini dari payload')
      state.logedUser = payload
    }
  },
  actions: {
    searchItem(contex, payload) {
    },
    fetchItem(contex, payload){
      console.log('masuk store mau ambil data')
      axi.get("/items")
      .then(({ data }) => {
        console.log(data)
        contex.commit('fetchItem',data)
      }). catch(err => console.log(err))
    },
    signupUser({commit}, payload){
      console.log(payload,' berasal dari store')
      axi({
        url: '/users/signup',
        method: 'POST',
        data: payload
      })
      .then(({data})=> {
        console.log(data,' hasil ablikan dari server')
        return axi({
          url: '/users/signin',
          method: 'POST',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
      })
      .then(({data})=>{
        console.log(data, "eh berhasil login")
        localStorage.setItem('token',data)
        commit(changeStatus, true)
      })
      .catch(err => {
        console.log(err, 'ini errornya')
        // if(err.username)
      })
    },
    signinUser({commit}, payload){
      console.log(payload,' berasal dari signin store')
      axi({
        url: '/users/signin',
        method: 'POST',
        data: payload
      })
      .then(({data})=> {
        console.log(data)
        localStorage.setItem('token',data.token)
        commit('changeStatus', true)
        router.push('/')
      })
      .catch(err=> {
        console.log(err)
      })
    },
    whoami({commit},payload){
      console.log('masuk whoami store')
      axi({
        url: `/users/whoami`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=> {
        console.log(data, 'hasil whoami')
        commit('logedUser',data)
      })
      .catch(err=> {
        console.log(err)
      })
    },
    changeStatus({commit}){
      
    }
  },
});
