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
    modalLogin : '',
    gameData : {},
    snackbar : {
      appearance: false,
      status: "",
      alertMessage: ""
    },
    cartList:[],
    transactionList : []
  },
  getters : {
    getToken(state){
      return state.token
    },
      getTotalPrice(state) {
        let total = 0
        for(const cart of state.cartList){
          total += cart.totalPrice
        }
        return total
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
    },
    SET_SNACKBAR(state, payload){
      state.snackbar.appearance = payload.appearance
      state.snackbar.status = payload.status
      state.snackbar.alertMessage = payload.alertMessage
    },
    SET_DIALOG_GLOB(state, payload){
      state.dialogGlob = payload
      console.log('ketriggered', state.dialogGlob)      
    },
    SET_CART_DATA(state, payload){
      state.cartList = payload
      console.log(state.gameData)
    },
    SET_SINGLE_GAME_DATA(state, payload){
      state.gameData = payload
      console.log(state.gameData)
    },
    SET_TOTAL_PRICE(state, payload){
      // console.log(state.cartList[0].quantity, 'ahahahahahahahahaa')
      console.log(payload)
      for(let i = 0; i <  state.cartList.length; i++){
        if(state.cartList[i]._id === payload.cartId){
          state.cartList[i].totalPrice = payload.newPrice
          state.cartList[i].GameId.stock = payload.newStock
        }
      }
    },
    SET_EMPTY_CART(state){
      state.cartList = []
    },
    SET_TRANSACTION(state, payload){
      state.transactionList = payload
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
        // console.log(data)
        context.commit('SET_GAMES',data)
      })
      .catch(({response}) => {console.log(response)})
    },
    getOneGame(contenxt, payload){    
        ax({
          method : "get",
          url : `/games/${payload}`,
          headers : { token : localStorage.token },          
        })
        .then(({data}) => {
          // console.log(data)
          contenxt.commit("SET_SINGLE_GAME_DATA", data)
        })
        .catch(({response}) => {
          console.log(response, 'responseor di store getOneGame')          
        })
    },
    getCart(context){
      ax({
        method : "get",
        url : '/carts',
        headers : { token : localStorage.token }
      })
      .then(({data}) => {
        console.log(data, '===========INI DATA DARI GETCART')
        context.commit('SET_CART_DATA', data)
      })
      .catch(({response}) => {console.log(response)})
    },
    getTransaction(context) {
      ax({
        method : "get",
        url : '/transactions',
        headers : { token : localStorage.token }        
      })
      .then(({data}) => {
        console.log(data)
        context.commit('SET_TRANSACTION', data)
      })
      .catch(({response}) => {console.log(response)})
    }
  }
})
