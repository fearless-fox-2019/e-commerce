<template>
  <div>
    <h2> Products : </h2>
    <div class="container row" style="margin-left: 3%; max-height: 600px; overflow: auto; width: auto;">
      <card style="background-color: white; color: #2c3e50; margin: 1%; max-width: 300px;" v-for="(product, index) in this.$store.state.products" :key="index" :data="product" v-bind:addCart="addToCart"> </card>
    </div>
  </div>
</template>

<script>
import card from '../components/Card'
import axios from 'axios'
export default {
  name: 'Products',
  components: {
    card
  },
  created () {
    this.$store.dispatch('retrieveProduct')
    this.$store.dispatch('retrieveCart')
  },
  methods: {
    addToCart (product) {
      if (this.$store.state.cart.arrProduct.length < 1) {
        let arrProducts = this.$store.state.cart.arrProduct
        let obj = {
          img: product.img,
          productName: product.name,
          price: product.price,
          amount: 1,
          totalPrice: product.price
        }
        arrProducts.push(obj)
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
          Swal.fire({
            title: `Success add product to cart!`,
            type: 'success'
          })
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        }) 
      } else {
        let arrProducts = this.$store.state.cart.arrProduct
        let maxAmount = product.stock
        let isProductExist = false
        let isProductAmount = false
        let indexArr = 0
        for (let i = 0; i < arrProducts.length; i++) {
          if (product.name === arrProducts[i].productName && arrProducts[i].amount < maxAmount) {
            isProductExist = true   
            isProductAmount = true
            indexArr = i
          }
        }
        if (!isProductExist) {
            let obj = {
              img: product.img,
              productName: product.name,
              price: product.price,
              amount: 1,
              totalPrice: product.price
            }
            arrProducts.push(obj)
        } else {
          if (isProductAmount) {
            arrProducts[indexArr].amount ++
            arrProducts[indexArr].totalPrice = arrProducts[indexArr].price * arrProducts[indexArr].amount
          } else {
            Swal.fire({
              title: 'Maximum stock reached!',
              type: 'error',
              confirmButtonText: 'Ok'
            })
          }
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
          Swal.fire({
            title: `Success add product to cart!`,
            type: 'success'
          })
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
      }
    }
  }
}
</script>

<style></style>
