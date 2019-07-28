<template>
  <v-card width="800">
    <v-layout py-4 pl-4>
      <v-flex shrink>
        <v-img height="250" width="200" :src="cart.GameId.image"></v-img>
      </v-flex>
      <v-flex text-center>
        <v-container grid-list-lg pa-0>
          <v-card-title>
            <h1 style="font-size : 27px">{{ cart.GameId.name }}</h1>
          </v-card-title>
          <v-card-text>Rp. {{ cart.GameId.price }}</v-card-text>
         <v-btn>DETAIL</v-btn>         
          <v-divider style="width: 550px; margin-left: 15px;"></v-divider>
          <div id="plus-minus">
            <v-layout row>
              <v-flex style="margin-left : 20px">
                <h1>Quantity</h1>
                <v-overflow-btn
                  class="my-2"
                  :items="stock"
                  v-model="cart.quantity"
                  @change="updateNewPrice"
                  editable
                  style="width : 100px;"
                  item-value="number"
                ></v-overflow-btn>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex style="padding-left : 250px; margin-top : 50px;">
                <v-btn color="red lighten-1" @click="deleteCart">Remove</v-btn>
              </v-flex>
            </v-layout>
          </div>
          <v-layout column></v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import ax from "../api/api";
export default {
  name: "cartGames",
  props: ["cart"],
  data() {
    return {
      link : `cart/${cart.GameId._id}`,
      snackbar: false,
      status: "",
      alertMessage: "",
      quantity: this.cart.quantity,
      stock: []
    };
  },
  watch: {
    // quantity : function() {
    //   let newPrice = this.cart.totalPrice * this.cart.quantity;
    //   this.$store.commit("SET_MULTIPLE", newPrice);
    // }
  },
  methods: {
    getArrStock() {
      let stockGame = this.cart.GameId.stock;
      let arrStock = [];
      for (let i = 1; i <= stockGame; i++) {
        arrStock.push(i);
      }
      this.stock = arrStock;
    },
    deleteCart() {
      console.log("triggered");
      ax({
        method: "delete",
        url: `/carts/${this.cart._id}`,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("getCart");
          this.dialog = false;
          this.snackbar = true;
          this.status = "success";
          this.alertMessage = "Successfully delete cart";
          setTimeout(() => {
            this.snackbar = false;
          }, 2000);
        })
        .catch(err => {
          console.log(err);
        });
    },      
    updateNewPrice(){
      let newStock = this.cart.GameId.stock - this.cart.quantity
      let newPrice = this.cart.quantity * this.cart.GameId.price
      this.$store.commit('SET_TOTAL_PRICE', {cartId : this.cart._id, newPrice : newPrice, newStock : newStock})
      let newData = {
        quantity : this.cart.quantity,
        totalPrice : newPrice
      }
      ax({
        method : 'patch',
        url : `/carts/${this.cart._id}`,
        data : newData,
        headers : {token : localStorage.token}
      })
      .then(({data}) => {
        console.log(data)
      })
      .catch(({response}) => {
        console.log(response)
      })
    }
  },
  created() {
    this.getArrStock();
  }
};
</script>

<style>
</style>
