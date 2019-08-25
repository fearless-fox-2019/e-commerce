<template>
  <div id="app">
    <mynavbar class="is-fixed-top"></mynavbar>
    <transition>
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
    <myfooter></myfooter>
  </div>
</template>

<script>
import myfooter from './components/MyFooter.vue'
import mynavbar from './components/MyNavbar'
export default {
  name: 'apps',
  components: {
    myfooter,
    mynavbar
  },
  data () {
    return {}
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #030303;
  background-color: grey;
}
</style>
