<template>
  <div class="home">
    <div v-if="search" style="display:flex; justify-content: center">
      <card-product
        @onEdit="onEdit"
        class="cardP"
        :product="product"
        v-for="product in filtered"
        :key="product._id"
      ></card-product>
      <div v-if="!filtered.length">
        <p>not found</p>
      </div>
    </div>
    <b-tabs type="is-boxed" style="background-color:white" v-if="!search">
      <b-tab-item class="productItem" label="All Products">
        <card-product
          @onEdit="onEdit"
          :isComponentModalActive="isComponentModalActive"
          class="cardP"
          :product="product"
          v-for="product in allProducts.products"
          :key="product._id"
        ></card-product>
      </b-tab-item>
      <b-tab-item
        class="productItem"
        :label="category.toLowerCase()"
        v-for="(category, i) in categories"
        :key="i"
      >
        <card-product
          @onEdit="onEdit"
          class="cardP"
          :product="product"
          v-for="product in allProducts[category]"
          :key="product._id"
        ></card-product>
      </b-tab-item>
      <div>
        <div v-if="isLoading" class="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </b-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import cardProduct from "../components/CardProduct.vue";
export default {
  name: "home",
  props: ["isComponentModalActive", "search"],
  data() {
    return {
      temp: [],
      activeTab: "",
      isLoading: true,
      categories: [
        "invitation card",
        "souvenir",
        "hampers",
        "bridesmaid",
        "groomsman",
        "party planner"
      ]
    };
  },
  components: {
    cardProduct
  },
  watch: {
    // search(value) {
      // if (value) {
      //   console.log("value: ", value);
      //   let arr = [];
      //   console.log("this.allProducts.products: ", this.allProducts.products);
      //   this.allProducts.products.forEach(el => {
      //     if (el.itemName.includes(value)) {
      //       arr.push(el);
      //     }
      //   });
      //   this.temp = this.allProducts.products;
      //   this.allProducts.products = arr;
      //   console.log("arr", arr);
      //   // return this.allProducts
      // } else {
      //   this.$store
      //     .dispatch("getProducts", "")
      //     .then(() => {
      //       this.isLoading = false;
      //       console.log("get data of allProducts");
      //     })
      //     .catch(err => console.log(err));
      //   // return this.allProducts
      // }




      // let arrayFilter = this.allProducts.products.filter(el => {
      //   if(el.itemName.toLowerCase().includes(value.toLowerCase())){
      //     return el
      //   }
      // })
      // if(arrayFilter.length === 0){
      //   return this.allProducts.products
      // } else {
      //   return arrayFilter
      // }
    // }
  },
  methods: {
    onEdit(value){
      this.$emit('onEdit', value)
    }
  },
  computed: {
    ...mapState(["allProducts", "myCart"]),
    filtered(){
      let arrayFilter = this.allProducts.products.filter(el => {
        if(el.itemName.toLowerCase().includes(this.search.toLowerCase())){
          return el
        }
      })
      return arrayFilter
    }
  },
  created() {
    this.isLoading = true;
    this.$store
      .dispatch("getProducts", "")
      .then(() => {
        this.isLoading = false;
        console.log("get data of allProducts");
      })
      .catch(err => console.log(err));
    this.$store
      .dispatch("getMyCart", localStorage.getItem("userId"))
      .then(() => {
        this.$emit("myCart", this.myCart);
      });
  }
};
</script>

<style>
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: #ff2b56;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 45px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 6px;
    height: 51px;
  }
  50%,
  100% {
    top: 19px;
    height: 26px;
  }
}
.productItem {
  /* position: relative; */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  /* z-index: inherit; */
  /* top: 0; */
  /* background-color: white; */
}
.cardP {
  /* position: relative; */
  margin-bottom: 20px;
  padding: 0;
  /* z-index: 1; */
  /* max-height: 50%; */
  height: auto;
}
.is-boxed {
  position: sticky;
  left: 0;
  top: 0;
}
</style>
