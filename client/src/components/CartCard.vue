<template>
  <div class="cart-card d-flex align-items-center">
    <div class="image col-2">
      <img :src="featuredImage" alt="product-img" />
    </div>
    <div class="detail col-7 d-flex flex-column align-items-start">
      <h3>{{name}}</h3>
      <p>
        {{maxDescriptionLength}}...
        <span>
          <a href v-if="maxDescriptionLength.length == 70">See all</a>
        </span>
      </p>
      <small>stock: {{amount}}</small>
      <small>price: ${{price}}</small>
    </div>
    <div class="options col-3 d-flex flex-column justify-content-around align-self-stretch">
      <div class="d-flex align-items-center">
        <div class="minus col-4">
          <button class="btn btn-danger" @click.prevent="deleteCart(id)">-</button>
        </div>
        <div class="count col-4">{{count}}</div>
        <div class="plus col-4">
          <button class="btn btn-primary" @click.prevent="addToCart(id)">+</button>
        </div>
      </div>
      <div class="total-price">
        <small>total price: ${{totalSinglePrice}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: [
    "id",
    "name",
    "description",
    "price",
    "amount",
    "count",
    "featuredImage"
  ],
  methods: {
    addToCart(id) {
      axios({
        method: "post",
        url: `http://localhost:3000/users/cart/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.$emit("add-cart");
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCart(id) {
      // console.log(id);
      axios({
        method: "delete",
        url: `http://localhost:3000/users/cart/delete/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log("Successfuly deleted 1 cart");
          this.$emit("delete-cart");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    totalSinglePrice() {
      let totalPerProduct = this.count * this.price;
      return totalPerProduct;
    },
    maxDescriptionLength() {
      return this.description.substr(0, 70);
    }
  }
};
</script>

<style scoped>
div.cart-card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.267);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

img {
  width: 100%;
}

p {
  text-align: justify;
  font-family: "Lora";
}

h3 {
  font-family: "Oswald";
}
</style>
