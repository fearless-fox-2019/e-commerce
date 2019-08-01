<template>
  <v-layout justify-center>
    <v-snackbar class="mt-1" v-model="snackbar" top :color="status">{{alertMessage}}</v-snackbar>
    <v-dialog v-model="dialog" persistent max-width="320">
      <template v-slot:activator="{ on }">
        <v-btn flat dark v-on="on" style="margin-right : 130px;">Add To cart</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Add {{ game.name }} to your cart?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" @click="dialog = false" text>Disagree</v-btn>
          <v-btn color="green darken-1" @click="addToCart">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import snackAlert from "./snackbar";
import ax from "../api/api";
export default {
  name: "dialogGlob",
  props: ["game"],
  data() {
    return {
      dialog: false,
      snackbar: false,
      status: "",
      alertMessage: ""
    };
  },
  methods: {
    addToCart() {
      ax({
        method: "get",
        url: `/carts/${this.game._id}`,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          if (data) {
            this.dialog = false;
            this.snackbar = true;
            this.status = "error";
            this.alertMessage = "This game is already in Cart!";
            setTimeout(() => {
              this.snackbar = false;
            }, 2300);
          } else {
            let newCart = {
              GameId: this.game._id,
              price: this.game.price
            };
            ax({
              method: "post",
              url: "/carts",
              data: newCart,
              headers: { token: localStorage.token }
            }).then(({ data }) => {
              this.dialog = false;
              this.snackbar = true;
              this.status = "success";
              this.alertMessage = "Successfully add to cart";
              setTimeout(() => {
                this.snackbar = false;
              }, 2000);
            });
          }
        })
        .catch(({ response }) => {
          console.log(response);
          if(response.data.message === 'Invalid Token'){
            this.dialog = false;
            this.snackbar = true;
            this.status = "error";
            this.alertMessage = "You Have To Login First To Do This Action!";
            setTimeout(() => {
              this.snackbar = false;
            }, 2300);
          }
        });
    }
  }
};
</script>

<style>
</style>
