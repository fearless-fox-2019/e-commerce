<template>
  <div class="card">
    <img :src="forCard.image" @click="detailItem" />
    <span class="itemname" @click="detailItem">{{forCard.itemname}}</span>
    <span class="category">{{forCard.category[0]}}</span>
    <span class="price">{{forCard.price}}</span>
    <!-- <el-button type="warning" icon="el-icon-star-off"></el-button> -->
    <div class="buttoninCard">
      <span class="wishlist" v-show="this.$store.state.isLogin" @click="addToWishlist">
        <i class="el-icon-star-off"></i>
      </span>
      <el-button
        class="cartbutton"
        type="danger"
        v-show="this.$store.state.isLogin"
        @click="addToCard"
      >
        <i class="el-icon-shopping-cart-full"></i> Add to Cart
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["forCard"],
  methods: {
    addToCard() {
      this.$store.dispatch("addToCart", this.forCard._id);
          this.$store.dispatch("fetchItem");
    },
    addToWishlist() {
      this.$store.dispatch("addToWishlist", this.forCard._id);
          this.$store.dispatch("fetchItem");
    },
    detailItem(){
      this.$router.push(`/product/${this.forCard._id}`)
    }
  }
};
</script>

<style scoped>
.card {
  border: 1px solid whitesmoke;
  border-radius: 4px;
  min-height: 300px;
  width: 180px;
  margin: 7px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 6px;
  overflow: hidden;
  background-color: white;
}
img {
  width: 150px;
  min-height: 170px;
  max-height: 200px;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
}
.itemname {
  font-size: 20px;
  text-transform: capitalize;
  font-weight: 600;
  cursor: pointer;
}
.category {
  font-size: 12px;
  text-transform: capitalize;
}
.price {
  font-size: 19px;
  text-transform: capitalize;
}
.cartbutton {
  margin-top: 5px;
}
.wishlist {
  font-size: 20px;
  margin: 0px 10px 0px 0px;
  cursor: pointer;
}
</style>
