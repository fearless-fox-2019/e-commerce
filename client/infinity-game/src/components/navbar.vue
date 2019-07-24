<template>
    <v-toolbar id="nav">
      <v-snackbar class="mt-1" v-model="snackbar" top :color="status">
        {{alertMessage}}
      </v-snackbar>
      <v-toolbar-title style="font-family: 'Stalinist One', cursive;">Infinity Game</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <buttonLogin />
        <buttonRegister />
        <v-btn flat @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import buttonLogin from './login-button'
import buttonRegister from './register-button'
import ax from '../api/api'
// import buttonRegister from './register-button'
export default {
  components : {
    buttonLogin,
    buttonRegister
  },
  data: () => ({
    drawer: null,
    snackbar: false,
    status: "",
    alertMessage: ""
  }),
  props: {    
  },
  methods: {       
    logout: function () {
      this.snackbar = true
      this.status = "success"
      this.alertMessage = "HIYAAAAAAAAAAAAAA"
      setTimeout(() =>{
        this.snackbar = false
      },2000)
    }
  }
};
</script>

<style>
#nav {
  position: fixed;
  z-index: 2;
}
</style>
