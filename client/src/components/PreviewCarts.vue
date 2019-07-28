<template>
  <div class="preview-cart">
    <h1>Carts</h1>
    <div class="proceed d-flex">
      <div class="totalPrice col">Total: ${{ totalPrices }}</div>
      <div class="checkout col">
        <button class="btn btn-warning">Checkout</button>
      </div>
    </div>
    <div class="cart-list d-flex flex-column">
      <CartCard
        v-for="cart in compiledCarts"
        :key="cart._id"
        :id="cart._id"
        :name="cart.name"
        :description="cart.description"
        :price="cart.price"
        :amount="cart.amount"
        :featuredImage="cart.featured_image"
        :count="cart.count"
        @add-cart="addCart"
        @delete-cart="deleteCart"
      ></CartCard>
    </div>
  </div>
</template>

<script>
import CartCard from "@/components/CartCard.vue";

export default {
  props: ["compiledCarts", "totalPrices"],
  components: {
    CartCard
  },
  methods: {
    addCart() {
      this.$emit("add-cart");
    },
    deleteCart() {
      this.$emit("delete-cart");
    }
  }
};
</script>

<style scoped>
div.preview-cart {
  margin-left: auto;
  height: 100%;
  padding: 40px 30px;
  color: rgb(77, 21, 21);
}

h1 {
  font-family: "Fugaz One";
  margin-bottom: 40px;
}

.proceed {
  margin-bottom: 30px;
  font-family: "Oswald";
  font-size: 25px;
}
</style>
