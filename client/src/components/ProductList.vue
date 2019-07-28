<template>
  <div id="product-container">
    <ProductCard v-for="book in products" :key="book._id" :book="book"/>
  </div>
  <!-- <v-layout wrap d-flex id="product-container">
  </v-layout> -->
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProductCard from '@/components/ProductCard.vue'
export default {
  name: 'productList',
  props: [],
  components: {
    ProductCard
  },
  computed : {
    ...mapState(['products'])
  }
}
</script>

<style>
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
