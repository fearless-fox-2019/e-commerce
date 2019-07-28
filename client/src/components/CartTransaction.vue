<template>
  <v-card id="cart-transaction" elevation="8" width="470px" max-height="500px">
    <p id="title">Your Payment Summary</p>
    <v-divider></v-divider>
    
      <div v-for="(product, index) in cart.products" :key="index" class="item">
        <v-layout row justify-center>
          <v-flex xs7 class="name">{{product.name}}</v-flex>
          <v-flex xs1 class="total">x{{product.total}}</v-flex>
          <v-flex xs3 class="price">Rp {{product.totalPrice}}</v-flex>
        </v-layout>
      </div>
    
    <div id="result" class="item">
      <v-layout row justify-center>
        <v-flex xs7 class="name" id="totalPrice">Total price :</v-flex>
        <v-flex xs1 class="total">x{{resultTotal}}</v-flex>
        <v-flex xs3 class="price">{{resultPrice}}</v-flex>
      </v-layout>
    </div>
    <div id="btn" v-if="type == 'cart'">
      <v-btn color="red white--text" to="/checkout">Checkout</v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ['type'],
  name: "cartTransaction",
  computed: {
    ...mapState(["cart"]),
    resultPrice() {
      let result = 0
      this.cart.products.forEach(product => {
        result += product.totalPrice
      });

      let arr = result.toString().split("");
      let start;
      if (arr.length % 3 !== 0) {
        start = arr.length % 3;
      }

      for (let i = start || 3; i < arr.length; i += 4) {
        arr.splice(i, 0, ".");
      }

      return "Rp " + arr.join("");
    },
    resultTotal() {
      let result = 0
      this.cart.products.forEach(product => {
        result += product.total
      });
      return result
    }
  },
  methods: {
    openCheckout() {
      this.$store.commit('OPENCHECKOUT')
    }
  }
};
</script>

<style scoped>
#cart-transaction {
  margin: 20px;
  padding: 10px;
  /* position: fixed; */
  /* width */
  overflow-y: auto;
  overflow-x: hidden;
}

#cart-transaction::-webkit-scrollbar {
  width: 10px;
}

#cart-transaction::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-top: 1px solid #e53935;
  border-right: 1px solid #e53935;
}

#cart-transaction::-webkit-scrollbar-thumb {
  background: #e53935  ; 
}

#title {
  font-size: 24px;
  font-weight: bold;
  color: #e53935;
  margin: 0;
  text-align: center;
}
.item {
  margin: 0 5px;
  padding: 30px 0;
  /* border-top: 1px solid #e53935; */
  border-bottom: 1px solid #e53935;
}
.total {
  font-weight: bold;
}
.price {
  color: green;
}

#totalPrice {
  font-weight: bold;
  color: #e53935;
  font-size: 20px;
}
#result {
  background-color: rgba(52, 106, 206, 0.219);
  /* border: 1px solid #e53935; */
}
#btn {
  margin: 1em;
}
</style>
