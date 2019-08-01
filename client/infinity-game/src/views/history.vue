<template>
  <v-content>
    <v-container fluid id="history" grey darken-2 style="margin-top : 50px;">
     <v-snackbar class="mt-1" v-model="snackbar" top :timeout="3000" :color="status">{{alertMessage}}</v-snackbar>
      <h1 style="text-align : center; font-size : 3em;">Your Transaction History</h1>
      <v-data-table :headers="headers" :items="transactions" hide-actions>
        <template slot="headerCell" slot-scope="{ header }">
          <span
            class="subheading font-weight-light text-success text--darken-3"
            v-text="header.text"
          />
        </template>
        <template slot="items" slot-scope="{ item }">
          <v-layout row wrap style="width : 150">
            <v-flex xs4>
              <td style="font-size : 1em;">{{ item.name }}</td>
            </v-flex>
          </v-layout>
          <td style="font-size : 1em;">{{ item.totalPrice }}</td>
          <td style="font-size : 1em;">{{ item.checkoutDate }}</td>
          <td style="font-size : 1em;" class="text-xs-right">{{ item.deliveredStatus }}</td>
          <td>
            <v-btn v-if="item.deliveredStatus == 'Delivery'" @click="confirmItem(item.id)">Confirm arrived item</v-btn>
          </td>
        </template>
      </v-data-table>            
    </v-container>
  </v-content>
</template>

<script>
import ax from "../api/api";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "history",
  components : {    
  },
  data() {
    return {
      snackbar : false,
      status : '',
      alertMessage : '',
      headers: [
        {
          sortable: false,
          text: "Item Names",
          value: "itemName"
        },
        {
          sortable: false,
          text: "Total Price",
          value: "totalPrice"
        },
        {
          sortable: false,
          text: "Checkout Date",
          value: "checkoutDate"
        },
        {
          sortable: false,
          text: "Delivery Status",
          value: "deliveredStatus",
          align: "right"
        }
      ],
      transactions: []
    };
  },
  methods: {
    getAlltransaction() {
      console.log("asdasd");
      ax({
        method: "get",
        url: "/transactions",
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data, "ini data");
          let temp = []
          data.forEach(el => {
            let names = "";
            el.products.forEach(elm => {
              names += `${elm.GameId.name}     x${elm.quantity}  `;
            });
            let newData = {
              id : el._id,
              name: names,
              totalPrice: `Rp. ${el.totalPrice}`,
              checkoutDate: moment(el.transactionDate).format("MMMM Do YYYY"),
              deliveredStatus: el.deliveredStatus ? "Received" : "Delivery"
            };
            temp.push(newData);
            console.log(newData);
          });
          this.transactions = temp
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    confirmItem(id) {
      console.log('ketriggered')
      ax({
        method: "patch",
        url: `/transactions/${id}`,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          this.getAlltransaction()
          this.snackbar = true
          this.status = "success"
          this.alertMessage = "Thankyou.... And Happy Gaming!^^"
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  computed: {},
  created() {
    this.getAlltransaction();
    this.$store.commit("SET_LOGIN");
  }
};
</script>

<style>
</style>
