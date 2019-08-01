<template>
  <div class="home">
    <div class="image-overlay" style="height: 350px">
      <parallax direction="down">
        <img src="../../public/images/VIA_2-e1499950251168.jpg" alt="img-ovrly" />
      </parallax>
    </div>
    <div class="d-flex justify-content-center fp">
      <h1 style="color: rgba(255, 255, 255, 0.7); letter-spacing: 10px">LIVING IN STYLE</h1>
    </div>
    <div style="height: 350px;">&nbsp;</div>
    <div class="d-flex justify-content-center fp">
      <h1>Featured Products</h1>
    </div>
    <!-- <div class="featured-products d-flex flex-wrap justify-content-around" style="padding-left: 150px; padding-right: 150px">
      <Product></Product>
    </div> -->
    <!-- Tables -->
    <div class="d-flex justify-content-between" style="padding-left: 190px; padding-right: 190px">
      <h5>Tables</h5>
      <div>
        <a href="#" style="color: black; text-decoration: none" @click.prevent="goToShop"><small>SEE MORE</small></a>
      </div>
    </div>
    <hr style="margin-top: 0px; margin-left: 190px; margin-right: 190px" />
    <div
      class="featured-products d-flex flex-wrap justify-content-around"
      style="padding-left: 150px; padding-right: 150px"
    >
      <ProductByCategory v-for="(product, i) in tables.slice(0, 3)" :key="i" :product="product"></ProductByCategory>
    </div>

    <!-- Drawers -->
    <div class="d-flex justify-content-between" style="padding-left: 190px; padding-right: 190px">
      <h5>Drawers</h5>
      <div>
        <a href="#" style="color: black; text-decoration: none" @click.prevent="goToShop"><small>SEE MORE</small></a>
      </div>
    </div>
    <hr style="margin-top: 0px; margin-left: 190px; margin-right: 190px" />
    <div
      class="featured-products d-flex flex-wrap justify-content-around"
      style="padding-left: 150px; padding-right: 150px"
    >
      <ProductByCategory v-for="(product, i) in drawers.slice(0, 3)" :key="i" :product="product"></ProductByCategory>
    </div>
  </div>
</template>

<script>
import Parallax from 'vue-parallaxy';
import Product from '../components/Product';
import ProductByCategory from '../components/ProductByCategory';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  name: 'home',
  components: {
    Product,
    Parallax,
    ProductByCategory
  },
  props: {
    speedFactor: 0.5
  },
  methods: {
    goToShop() {
      this.$router.push('/products')
    }
  },
  computed: {
    ...mapState(['products', 'tables', 'drawers'])
  },
  created() {
    this.$store.dispatch('fetchProducts');
  }
};
</script>

<style scoped>
.image-overlay {
  margin-bottom: 35px;
}
h1 {
  font-size: 42px;
}

.fp {
  padding-bottom: 50px;
}
</style>
