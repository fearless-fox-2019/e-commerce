<template>
  <div class="card-product d-flex flex-column col-3">
    <div class="product-image">
      <img :src="featuredImage" alt="product" />
    </div>

    <div class="preview d-flex flex-column">
      <table>
        <tr>
          <td>name</td>
          <td>: {{name}}</td>
        </tr>
        <tr>
          <td>price</td>
          <td>: ${{price}}</td>
        </tr>
        <tr>
          <td>amount</td>
          <td>: {{amount}}</td>
        </tr>
      </table>
    </div>

    <div class="options d-flex justify-content-around">
      <button class="btn btn-primary" @click.prevent="productDetail(id)">Detail</button>
      <button
        class="btn btn-danger d-flex"
        @click.prevent="deleteItem(id)"
        v-if="loginUsername == 'admin'"
      >
        <img class="options delete-icon" src="../assets/delete.svg" alt />
      </button>
      <button
        class="btn btn-warning d-flex"
        @click.prevent="findProduct(id)"
        data-toggle="modal"
        data-target="#editProduct"
        v-if="loginUsername == 'admin'"
      >
        <img class="options delete-icon" src="../assets/edit.svg" alt />
      </button>
      <button
        class="btn btn-success d-flex"
        @click.prevent="addToCart(id)"
        v-if="loginUsername != 'admin'"
      >
        <img class="options addcart-icon" src="../assets/add-cart.svg" alt />
      </button>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="editProduct"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Update Product: {{name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <div class="modal-body d-flex flex-column">
              <input type="text" placeholder="Enter product name" v-model="editForm.name" />
              <p>Description</p>
              <textarea cols="30" rows="10" v-model="editForm.description"></textarea>
              <input type="number" placeholder="Enter product price" v-model="editForm.price" />
              <input type="number" placeholder="Enter product stock" v-model="editForm.amount" />
              <input type="file" @change="inputFile" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="editProduct(id)"
                data-dismiss="modal"
              >Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  props: ["id", "name", "description", "price", "amount", "featuredImage"],
  data() {
    return {
      loginUsername: localStorage.getItem("username"),
      editForm: {
        name: "",
        description: "",
        price: "",
        amount: ""
      }
    };
  },
  methods: {
    deleteItem(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios({
            method: "delete",
            url: `http://localhost:3000/products/delete/${id}`,
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(({ data }) => {
              console.log("Item successfully deleted");
              this.$emit("delete-product");
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    addToCart(id) {
      axios({
        method: "post",
        url: `http://localhost:3000/users/cart/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          // console.log(data);
          this.$alertify.success("Item added to cart");
          this.$emit("add-cart");
        })
        .catch(err => {
          console.log(err);
        });
    },
    findProduct(id) {
      axios({
        method: "get",
        url: `http://localhost:3000/products/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.editForm.name = data.name;
          this.editForm.description = data.description;
          this.editForm.price = data.price;
          this.editForm.amount = data.amount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    inputFile(e) {},
    editProduct(id) {
      axios({
        method: "put",
        url: `http://localhost:3000/products/edit/${id}`,
        data: {
          name: this.editForm.name,
          description: this.editForm.description,
          price: this.editForm.price,
          amount: this.editForm.amount
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.$emit('edit-product')
        })
        .catch(err => {
          console.log(err);
        });
    },
    productDetail(id) {
      this.$router.push(`products/detail/${id}`);
    }
  }
};
</script>

<style scoped>
table {
  text-align: left;
  font-family: "Oswald";
}

div.card-product {
  margin: 8px;
  padding: 0;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.267);
  border-radius: 5px;
  position: relative;
  top: 0;
  transition: 0.2s;
}

div.card-product:hover {
  top: -6px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.267);
}

.product-image img {
  width: 100%;
  height: 200px;
  border-radius: 5px;
}

.product-image {
  border-radius: 5px;
}

img.options {
  filter: invert(100%);
}

div.preview {
  padding: 10px;
  border-radius: 0 0 5px 5px;
}

div.options {
  padding-bottom: 10px;
  border-radius: 0 0 5px 5px;
}

div.preview,
div.options {
  background-color: rgb(240, 231, 231);
}

/* ============================== MODAL */
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
