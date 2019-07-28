<template>
  <div id="app">
    <topnavbar></topnavbar>
    <router-view/>
  </div>
</template>
<script>
import topnavbar from '@/components/Navigation-Bar.vue';
import axios from './config/axios';

export default {
  created() {
    // eslint-disable-next-line
    (localStorage.getItem('token')) ? this.$store.commit('loggingIn') : this.$store.commit('loggingOut');
    this.$store.dispatch('getAllUsers');
  },
  name: 'Home',
  data() {
    return {

    };
  },
  components: {
    topnavbar,
  },
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
