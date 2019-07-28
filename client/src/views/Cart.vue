<template>
  <b-container>
    <b-card title="Your Cart" style="background-color: #EEEEEE;">
    </b-card>
    <b-row>
      <b-col cols="8">
      <cartList></cartList>
      </b-col>
      <b-col cols="4" class="mt-2">
        <router-link to="/cart/paymentSummary">
         <h2>Payment Summary</h2>
        </router-link>

        <router-view></router-view>
      </b-col>
    </b-row>
  </b-container>

</template>

<script>
import cartList from '../components/cartList'
export default {
    data() {
      return {

      }
    },
    components: {
      cartList
    },
    methods: {
      cartByUser() {
        this.$store.dispatch('cartUser')
        // console.log(this.$store.state.carts.data)
      },
      getTotalPrice() {
        this.$store.dispatch('getTotal')
      }

    },
    created() {
      this.cartByUser()
      this.getTotalPrice()
    }
}
</script>

<style scoped>
.list-group-item {
  background-color: #343a40;
}

.sum {
  min-height: 400px;
  border: black solid 2px;
}

</style>
