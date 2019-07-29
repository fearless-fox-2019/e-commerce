<template>
  <v-card id="payment-card" minWidth="500" class="mx-auto">
    <v-snackbar class="mt-1" v-model="snackbar" top :color="status">{{alertMessage}}</v-snackbar>
    <v-card-title>
      <div class="title">
        <h1>YOUR PAYMENT SUMMARY</h1>
      </div>
    </v-card-title>

    <v-divider></v-divider>

    <v-layout class="pl-3 pt-4 pr-5" row wrap v-for="(cart, i) in $store.state.cartList" :key="i">
      <v-flex xs7 class="heading">{{ cart.GameId.name }}</v-flex>
      <v-flex xs3 class="heading">x{{ cart.quantity }}</v-flex>
      <v-flex xs1 class="heading">Rp.{{ cart.totalPrice }}</v-flex>
    </v-layout>
    <br />
    <v-divider></v-divider>
    <v-layout class="pa-3">
      <v-flex class="heading" xs10>Total price:</v-flex>
      <v-flex class="heading" style="padding-right : 5px;">Rp.{{ $store.getters.getTotalPrice }}</v-flex>
    </v-layout>
    <v-card-actions style="margin-top : 6px;">
      <v-btn @click="checkout" text>Check out</v-btn>            
    </v-card-actions>
  </v-card>
</template>

<script>
import ax from "../api/api";
export default {
  name: "paymentSummary",
  data() {
    return {
      newPrice: 0,
      snackbar: false,
      status: "",
      alertMessage: ""
    };
  },
  watch: {
  },
  methods: {
    checkout() {
      let newDataCart = {
        checkoutStatus: true
      };
      var promises = [];
      this.$store.state.cartList.forEach(cart => {
        promises.push(
          ax({
            method: "patch",
            url: `/carts/${cart._id}`,
            headers: { token: localStorage.token }
          })
        );
      });
      return Promise.all(promises)
        .then(({ data }) => {
          // console.log(data);
          let newData = {
            products: this.$store.state.cartList
          };
          return ax({
            method: "post",
            url: `/transactions`,
            data: newData,
            headers: { token: localStorage.token }
          });
        })
        .then(({ data }) => {
          console.log(data);
          this.$store.commit("SET_EMPTY_CART");
          this.$router.push("/cart");
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    viewHistory() {
      this.$emit("viewHistory");
    }
  },
  created() {}
};
</script>

<style>
#payment-card {
  position: fixed;
}
.heading {
  padding-right: 50px;
}
</style>
