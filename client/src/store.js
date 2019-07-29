import Vue from 'vue'
import Vuex from 'vuex'
import axi from './axiosApi.js'
import ElementUI from 'element-ui'
import { Notification } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import { rejects } from 'assert'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(Notification)

// Vue.prototype.$notify = Notification

export default new Vuex.Store({
  state: {
    allItem: [],
    allTransaction: [],
    signupErr: {},
    isLogin: false,
    logedUser: {},
    myTransaction: [],
    detailItem: {},
    searchitem: [],
    searchquery: '',
    searchCategory: ''
  },
  getters: {
    category(state) {
      let array = []
      state.allItem.forEach(element => {

        array = array.concat(element.category)
      })
      return [...new Set(array)]
    },
    rateCount(state) {
      console.log(state.detailItem, 'ini akan dihitung ratenya')
      let rate = state.detailItem.rate

      if (rate.count === 0) {
        return 0
      }else {
        return (rate.point / rate.count).toFixed(2)
      }
    },
    itemfilter(state) {
      let itemfiltered = []
      state.allTransaction.forEach(trans => {
      //   let filterItem = {}
      //   for (let i = 0; i < trans.item.length; i++) {
      //     console.log(trans.item[i])
      //       filterItem[trans.item[i].itemname] = 1 + (filterItem[trans.item[i].itemname] || 0)
      //   }
      //   for (let i = 0; i < array.length; i++) {
      //     const element = array[i]

      //   }
      //   itemfiltered.push(filterItem)
    })
    return itemfiltered
    // return [{a: 'a'},{b: 'b'},{c:'c'}]
    }
  },
  mutations: {
    fetchItem(state, payload) {
      console.log('masuk comit')
      console.log('ini di action')
      state.allItem = payload
    },
    changeStatus(state, payload) {
      state.isLogin = payload
    },
    logedUser(state, payload) {
      console.log(payload, 'ini dari payload')
      state.logedUser = payload
    },
    myTransaction(state, payload) {
      state.myTransaction = payload
    },
    anItem(state, payload) {
      state.detailItem = payload
    },
    setSearched(state, payload) {
      console.log(payload)
      state.searchitem = payload.data
      state.searchquery = payload.searchquery
    },
    setCategory(state, payload) {
      state.searchCategory = payload.data
      // console.log(payload.searchby,'ini yang di search dooonggg')
      router.push(`/product/category/${payload.searchby}`)
    },
    updated(state, payload) {
      return new Promise((resolve, reject) => {
        resolve(payload)
      })
    },
    setTransaction(state, payload) {
      state.allTransaction = payload
    }
  },
  actions: {
    searchItem({commit, state}, payload) {
      // console.log(payload, 'ini adaalh payloadnya')
      axi({
        url: `items/search/name?name=${payload}`,
        method: 'GET'
      })
        .then(({data}) => {
          console.log(data)
          commit('setSearched', {data, searchquery: payload})
          router.push('/product/search')
        }).catch(err => console.log(err))
    },
    searchbycategory({commit, state},payload) {
      // console.log('mencari berdasarkan category',payload)
      axi({
        url: `items/search/category?category=${payload}`,
        method: 'GET'
      })
        .then(({data}) => {
          // console.log(data)
          // console.log(payload,';ini di actionnya ')
          commit('setCategory', {data, searchby: payload})
        }).catch(err => console.log(err))
    },
    fetchItem(contex, payload) {
      console.log('masuk store mau ambil data')
      axi.get('/items')
        .then(({data}) => {
          console.log(data)
          contex.commit('fetchItem', data)
        }).catch(err => console.log(err))
    },
    signupUser({commit}, payload) {
      console.log(payload, ' berasal dari store')
      axi({
        url: '/users/signup',
        method: 'POST',
        data: payload
      })
        .then(({data}) => {
          console.log(data, ' hasil ablikan dari server')
          return axi({
            url: '/users/signin',
            method: 'POST',
            data: {
              ue: payload.email,
              password: payload.password
            }
          })
        })
        .then(({data}) => {
          console.log(data, 'eh berhasil login')
          localStorage.setItem('token', data)
          commit('changeStatus', true)
        })
        .catch(err => {
          console.log(err, 'ini errornya')
        // if(err.username)
        })
    },
    signinUser({commit}, payload) {
      console.log(payload, ' berasal dari signin store')
      axi({
        url: '/users/signin',
        method: 'POST',
        data: payload
      })
        .then(({data}) => {
          console.log(data)
          localStorage.setItem('token', data.token)
          commit('changeStatus', true)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    whoami({commit}, payload) {
      console.log('masuk whoami store')
      axi({
        url: `/users/whoami`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data, 'hasil whoami')
          commit('logedUser', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    myTransaction({commit, state}) {
      console.log(state.logedUser, 'ini logedUser dari store buat cari transaction')
      axi({
        url: `/transactions/userIdSearch/${state.logedUser._id}`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data, ' daftar transactionku')
          commit('myTransaction', data)
        })
        .catch(err => {
          console.log(err, ' dan ini errorya')
        })
    },
    signout({ commit, state }) {
      console.log('segeta logout')
      localStorage.removeItem('token')
      commit('changeStatus', false)
      router.push('/')
    },
    addToCart({ commit, state }, payload) {
      console.log(payload)
      axi({
        url: `users/addToCart/${payload}`,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToWishlist({commit, state},payload) {
      console.log('mau memberi bintang untuk diingat', payload)
      axi({
        url: `users/addWishlist/${payload}`,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data, ' berhasil memwishliast')
        // $store.dispatch.fetchItem
        })
        .catch(err => {
          console.log(err)
        })
    },
    anItem({commit, state},payload) {
      console.log(payload, 'from store')
      axi({
        url: `/items/${payload}`,
        method: 'GET'
      })
        .then(({data}) => {
          console.log(data, 'ini data item itu')
          commit('anItem', data)
        }).catch(err => console.log(err))
    },
    addNewItem({commit, state},payload) {
      console.log(payload, 'ini di store, mau  bikin baramg jualan baru')
      axi({
        url: '/items',
        method: 'POST',
        data: payload,
        config: {
          headers: {
            token: localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data, 'berhasil di input')
        }).catch(err => console.log(err))
    },
    deleteItem({commit, state},payload) {
      console.log('sudah samapi store mau dihapus', payload)
      axi({
        url: `/items/${payload._id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log('berhasil dihapus')
        }).catch(err => console.log(err))
    },
    updateItem({commit, state},payload) {
      console.log(payload, 'ini di store')
      // return new Promise((res, rej) => {
      axi({
        url: `/items/${payload.id}`,
        method: 'PATCH',
        data: payload.formData,
        config: {
          headers: {
            token: localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data, 'berhasil di input')
          // res('success')
          console.log('hmmmmm')
          // this.$notify({
          //     title: "Update notification",
          //     message: `Item is successfully Updated`,
          //     type: "success"
          // })
          commit('updated', data)
        }).catch(err => {
        console.log(err, 'hlooohhh')
      // rej('error daeehh')
      })
    // })
    },
    fetchAllTransaction({commit, state},payuload) {
      console.log('mengambil transaction')
      axi({
        url: `/transactions`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data)
          commit('setTransaction', data)
        }).catch(err => console.log(err))
    },
    removefromcart({commit,state},payload){
      console.log(payload,'remove from cart in store')
      axi({
        url :`/users/removeFromCart/${payload}`,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=> {
        console.log(data,'berhasil dihilangkan')
        this.fetchItem()
      }).catch(err => console.log(err, 'ini errornya'))
    },
    checkoutItem({commit,state},payload){
      axi({
        url:`/transactions`,
        method: 'POST',
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=> {
        console.log(data,'berhasil di buat transaksinya')
      }).catch(err => console.log(err,'ini erronya nih'))
    },
    confirmOrder({commit,state},payload){
      console.log('sampai storedonggg',payload)
      axi({
        url: `/transactions/${payload}`,
        method: 'PATCH',
        data: {
          status: 'received'
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=> {
        console.log(data,'ini datanya berhasil diupdate')
      }).catch(err => console.log(err))
    }
  }
})
