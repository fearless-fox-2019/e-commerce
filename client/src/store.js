import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';
import api from './apis/localhost';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    isLoggedIn: false,
    isAdmin: false,
    user: {
      id: '',
      name: '',
      email: '',
      address: null,
      phone: null,
      totalPayment: 0,
      isAdmin: false,
    },
    product: {},
    products: [],
    tables: [],
    drawers: [],
    carts: [],
    allCarts: [],
  },
  getters: {
    getUser: state => state.user,
    getUserRole: state => state.user.role,
    getUserCarts: state => state.carts,
    cartLength: state => (state.allCarts.length ? state.allCarts.length : 0),
    isAdmin: state => state.user.isAdmin === true,
    isLoggedIn: state => state.isLoggedIn,
  },
  mutations: {
    setUserCarts(state, payload) {
      state.carts = payload;
    },
    pushToUserCarts(state, payload) {
      state.carts.push(payload);
    },
    removeFromUserCarts(state, id) {
      state.allCarts = state.allCarts.filter(cart => cart.id !== id);
    },
    setIsLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
    setIsAdmin(state) {
      state.isAdmin = true;
    },
    setUserData(state, payload) {
      if (payload) {
        // console.log(payload);
        state.user = payload;
        state.isLoggedIn = true;
        if (payload.isAdmin) state.isAdmin = true;
      }
      // else state.user = {};
    },
    setDefaultState(state) {
      state.user = {};
    },
    setTotalPayment(state, totalPayment) {
      state.user.totalPayment = totalPayment;
    },
    pushToTables(state, payload) {
      state.tables = payload;
    },
    pushToDrawers(state, payload) {
      state.drawers = payload;
    },
    setProducts(state, payload) {
      state.products = payload;
    },
    setProduct(state, payload) {
      state.product = payload;
    },
    setAllCarts(state, payload) {
      state.allCarts = payload;
    },
    // logout(state) {
    //   Swal.fire({
    //     type: 'success',
    //     title: 'Logout Success',
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    //   localStorage.clear();
    //   state.isLoggedIn = false;
    //   state.isAdmin = false;
    //   state.user = {};
    //   router.push('/');
    // },
  },
  actions: {
    register({ commit, state }, payload) {
      console.log('masuk register');
      api.post('/users/signup', payload)
        .then(({ data }) => {
          console.log(data);
          Swal.fire({
            type: 'success',
            title: `Welcome, ${data.name}`,
            showConfirmButton: false,
            timer: 1500,
          });
          commit('setIsLoggedIn', true);
          commit('setUserData', data);
          state.token = data.token;
          localStorage.token = data.token;
          localStorage.id = data.id;
          localStorage.name = data.name;
          setTimeout(() => { router.push('/'); }, 1800);
          router.push('/');
        })
        .catch((err) => {
          console.log(err.response);
          Swal.fire({
            type: 'error',
            title: '',
            text: `${err.response}`,
          });
        });
    },
    login({ commit, dispatch, state }, payload) {
      api.post('users/signin', { email: payload.email, password: payload.password })
        .then(({ data }) => {
          if (data.isAdmin) commit('setIsAdmin', true);
          Swal.fire({
            type: 'success',
            title: `Welcome, ${data.name}`,
            showConfirmButton: false,
            timer: 1500,
          });
          commit('setIsLoggedIn', true);
          commit('setUserData', data);
          dispatch('getCart');
          state.token = data.token;
          localStorage.token = data.token;
          localStorage.id = data.id;
          localStorage.name = data.name;
          setTimeout(() => { router.push('/'); }, 1800);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            type: 'error',
            title: '',
            text: `${err.response.data}`,
          });
        });
    },
    logout({ commit }) {
      commit('logout');
    },
    setUserData({ commit }) {
      const { id } = localStorage;
      api.defaults.headers.common.token = localStorage.token;
      // console.log(id);
      if (id) {
        api.get(`users/${id}`)
          .then(({ data }) => {
            // console.log(data);
            commit('setUserData', data);
          })
          .catch((err) => {
            if (err.response.data === 'jwt expired') {
              commit('setDefaultState');
              localStorage.clear();
              router.push('/');
            }
          });
      }
    },
    fetchProducts({ commit }) {
      api.get('/products')
        .then(({ data }) => {
          commit('setProducts', data);
          commit('pushToDrawers', data.filter(el => el.category === 'drawer'));
          commit('pushToTables', data.filter(el => el.category === 'table'));
        })
        .catch(err => console.log(err.response.data));
    },
    getProduct({ commit }, id) {
      console.log('terpanggil', id);
      api.defaults.headers.common.token = localStorage.token;
      api.get(`/products/${id}`)
        .then(({ data }) => {
          commit('setProduct', data);
        })
        .catch(err => console.log(err.response.data));
    },
    createCart({ commit }, payload) {
      api.defaults.headers.common.token = localStorage.token;
      api.post('/carts', payload)
        .then(({ data }) => {
          commit('pushToUserCarts', data);
        })
        .catch(err => console.log(err.response));
    },
    getCart({ commit }) {
      let totalPayment = 0;
      api.defaults.headers.common.token = localStorage.token;

      api.get('/carts')
        .then(({ data }) => {
          data.forEach((cart) => {
            totalPayment += cart.totalPrice;
          });
          commit('setTotalPayment', totalPayment);
          // commit('setUserData', data);
          commit('setAllCarts', data);
        })
        .catch(err => console.log(err));
    },
    removeFromCart({ commit, state }, id) {
      let totalPayment = state.user.totalPayment;
      api.defaults.headers.common.token = localStorage.token;

      api.delete(`/carts/${id}`)
        .then(({ data }) => {
          totalPayment -= data.totalPrice;
          commit('setTotalPayment', totalPayment);
          commit('removeFromUserCarts', data._id);
        })
        .catch(err => console.log(err));
    },
    updateUser({ commit }, payload) {
      api.defaults.headers.common.token = localStorage.token;
      if (localStorage.id) {
        api.put(`users/${localStorage.id}`, payload)
          .then(({ data }) => commit('setUserData', data))
          .catch((err) => {
            if (err.response.data.message === 'jwt expired') {
              commit('setDefaultState');
              localStorage.clear();
              this.$router.push('/');
            }
          });
      }
    },
  },
});
