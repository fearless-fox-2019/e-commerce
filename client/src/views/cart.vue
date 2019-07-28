<template>
  <div class="cart-page">
    <h1 style="display:flex; margin-left:10%; margin-bottom:20px; margin-top:20px;">Your Shopping Bag</h1>
    <b-container>
      <b-row>
        <b-col cols="12">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Product</th>
                  <th scope="col">Available</th>
                  <th scope="col" class="text-center">Quantity</th>
                  <th scope="col" class="text-right">Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart, index) in userCart" :key="index">
                  <!-- <td><img v-if="!cart.ProductId.image" src="https://dummyimage.com/50x50/55595c/fff" /> </td> -->
                  <td>
                    <img v-if="cart.ProductId.image" :src="cart.ProductId.image" width="50px" height="50px" />
                  </td>
                  <td>{{cart.ProductId.productname}}</td>
                  <td v-if="cart.ProductId.qty !== 0">In stock</td>
                  <td v-if="cart.ProductId.qty === 0">Last Call </td>
                  <td> <div class="button-edit-cart" style="display:flex">
                    <button @click="decrement()">-</button>
                    <input class="form-control" type="text" :value="cart.qty" title="Press Enter to Update your quantity" width="75%" id="quantity"/><button @click="increment()">+</button>
                  </div>
                  </td>
                  <td class="text-right">{{convertIdr(cart.totalPrice)}}</td>
                  <td class="text-right">
                    <button class="btn btn-sm btn-danger" @click="deleteCart(cart._id)">
                      <i class="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><strong>Total</strong></td>
                  <td class="text-right">{{convertIdr(totaL)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from '../config/axios.js'
export default {
  data () {
    return {
      userCart: [],
      total: 0,
      shippingPrice: 0
    }
  },
  methods: {
    deleteCart (id) {
       Swal.fire({
      title: 'Are you sure to delete?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.value) {
        axios({
          method : `DELETE`,
          url: `carts/${id}`,
          headers : { token : localStorage.getItem('token')}
        })
        .then(({data}) => {
          Swal.fire(
            'Deleted!',
            'Product has been deleted from yout cart.',
            'success'
          ) 
          console.log(data);
          
          console.log('success delete')
          this.$router.push('/carts')
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.message || err
          })
        })
      }})
    },
    getUserCart () {
      axios({
        method: `GET`,
        url: `/carts`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data)
          this.userCart = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    subTotal () {
      let prices = 0
      this.userCart.forEach(element => {
        prices += element.totalPrice
        console.log(element, 'ini element')
      })
      this.total = prices
    },
    convertIdr (price) {
      let str = String(price)
      let convert = []
      let dlm = ''
      for (let i = str.length - 1; i >= 0; i--) {
        dlm = str[i] + dlm

        if (dlm.length == 3 || i == 0) {
          console.log('masuk')
          convert.push(dlm)
          dlm = ''
        }
      }
      return `Rp ${convert.reverse().join('.')},-`
    },
    decrement(){
      let x=0
      let element = document.getElementById("quantity");
      quantity.innerText = x

      element.innerHTML = ++x
    },
    increment(){
      let x=0
      let element = document.getElementById("quantity");
      quantity.innerText = x

      element.innerHTML = --x
    }
  },
  created () {
    this.subTotal()
    this.getUserCart()
    let shippingPrice = document.getElementById('shipping').innerText
    console.log(shippingPrice, 'shipping')
    this.shippingPrice = shippingPrice
    console.log(this.shippingPrice, 'instence vue')
    console.log(this.subTotal, 'ini total')
    this.total = this.subTotal + this.shippingPrice
  },
  computed: {
    totaL: function () {
      let prices = 0
      this.userCart.forEach(element => {
        prices += element.totalPrice
      })
      console.log(prices, '<<<<<<')
      this.subTotal = prices
      return prices
    }
  }
}
</script>

<style scoped>
.bloc_left_price {
  color: #c01508;
  text-align: center;
  font-weight: bold;
  font-size: 150%;
}
.category_block li:hover {
  background-color: #007bff;
}
.category_block li:hover a {
  color: #ffffff;
}
.category_block li a {
  color: #343a40;
}
.add_to_cart_block .price {
  color: #c01508;
  text-align: center;
  font-weight: bold;
  font-size: 200%;
  margin-bottom: 0;
}
.add_to_cart_block .price_discounted {
  color: #343a40;
  text-align: center;
  text-decoration: line-through;
  font-size: 140%;
}
.product_rassurance {
  padding: 10px;
  margin-top: 15px;
  background: #ffffff;
  border: 1px solid #6c757d;
  color: #6c757d;
}
.product_rassurance .list-inline {
  margin-bottom: 0;
  text-transform: uppercase;
  text-align: center;
}
.product_rassurance .list-inline li:hover {
  color: #343a40;
}
.reviews_product .fa-star {
  color: gold;
}
.pagination {
  margin-top: 20px;
}
</style>
