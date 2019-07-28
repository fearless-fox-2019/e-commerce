<template>
  <b-container>
    <table style="border: 2px solid black">
						<thead>
							<tr class="table100-head">
								<th class="column1">Date</th>
								<th class="column2">Order ID</th>
								<th class="column5">Total Price</th>
                <th class="column6">Product Name</th>
								<th class="column4">Quantity</th>
							</tr>
				    </thead>
            <tbody>
              <tr v-for="transaction in transactions" :key="transaction._id">
                <td>
                  <p>
                 {{moment(transaction.transactionDate)}}
                  </p>
                </td>
                <td>
                  <p>

                  {{transaction._id}}
                  </p>
                </td>
                <td>
                  <p>

                  ${{transaction.totalPrice}}.00
                  </p>
                </td>

                <td >
                  <!-- {{productId.name}} -->
                  <p v-for="product in transaction.products" :key="product._id">{{product.productId.name}}</p>
                  
                </td>
                <td>
                  <p v-for="product in transaction.products" :key="product._id">{{product.quantity}}</p>
                </td>
              </tr>
            </tbody>
    </table>
  </b-container>
</template>

<script>
import {mapState} from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      productId: []
    }
  },
  computed:  {
    ...mapState(['transactions'])
  },
  methods: {
    getTransactions() {
      this.$store.dispatch('transactionByUser')
    },
    moment() {
      return moment()
    }
  },
  created() {
    this.getTransactions()
    console.log(this.transactions);
    // console.log(this.transactions)
    // console.log(this.transactions)
  }
}
</script>

<style>

</style>
