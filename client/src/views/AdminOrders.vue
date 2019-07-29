<template>
    <div style="margin-top: 7em; padding-left: 200px; padding-right: 200px">
        <div class="text-center mb-3 mt-5">
            <h3>Order List</h3>
        </div>
        <table class="table table-hover" style="background-color: #fff">
            <thead>
                <tr>
                    <th scope="col"><p>#</p></th>
                    <th scope="col"><p>Order Date</p></th>
                    <th scope="col"><p>Name</p></th>
                    <th scope="col"><p>Address</p></th>
                    <th scope="col"><p>Phone</p></th>
                    <th scope="col"><p>Status</p></th>
                    <th scope="col"><p>Total Payment</p></th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(transaction, index) in transactions"
                    :key="index"
                >
                    <th scope="row">{{index+1}}.</th>
                    <td><p>{{transaction.createdAt | moment("MMMM, Do YYYY")}}</p></td>
                    <td>
                        <p>{{transaction.UserId.name}}</p>
                    </td>
                    <td><p>{{transaction.UserId.address}}</p></td>
                    <td><p>{{transaction.UserId.phone}}</p></td>
                    <td><p>{{transaction.status}}</p></td>
                    <td><p>{{converter(transaction.totalPayment)}}</p></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import api from '../apis/localhost';
import converter from '../helpers/converter';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      transactions:[]
    }
  },
  mounted() {
    this.fetchTransactions()
  },
  methods: {
    fetchTransactions() {
      api.defaults.headers.common.token = localStorage.token 

      api.get('/transactions')
        .then(({ data }) => {
          this.transactions = data
        })
        .catch(err => console.log(err.response))
    },
    converter
  },
}
</script>

<style scoped>
  p {
    margin: 0
  }
</style>
