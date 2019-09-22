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
import { mapState } from 'vuex'
import CartCard from '@/components/CartCard.vue'
import CartTransaction from '@/components/CartTransaction.vue'
export default {
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    openCheckout () {
      this.dialog = true
    }
  },
  computed: {
    ...mapState(['loggedUser', 'cart', 'dialogCheckout', 'isLogin'])
  },
  components: {
    CartCard,
    CartTransaction
  },
  mounted () {
    if (!this.isLogin) {
      this.$router.push('/')
      this.$toast.open({ message: 'You have to login first !', type: 'is-danger' })
    }
  }
}
</script>

<style scoped >

#page {
  width: 100%;
}

</style>
