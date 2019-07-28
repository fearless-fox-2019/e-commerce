<template>
  <div class="columns">
    <div class="column is-3">
      <b-menu class="sidebar">
        <b-menu-list label="Menu">
          <b-menu-item @click.prevent="switchdash('all')" icon="information-outline" label="All Products"></b-menu-item>
          <b-menu-item @click.prevent="switchdash('add-product')" icon="information-outline" label="Create Product" @switchsection="switchdash"></b-menu-item>
          <b-menu-item @click.prevent="switchdash('edit-product')" icon="information-outline" label="List Users"></b-menu-item>
        </b-menu-list>
    </b-menu>
    </div>
    <div class="column sectionpart">
      <allproduct v-if="which.section === 'all'" @switchdash="switchdash" @selectproduct="selectproduct"></allproduct>
      <addproduct v-if="which.section === 'add-product'" @switchdash="switchdash"></addproduct>
      <editproduct v-if="which.section === 'edit-product'" :selectedProduct="selectedProduct"></editproduct>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import addproduct from '../components/Admin-Form';
import allproduct from '../components/Admin-Products';
import editproduct from '../components/Admin-Edit-Form';

export default {
  created() {
    this.$store.dispatch('getAllProducts');
  },
  data() {
    return {
      which: {
        section: 'all',
      },
      selectedProduct: null,
    };
  },
  methods: {
    switchdash(input) {
      this.which.section = input;
    },
    selectproduct(id) {
      this.selectedProduct = this.$store.state.selected;
    },
  },
  watch: {
    selectedProduct() {
      this.selectedProduct;
    },
  },
  components: {
    addproduct,
    allproduct,
    editproduct,
  },
};
</script>

<style>
  .sectionpart {
    background-color: #efefef;
    min-height : 95vh;
  }

  .sidebar {
    margin-left: 10%;
    margin-top: 10%;
    text-align: start
  }
</style>
