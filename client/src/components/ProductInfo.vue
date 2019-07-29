<template>
  <div class="products d-flex flex-column">
    <div class="product-name">
      <h1>{{productInfo.name}}</h1>
    </div>
    <div class="image">
      <img :src="productInfo.featured_image" alt="product" />
    </div>
    <div class="price d-flex flex-column align-items-start">
      <h2>Price: ${{ productInfo.price }}</h2>
      <small>stock: {{ productInfo.amount }}</small>
      <div class="line"></div>
    </div>
    <div class="desc">
      <p>{{ productInfo.description }}</p>
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import axios from "axios";

export default {
  data() {
    return {
      productInfo: {
        name: "",
        description: "",
        price: "",
        amount: "",
        featured_image: ""
      }
    };
  },
  methods: {
    getProduct() {
      console.log(this.$route.params.productId);
      axios({
        method: "get",
        url: `http://localhost:3000/products/${this.$route.params.productId}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          //   console.log(data);
          this.productInfo.name = data.name;
          this.productInfo.description = data.description;
          this.productInfo.price = data.price;
          this.productInfo.amount = data.amount;
          this.productInfo.featured_image = data.featured_image;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: function() {
    this.getProduct();
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
  font-size: 80px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.801);
}

.image img {
  width: 50%;
}

.price {
  font-family: "Oswald";
  margin-bottom: 20px;
}

div.line {
  width: 100%;
  border-bottom: 1px solid rgb(144, 144, 144);
  height: 10px;
}

div.desc {
  text-align: justify;
}
</style>
