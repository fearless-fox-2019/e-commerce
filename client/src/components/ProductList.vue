<template>
  <div>
    <div id="search-bar">
      <v-text-field
        rounded
        outlined
        solo
        clearable
        v-model="searchInput"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search books...."
      ></v-text-field>
    </div>
    <div id="product-container">
      <ProductCard v-for="book in filteredList" :key="book._id" :book="book"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'
export default {
  name: 'productList',
  data () {
    return {
      searchInput: ''
    }
  },
  props: [],
  components: {
    ProductCard
  },
  computed: {
    ...mapState(['products']),
    filteredList () {
      return this.products.filter(product => {
        return product.name.toLowerCase().includes(this.searchInput.toLowerCase())
      })
    }
  }
}
</script>

<style>
#search-bar {
    width: 60%;
    margin: 2em auto;
    /* width: 10px; */
    /* height: 1px; */
  }
#product-container {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
  border-right: 2px solid rgba(255, 0, 0, 0.445);
  border-left: 2px solid rgba(255, 0, 0, 0.404);
  border-radius: 30px;
}
</style>
