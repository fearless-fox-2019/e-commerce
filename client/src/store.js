import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        token: localStorage.getItem("token") || null
    },
    getters: {
        loggedIn(state){
            return (state.token != null);
        }
    },
    actions: {
    },
    mutations: {
        updateToken(state, payload){
            state.token = payload;
            localStorage.setItem("token", payload);
        },
        logout(state, payload){
            state.token = null;
            localStorage.removeItem("token");
        }
    }
});
  