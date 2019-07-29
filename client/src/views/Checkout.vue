<template>
    <div style="margin-top: 8em; padding-left: 450px; padding-right: 450px">
        <div class="d-flex justify-content-center flex-column align-items-center">
          <h3 class="mb-3">Checkout</h3>
          <h6>Shipment Address</h6>
        </div>
        <form @submit.prevent="payNow">
          <div class="form-group">
            <label for="exampleInputEmail1">Address</label>
            <input 
              v-model.trim="user.address"
              type="text" 
              class="form-control" 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp" 
              placeholder="Enter address">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Phone</label>
            <input 
              v-model.trim="user.phone"
              type="number" 
              class="form-control" 
              id="exampleInputPassword1" 
              placeholder="Phone number">
          </div>
          <div class="d-flex justify-content-center"><button type="submit" class="btn btn-primary" style="background-color: black; border-color: black" @click.prevent="payNow">Pay Now</button></div>
        </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import api from '../apis/localhost';
import converter from '../helpers/converter';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
      ...mapState(['user', 'allCarts'])
  },
  methods: {
    ...mapActions(['updateUser', 'setUserData']),
    ...mapMutations(['setAllCarts']),
    converter,

    submitUserInformation() {
      this.updateUser({ address: this.user.address, phone: this.user.phone })
    },
    payNow() {
      api.defaults.headers.common.token = localStorage.token

      let ProductId = []
      this.allCarts.forEach(cart => {
        ProductId.push(cart.ProductId)
      })
      
      let payload = {
        UserId : this.user._id,
        ProductId,
        totalPayment: this.user.totalPayment
      }

      this.submitUserInformation()
      api.post(`/transactions`, payload)
        .then(transaction => {
          let emptyCarts = []
          Swal.fire(
              'Transaction Success!',
              'Thank you!',
              'success'
          )
          this.setAllCarts(emptyCarts)
          this.$router.push('/')
        })
        .catch(err => console.log(err.response))
    },
    mounted() {
      this.setUserData()
    },
  },
}
</script>

<style scoped>
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0; 
  }
</style>

