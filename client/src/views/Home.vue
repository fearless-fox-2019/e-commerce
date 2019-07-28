<template>
  <div class="home" style="margin-top:-50px">
    <Carousel />
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Carousel from "@/components/Carousel.vue";

export default {
  name: "home",
  components: {
    Carousel,
    Navbar
  }
};
</script>
