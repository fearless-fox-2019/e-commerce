<template>
    <b-container class="container">
      <!-- <div class="row"> -->
     <div class="card bg-dark text-white">
        <img src="../../public/images/shoeBackground.jpg" class="card-img" alt="cart">
          <div class="card-img-overlay" style="color: black;">
            <h5 class="card-title">Hacktiv8 Shoes</h5>
            <p class="card-text">Best shoes you will ever get! First 100 customers get free hacktiv8 sticker</p>
          </div>
        </div>
        <Products></Products>
      <!-- </div> -->

    </b-container>
</template>

<script>
import Products from '../components/Products'
export default {
  components: {
    Products
  }
}
</script>

<style scoped>

</style>
