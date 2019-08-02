import Vue from 'vue'
import Vuex from 'vuex'
import db from './config/myaxios'



Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    sidebar: false,
    isLogin: false,
    allProducts: [],
    productById: {},
    userLogin: {},
    allProductsByUser: [],
    search: ''
  },
  mutations: {
    side(state){
      state.sidebar = !state.sidebar
    },
    ALL_PRODUCT(state, data){
      state.allProducts = data
    },
    PRODUCTBYID(state, data){
      state.productById = data
    },
    loginTrue(state, data){
      state.isLogin = true 
    },
    loginFalse(state, data){
      state.isLogin = false 
    },
    user(state, data){
      // kirim ke views
      state.userLogin = data
    },
    ALL_PRODUCTByUser(state, data){
      state.allProductsByUser = data
    },
    searchInput(state, data){
      state.search = data
    },
  },
  actions: {
    deleteCart({state, commit, dispatch}, payload){
      db.delete('/carts/'+payload)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addCart({state, commit, dispatch}, payload){
      console.log('sudah sampe sini? --addCart store')
      console.log(payload)
      db.post('/carts', payload)
      .then(response => {
        console.log(response, 'addTocart')
        this.$store.getCartByUser(payload.userId)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getCartByUser(userid){
      db.get('/carts/'+userid)
      .then(({data}) => {
        commit('ALL_PRODUCTByUser', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getAllProduct({state, commit, dispatch}, payload){
      db.get('/products')
      .then(({data}) => {
        commit('ALL_PRODUCT', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getProductById({state, commit, dispatch}, payload){
      db.get('/products/'+payload)
      .then(({data}) => {
        commit('PRODUCTBYID', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addProduct({state, commit, dispatch}, payload){
      db.post('/products', payload)
      .then(({data}) => {
        console.log(data)
        Swal.fire('berhasil', 'add data', 'success')
      })
      .catch(err => {
        console.log(err)
      })
    },
    USER_LOGIN({state, commit, dispatch}, payload){
      console.log('masuk gasi ? --- user login store')
      db.post('/users/login', payload)
      .then(response => {
        commit('loginTrue')
        localStorage.setItem('token', response.data.jwt)
        console.log(response.data, 'login controller')
        commit('user', response.data)
        //adat data & jwt
      })
      .catch(err => {
        console.log(err)
      })
    },
    USER_LOGOUT({state, commit, dispatch}, payload){
      commit('loginFalse')
      localStorage.clear()
    },
    registeruser({state, commit, dispatch}, payload){
      db.post('/users/register', payload)
      .then(response => {
        console.log(response.data, 'resgister controller')
        commit('user', response.data)
        // ada data
      })
      .catch(err => {
        console.log(ell)
      })
    },
    searchingitem({state, commit, dispatch}, payload){
      commit('searchInput', payload)
    },
  }
})
