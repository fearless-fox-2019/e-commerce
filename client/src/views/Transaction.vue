<template>
  <div>
    <div class="row" v-show="$store.state.isLogin">
      <div class="col-12 row" style="margin-bottom: 1%;">
        <h2 class="col-8"> Your Transaction : </h2>
      </div>
      <div class="container col-12 row" style="max-height: 280px; overflow: auto;">
        <h4 class="col-12" v-if="$store.state.transaction.length === 0">
          Your transaction is empty, come look our product and add some!
        </h4>
        <div v-else class="col-12" v-for="(cart, index) in $store.state.transaction" :key="index">
          <cart :data="cart" :receive="receive"/>
        </div>
      </div>
    </div>
    <div class="row" v-show="$store.state.isLogin" style="margin-top: 2%;">
      <div class="col-12 row" style="margin-bottom: 1%;">
        <h2 class="col-8"> Received : </h2>
      </div>
      <div class="container col-12 row" style="max-height: 280px; overflow: auto;">
        <h4 class="col-12" v-if="$store.state.received.length === 0">
          Your received transaction is empty, come look our product and add some!
        </h4>
        <div v-else class="col-12" v-for="(cart, index) in $store.state.received" :key="index">
          <cart :data="cart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cart from '../components/TrxCart'
import axios from 'axios'
export default {
  name: 'Transaction',
  created () {
    this.$store.commit('checkLogin')
    this.$store.dispatch('retrieveProduct')
    this.$store.dispatch('retrieveTrx')
    this.$store.dispatch('retrieveReceived')
  },
  components: {
    cart
  },
  methods: {
    receive(id) {
      let objStatus = {
        status: 'Received'
      }
      axios({
        method: 'PATCH',
        url: `http://localhost:3000/transactions/update/status/${id}`,
        data: objStatus,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
      .then(() => {
        alert('success')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.pointer {cursor: pointer;}
</style>
