<template>
  <div>
    <b-card :img-src="products.image" :title="products.name" img-alt="Card image" img-left class="mb-3">
      <b-card-text>
        {{products.description}}
        <h6>Stock Available: {{products.stock}}</h6>
      </b-card-text>
      
      
      <b-input-group style="width: 250px">
        <b-input-group-prepend>
          <b-btn variant="outline-info" @click="num--">-</b-btn>
        </b-input-group-prepend>

        <b-form-input type="number" min="0.00" v-model="num"></b-form-input>

        <b-input-group-append>
          <b-btn variant="outline-secondary" @click="num++">+</b-btn>
        </b-input-group-append>
      </b-input-group>

      <b-button @click="purchase" variant="primary" class="mt-2">Purchase</b-button>
    </b-card>
  </div>
</template>

<script>
const baseUrl = `http://localhost:3000`

export default {
  props : ['detailCat'],
  created(){
    axios({
      url: `${baseUrl}/api/products/findOne/${this.id}`,
      method: "get",
      dataType: "json",
    })
    .then(({data})=>{
      this.products = data
      this.stock = data.stock
    })
    .catch((err)=>{
      console.log(err)
    })
  },
  data() {
    return {
      id: this.$route.params.id,
      products : [],
      stock: 0,
      num: 0
    }
  },
  methods: {
    purchase(){
      if(!localStorage.getItem('token')){
        swal.fire('Please Login First')
      }
      else if (this.stock<this.num){
        swal.fire('Not enough stock')
      } else {
        let input = {
          status: 'ordered',
          userId: localStorage.getItem('id'),
          product: this.products._id,
          quantity: this.num
        }
        console.log(input)
        axios({
          url: `${baseUrl}/api/carts/create`,
          method: "post",
          dataType: "json",
          data: input
        })
        .then(({data})=>{
          this.products = data
          this.stock = data.stock
          this.$router.push(`/cart`)
          console.log(this.products)
        })
        .catch((err)=>{
          console.log(err)
        })
        
      }
      
    }
  }
}
</script>

<style scoped>
  img{
    height: 20%;
    width: 20%
  }
  h6{
    font-weight: bold
  }
</style>
