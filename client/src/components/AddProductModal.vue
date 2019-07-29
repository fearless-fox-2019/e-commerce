<template>
  <!-- ========================== REGISTER MODAL -->
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModalCenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Add New Product</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form>
          <div class="modal-body d-flex flex-column">
            <input type="text" placeholder="Enter product name" v-model="formAddProduct.name" />
            <p>Description</p>
            <textarea cols="30" rows="10" v-model="formAddProduct.description"></textarea>
            <input type="number" placeholder="Enter product price" v-model="formAddProduct.price" />
            <input type="number" placeholder="Enter product stock" v-model="formAddProduct.amount" />
            <input type="file" @change="inputFile" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="addProduct"
              data-dismiss="modal"
            >Add Product</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formAddProduct: {
        name: "",
        description: "",
        price: "",
        amount: "",
        featured_image: ""
      }
    };
  },
  methods: {
    inputFile(e) {
      this.formAddProduct.featured_image = e.target.files[0];
    },
    addProduct() {
      // console.log(this.files);
      let formData = new FormData();
      formData.append("name", this.formAddProduct.name);
      formData.append("description", this.formAddProduct.description);
      formData.append("price", this.formAddProduct.price);
      formData.append("amount", this.formAddProduct.amount);
      formData.append("image", this.formAddProduct.featured_image);

      axios({
        method: "post",
        url: "http://localhost:3000/products",
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.formAddProduct.name = "";
          this.formAddProduct.description = "";
          this.formAddProduct.price = "";
          this.formAddProduct.amount = "";
          this.formAddProduct.featured_image = "";
          // console.log(data);
          this.$emit("add-product");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
textarea {
  height: 100px;
  margin-bottom: 40px;
}

input {
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: 1px solid rgb(151, 151, 151);
  margin-bottom: 10px;
}
</style>
