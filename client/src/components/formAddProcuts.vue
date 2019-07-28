<template>
  <div class="form-add">
      <div class="lds-ring" v-if="isLoading == true"><div></div><div></div><div></div><div></div></div>
    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      label="Product Name"
      label-for="input-horizontal"
    >
      <b-form-input id="input-horizontal" v-model="product.productname"></b-form-input>
    </b-form-group>

    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      label="Picture"
      label-for="input-horizontal-2"
    >
      <b-form-file
        @change="uploadImage($event.target.files)"
        placeholder="Choose a file..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </b-form-group>

    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      label="Price"
      label-for="input-horizontal-3"
    >
      <b-form-input id="input-horizontal-3" v-model="product.price"></b-form-input>
    </b-form-group>

    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      label="Qty"
      label-for="input-horizontal-4"
    >
      <b-form-input id="input-horizontal-4" v-model="product.qty"></b-form-input>
    </b-form-group>
    <button type="submit" @click="createProduct()" class="button-cart">Sell This Product!</button>
    <!-- <div v-if="isLoading==true" class="spinner-grow" role="status">
      <span class="sr-only">Loading...</span>
    </div> -->
  </div>
</template>

<script>
import axios from "../config/axios.js";

export default {
  data() {
    return {
      product: {
        productname: "",
        image: "",
        price: "",
        qty: ""
      },
      imageFile: "",
      isLoading: false
    };
  },
  methods: {
    uploadImage(file) {
      console.log(file);
      this.imageFile = file[0];
      console.log(this.imageFile);
    },
    createProduct() {
      console.log("ke klik create");

      let formData = new FormData();

      formData.append("productname", this.product.productname);
      formData.append("image", this.imageFile);
      formData.append("price", this.product.price);
      formData.append("qty", this.product.qty);

      console.log(formData);
      this.isLoading = true;
      axios({
        method: `POST`,
        url: `/products`,
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.isLoading = false;
          Swal.fire({
            title: "Success!!",
            text: "now your products on our list sell.",
            imageUrl: data.image,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Product Image",
            animation: false
          });
          this.clear()
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    clear(){
        this.product = {}
        this.imageFile = ""
    }
  }
};
</script>

<style>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #D8572A;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #D8572A transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
