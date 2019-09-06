<template>
  <div id="app">
    <navbar-page :isLogin="isLogin" @isLogin="changeStatus"/>
    <router-view @isLogin="changeStatus"/>

    <!-- footer -->
    <footer-page class="footer-home"></footer-page>
    </div>

</template>

<script>

import navbarPage from './components/navbar'
import footerPage from './components/footer'

export default {
  data () {
    return {
      // isLogin : false,
      isLogin: !!localStorage.getItem('token')
    }
  },
  methods: {
    changeStatus (value) {
      this.isLogin = value
    }
  },
  components: {
    navbarPage,
    footerPage
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
