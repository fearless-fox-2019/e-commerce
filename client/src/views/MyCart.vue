<template>
  <div class="columns">
    <div class="column" id="homebar" v-if="$store.state.isLogin">
      <homenavbar></homenavbar>
    </div>
    <div style="margin-top:160px" class="column">
      <p>My Cart</p>
      <cart></cart>
    </div>
  </div>
</template>

<script>
import Cart from '../components/Cart.vue'
import homenavbar from '../components/HomeBar.vue'
export default {
  components: {
    Cart,
    homenavbar
  },
  created () {
    this.$store.dispatch('getLoggedUser')
  }
}
</script>

<style scoped>
p {
  font-size: 30px;
}
#homebar {
  height: 100px;
  display: flex;
  align-items: flex-end;
  margin-top: 35px;
  position: fixed;
}
</style>
