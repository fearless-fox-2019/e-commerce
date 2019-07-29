<template>
  <div class="main d-flex">
    <Sidebar class="col-3" @add-product="addProduct" :cartAmount="cartAmount"></Sidebar>
    <ProductInfo class="col-9"></ProductInfo>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import ProductInfo from "../components/ProductInfo.vue";
import Content from "../components/Content.vue";
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
    ProductInfo,
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
          let compileProduct = {};
          let compiledProducts = [];
          data.forEach(cart => {
            // console.log(cart.productId)
            amount++;
            if (compileProduct[cart.productId._id] == undefined) {
              compileProduct[cart.productId._id] = {
                _id: cart.productId._id,
                name: cart.productId.name,
                description: cart.productId.description,
                price: cart.productId.price,
                amount: cart.productId.amount,
                featured_image: cart.productId.featured_image,
                count: 0
              };
            }
            compileProduct[cart.productId._id].count++;
          });

          for (const key in compileProduct) {
            compiledProducts.push(compileProduct[key]);
          }

          console.log(compiledProducts);
          this.cartAmount = amount;
          this.userCarts = compiledProducts;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addCart() {
      this.getUserCarts();
    },
    deleteCart() {
      this.getUserCarts();
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
}
</style>

