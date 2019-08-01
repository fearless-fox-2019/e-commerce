<template>
  <div class="home">
    <div style="height: 100px;">&nbsp;</div>
    <!-- Tables -->
    <div class="d-flex justify-content-between" style="padding-left: 190px; padding-right: 190px">
      <h5>Tables</h5>
      <div>
        <!-- <small>SEE MORE</small> -->
      </div>
    </div>
    <hr style="margin-top: 0px; margin-left: 190px; margin-right: 190px" />
    <div
      class="featured-products d-flex flex-wrap justify-content-around"
      style="padding-left: 150px; padding-right: 150px"
    >
      <ProductByCategory v-for="(product, i) in tables" :key="i" :product="product"></ProductByCategory>
    </div>

    <div style="height: 50px;">&nbsp;</div>

    <!-- Drawers -->
    <div class="d-flex justify-content-between" style="padding-left: 190px; padding-right: 190px">
      <h5>Drawers</h5>
      <div>
        <!-- <small>SEE MORE</small> -->
      </div>
    </div>
    <hr style="margin-top: 0px; margin-left: 190px; margin-right: 190px" />
    <div
      class="featured-products d-flex flex-wrap justify-content-around"
      style="padding-left: 150px; padding-right: 150px"
    >
      <ProductByCategory v-for="(product, i) in drawers" :key="i" :product="product"></ProductByCategory>
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
  methods: {},
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
