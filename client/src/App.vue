<template>
  <div id="app">
    <div id="nav" class="row" style="height: 10%">
      <div class=" d-flex">
        <img src="./assets/logoHeader.png" style="height: 50px; width:50px">
        <h3 class="ml-2" style="font-family: 'Fjalla One', sans-serif;">Petzone</h3>
      </div>
  
      <div class=" d-flex justify-content-end ml-auto">
        <div class="m-2">
          <router-link to="/"><h3 size="xl" style="font-family: 'Fjalla One', sans-serif;">HOME</h3></router-link>
          <!-- <b-modal id="modal-cart" centered title="Cart" hide-footer>
            <Cart></Cart>
          </b-modal> -->
        </div>

        <div class="m-2">
          <h3 v-if="!isLogin" v-b-modal.modal-login style="font-family: 'Fjalla One', sans-serif;">LOGIN</h3>
          <b-modal v-if="!isLogin" id="modal-login" centered title="Login" hide-footer>
            <FormLogin @changeLogin="loginStatus" ></FormLogin>
          </b-modal>
        </div>

        <div class="m-2">
          <h3 v-if="!isLogin" v-b-modal.modal-register style="font-family: 'Fjalla One', sans-serif;">REGISTER</h3>
          <b-modal id="modal-register" centered title="Register" hide-footer>
            <FormRegister></FormRegister>
          </b-modal>
        </div>


        
        <div v-if="isLogin" class="m-2">
          <router-link to="/cart"><h3 v-if="isLogin" size="xl" style="font-family: 'Fjalla One', sans-serif;">CART</h3></router-link>
          <!-- <b-modal id="modal-cart" centered title="Cart" hide-footer>
            <Cart></Cart>
          </b-modal> -->
        </div>

        <div class="m-2">
          <h3 v-if="isLogin" v-b-modal.modal-register @click="logout" style="font-family: 'Fjalla One', sans-serif;">LOGOUT</h3>
        </div>
      </div>
      

    </div>

    <div class="row" style="height: 25%">
      <BeforeLogin></BeforeLogin>
    </div>
      <!-- <AfterLogin v-if="isLogin"></AfterLogin> -->
    <div class="row d-flex justify-content-around align-items-center m-2">
      <!-- <Product v-for="product in products" :key="product._id" :details="product"></Product> -->
      <!-- <Home></Home> -->
      <router-view/>
    </div>

      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <!-- <router-view/> -->
  </div>
</template>

<script>
  import BeforeLogin from './views/BeforeLogin'
  import AfterLogin from './views/AfterLogin'
  import FormLogin from './components/FormLogin'
  import FormRegister from './components/FormRegister'
  import Product from './components/Product'
  import axios from 'axios'
  import Home from './views/Home'

  const baseUrl = `http://localhost:3000`

  export default {
    components: {
      BeforeLogin, AfterLogin,
      FormLogin,FormRegister,
      Home, Product
    },
    data(){
      return {
        isLogin : false,
        products: []
      }
    },
    methods: {
      loginStatus(){
        this.isLogin = true
      },
      logout(){
        localStorage.clear()
        swal.fire('Sucessfully Logged Out')
        this.isLogin = false
      }
    },
    created(){
      if (localStorage.getItem('token')){
      this.isLogin = true
      this.page = 'EveryoneArticle'
      }
    }
  }
</script>

<style>
/* font-family: 'Fascinate', cursive;
font-family: 'Fjalla One', sans-serif;
font-family: 'Roboto Condensed', sans-serif; */

html, body, #app {
  height: 100%;
  width:  100%;
}
* {
  margin: 0;
  padding: 0;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
} */
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
