import Vue from 'vue';
import Vuex from 'vuex';
import axios from './config/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: false,
    loggedUser: {
      username: null,
      email: null,
    },
    products: [],
    selected: null,
    allUsers: null,
    userCart: [],
    total: 0,
  },
  mutations: {
    loggingOut(state) {
      state.isLogin = false;
    },
    loggingIn(state) {
      state.isLogin = true;
      state.loggedUser.username = localStorage.getItem('user');
      state.loggedUser.email = localStorage.getItem('user-mail');
    },
    fetchDataProduct(state, payload) {
      state.products = payload;
    },
    filterProductId(state, payload) {
      const updated = state.products.filter(val => val._id !== payload);
      state.products = updated;
    },
    insertProduct(state, payload) {
      state.products.unshift(payload);
    },
    selectProduct(state, payload) {
      const selected = state.products.find(val => val._id == payload);
      state.selected = selected;
    },
    loadingOn(state) {
      state.isLoading = !state.isLoading;
    },
    setAllUsers(state, payload) {
      state.allUsers = payload;
    },
    fetchCart(state, payload) {
      const initUserCart = [];
      state.total = 0
      payload.forEach((val) => {
        state.products.forEach((value) => {
          if (value._id === val._id) {
            value.quantity -= 1;
            initUserCart.push(value);
            state.total += value.price;
          }
        });
      });
      state.userCart = initUserCart;
    },
    addToCart(state, payload) {
      state.total += payload.price;
      state.userCart.push(payload);
      const updated = state.products.map((val) => {
        if (val._id === payload._id) {
          val.quantity--;
        }
        return val;
      });
      state.products = updated;
    },
    removeFromCart(state, payload) {
      const removed = state.userCart.filter((val, idx) => idx != payload.index);
      state.products.forEach((value) => {
        if (value._id === payload.id) {
          value.quantity++;
          state.total -= value.price;
        }
      });
      state.userCart = removed;
    },
    quantityPlus(state, payload) {

    },
  },
  actions: {
    getAllUsers({ commit, state }) {
      axios({
        method: 'GET',
        url: '/users/all',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          console.log('Success Retrieving Users Data');
          commit('setAllUsers', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllProducts({ commit, state }) {
      axios.get('/products/all')
        .then(({ data }) => {
          commit('fetchDataProduct', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserCart({ commit, state }) {
      axios({
        method: 'GET',
        url: '/users/get',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          commit('fetchCart', data.cart);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fireAddToCart({ commit, state, dispatch }, payload) {
      const user = state.allUsers.find(val => val.email === state.loggedUser.email);
      const id = user._id;
      const found = state.products.find((val => val._id == payload));
      axios({
        method: 'PATCH',
        url: `/users/add/${id}`,
        data: {
          product: found,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          commit('addToCart', found);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fireRemoveFromCart({ commit, state }, payload) {
      const user = state.allUsers.find(val => val.email === state.loggedUser.email);
      const id = user._id;
      axios({
        method: 'PATCH',
        url: `/users/remove/${id}`,
        data: {
          id: payload.id,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          commit('removeFromCart', payload);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

});
