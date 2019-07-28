<template>
  <div class="columns is-multiline item-details" style="margin-top: 10vh;">
    <div class="column is-one-thirds">
      <img :src="selected.picture" alt="">
    </div>
    <div class="column is-two-thirds right">
      <div style="display:flex; justify-content: flex-start">
        <a style="text-align: start">
          <router-link to="/">
            <strong>Back</strong>
          </router-link>
        </a>
      </div>
      <h1>{{selected.productName}}</h1>
      <div style="display: flex; justify-content: flex-start">
        <b-tag
          v-if="selected.quantity > 0"
          type="is-success">
          Available
        </b-tag>
        <b-tag
          v-if="selected.quantity === 0"
          type="is-danger">
          Out Of Stock
        </b-tag>
      </div>
      <h2>About This Product :</h2>
      <p>{{selected.productDescription}}</p>
      <div class="columns is-multiline">
        <div class="column">
          <h2>Price :</h2><h3>Rp. {{getCurrencyFormat(selected.price)}}.</h3>
        </div>
        <div class="column">
          <h2>Quantity :</h2><h3> {{selected.quantity}} Pc(s)</h3>
        </div>
      </div>
      <div style="display: flex; justify-content: flex-start;">
        <b-button
          v-if="isLogin && selected.quantity > 0 && loggedUser.email !== 'admin@admin.com' "
          type="is-primary"
          @click.prevent="addToCart(selected._id)"
          >Add to Cart
        </b-button>
        <b-button
          v-if="isLogin && selected.quantity == 0"
          disabled
          type="is-primary"
        >Add to Cart
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    getCurrencyFormat(num) {
      let rupiah = '';
      const angkarev = num.toString().split('').reverse().join('');
      for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += `${angkarev.substr(i, 3)}.`;
      rupiah = rupiah.split('', rupiah.length - 1).reverse().join('');
      return `${rupiah.length < 1 ? '0' : rupiah},-`;
    },
    addToCart(id) {
      this.$store.dispatch('fireAddToCart', id);
    },
    showAll() {
      this.$emit('showall');
    },
  },
  computed: mapState({
    selected: state => state.selected,
    isLogin: state => state.isLogin,
    loggedUser: state => state.loggedUser,
  }),
};
</script>

<style>
.item-details {
  padding: 2.5%;
}

.right h1 {
  font-weight: 600;
  text-align: start;
  font-size: 2em;
}

.right h2 {
  margin-top: 2.5vh;
  font-weight: 600;
  text-align: start;
  font-size: 1.25em;
}

.right a {
  text-align: start;
}
</style>
