<template>
  <div>
    <div class="my-card cursor-pointer" style="width: 19rem" @click="goToDetail(product._id)">
      <div class="d-flex justify-content-center">
        <img
        :src="product.image ? `${product.image}` : 'https://via.placeholder.com/700x400' "
        class="card-img-top"
        alt="img-product"
        style="width: 300px; height: 300px; max-width: 300px; max-height: 300px"
      />
      </div>
      <div class="card-body" style="padding-bottom: 0">
        <h5
          style="margin: 0"
          class="card-text"
        ><b>{{product.name}}</b></h5>
        <hr style="margin: 3px; padding-top: 5px">
        <p style="margin: 0">{{converter(product.price)}}</p>
        <div class="d-flex justify-content-end"><small style="color: #888888; padding-bottom: 5px"><i>{{product.stock ? `${product.stock} stocks left` : 'Sold Out'}}</i></small></div>
      </div>
    </div>
  </div>
</template>

<script>
import converter from '../helpers/converter.js'
export default {
  props: ['product'],
  methods: {
    converter,
    goToDetail(id) {
      this.$router.push(`/product/${id}`)
    }
  }
};
</script>

<style scoped>
.my-card {
  position: relative;
  display: inline-block;
  width: 100%;
  height: auto;
  margin-right: 1.2%;
  background: #fff;
  border-radius: 0px;
  /* margin: 2em auto 0em; */
  z-index: 0;
  /* padding: 13px 23px; */
  margin-left: 35px;
  margin-right: 35px;
  margin-bottom: 50px
}

.my-card:hover {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
}

</style>
