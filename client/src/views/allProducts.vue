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
      productss: []
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
          this.productss = data
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
.listproducts {
  display: flex;
  /* flex-direction: row; */
  justify-content: flex-start;
  flex-wrap: wrap;
  float: left;
  max-width: 100%;
}

.product {
    display: flex;
    justify-content: flex-start;
    flex-wrap : wrap;
    margin-right: 20px;
}

</style>
