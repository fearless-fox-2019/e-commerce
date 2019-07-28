import Vue from 'vue'
import Vuex from 'vuex'
import instance from "./myconfig"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: ""
    },
    detailsNow : "",
    products : [],
    joined: false,
    currentRoom: "",
    currentRoomDetails: "",
    isLogin: false
  },
  mutations: {
    LOGIN (state) {
      state.isLogin = true

    },
    SET_DETAIL (state, payload) {
      console.log(payload,"disiniii ni")
      state.detailsNow = payload
    },
    LOGOUT (state) {
      state.user.username = ""
      state.isLogin = false
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
  },
  actions: {
    GET_PRODUCTS (context) {
      instance
        .get("/products", {})
        .then(({ data }) => {
          console.log(data, "disini");
          // context.products = data;
          context.commit("SET_PRODUCTS", data)
          // console.log(context.products);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
})
