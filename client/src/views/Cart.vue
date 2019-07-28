<template>
<div>
  <div class="row">
    <!-- <b-table striped hover :items="products"></b-table>
    <b-button @click="checkout" type="button" variant="primary" class="m-2">Checkout</b-button>
    <b-button type="reset" variant="warning" class="m-2">Edit Cart</b-button> -->
    <div v-for="product in products" :key="product._id">
      <b-card
        :title="product.name"

        img-alt="Image"
        img-top
        tag="article"
        style="width: 300px;"
        class="mb-2"
      >
        <b-card-text>
          <p>Price: {{product.price}}</p>
          <p>Quantity: {{product.quantity}}</p>
          <p>Total: {{product.total}}</p>
        </b-card-text>

        <b-button @click="deleteProduct(product._id)" variant="danger">Delete</b-button>
      </b-card>
    </div>
  </div>
  <div class="row d-flex justify-content-center">
    <h2>Total Amount You Need To Pay: {{totalPurchase}}</h2>
  </div>
  <div class="row d-flex justify-content-center">
    <b-button @click="checkout" variant="primary">Checkout</b-button>
  </div>
</div>
</template>

<script>
const baseUrl = `http://localhost:3000`

export default {
  data() {
    return {
      products: [],
      totalPurchase: 0
    }
  },
  created(){
    axios({
      url: `${baseUrl}/api/carts/findAll/${localStorage.getItem('id')}`,
      method: "get",
      dataType: "json",
    })
    .then(({data})=>{
      this.products = data
      this.$router.push(`/cart`)
      for (let i=0; i<this.products.length; i++){
        this.totalPurchase += this.products[i].total
      }
      console.log('ini total purchase', this.totalPurchase)
    })
    .catch((err)=>{
      console.log(err)
    })
  },
  methods:{
    checkout(){
      console.log('checkout clicked')
      if (this.products.length === 0){
        swal.fire(`You don't have anything to checkout`)
      }
      else if (this.products.length >0){
        console.log('masuk nih', this.products)
        axios({
          url: `${baseUrl}/api/carts/checkout/${localStorage.getItem('id')}`,
          method: "post",
          dataType: "json",
          data: this.products
        })
        .then(({data})=>{
          swal.fire(`Thank you for purchasing with us`)
          this.$router.push(`/`)
          // console.log(this.products)
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    },
    deleteProduct(_id){
      console.log('delete clicket', _id)
      axios({
        url: `${baseUrl}/api/carts/delete/${_id}`,
        method: "post",
        dataType: "json",
      })
      .then(({data})=>{
        swal.fire(`succesfully deleted`)
        this.$router.push(`/`)
        // console.log(this.products)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>


<style>

</style>