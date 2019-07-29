<template>
  <div id="page-container">
    <div id="content-wrap">
      <div id="app">
        <Loginbar
          @logout="logout"
        ></Loginbar>
        <Navbar></Navbar>
        <!--  -->
        <Footer></Footer>
        <router-view
          @submit-product="addProduct"
          @edit-product="editProduct"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Navbar from './components/Navbar.vue';
import Loginbar from './components/Loginbar.vue';
import Footer from './components/Footer.vue';
import api from './apis/localhost';

export default {
  data() {
    return {
      
    };
  },
  components: {
    Navbar,
    Loginbar,
    Footer,
  },
  methods: {
    addProduct(data) {
      console.log(data);
      const {
        name, price, stock, category, detail, image,
      } = data;
      api.defaults.headers.common.token = localStorage.token;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('category', category);
      formData.append('detail', detail);
      if (data.image) formData.append('image', image);

      api.post('/products', formData)
        .then(() => {
          Swal.fire({
            type: 'success',
            title: 'Product Added',
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push('/admin/list-product');
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Create product denied',
            text: `${err.response.data}`,
          });
        });
    },
    editProduct(data) {
      const { name, price, stock, category, detail, image } = data;
      api.defaults.headers.common.token = localStorage.token;

      let formData = new FormData()

      formData.append('name', name)
      formData.append('price', price)
      formData.append('stock', stock)
      formData.append('category', category)
      formData.append('detail', detail)
      if (data.image) formData.append('image', image);

      api
      .put(`/products/${data._id}`, formData)
      .then(product => {
        Swal.fire(
          'Product edited!',
          '',
          'success'
        )
        this.$router.push('/admin/list-product')
      })
      .catch(err => {
        console.log(err);
      })
    },

    logout() {
    localStorage.clear();
    this.$store.state.isLoggedIn = false;
    this.$store.state.isAdmin = false;
    this.$store.state.user = {};
    this.$store.state.allCarts = [],
      Swal.fire({
        type: 'success',
        title: 'Logout Success',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        this.$router.push('/');
      }, 1800)
    },
  },
  mounted() {
    if (localStorage.token) {
      this.$store.commit('setIsLoggedIn', true);
      this.$store.state.token = localStorage.token;
      this.$store.dispatch('setUserData');
    } else {
      this.$store.commit('setUserData', {});
      this.$store.commit('setIsLoggedIn', false);
    }
  },
};
</script>


<style>
body {
  background-color: #E5E6E7;
}

a, p, h1, h2, h3, h4, h5, h6, label {
  font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
  /* font-family: 'Raleway', sans-serif; */
}

.w-100 {
  width: 100%;
}

.cursor-pointer {
  cursor: pointer;
}

#page-container {
  position: relative;
  min-height: 100vh;
}

#content-wrap {
  padding-bottom: 2.5rem;
}
</style>
