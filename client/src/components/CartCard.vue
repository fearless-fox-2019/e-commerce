<template>
  <v-card class="cart-card">
    <div>
      <v-img contain width="200px" height="200px" :src="product.image">
      </v-img>
    </div>
    <div class="text-cart">
      <div class="container-text">
        <p class="title-cart">
          {{product.name}}
        </p>
        <v-tooltip top color="red">
          <template v-slot:activator="{ on }">
            <v-btn
              text
              color="red"
              icon
              v-on="on"
              @click="deletThis"
            >
              <v-icon>mdi-close-box</v-icon>
            </v-btn>
          </template>
          <span>Remove from cart</span>
        </v-tooltip>
      </div>
      <v-divider></v-divider>
      <div id="footer">
        <p class="price-cart">Total Price (x{{product.total}}) : {{price}}</p>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {

    }
  },
  methods : {
    deletThis() {
      this.$store.dispatch('deleteItemInCart', this.product.product)
      .then(() => {
        this.$toast.open({ message: 'Item removed !', type: 'is-success'})
        this.$store.dispatch('fetchCart')
      })
      .catch(err => {
        console.log(err.response.data)
      })
    }
  },
  computed : {
    price() {
      let arr = this.product.totalPrice.toString().split("");
      let start;
      if (arr.length % 3 !== 0) {
        start = arr.length % 3;
      }

      for (let i = start || 3; i < arr.length; i += 4) {
        arr.splice(i, 0, ".");
      }

      return "Rp " + arr.join("");
    }
  }
}
</script>

<style scoped>
  .cart-card {
    display: flex;
    margin: 20px;
    padding: 5px;
    align-items: center;
  }
  .text-cart {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .title-cart {
    font-size: 20px;
    
  }
  .price-cart {
    color: #E53935;
  }
  .container-text {
    display: flex;
    /* width: 100%; */
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
  }
  #footer {
    display: flex;
    justify-content: space-between;
  }
</style>
