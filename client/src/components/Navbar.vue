<template>
  <div>
    <div style="height: 30px;">&nbsp;</div>
    <nav
      class="navbar navbar-light my-nav my-nav--fixed white d-flex flex-row justify-content-between border"
    >
      <div class="title d-flex align-self-center cursor-pointer" @click="goToHome">
        <div style="margin : 0">solid.</div>
      </div>
      <div class="d-flex justify-content-between align-items-center" style="width: 50%">
        <a href="#">
          <p style="color: black" class="d-flex align-items-center" @click="goToShop">SHOP</p>
        </a>
        <a href="#" @click="goToCart" v-if="!isAdmin">
          <p style="color: black">CART {{allCarts.length ? `(${allCarts.length})` : ''}} </p>
        </a>
                <div class="d-flex" v-if="isAdmin && isLoggedIn">
          <div class="dropdown mr-1">
            ADMIN
            <a
              href="#"
              class="nav-plus"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-offset="10,200"
              style="color: black; padding-left: 5px"
            >
              <i class="fas fa-chevron-down"></i>
            </a>
            <div
              class="dropdown-menu"
              aria-labelledby="dropdownMenuOffset"
              style="margin-left: -80px;"
            >
              <a
                @click.prevent="goToOrderList"
                class="dropdown-item"
                href="#"
                style="padding-left: 10px; padding-right: 10px"
              >Order List</a>
              <a
                @click.prevent="goToProductList"
                class="dropdown-item"
                href="#"
                style="padding-left: 10px; padding-right: 10px"
              >Product List</a>
              <a
                @click.prevent="goToAddProduct"
                class="dropdown-item"
                href="#"
                style="padding-left: 10px; padding-right: 10px"
              >Add Product</a>
            </div>
          </div>
        </div>
        <div class="d-flex align-self-center">
          <form action>
            <input
              type="text"
              class="form-control no-border"
              placeholder="Search here..."
              style="height: 100%"
            />
          </form>
          <i class="fas fa-search d-flex align-self-center"></i>
        </div>
      </div>
    </nav>
    <!-- <div style="height: 4.80rem;">&nbsp;</div> -->
  </div>
</template>

<script>
import {
  mapState, mapMutations, mapActions, mapGetters,
} from 'vuex';

export default {
  computed: {
    ...mapState(['isLoggedIn', 'isAdmin', 'allCarts']),
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    
  },
  methods: {
    ...mapActions(['getCart']),
    goToHome() {
      this.$router.push('/');
    },
    goToShop() {
      this.$router.push('/products');
    },
    goToOrderList() {
      this.$router.push('/admin/orders');
    },
    goToProductList() {
      this.$router.push('/admin/list-product');
    },
    goToAddProduct() {
      this.$router.push('/admin/add-product');
    },
    goToCart() {
      this.$router.push('/cart')
    }
  },
  mounted() {
    localStorage.token ? this.getCart() : false
  },
  created() {
    localStorage.token ? this.getCart() : false
    console.log(this.allCarts)
  }
};
</script>

<style scoped>
.my-nav--fixed {
  position: fixed;
  width: 100%;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.88);
  padding: 0px;
  padding-left: 200px;
  padding-right: 200px;
}

.title {
  font-family: "Abril Fatface", cursive;
  font-size: 50px;
}

p {
  margin: 0;
}

a {
  text-decoration-color: black;
}

input[type="text"],
select.form-control {
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 0;
}

input[type="text"]:focus,
select.form-control:focus {
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 1px solid #000000;
}
</style>
