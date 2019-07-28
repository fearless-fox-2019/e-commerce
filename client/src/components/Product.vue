<template>
  <mdb-col md="4">
    <router-link  :to="link" >
      <figure   @click="setDetail(product._id)" style="border-style:solid">
        <mdb-view class="zoom overlay" :src="product.image" alt="zoom">
          <mdb-mask flex-center style="color:white">
            <b-container style="background-color: black;">
              <p>{{ product.name }}</p>
              <p>{{ product.size.join(" ") }}</p>
              <p>{{ currency }}</p>
            </b-container>
          </mdb-mask>
        </mdb-view>
      </figure>
    </router-link>
  </mdb-col>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbView, mdbMask } from "mdbvue";
export default {
  created() {
    console.log(this.product.size.join(" "));
  },
  props: ["product"],
  data() {
    return {
      link : `detail/${this.product._id}`,
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
    mdbMask
  },
  methods: {
    setDetail(id){
      this.$store.commit('SET_DETAIL', id)
    },
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
  },
  computed: {
    currency() {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(this.product.price);
    }
  }
};
</script>

<style scoped>
</style>
