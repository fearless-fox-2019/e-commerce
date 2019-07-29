<template>
  <div class="columns home">
    <div class="column" id="homebar" v-if="$store.state.isLogin">
      <homenavbar></homenavbar>
    </div>
    <div class="column" id="WelcomeMessage" v-if="!$store.state.isLogin">
      <h1>WELCOME HERO! Please Signin/SignUp to <strong>Buy</strong> Our Product</h1>
    </div>
    <div class="column" id="content">
      <div class="column" id="adminForm" v-if="$store.state.isAdmin">
        <formproduct @addData="addData"></formproduct>
      </div>
      <div class="columns is-multiline" style="margin-left:10px" >
        <cardcontainer
          style="margin:5px"
          v-for="product in $store.state.products"
          :key="product._id"
          :id="product._id"
          :imageUrl="product.picture"
          :name="product.name"
          :desc="product.description"
          :quantity="product.quantity"
          :price="product.price"
          :created="product.createdAt"
        ></cardcontainer>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import homenavbar from '../components/HomeBar.vue'
import formproduct from '../components/FormProduct.vue'
import cardcontainer from '../components/CardComponent.vue'
const baseUrl = 'http://localhost:3000'
export default {
  name: 'home',
  components: {
    homenavbar,
    formproduct,
    cardcontainer
  },
  data () {
    return {
    }
  },
  methods: {
    addData: param => {
      this.$store.dispatch('getProducts')
    }
  },
  created () {
    this.$store.dispatch('getLoggedUser')
  }
}
</script>

<style scoped>
.home {
  background-color: grey;
  background-image: url("../assets/marvel-dc.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}
#homebar {
  height: 100px;
  display: flex;
  align-items: flex-end;
  margin-top: 35px;
  position: fixed;
}

#WelcomeMessage{

  height: 100px;
  display: flex;
  justify-content: center;
  padding-left: 100px;
  margin-top: 100px;
  position: fixed;
  color: white;
  font-size: 40px;
}

#content {
  margin-top: 180px;
}

.box {
  height: 400px;
}
</style>
