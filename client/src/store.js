import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userCustomer:[],
    userAdmin:[],
    currentItem: {},
    allCakes:[],
    chocoCake:[],
    cheeseCake:[],
    iceCreamCake:[],
    nougatCake:[],
    classicCake:[],
    weddingCake:[],
    myCart:[],
    custTransaction: [],
    allTransaction: [],
    unpaidTransaction: [],
    paidTransaction:[],
    sendTransaction:[],
    completeTransaction:[],
    
  },
  mutations: {
    Set_isLogin(state, payload){
      this.state.isLogin= payload
    },
    Set_userCustomer(state, payload){
      this.state.userCustomer= payload
    },
    Set_userAdmin(state, payload){
      this.state.userAdmin= payload
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
    },
    Set_CustTransaction(state, payload){
      this.state.custTransaction= payload
    },
    Set_allTransaction(state, payload){
      this.state.allTransaction= payload
    },
    Set_unpaidTransaction(state, payload){
      this.state.unpaidTransaction= payload
    },
    Set_paidTransaction(state, payload){
      this.state.paidTransaction= payload
    },
    Set_completeTransaction(state, payload){
      this.state.completeTransaction= payload
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
    getAllUsers({commit}){
      axios({
        url: '/users',
        method: 'get',
        headers:{
          'token' : localStorage.token
        }
      })
      .then(({data}) => {
        let admin=[]
        let customer=[]

        data.forEach(el => {
          if(el.role === 'admin') admin.push(el)
          else if(el.role === 'customer') customer.push(el)
        })

        commit('Set_userAdmin', admin)
        commit('Set_userCustomer', customer)

      })
      .catch(err =>{
        console.log('error get data user')
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
        // console.log(data, 'my cart')
        commit('Set_myCart', data)
      })
      .catch( err => {
          console.log('error get my cart')
          console.log(err)
      })
    },
    getCustTransaction({commit}){
      let custId= localStorage.userId
      // console.log('masuk get cust transaction', custId)
      axios({
        url:`/transaction/customer/${custId}`,
        method: 'get',
        headers:{
          'token' : localStorage.token
        }
      })
      .then(({data}) => {
        // console.log(data)
        commit('Set_CustTransaction', data)
      })
      .catch(err => {
        console.log('error get customer transaction')
        console.log(err)
      })
    },
    getAllTransaction({commit}){
        axios({
          url: `/transaction`,
          method: 'get',
          headers:{
            'token': localStorage.token
          }
        })
        .then(({data}) => {
          let unpaid=[]
          let paid= []
          let complete=[]

          data.forEach(el => {
            if(el.status === 'unpaid') unpaid.push(el)
            else if(el.status === 'paid') paid.push(el)
            else if(el.status === 'complete') complete.push(el)
          })

          commit('Set_allTransaction', data)
          commit('Set_unpaidTransaction', unpaid)
          commit('Set_paidTransaction', paid)
          commit('Set_completeTransaction', complete)

        })
        .catch(err => {
          console.log('error get all transaction')
          console.log(err)
        })
    }
    
  }
})
