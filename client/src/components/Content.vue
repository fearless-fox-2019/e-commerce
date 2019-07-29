<template>
  <div class="products d-flex flex-column">
    <div class="main-products">
      <h1>Products</h1>
      <div class="products-list d-flex flex-wrap">
        <ProductCard
          v-for="product in products"
          :key="product._id"
          :id="product._id"
          :name="product.name"
          :description="product.description"
          :price="product.price"
          :amount="product.amount"
          :featuredImage="product.featured_image"
          @delete-product="deleteItem"
          @add-cart="addCart"
          @edit-product="editProduct"
        ></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "../views/Home";
import ProductCard from "../components/ProductCard.vue";

import axios from "axios";

export default {
  props: ["products"],
  components: {
    ProductCard,
    Home
  },
  methods: {
    deleteItem() {
      this.$emit("delete-product");
    },
    addCart() {
      this.$emit("add-cart");
    },
    editProduct() {
      this.$emit("edit-product");
    }
  }
};
</script>

<style scoped>
div.products {
  margin-left: auto;
  height: 100%;
  padding: 40px 30px;
  color: rgb(77, 21, 21);
}

h1 {
  font-family: "Fugaz One";
}
</style>
