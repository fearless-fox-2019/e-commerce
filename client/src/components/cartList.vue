<template>
  <div>
    <b-card  img-alt="Card image" img-left class="mb-3" v-for="cart in carts" :key="cart._id" :img-src="cart.productId.image">
        <b-card-text>
          {{cart.productId.name}}
        <br>
          ${{cart.productId.price}}.00
        <br>
        <div class="quantity">
          Quantity:
          <b-button @click="increment(cart._id)">
            <i class="fas fa-plus-circle"></i>
          </b-button>
             {{cart.quantity}}
            <b-button @click="decrement(cart._id)">
              <i class="fas fa-minus-circle"></i>
            </b-button>
        </div>
        <div class="totalPrice">
          Total Price: ${{cart.quantity * cart.productId.price}}.00
           <b-button class="float-right" @click="removeItem(cart._id)">
           <i class="fas fa-trash-alt"> </i> Remove From Cart
          </b-button>
        </div>
        </b-card-text>
    </b-card>
    <b-button class="float-right" @click="checkout">
      Checkout
    </b-button>
  </div>
  
</template>

<script>
import { mapState } from 'vuex'
const baseUrl = `http://localhost:3000/api/carts`
import axios from 'axios'
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment(id) {
      this.count++;
      this.carts.forEach((cart) => {
        if(cart._id == id) {
          // console.log(cart.productId.quantity)
          if(cart.quantity < cart.productId.quantity) {
            cart.quantity++
          } else {
            this.$swal({
              type:'error',
              text: 'the amount you want to buy exceeded the stock that we currently have!',
              showConfirmButton: false,
              timer: 1000
            })
          }
          // console.log(cart.quantity)
        }
      })
    },
    decrement(id) {
      this.count++;
       this.carts.forEach((cart) => {
        if(cart._id == id) {
          if(cart.quantity > 0) {
            cart.quantity--
          } else {
            this.$swal({
              type:'error',
              text: 'amount cannot be lower than 0',
              showConfirmButton:false,
              timer: 1000
            })
          }
          // console.log(cart.quantity)
        }
      })
    },
    removeItem(id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.value) {
          axios.delete(`${baseUrl}/${id}`,
          {
            headers: {
              'token':  localStorage.getItem('token')
            }
          })
      .then((dataDeleted) => {
        this.deleteDataStore(id)
        this.$swal({
          type: 'success',
          text: 'successfully deleted',
          showConfirmButton: false,
          timer: 1500
            })
         })
        }
      })
        .catch(error => {
          console.log(error)
        })
    },
    deleteDataStore(id) {
      let index = this.carts.findIndex(cart => cart._id == id)
      this.carts.splice(index,1)
    },
    checkout() {
      this.$store.dispatch('checkoutCart')
    }
  },
  computed: {
    ...mapState(['carts']),
    ...mapState(['totalPrice'])
  },
  created() {

  },
  watch: {
    count: function() {
      let price = 0
      // console.log(this.carts)
      this.carts.forEach((cart) => {
        // console.log(cart)
        price += cart.quantity * cart.productId.price
      })
      this.$store.commit('GET_TOTAL_PRICE',price)
      // console.log(price)
    }
  }
}
</script>

<style scoped>
.card {
  text-align: left;
  margin-bottom: 10px;
  transition: 0.3s;
}

.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

img {
  width: 200px;
  height: 150px;
}


</style>
