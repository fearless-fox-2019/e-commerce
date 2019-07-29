<template>
  <div class="sidebar d-flex flex-column">
    <AddProduct @add-product="addProduct"></AddProduct>
    <h1>Menu</h1>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-if="loginUsername == 'admin'">
        <img src="../assets/add.svg" alt="cart" />
        <a
          href
          data-toggle="modal"
          data-target="#exampleModalCenter"
          data-backdrop="false"
        >Add Product</a>
      </li>
      <li class="list-group-item d-flex align-items-center justify-content-start" v-if="loginUsername != 'admin'">
        <div class="cart-menu col-9">
          <img src="../assets/cart.svg" alt="cart" />
          <router-link to="/carts">
            <a href>Cart</a>
          </router-link>
        </div>
        <div class="col-3">
          <span class="amount">{{cartAmount}}</span>
        </div>
      </li>
      <li class="list-group-item">
        <img src="../assets/favourite.svg" alt="fav" />
        <router-link to="/products">
          <a href>Products</a>
        </router-link>
      </li>
      <li class="list-group-item">
        <img src="../assets/logout.svg" alt="logout" />
        <a href @click.prevent="logout">Logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
import AddProduct from "@/components/AddProductModal.vue";
import Swal from "sweetalert2"

export default {
  props: ["cartAmount"],
  data() {
    return {
      loginUsername: localStorage.getItem("username")
    };
  },
  components: {
    AddProduct
  },
  methods: {
    logout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out after this",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, bring me out!"
      }).then(result => {
        if (result.value) {
          localStorage.removeItem("token");
          Swal.fire("See ya!");
          this.$router.push("/");
        }
      });
    },
    addProduct() {
      this.$emit("add-product");
    }
  }
};
</script>

<style scoped>
div.cart-menu {
  padding: 0;
}

span.amount {
  font-size: 13px;
  background-color: white;
  padding: 5px;
  border-radius: 100%;
  color: black
}

div.sidebar {
  /* background-color: white; */
  background-image: url('../assets/diamonds.png')
}

div.sidebar {
  /* border: 1px solid black; */
  padding: 40px 30px;
  position: fixed;
  z-index: 1000;
  height: 100%;
}

h1 {
  font-family: "Fugaz One";
  margin-bottom: 30px;
  color: white
}

a {
  text-decoration: none;
  font-family: "Oswald";
  color: white
}

li {
  text-align: left;
  background-color: transparent;
  transition: 0.2s;
  border-bottom: 1px solid rgba(194, 194, 194, 0.465);
}

li:hover {
  background-color: rgba(0, 0, 0, 0.192);
}

img {
  margin-right: 10px;
  filter: invert(100%)
}

</style>
