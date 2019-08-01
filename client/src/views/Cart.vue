<template>
  <div class="container pt-5">
        <div style="height: 4.80rem;">&nbsp;</div>
    <div class="row">
      <div class="col col-sm-9">
        <div style="margin-bottom: 10px">
            <div v-if="!errorMessage"><small style="color: #E5E6E7"><i>.</i></small></div>
            <div style="color: #f22323"><small><i>{{errorMessage}}</i></small></div>
        </div>
        <table class="table">
          <thead>
            <th><h5>Product(s)</h5></th>
            <th><h5>Price</h5></th>
            <th><h5>Quantity</h5></th>
            <th style="width: 150px"><h5>Subtotal</h5></th>
            <th><h5>Remove</h5></th>
          </thead>
          <tbody>
            <tr v-for="(product, i) in allCarts" :key="i">
              <td>
                <div class="row d-flex align-self-center">
                  <div class="col col-sm-3" style="max-height: 100px; max-width: 100px;">
                    <img
                      :src="product.ProductId.image"
                      alt
                      style="object-fit: contain; max-height: 100%; max-width: 100%; min-height:100%; min-height:100%"
                    >
                  </div>
                  <div class="col col-sm-9">
                    <p>{{ product.ProductId.name }}</p>
                  </div>
                </div>
              </td>
    
              <td class="d-flex align-self-center">
                <p>{{converter(product.ProductId.price)}}</p>
              </td>
    
              <td>
                <div v-if="!isAdmin" class="col-md-3 pay-container d-flex flex-row justify-content-between align-items-end" style="padding: 0; max-width: 100%">   
                <div class="d-flex flex-column">
                <div class="section" style="padding-bottom:0px;">
                  <div>
                    <div style="display: flex;">
                      <a href="#"
                        class="d-flex align-self-center icon"
                        @click.prevent="subsQty(product._id)"  
                        :disabled="product.stock === 0"
                      ><i class="fas fa-minus"></i></a>
                            
                      <input 
                        style="width: 40px; margin-left: 8px; margin-right: 8px"
                        :disabled="product.stock <= 0"
                        type="number"
                        v-model="product.quantity" value="product.quantity" />

                      <a href="#"
                        class="d-flex align-self-center icon"
                        @click.prevent="plusQty(product._id)"  
                        :disabled="product.stock === 0"
                      ><i class="fas fa-plus"></i></a>
                    </div>
                  </div>
                </div>
                </div>
              </div>
              </td>
              <td class="d-flex align-self-center">
                <p>{{converter(+product.totalPrice)}}</p>
              </td>
              <td>
                <div class="d-flex justify-content-center">
                  <a href="#" class="icon" style="text-decoration: none" @click="deleteCart(product._id)"><i class="fas fa-trash" style="margin-right: 30px"></i></a>
                </div>
              </td>
            </tr> 
        </tbody>
        </table>
      </div>
      <div class="col col-sm-3" style="border-left: 1px solid white">
        <div class="" title="">
          <div class="d-flex flex-column align-items-center" style="min-height: 500px">
            <div class="d-flex flex-column" style="padding-top: 100px">
              <div class="d-flex justify-content-center" style="padding-bottom: 100px">
                <p>Total: {{ converter(user.totalPayment) }}</p>
                </div>
              <button variant="success" class="mb-3" @click.prevent="goToCheckout">Checkout</button>
              <button variant="warning" @click.prevent=''>Continue Shopping</button>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import converter from '../helpers/converter.js'
import { mapActions, mapState } from 'vuex';
  
export default {
  computed: {
    ...mapState(['user', 'product', 'allCarts']),
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  },
  data() {
    return {
      // cart: [],
      quantity: 1,
      stock: 0,
      // totalPrice: 0,
      errorMessage: ''
    }
  },
  mounted() {
    // this.getProduct(this.$route.params.id);
    this.getCart();
    
  },
  watch: {
    totalPrice() {
      console.log(this.allCarts, '<<<');
      this.totalPrice = this.allCarts.reduce((acc, el) => acc += el.totalPrice, 0)
      console.log(this.allCarts, '<<<');
    }
  },
  created() {
    this.getTotalPrice();
    console.log(this.allCarts)
  },
  methods: {
    converter,
    ...mapActions(['createCart', 'getProduct', 'getCart', 'removeFromCart']),
    plusQty(id) {
      let selectedCart = this.allCarts.find(el => el._id == id)
      console.log(selectedCart);
      if (selectedCart.ProductId.stock && selectedCart.quantity < selectedCart.ProductId.stock) {
        selectedCart.ProductId.stock ? 
        (selectedCart.quantity++, this.errorMessage = '', selectedCart.totalPrice = selectedCart.quantity * selectedCart.ProductId.price, this.user.totalPayment += selectedCart.ProductId.price) : false
      }
      else this.errorMessage = `Maximum quantity is ${selectedCart.ProductId.stock}`
    },
    subsQty(id) {
      let selectedCart = this.allCarts.find(el => el._id == id)
      if (selectedCart.ProductId.stock && selectedCart.quantity > 1) {
        selectedCart.quantity <= 0 ? 
        (selectedCart.quantity = 1, this.errorMessage = '', selectedCart.totalPrice = selectedCart.quantity * selectedCart.ProductId.price, this.user.totalPayment -= selectedCart.ProductId.price) 
        : (selectedCart.quantity--, this.errorMessage = '', selectedCart.totalPrice = selectedCart.quantity * selectedCart.ProductId.price, this.user.totalPayment -= selectedCart.ProductId.price)
      }
      else this.errorMessage = `Minimum quantity is 1`
    },
    deleteCart(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            type: 'success',
            title: 'Delete Success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.$store.commit('removeFromUserCarts', id)
          this.removeFromCart(id);
          setTimeout(() => {
            this.getCart();
          }, 1800)
        }
      })
      console.log(this.allCarts);
    },
    getTotalPrice() {
      this.totalPrice = this.allCarts.reduce((acc, el) => acc += el.totalPrice, 0)
    },
    goToCheckout() {
      this.$router.push('/checkout')
    }
  }
} 
</script>

<style scoped>
  p, h5, h6 {
    margin: 0
  }
  .table th {
    border-color: #888888
  }

  td {
    padding: 10px;
  }
  .pt3 {
    padding: 0
  }
  .icon {
    color: #7F7E7F;
    text-decoration: none
  }
  .icon:hover {
    color: black;
  }

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0; 
  }
</style>
