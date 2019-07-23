<template>
  <div id="app">
      <NavBar :loggedInTrue="isLogin"></NavBar>
      <LoginForm @loggedIn="logInTrue"></LoginForm>
      <RegisterForm></RegisterForm>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
export default {
  components: {
    NavBar,
    LoginForm,
    RegisterForm
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    logInTrue () {
      this.isLogin = true
    }
  },
  watch: {
    isLogin: function () {

    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
