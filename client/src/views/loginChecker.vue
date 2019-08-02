<template>
  <div v-if="!loggedIn">
    <h1 class="header">Tokoku</h1>
    <div id="loginChecker">
      <div class="register">
      <h3>Please Register</h3>
      <register></register>
      </div>
      <h5>Have an account? , please <a href="" v-on:click.prevent="changeToLogin()">Login</a></h5>
    </div>
  </div>
</template>

<script>
import register from '@/components/register.vue'

export default {
  name: 'loginChecker',
  props: ['loggedIn'],
  data(){
    return{
    }
  },
  components: {
    register
  },
  methods: {
    changeToLogin(){
      this.$router.push("/login");
    }
  }
}
</script>
