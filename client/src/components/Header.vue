<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      background="#ababab"
      img-width="auto"
      img-height="auto"
    >

      <b-carousel-slide img-src="https://storage.googleapis.com/adityabpradana-hacktiv8/bed-bedroom-bedsheet-2387753.jpg"  style="height: 480px;">
      <b-img src=""></b-img>
      </b-carousel-slide>

      <b-carousel-slide img-src="https://storage.googleapis.com/adityabpradana-hacktiv8/bed-bedroom-blanket-545012.jpg"  style="height: 480px;">
      </b-carousel-slide>

      <b-carousel-slide img-src="https://storage.googleapis.com/adityabpradana-hacktiv8/bed-blur-indoors-545026.jpg"  style="height: 480px;">
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = true
    }
  }
}
</script>
<style scoped>
.slider-font {
  color: #46344e;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: 700;
}
</style>
