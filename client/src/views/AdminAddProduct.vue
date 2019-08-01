<template>
    <div class="form-black mb-5 add-product" style="margin-top: 8em;">
        <div class="text-center mb-3 mt-5" style="padding-bottom: 30px">
            <h1>Add Product</h1>
        </div>
        <form
            @submit.prevent="submitFormProduct"
            enctype="multipart/form-data"
        >
            <div class="form-group">
                <input
                    type="file"
                    name="picture_url"
                    ref="file"
                    accept="image/*"
                    v-on:change="handleFileUpload"
                >
            </div>
            <div class="form-group">
                <label for="product-name">Name:</label>
                <input
                    id="product-name"
                    type="text"
                    class="form-control"
                    v-model="productForm.name"
                    aria-describedby="emailHelp"
                    placeholder="Eg. Table, Drawer"
                    required
                >
            </div>

            <div class="d-flex justify-content-between">
                <div class="form-group">
                <label for="product-price">Price:</label>
                <input
                    id="product-price"
                    type="number"
                    class="form-control"
                    v-model="productForm.price"
                    aria-describedby="emailHelp"
                    placeholder="Price"
                    required
                    style="width: 200px"
                >
            </div>

            <div class="form-group">
                  <label for="product-category">Category:</label>
                  <select class="form-control" v-model="productForm.category" id="product-category" required style="width: 200px">
                      <option value="" disabled selected>Choose Category</option>
                      <option value="table">table</option>
                      <option value="drawer">drawer</option>
                  </select>
              </div>

            <div class="form-group">
                <label for="product-stock">Stock:</label>
                <input
                    id="product-stock"
                    type="number"
                    class="form-control"
                    v-model="productForm.stock"
                    aria-describedby="emailHelp"
                    required
                    style="width: 80px"
                >
            </div>
            </div>


            <div class="form-group">
                <label for="product-detail">Detail:</label>
                <div>
                    <textarea
                        id="product-detail"
                        v-model="productForm.detail"
                        cols="103"
                        rows="10"
                        style="resize:vertical; width: 540px"
                        required
                    ></textarea>
                </div>
            </div>

            <div class="mb-3">
                <button
                    type="submit"
                    class="btn btn-success push-right"
                >Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      productForm: {
        name: '',
        price: '',
        stock: '',
        category: '',
        detail: '',
        image: '',
      },
    };
  },
  methods: {
    submitFormProduct() {
      // console.log(this.productForm);
      // this.$store.dispatch('addProduct', this.productForm);
      this.$emit('submit-product', this.productForm)
    },
    handleFileUpload(event) {
      this.productForm.image = event.target.files[0];
    },
  },
  mounted() {
    this.productForm = {};
  },
};
</script>

<style scoped>
  .add-product {
    margin-left: 450px;
    margin-right: 450px
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0; 
  }
</style>
