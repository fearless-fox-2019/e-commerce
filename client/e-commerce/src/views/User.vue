<template>
  <div class="columns is-multiline">
    <router-view></router-view>
    <div v-if="details === false" style="display: flex; flex-wrap: wrap;">
      <div class="column is-9" style="display: flex; flex-wrap: wrap; margin-top: 13vh">
        <div class="column is-4" v-for="product in products" :key="product._id">
          <Products :product="product" @switchdetails="details = true"/>
        </div>
      </div>
      <div class="column is-3" style="padding: 2.5em">
        <div class="box">
          <h1>Your Cart :</h1>
          <div class="box" v-for="(userCart, index) in userCarts" :key="index" style="margin-top: 2.5vh">
            <div class="columns is-multiline">
              <div class="column cart-mini" style="padding: 0; margin: 0; width: 85px; margin-left: -2em;">
                <img :src="userCart.picture" alt="">
              </div>
              <div class="column" style="padding: 0; margin: 0; margin-left: -2em;">
                <h1>{{userCart.productName}}
                  <a @click.prevent="removeFromCart(index, userCart._id)">
                    <b-icon
                      pack="fas"
                      icon="times"
                      size="is-small">
                    </b-icon>
                  </a>
                </h1>
                <h2>Rp. {{getCurrencyFormat(userCart.price)}}</h2>
              </div>
            </div>
          </div>
          <div v-if="userCarts.length > 0"
          class="total">
            <h1 style="font-weight: 600; text-align: start">Total : Rp. {{getCurrencyFormat(total)}}</h1>
            <button class="button is-primary" style="margin-top: 1.5em">
              <span style="font-weight: 600;">Chekout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Products from '@/components/Product-All.vue';

export default {
  created() {
    this.$store.dispatch('getUserCart');
    this.$store.dispatch('getAllProducts');
  },
  data() {
    return {
      details: false,
    };
  },
  methods: {
    getCurrencyFormat(num) {
      let rupiah = '';
      const angkarev = num.toString().split('').reverse().join('');
      for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += `${angkarev.substr(i, 3)}.`;
      rupiah = rupiah.split('', rupiah.length - 1).reverse().join('');
      return `${rupiah.length < 1 ? '0' : rupiah},-`;
    },
    removeFromCart(index, id) {
      const payload = {
        index,
        id,
      };
      this.$store.dispatch('fireRemoveFromCart', payload);
    },
  },
  computed: mapState({
    products: state => state.products,
    userCarts: state => state.userCart,
    total: state => state.total,
  }),
  components: {
    Products,
  },
};
</script>

<style scoped>
  .box h1 {
    text-align: start;
    font-weight: 600
  }
  .box h2 {
    text-align: start;
  }

  .total {
    margin-top: 1.5em
  }

  .total h1 {
    text-align: start;
  }

  .cart-mini img {
    width: 75px;
    height: auto;
  }
</style>
