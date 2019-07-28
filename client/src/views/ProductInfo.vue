<template>

  <b-container>
    <b-button v-if="$store.state.role == 'admin'" v-b-modal.addShoeForm>Add a new Shoe</b-button>
    <addShoeForm></addShoeForm>
    <b-card :img-src="shoe.image" :title="shoe.name" img-alt="Card image" img-left class="mb-3" >
      <b-card-text>
      {{shoe.description}}
      </b-card-text>
      <b-card-text>
        Quantity: {{shoe.quantity}}
      </b-card-text>
      <b-card-footer class="d-flex" style="justify-content: space-between">
        <b-button variant="danger" v-if="$store.state.role == 'admin'">
          <i class="fas fa-shopping-cart"  @click="deleteProduct(shoe._id)" >Delete</i>
        </b-button>
         <b-button variant="primary">
          <i class="fas fa-shopping-cart" @click="addToCart">Add To Cart</i>
        </b-button>
         <b-button variant="primary" v-if="$store.state.role == 'admin'">
          <i class="fas fa-shopping-cart" >Update</i>
        </b-button>
      </b-card-footer>
    </b-card>
  </b-container>
</template>

<script>
import axios from 'axios'
import addShoeForm from '../components/addShoeForm'
const baseUrl = `http://localhost:3000/api/shoes`
export default {
  data () {
    return {
      shoe: ''
    }
  },
  components: {
    addShoeForm
  },
  created () {
    this.getProductDetail()
  },
  methods: {
    getProductDetail () {
      let productId = this.$route.params.id
      axios.get(`${baseUrl}/${productId}`)
        .then(({ data }) => {
          this.shoe = data
        })
        .catch(error => {
          console.log(error)
        })
    },
    addToCart () {
      if(this.$store.state.isLogin) {
        this.$store.dispatch('addToCart',this.shoe)
      } else {
        this.$swal({
          type: 'error',
          text: 'log in to add an item to a cart',
          showConfirmButton: false,
          timer: 1500
        })
      }
    },
    deleteProduct(id) {
      this.$store.dispatch('deleteShoe', id)
    }
  }
}
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
}

i {
  color: white;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-footer {
  padding-top: 10px;
}

</style>
