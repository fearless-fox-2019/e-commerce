<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src" style="filter: brightness(0.83); width : 100%;"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://s1.thcdn.com/widgets/96-en/01/assassins-creed-banner-1-051701.jpg'
          },
          {
            src: 'https://coverfiles.alphacoders.com/662/66229.png'
          },
          {
            src: 'https://assets.jalantikus.com/assets/cache/0/0/tips/2019/01/10/game-ps4-terbaik-banner-a42fd.jpg'
          },
          {
            src: 'https://images-na.ssl-images-amazon.com/images/I/61PaFC6rtnL.jpg'
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
