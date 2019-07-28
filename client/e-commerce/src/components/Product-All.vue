<template>
  <div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img :src="product.picture" :alt="product.productName">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{{product.productName}}</p>
        <b-tag
          v-if="product.quantity > 0"
          type="is-success">
          Available
        </b-tag>
        <b-tag
          v-if="product.quantity === 0"
          type="is-danger">
          Out Of Stock
        </b-tag>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column is-half price">
        <h2>Rp.{{ getCurrencyFormat() }}</h2>
      </div>
    </div>
    <div class="content">
      {{product.productDescription.substring(0, 75)}}...
    </div>
    <div class="price">
      <h3>Quantity : {{product.quantity}} pc(s)</h3>
    </div>
    <div class="is-horizontal-centered" style="display: flex; justify-content: space-evenly">
      <b-button
        v-if="isLogin && product.quantity > 0 && loggedUser.email !== 'admin@admin.com'"
        type="is-primary"
        @click.prevent="addToCart(product._id)"
        style="font-weight: 600"
        >Add to Cart
      </b-button>
      <b-button
        v-if="isLogin && product.quantity == 0"
        disabled
        type="is-primary"
        style="font-weight: 600"
      >Add to Cart
      </b-button>
      <router-link :to="`/user/product/${product._id}`">
        <b-button
          @click="selected(product._id), hideAll()"
          type="is-primary"
          style="font-weight: 600"
          >View Product
        </b-button>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['product'],
  computed: mapState({
    isLogin: state => state.isLogin,
    loggedUser: state => state.loggedUser,
  }),
  methods: {
    getCurrencyFormat() {
      const num = this.product.price;
      let rupiah = '';
      const angkarev = num.toString().split('').reverse().join('');
      for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += `${angkarev.substr(i, 3)}.`;
      rupiah = rupiah.split('', rupiah.length - 1).reverse().join('');
      return `${rupiah.length < 1 ? '0' : rupiah},-`;
    },
    addToCart(id) {
      this.$store.dispatch('fireAddToCart', id);
    },
    selected(id) {
      this.$store.commit('selectProduct', id);
    },
    hideAll() {
      console.log('EMit');
      this.$emit('switchdetails');
    },
  },
};
</script>

<style scoped>
  .card-content {
    text-align: start;
  }

  .price h2 {
    font-weight: 600;
    font-size: 1.25em;
  }

  .price h3 {
    font-weight: 600;
    font-size: 1em;
  }

  .is-horizontal-centered {
    margin-top: 1em;
    display: flex;
    justify-content: center;
  }
</style>
