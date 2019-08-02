<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-light" style>
    <div v-if="loggedIn">
    <router-link to="/ask">Ask! </router-link>
      <button v-on:click.prevent="logout()">Logout</button>
    </div>
    <!-- <router-link to="/about">About</router-link> -->
  </nav>
</template>

<script>
export default {
  name: "navBar",
  props: ["loggedIn"],
  components: {},
  methods: {
    logout() {
      this.$store.commit("userLoggedOut");
      localStorage.clear();
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#navBar {
  padding: 30px;
}

#navBar navBar {
  font-weight: bold;
  color: #2c3e50;
}

#navBar navBar.router-link-exact-active {
  color: #42b983;
}
</style>