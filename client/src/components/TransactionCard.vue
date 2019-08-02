<template>
  <v-card class="tr-item">
    <div>
      <div id="header">
        <div id="text">
          <p class="item">Address : {{transaction.address}}</p>
          <p class="item">Courier : {{transaction.courier}}</p>
          <p class="item">Purchased on : {{date}}</p>
        </div>
        <div id="option">
          <v-card color="green white--text" elevation="4" style="padding: 7px;" v-if="type == 'shipping'">
            <p>{{transaction.statusTransaction}}</p>
          </v-card>
          <v-card color="blue white--text" elevation="4" style="padding: 7px;" v-if="type == 'delivered'">
            <p>Delivered</p>
          </v-card>
          <v-card color="black white--text" elevation="4" style="padding: 7px;" v-if="type == 'all'">
            <p>{{transaction.statusTransaction}}</p>
          </v-card>
        </div>
      </div>
      <v-divider></v-divider>
      <v-simple-table class="trans-table">
        <thead>
          <tr>
            <th class="text-left red--text">Book Title</th>
            <th class="text-center red--text">Bought</th>
            <th class="text-center red--text">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td >{{ product.name }}</td>
            <td class="text-center">{{ product.total }}</td>
            <td class="text-center">Rp {{ product.totalPrice}}</td>
          </tr>
          <tr>
           <td class="text-left result" >Total</td>
           <td class="text-center result" >{{resultTotal}}</td>
           <td class="text-center result" >{{resultPrice}}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
    <v-divider></v-divider>
    <v-btn block color="blue white--text" style="margin-top: 10px;" v-if="transaction.statusTransaction === 'shipping' && type === 'shipping'" @click="deliverThis">
      Confirm Delivery
    </v-btn>
    <v-btn block color="blue white--text" style="margin-top: 10px;" v-if="transaction.statusTransaction === 'ordered' && type === 'all'" @click="acceptThis">
      Accept Transaction
    </v-btn>
    <v-btn block color="black white--text" disabled style="margin-top: 10px;" v-if="transaction.statusTransaction === 'ordered' && type === 'shipping'" @click="acceptThis">
      Pending
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'transaction-card',
  props: ['transaction', 'type'],
  computed: {
    date () {
      const result = new Date(this.transaction.createdAt).toLocaleString()
      return result
    },
    products () {
      return this.transaction.cart.products
    },
    totalPrice () {
      let arr = this.transaction.totalPrice.toString().split('')
      let start
      if (arr.length % 3 !== 0) {
        start = arr.length % 3
      }
      for (let i = start || 3; i < arr.length; i += 4) {
        arr.splice(i, 0, '.')
      }

      return 'Rp ' + arr.join('')
    },
    resultTotal () {
      let result = 0
      this.transaction.cart.products.forEach(product => {
        result += product.total
      })
      return result
    },
    resultPrice () {
      let result = 0
      this.transaction.cart.products.forEach(product => {
        result += product.totalPrice
      })

      let arr = result.toString().split('')
      let start
      if (arr.length % 3 !== 0) {
        start = arr.length % 3
      }

      for (let i = start || 3; i < arr.length; i += 4) {
        arr.splice(i, 0, '.')
      }

      return 'Rp ' + arr.join('')
    }
  },
  methods: {
    deliverThis () {
      this.$store.dispatch('deliver', this.transaction._id)
        .then(({ data }) => {
          this.$toast.open({ message: 'Transaction updated ! Thanks for buying from B-Store :D', type: 'is-success', duration: 5000 })
          this.$store.dispatch('fetchTransactions')
          this.$router.push('/transaction/delivered')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    acceptThis () {
      this.$store.dispatch('acceptTransaction', this.transaction._id)
      .then(({data}) => {
        this.$toast.open({ message: 'Product accepted ! Now shipping to customer :)', type: 'is-success'})
        this.$store.dispatch('fetchTransactions')
        this.transaction.statusTransaction = 'shipping'
      })
      .catch(err => {
        console.log(err.response.data.errors)
      })
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
.tr-item {
  margin: 15px auto;
  padding: 10px;
  width: 70%;
}

th {
  font-size: 20px;
  color: #e53935;
}

td, th {
  padding: 15px;
  text-align: center;
}

#text {
  font-weight: bold;
}

#header {
  display: flex;
  justify-content: space-between;
}

.result {
  font-weight: bold;
}
</style>
