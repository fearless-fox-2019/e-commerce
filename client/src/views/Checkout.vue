<template>
  <v-layout id="page" justify-center >
    <v-flex xs7 id="container-isi" align-self-center>
      <v-card id="isi" width="60%" height="80%">
        <p id="title">Checkout</p>
        <v-form @submit.prevent="checkout">
          <v-text-field
            label="Address"
            color="red"
            required
            v-model="checkoutInput.address"
          ></v-text-field>
          <v-select
            :items="courier"
            rounded
            label="Courier"
            solo
            v-model="checkoutInput.courier"
          ></v-select>
          <v-btn
            color="red white--text"
            type="submit"
          >Checkout</v-btn>
        </v-form>
      </v-card>
    </v-flex>
    <v-flex xs5>
      <CartTransaction />
    </v-flex>
  </v-layout>
</template>

<script>
import CartTransaction from '@/components/CartTransaction.vue'
export default {
  components: {
    CartTransaction
  },
  data () {
    return {
      checkoutInput: {
        address: '',
        courier: ''
      },
      courier: ['Go-Send', 'JNE', 'JNT', 'TIKI', 'Sicepat', 'Wahana']
    }
  },
  methods: {
    checkout () {
      this.$store.dispatch('checkout', this.checkoutInput)
        .then(({ data }) => {
          this.$store.dispatch('fetchCart')
          this.$toast.open({ message: 'Thanks for the purchase ! Now Shipping :)', type: 'is-success', duration: 5000 })
        })
    }
  }
}
</script>

<style scoped>
#title {
  color: #e53935;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
}
#isi {
  margin: auto;
  padding: 2em;
}
#container-isi {
  height: 100%;
  margin-top: 30px;
}
#page {
  height: 100%;
}
</style>
