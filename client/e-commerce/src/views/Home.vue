<template>
  <div class="home">
    <Hero/>
    <h2 style="margin: 1em; font-size: 1.5em; font-weight: 600">All Products</h2>
    <div class="columns card-product" style="flex-wrap: wrap;">
      <div class="column is-4" v-for="product in products" :key="product._id">
        <Products :product="product"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';
import Hero from '@/components/Product-Hero.vue';
import Products from '@/components/Product-All.vue';

export default {
  created() {
    this.$store.dispatch('getAllProducts');
    this.$store.dispatch('getUserCart');
  },
  computed: mapState({
    products: state => state.products,
  }),
  components: {
    HelloWorld,
    Hero,
    Products,
  },
};
</script>

<style>
.card-product {
  margin: 1em 1em !important;
}
</style>
