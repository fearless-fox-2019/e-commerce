<template>
  <div id="app">
    <ul class="nav">
      <router-link class="navbar-brand" to="/">
        <i class="fa fa-truck" aria-hidden="true"></i>
        <span class="highlight">Indigo</span>Shop
      </router-link>

      <li class="nav-item">
        <router-link class="nav-link" to="/">Register</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/login">Login</router-link>
      </li>
    </ul>
    <Welcome></Welcome>
    <router-view />
  </div>
</template>
<script>
import Welcome from './components/Welcome'
export default {
  components: {
    Welcome
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
