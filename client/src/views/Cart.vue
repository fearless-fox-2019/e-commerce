<template>
  <div class="cart">
    <Cart/>
  </div>
</template>


<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Cart from '@/components/Cart.vue'

export default {
  name: 'home',
  components: {
    Cart
  }
}
</script>