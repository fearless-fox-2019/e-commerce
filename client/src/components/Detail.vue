<template>
  <mdb-container style="margin-top:35px">
    <mdb-row>
      <div class="d-flex justify-content-start">
        <p>tukuae / {{name}}</p>
      </div>
      <div class="w-200"></div>
      <mdb-row style=" overflow-x: hidden;">
        <mdb-col>
          <div class="flex-fill">
            <div class="d-flex justify-content-center">
              <mdb-view class="zoom overlay" :src="image" alt="zoom" style="width:276px">
                <mdb-mask flex-center />
              </mdb-view>
            </div>
          </div>
        </mdb-col>
        <mdb-col>
          <div class="flex-fill">
            <div>
              <div style="margin-bottom: 10px;" class="d-flex justify-content-start">
                <h3>{{ name }}</h3>
              </div>
              <div style="margin-bottom: 35px;" class="d-flex justify-content-start">
                <h6>{{ currency }}</h6>
              </div>
              <div style="margin-bottom: 15px;" class="d-flex justify-content-start">
                <b-button
                  @click.prevent="addSize(siz)"
                  v-for="(siz,index) in size"
                  :key="index"
                  variant="outline-dark"
                >{{siz}}</b-button>
              </div>
              <div style="margin-bottom: 60px;" class="d-flex justify-content-start">
                <p>your selected size : {{selectedSize}}</p>
              </div>
              <div style="margin-bottom: 60px;" class="d-flex justify-content-start">
                <b-button @click.prevent="addToCart" variant="dark">ADD TO CART</b-button>
              </div>
              <div class="d-flex justify-content-start">
                <p class="text-justify" style="margin-right:25px">{{description}}</p>
              </div>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbView, mdbMask } from "mdbvue";
import instance from "../myconfig";
import MoneyFormat from "vue-money-format";
export default {
  created() {
    // console.log('gue refresh')

    instance
      .get(`/products/${this.$route.params.id}`, {})
      .then(({ data }) => {
        console.log(data, "disini detail");
        this.detail = data;
        console.log(this.detail);
        // context.products = data;
        this.cost = this.detail.price;
        this.name = this.detail.name;
        this.description = this.detail.description;
        this.image = this.detail.image;
        this.$store.commit("SET_DETAIL", data._id);
        // console.log(this.detail.size)
        this.size = this.detail.size;
        // console.log(context.products);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbView,
    mdbMask,
    "money-format": MoneyFormat
  },
  methods: {
    addSize(size) {
      this.selectedSize = size;
    },
    addToCart() {
      if (this.selectedSize == null) {
        Swal.fire({
          type: "error",
          text: "select size please"
        });
      } else {
        instance
          .post("/products/size", {
            size: this.selectedSize,
            ProductId: this.$route.params.id
          })
          .then(({ data }) => {
            instance
              .post("/carts", {
                productCart: this.$route.params.id,
                selectedSize : this.selectedSize
              })
              .then(({ data }) => {
                console.log(data);
              })
              .catch(err => {
                Swal.fire({
                  type: "error",
                  text: err.response.data
                });
              });
          })
          .catch(err => {
            Swal.fire({
              type: "error",
              text: err.response.data
            });
          });
      }
    }
  },
  data() {
    return {
      selectedSize: null,
      cost: 100000,
      detail: null,
      name: null,
      description: null,
      image: null,
      size: null
    };
  },
  computed: {
    currency() {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(this.cost);
    }
  }
};
</script>

<style scoped>
.button {
  padding: 15px 25px;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}
</style>
