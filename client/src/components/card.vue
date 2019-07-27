<template>
  <div class="card">
    <img :src="forCard.image" alt />
    <span class="itemname">{{forCard.itemname}}</span>
    <span class="category">{{forCard.category[0]}}</span>
    <span class="price">{{forCard.price}}</span>
    <el-button class="cartbutton" type="danger">
      <i class="el-icon-shopping-cart-full"></i> Add to Cart
    </el-button>
  </div>
</template>

<script>
export default {
  props: ["forCard"]
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
  max-height: 200px;
  border-radius: 4px;
  object-fit: cover;
}
.itemname {
  font-size: 20px;
  text-transform: capitalize;
  font-weight: 600;
}
.category {
  font-size: 12px;
  text-transform: capitalize;
}
.price {
  font-size: 19px;
  text-transform: capitalize;
}
.cartbutton{
    margin-top: 5px;
}
</style>
