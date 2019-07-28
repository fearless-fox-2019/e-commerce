<template>
    <div class="page-search">
        <!-- <h2>ini page search</h2> -->
        <p v-if="products.length > 0">{{products}}</p>
        <p v-if="err!== ''">{{err}}</p>
    </div>
</template>

<script>
import axios from '../config/axios.js'
export default {
  data () {
    return {
      products: [],
      err: ''
    }
  },
  created () {
    console.log('halo')
    console.log(this.$route.query.search)
    axios({
      method: `GET`,
      url: `/products?search=${this.$route.query.search}`
    })
      .then(({ data }) => {
        if (data.length == 0) {
          this.err = `We couldn't find a '${this.$route.query.search}' for sale.`
        } else {
          this.products = data
        }
      })
      .catch(err => {
        console.log(err)
        this.err = err
      })
  }
}
</script>

<style>

</style>
