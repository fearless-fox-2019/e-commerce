import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: "http://localhost:3000",
    loggedIn: false,
  },
  mutations: {
    userLoggedIn(state, payload) {
      console.log(payload);
      state.id = payload.id;
      state.token = payload.token;
      state.loggedIn = true;
    },
    userLoggedOut(state, payload) {
      state.id = "";
      state.loggedIn = false;
      console.log(state.loggedIn, 'this is loggedIn status')
    }
  },
  actions: {

  }
})
