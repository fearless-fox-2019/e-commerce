<template>
  <v-layout id="page" justify-center>
    <v-flex id="isi" xs7>
      <CartCard v-for="(product, index) in cart.products" :key="index" :product="product"/>
    </v-flex>
    <v-flex id="transaction" xs4>
      <CartTransaction type="cart" />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import store from '../store'
import CartCard from '@/components/CartCard.vue'
import CartTransaction from '@/components/CartTransaction.vue'
export default {
  data() {
    return {
      dialog: false
    }
  },
  methods : {
    openCheckout() {
      this.dialog = true
    }
  },
  computed : {
    ...mapState(['loggedUser', 'cart', 'dialogCheckout'])
  },
  components : {
    CartCard,
    CartTransaction,
  },
  mounted() {
    if(this.cart._id == undefined || this.cart.products.length == 0) {
      this.$router.push('/')
      this.$toast.open({ message: 'Cart is empty :(', type: 'is-info'})
    }
  }
}
</script>

<style scoped >

#page {
  width: 100%;
}


</style>
