import Vue from 'vue'
import Vuex from 'vuex'
import ax from './api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL : `http://localhost:3000`,
    gameList : [],
    isLogin : false,
    token : '',
    modalLogin : ''
  },
  getters : {
    getToken(state){
      return state.token
    }
  },
  mutations: {
    SET_GAMES(state, payload) {
      state.gameList = payload
    },
    SET_LOGIN(state, payload){
      if(localStorage.token) {
        state.isLogin = true
        console.log(state.isLogin)        
      }
      else {
        state.isLogin = false
        console.log(state.isLogin)
      }
    },
    SET_TOKEN(state, payload){
      state.token = payload      
    },
    SET_MODAL_LOGIN(state, payload){
      state.modalLogin = payload
    }
  },
  actions: {
    login(context){      
      context.commit('SET_LOGIN')
    },
    getAllGames(context){
      ax({
        method : "get",
        url :  `/games`
      })
      .then(({data}) => {
        context.commit('SET_GAMES',data)
      })
      .catch(err => console.log(err))
    },
  }
})
