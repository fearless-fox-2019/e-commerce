<template>
  <div class="main d-flex">
    <Sidebar class="col-3" @add-product="addProduct" :cartAmount="cartAmount"></Sidebar>
    <Content
      class="col-9"
      :products="products"
      @delete-product="deleteProduct"
      @add-cart="addCart"
      @edit-product="editProduct"
    ></Content>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";

import axios from "axios";

export default {
  data() {
    return {
      products: [],
      cartAmount: 0,
      userCarts: []
    };
  },
  components: {
    Sidebar,
    Content
  },
  methods: {
    getAllProducts() {
      axios({
        method: "get",
        url: "http://localhost:3000/products",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          // console.log(data);
          this.products = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addProduct() {
      this.getAllProducts();
    },
    deleteProduct() {
      this.getAllProducts();
    },
    getUserCarts() {
      axios({
        method: "get",
        url: "http://localhost:3000/users/cart",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          // console.log(data);
          let amount = 0;
          let collectCarts = [];
          let compileProduct = {};
          data.forEach(cart => {
            // console.log(cart.productId)
            collectCarts.push(cart);
            amount++;
            if (compileProduct[cart.productId._id] == undefined) {
              compileProduct[cart.productId._id] = {
                name: cart.productId.name,
                desc: cart.productId.description,
                price: cart.productId.price,
                featured_image: cart.productId.featured_image,
                count: 0
              };
            }
            compileProduct[cart.productId._id].count++;
          });

          // console.log(compileProduct);
          this.cartAmount = amount;
          this.userCarts = collectCarts;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addCart() {
      this.getUserCarts();
      this.getAllProducts();
    },
    editProduct() {
      this.getAllProducts();
    }
  },
  created: function() {
    this.getAllProducts();
    this.getUserCarts();
  }
};
</script>

<style scoped>
div {
  margin-top: 30px;
  background-image: url("../assets/cubes.png");
}
</style>
