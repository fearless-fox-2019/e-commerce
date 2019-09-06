<template>
  <div class="home">
    <h1>Aei-commerce</h1>
    <p>everything you wan't is already here!</p>
    <carousel msg="ini carousel"></carousel>
    <!-- list whats new-->
    <list-item></list-item>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import carousel from '@/components/carousel.vue'
import listItem from '@/components/listwhatnew.vue'
import footerPage from '@/components/footer.vue'

export default {
  name: 'home',
  components: {
    carousel,
    listItem,
    footerPage
  }
}
</script>
<style>
  .footer-home{
    bottom: 0;
    margin-top: 50px;
    min-height: 100;
  }
</style>
