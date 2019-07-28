<template>
  <div class="listproducts">
    <product-card v-for="product in products" :key="product.id" :product="product" class="product"></product-card>
  </div>
</template>

<script>
import axios from '../config/axios.js'
import productCard from '../components/productCard.vue'

export default {
  props: ['products'],
  components: {
    productCard
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
    getAllProducts () {
      axios({
        method: `GET`,
        url: `/products`
      })
        .then(({ data }) => {
          console.log('data', data)
          this.products = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getAllProducts()
  }
}
</script>

<style>
.product {
    display: flex;
    flex-wrap : wrap;
}
</style>
