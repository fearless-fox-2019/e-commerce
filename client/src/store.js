import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    currentItem: {},
    allCakes:[],
    chocoCake:[],
    cheeseCake:[],
    iceCreamCake:[],
    nougatCake:[],
    classicCake:[],
    weddingCake:[],
    myCart:[],
    isLogin: false
    
  },
  mutations: {
    Set_isLogin(state, payload){
      this.state.isLogin= payload
    },
    Set_currentItem(state, payload){
      this.state.currentItem= payload
    },
    Set_AllCake(state, payload){
      this.state.allCakes= payload
    },
    Set_ChcocoCake(state, payload){
      this.state.chocoCake= payload
    },
    Set_CheeseCake(state, payload){
      this.state.cheeseCake= payload
    },
    Set_iceCreamCake(state, payload){
      this.state.iceCreamCake= payload
    },
    Set_nougatCake(state, payload){
      this.state.nougatCake= payload
    },
    Set_classicCake(state, payload){
      this.state.classicCake= payload
    },
    Set_weddingCake(state, payload){
      this.state.weddingCake= payload
    },
    Set_myCart(state, payload){
      this.state.myCart= payload
    }
  },
  actions: {
    getAllCake({commit}){
      axios({
        url:'/items',
        method: 'GET'
      })
      .then(({data}) => {
        let choco=[]
        let cheese=[]
        let iceCream=[]
        let nougat=[]
        let classic=[]
        let wedding=[]
        data.forEach(cake => {
          if(cake.category == 'choco') choco.push(cake)
          else if(cake.category == 'cheese') cheese.push(cake)
          else if(cake.category == 'ice cream') iceCream.push(cake)
          else if(cake.category == 'nougat') nougat.push(cake)
          else if(cake.category == 'classic') classic.push(cake)
          else if(cake.category == 'wedding') wedding.push(cake) 
        })

        commit('Set_AllCake', data)
        commit('Set_ChcocoCake', choco)
        commit('Set_CheeseCake', cheese)
        commit('Set_iceCreamCake', iceCream)
        commit('Set_nougatCake', nougat)
        commit('Set_classicCake', classic)
        commit('Set_weddingCake', wedding)
      })
      .catch(err => {
        console.log('error get all cake')
        console.log(err)
      })
    },
    getMyCart({commit}){
      axios({
        url: '/cart',
        method: 'get',
        headers: {
          'token': localStorage.token
        }
      })
      .then(({data}) => {
        console.log(data, 'my cart')
        commit('Set_myCart', data)
      })
      .catch( err => {
          console.log('error get my cart')
          console.log(err)
      })
    }
    
  }
})
