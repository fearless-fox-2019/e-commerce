<template>
  <div class="card" v-if="product.stock > 0">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="product.img" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="subtitle is-6" style="text-align:center">
            <b>{{product.itemName.toUpperCase()}}</b>
            <br>
            <small style="color:green">Price: Rp. {{product.price}},-</small> 
          </p>
        </div>
      </div>
      <div class="content">
        {{product.description | truncate(40)}}
        <br />
        <small>stock: {{product.stock}}</small>
      </div>
      <div style="display:flex; justify-content:space-between">
        <a v-if="isAdmin" @click="editProduct" class="button is-small is-warning" style="float:right"><i class="fas fa-edit"></i></a>
        <a v-if="isAdmin" @click="deleteProduct" class="button is-small is-danger" style="float:right"><i class="fas fa-trash-alt"></i></a>
        <b-input
          v-if="!isAdmin"
          type="number"
          v-model="amount"
          min="0"
          :max="product.stock"
          required
        ></b-input>
        <a v-if="!isAdmin" @click="addToCart" class="button is-warning" style="float:right">
          <i class="fas fa-cart-plus"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import MoneyFormat from "vue-money-format";
import { mapState } from "vuex";
export default {
  props: ["product", "isComponentModalActive"],
  data() {
    return {
      amount: 1
    };
  },
  components: {
    MoneyFormat
  },
  computed: {
    ...mapState(["isAdmin"])
  },
  methods: {
    editProduct(){
      this.$emit('onEdit', this.product)
    },
    deleteProduct(){
      this.$store.dispatch('deleteProduct', this.product._id)
        .then(() => {
            this.$toast.open('product deleted')
          })
          .catch(err => {
            this.$toast.open('failed to delete product')
          });
    },
    addToCart() {
      console.log("addtocart");
      this.$store
        .dispatch("addToCart", {
          productId: this.product._id,
          amount: this.amount
        })
        .then(() => {
          this.$store.dispatch("getMyCart", localStorage.getItem("userId"));
          this.$toast.open(`succes add ${this.amount} pc(s) of "${this.product.itemName}" to your cart`);
          console.log(
            "succes add ",
            this.amount,
            " pc(s) of ",
            this.product.itemName,
            " to your cart"
          );
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.card {
  font-family: "Mada", sans-serif;
  max-width: 20%;
  border: 1px grey solid;
  margin: 10px;
}
.card-image {
  border-bottom: 1px solid red;
}
.card-content {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
</style>
