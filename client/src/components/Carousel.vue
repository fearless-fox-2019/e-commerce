<template>
  <div style="margin:50px">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <img
          slot="img"
          class="d-block img-fluid w-100"
          width="1024"
          height="480"
          src="https://picsum.photos/1024/480/?image=55"
          alt="image slot"
        />
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
    </b-carousel>
    <div>
      <mdb-container class="mt-5">
        <mdb-row class="mdb-lightbox">
          <Product
            :product ="product"
            :key="product._id"
            v-for="product in $store.state.products"
          ></Product>
        </mdb-row>
      </mdb-container>
    </div>
  </div>
</template>


<script>
import { mdbContainer, mdbRow, mdbCol, mdbView, mdbMask } from "mdbvue";
import Product from "./Product";
export default {
  created() {
    console.log(this.$store.state.products);
    console.log(this.$store.state.isLogin);
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      imgs: [
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg",
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(98).jpg",
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(131).jpg",
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(123).jpg",
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(118).jpg",
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(128).jpg",
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(132).jpg",
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(115).jpg",
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(133).jpg"
      ],
      visible: false,
      index: 0
    };
  },
  name: "HoverEffect",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbView,
    mdbMask,
    Product
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    show(index) {
      this.index = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
</style>
