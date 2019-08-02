<template>
  <div>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './components/Header'
import Footer from './components/Footerr'
export default {
  components: {
    Navbar,
    Footer,
  },
  created(){
    this.$store.dispatch('getAllProduct') // manggil actions
    if(localStorage.getItem('token')){
      this.$store.commit('loginTrue', true)
    }else{
      this.$router.push('/')
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body{
  background-color: #FAF8F9;
  min-height: 100vh;
}
</style>
