<template>
  <div class="home row d-flex justify-content-around align-items-center m-2">
    <Product v-for="product in products" :key="product._id" :details="product" class="m-1"></Product>
  </div>
</template>

<script>
// @ is an alias to /src
const baseUrl = `http://localhost:3000`
import HelloWorld from '@/components/HelloWorld.vue'
import FormLogin from '@/components/FormLogin.vue'
import Product from '@/components/Product'



export default {
  name: 'home',
  components: {
    HelloWorld,
    FormLogin,
    Product
  },
  data(){
    return {
      products: []
    }
  },
  created(){
    axios({
      url: `${baseUrl}/api/products/findAll`,
      method: "get",
      dataType: "json",
    })
    .then(({data})=>{
      this.products = data
      console.log(this.products)
    })
    .catch((err)=>{
      console.log(err)
    })
    
  }
}
</script>
