<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://games.mxdwn.com/wp-content/uploads/2018/12/0e1db2b8dd683f4a8d29c6d00da37757.jpg'
          },
          {
            src: 'https://coverfiles.alphacoders.com/662/66229.png'
          },
          {
            src: 'https://demo.gloriathemes.com/wp/cloux/wp-content/uploads/2017/12/egypt-slider-1920x941.jpg'
          },
          {
            src: 'https://blog.jonygames.com.br/wp-content/uploads/2017/07/Banner-God-Of-War-PS4-Jony-Games.jpg'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus">
  #example-custom-transition
    .fade
      &-enter-active, &-leave-active, &-leave-to
        transition: .3s ease-out
        position: absolute
        top: 0
        left: 0

      &-enter, &-leave, &-leave-to
        opacity: 0
</style>
