<template>
  <v-toolbar id="nav">
    <v-snackbar class="mt-1" v-model="snackbar" top :color="status">{{alertMessage}}</v-snackbar>
    <v-toolbar-title
      style="font-family: 'Stalinist One', cursive; cursor: pointer"
      @click="toHome"
    >Infinity Game</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-flex xs12 sm6>
      <v-text-field
        label="Search for a Game"
        prepend-icon="search"
        single-line
        solo
        style="margin-top: 10px;"
      ></v-text-field>
    </v-flex>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/history" v-if="isLogin">Transaction history</v-btn>
      <v-btn flat @click="toCart">
        <v-icon>mdi-cart</v-icon>Cart
      </v-btn>
      <buttonLogin v-if="!$store.state.isLogin" @click="$store.commit('SET_MODAL_LOGIN', false)" />
      <buttonRegister v-if="!$store.state.isLogin" />
      <v-btn flat @click="logout" v-if="$store.state.isLogin">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import buttonLogin from "./login-button";
import buttonRegister from "./register-button";
import ax from "../api/api";
import {mapState} from 'vuex'
export default {
  components: {
    buttonLogin,
    buttonRegister
  },
  data: () => ({
    drawer: null,
    snackbar: false,
    status: "",
    alertMessage: ""
  }),
  props: {},
  methods: {
    toHome() {
      this.$router.push("/");
    },
    logout: function() {
      this.toHome()
      this.snackbar = true;
      this.status = "warning";
      this.alertMessage = "Successfully Logout..";
      setTimeout(() => {
        this.snackbar = false;
      }, 2500);
      localStorage.clear();
      this.$store.commit("SET_LOGIN");      
    },
    toCart() {
      console.log("ashiap");
      if (!this.$store.state.isLogin) {
        this.dialog = false;
        this.snackbar = true;
        this.status = "error";
        this.alertMessage = "You Have To Login First To Open Cart!";
        setTimeout(() => {
          this.snackbar = false;
        }, 2300);
      }
      else {
        this.$router.push("/cart");
      }
    }
  },
  computed : { 
    ...mapState(['isLogin'])
  }
};
</script>

<style>
#nav {
  position: fixed;
  z-index: 2;
}
</style>
