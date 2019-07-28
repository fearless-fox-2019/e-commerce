<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    hide-delimiters
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-layout
          align-center
          fill-height
          justify-center
        >
          <div >
            <v-img :src="slide"
              
              width="200px"
             ></v-img>
          </div>
        </v-layout>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
  export default {
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'https://i.pinimg.com/originals/42/e4/3a/42e43ab1e9e585a5b0823c0ff0207fdd.jpg',
          
        ],
      }
    },
  }
</script>
