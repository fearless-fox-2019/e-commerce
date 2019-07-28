<template>
  <v-content>
    <v-container fluid id="cart">
      <div id="cards">
        <v-layout row wrap>
          <v-flex id="payment">
            <paymentSummary />
          </v-flex>
          <v-layout align-center column fill-height>
            <v-flex class="pa-2" v-for="cart in $store.state.cartList" :key="cart._id">
              <cartGames :cart="cart" style="margin-left : 25vh; " />
            </v-flex>
          </v-layout>
        </v-layout>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import cartGames from "../components/cart-games";
import paymentSummary from "../components/paymentSummary";
export default {
  name: "cart",
  components: {
    paymentSummary,
    cartGames
  },
  data() {
    return {};
  },
  // watch: {
  //   looking() {
  //     this.$store.commit("SET_QUANTITY_PRICE");
  //   }
  // },
  created() {
    this.$store.commit("SET_LOGIN");
    this.$store.dispatch("getCart");
  }
};
</script>

<style>
#cart {
  height: auto;
}
#cards {
  margin-top: 90px;
  display: flex;
  justify-content: center;
}
#payment {
  padding-right: 100px;
}
#plus-minus {
  margin-top: 30px;
}
</style>