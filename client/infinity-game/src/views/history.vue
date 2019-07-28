<template>
  <v-container class="elevation-3 summary">
    <v-layout row justify-center class="font-weight-bold title mb-2">
      <v-flex xs3 offset-xs1>Products</v-flex>
      <v-flex xs3 offset-xs1>Total Price</v-flex>
      <v-flex xs3 offset-xs1>Transaction Date</v-flex>
    </v-layout>
    <v-divider></v-divider>
    <!-- <v-layout
      row
      justify-center
      v-for="(transaction, index) in $store.state.transactions"
      :key="index"
      class="pt-2 pb-2 subheading details"
    >
      <v-flex xs3 offset-xs1>
        <div v-for="(cart, index) in transaction.carts" :key="index">
          {{cart.product.name}}
          <span class="font-weight-bold">x{{cart.quantity}}</span>
        </div>
      </v-flex>
      <v-flex xs3 offset-xs1 style="color: green;">${{transaction.total.toFixed(2)}}</v-flex>
      <v-flex xs3 offset-xs1>{{getDate(transaction.date)}}</v-flex>
    </v-layout> -->
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>
