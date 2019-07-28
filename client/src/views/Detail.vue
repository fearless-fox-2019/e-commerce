<template>
  <div class="home" style="margin-top:-50px">
    <Detail />
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Detail from "@/components/Detail.vue";

export default {
  name: "home",
  components: {
    Detail
  }
};
</script>
