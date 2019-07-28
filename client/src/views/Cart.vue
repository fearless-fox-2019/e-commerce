<template>
  <div>
    <div class="row" v-show="$store.state.isLogin">
      <div class="col-12 row" style="margin-bottom: 1%;">
        <h2 class="col-8"> Your Cart : </h2>
        <a class="col-1 pointer" style="font-size: 18px; color: #5A9CD9; font-weight: 600; text-align: center; margin-top: 5px;" v-if="$store.state.cart.arrProduct.length != 0" @click="checkout($store.state.cart._id)">Checkout </a>
        <h5 class="col-3" style="text-align: right; margin-top: 3px;" v-if="$store.state.cart.arrProduct.length != 0">Total Payment : {{ $store.state.cart.totalPayment }} </h5>
      </div>
      <div class="container col-12 row" style="max-height: 600px; overflow: auto;">
        <h4 class="col-12" v-if="$store.state.cart.arrProduct.length === 0">
          Your cart is empty, come look our product and add some!
        </h4>
        <div v-else class="col-12" v-for="(cart, index) in $store.state.cart.arrProduct" :key="index">
          <cart :data="cart" :index="index" :minAmount="minAmount" :addAmount="addAmount" :remove="remove"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cart from '../components/Cart'
import axios from 'axios'
export default {
  name: 'Cart',
  created () {
    this.$store.commit('checkLogin')
    this.$store.dispatch('retrieveProduct')
    this.$store.dispatch('retrieveCart')
  },
  components: {
    cart
  },
  methods: {
    minAmount (index) {
      let arrProducts = this.$store.state.cart.arrProduct
      for (let i = 0; i < this.$store.state.products.length; i++) {
        if (this.$store.state.products[i].name === arrProducts[index].productName) {
        }
      }
      if (arrProducts[index].amount > 1) {
        arrProducts[index].amount --
        arrProducts[index].totalPrice = arrProducts[index].price * arrProducts[index].amount
        let objArr = {
          arrProduct: arrProducts
        }
        axios({
          method: 'PATCH',
          url: `http://localhost:3000/transactions/update/product/${this.$store.state.cart._id}`,
          data: objArr,
          headers: {
            'access_token': localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          this.$store.dispatch('retrieveCart')
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
      } else {
        this.remove(index)
      }
    },
    addAmount (index) {
      let arrProducts = this.$store.state.cart.arrProduct
      let maxAmount = 0
      for (let i = 0; i < this.$store.state.products.length; i++) {
        if (this.$store.state.products[i].name === arrProducts[index].productName) {
          maxAmount = this.$store.state.products[i].stock
        }
      }
      if (arrProducts[index].amount < maxAmount) {
        arrProducts[index].amount ++
        arrProducts[index].totalPrice = arrProducts[index].price * arrProducts[index].amount
      } else {
        Swal.fire({
          title: 'Maximum stock reached!',
          type: 'error',
          confirmButtonText: 'Ok'
        })
      }
      let objArr = {
        arrProduct: arrProducts
      }
      axios({
        method: 'PATCH',
        url: `http://localhost:3000/transactions/update/product/${this.$store.state.cart._id}`,
        data: objArr,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        this.$store.dispatch('retrieveCart')
      })
      .catch(({ response }) => {
        console.log(response.data.message)
      })
    },
    remove (index) {
      let arrProducts = this.$store.state.cart.arrProduct
      arrProducts.splice(index, 1)
      let objArr = {
        arrProduct: arrProducts
      }
      Swal.fire({
        title: 'Are you sure to delete product from cart?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#343A40',
        cancelButtonColor: '#C82333',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.value) {
          return axios({
            method: 'PATCH',
            url: `http://localhost:3000/transactions/update/product/${this.$store.state.cart._id}`,
            data: objArr,
            headers: {
              'access_token': localStorage.getItem('access_token')
            }
          })
        } else {
          this.$store.dispatch('retrieveCart')
        }
      })
      .then(({ data }) => {
        this.$store.dispatch('retrieveCart')
      })
      .catch(({ response }) => {
        console.log(response.data.message)
      })
    },
    checkout(id) {
      axios({
        method: 'GET',
        url: `http://localhost:3000/users/user`,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
      .then( user => {
        if (user.data.balance >= this.$store.state.cart.totalPayment) {
          let objBalance = {
            balance: user.data.balance - this.$store.state.cart.totalPayment
          }
          axios({
            method: 'PATCH',
            url: `http://localhost:3000/users/updatebalance`,
            data: objBalance,
            headers: {
              'access_token': localStorage.getItem('access_token')
            }
          })
          .then(() => {
            for (let i = 0; i < this.$store.state.products.length; i++) {
              for (let j = 0; j < this.$store.state.cart.arrProduct.length; j++) {
                if (this.$store.state.products[i].name === this.$store.state.cart.arrProduct[j].productName) {
                  let objStock = {
                    stock: this.$store.state.products[i].stock - this.$store.state.cart.arrProduct[j].amount
                  }
                  return axios({
                    method: 'PATCH',
                    url: `http://localhost:3000/products/updatestock/${this.$store.state.products[i]._id}`,
                    data: objStock,
                    headers: {
                      'access_token': localStorage.getItem('access_token')
                    }
                  })
                  .catch(err => {
                    console.log(err)
                  })
                }
              }
            }
          })
          .then(() => {
            this.$store.dispatch('retrieveProduct')
            let objStatus = {
              status: 'Paid'
            }
            axios({
              method: 'PATCH',
              url: `http://localhost:3000/transactions/update/status/${id}`,
              data: objStatus,
              headers: {
                'access_token': localStorage.getItem('access_token')
              }
            })
            .then(() => {      
              let objTrx = {
                userId: user.data._id,
                arrProduct: [],
                status: 'Cart'
              }
              axios({
                method: 'POST',
                url: `http://localhost:3000/transactions`,
                data: objTrx
              })
              .then(() => {
                this.$store.dispatch('retrieveCart')
                Swal.fire({
                  title: `Success paid product!`,
                  text: "Confirm receive product in transaction's tab",
                  type: 'success'
                })
              })
              .catch(err => {
                console.log(err)
              })
            })
            .catch(err => {
              console.log(err)
            })
          })
          .catch(err => {
            console.log(err)
          })
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Insufficient Balance, please top up!',
            type: 'error',
            confirmButtonText: 'Ok'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.pointer {cursor: pointer;}
</style>
