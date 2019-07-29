<template>
  <div class="detailitem">
    <!-- <h1>ini detail itempage</h1>
    {{JSON.stringify($store.state.detailItem,null,2)}}
    <img :src="$store.state.detailItem.image" alt />-->
    <el-row>
      <el-col :span="8">
        <div class="lefttop">
          <img :src="$store.state.detailItem.image" alt />
        </div>
      </el-col>
      <el-col :span="11">
        <div class="righttop">
          <h2>{{$store.state.detailItem.itemname}}</h2>
          <p v-for="(category,i) in $store.state.detailItem.category" :key="i" class="category">{{category}}</p>
          <p>{{$store.state.detailItem.price}}</p>
          <p>{{$store.state.detailItem.stock}}</p>
          <p>{{$store.getters.rateCount}}</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="righttopright">
            <el-button type="warning" 
            class="wishlistbutton"
            @click="addToWishlist"
            v-show="this.$store.state.isLogin" icon="el-icon-star-off"></el-button>
          <el-button
            class="cartbutton"
            type="danger"
            v-show="this.$store.state.isLogin"
            @click="addToCard"
          >
            <i class="el-icon-shopping-cart-full"></i> Add to Cart
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="bottom">
          <el-tag v-for="(tag,i) in $store.state.detailItem.tags" :key="i" class="tag">{{tag}}</el-tag>
          <el-divider></el-divider>
          <p>{{$store.state.detailItem.description}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    addToCard() {
      this.$store.dispatch("addToCart", this.$store.state.detailItem._id);
    },
    addToWishlist() {
      this.$store.dispatch("addToWishlist", this.$store.state.detailItem._id);
    },
  },
  created() {
    console.log(this.$route.params.itemId, "ini adalah id di param");
    this.$store.dispatch("anItem", this.$route.params.itemId);
  }
};
</script>

<style scoped>
.lefttop {
  margin-left: 35px;
  margin-top: 35px;
  border: 2px dashed black;
  min-height: 100%;
}
.righttop {
  margin-top: 35px;
  text-transform: capitalize;
}
.righttopright {
  margin-top: 35px;
}
.bottom {
  margin-top: 30px;
}
img {
  max-width: 100%;
}
.cartbutton{
    margin: 15px 0px;
}
.wishlistbutton{
    font-size: 20px;
    padding: 10px 20px;
}
.tag{
    margin: 3px;
}
</style>
