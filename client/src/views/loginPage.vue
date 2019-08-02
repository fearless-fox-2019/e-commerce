<template>
  <div v-if="!loggedIn">
    <h1 class="header">Tokoku</h1>
    <div id="loginPage">
      <div class="loginPage">
      <h3>Please Login</h3>
      <login></login>
      </div>
      <h5>Don't have an account? , please <a href="" v-on:click.prevent="changeToRegister()">Register</a></h5>
    </div>
  </div>
</template>

<script>
import login from '@/components/login.vue'

export default {
  name: 'loginPage',
  props: ['loggedIn'],
  data(){
    return{
    }
  },
  components: {
    login
  },
  methods: {
    changeToRegister(){
      this.$router.push("/");
    }
  }
}
</script>
