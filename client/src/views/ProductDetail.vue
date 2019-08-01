<template>
    <div class="container mb-5" style="margin-top: 8em;">
        <div class="row d-flex justify-content-center">
            <div class="col-md-5 item-photo d-flex align-items-start">
                <img style="max-width:100%;" :src="product.image ? product.image : 'https://via.placeholder.com/150x150'" />
            </div>
            <div class="col-md-6" style="border:0px solid gray">
                <h3 style="margin: 0">{{product.name}}</h3>
                <hr style="margin: 0; margin-bottom: 10px">
                <div class="d-flex justify-content-between">
                  <h6 style="margin-top:0px;">{{converter(+product.price)}}</h6>
                  <h6 style="margin-top:0px;">Stocks: {{product.stock}}</h6>
                </div>
                <div style="width:100%;border-top:1px solid silver">
                    <div style="padding:15px; background-color: #888888; color: #fff; text-align: justify">
                        <small>
                        {{product.detail}}
                        </small>

              <div v-if="!isAdmin" class="col-md-3 pay-container d-flex flex-row justify-content-between align-items-end" style="padding: 0; padding-top: 30px; max-width: 100%">   
                <div class="d-flex flex-column">
                  <div style="margin-bottom: 10px">
                    <div v-if="!errorMessage"><small style="color: #888888"><i>.</i></small></div>
                    <div style="color: #f22323"><small><i>{{errorMessage}}</i></small></div>
                    <h6 class="title-attr"><p style="margin: 0">Quantity:</p></h6>
                </div>
                <div class="section" style="padding-bottom:0px;">
                  <div>
                    <div style="display: flex;">
                      <a href="#"
                        class="d-flex align-self-center icon"
                        @click.prevent="subsQty"  
                        :disabled="product.stock===0"
                      ><i class="fas fa-minus"></i></a>
                            
                      <input 
                        style="width: 40px; margin-left: 8px; margin-right: 8px"
                        :disabled="product.stock<=0"
                        type="number"
                        v-model="quantity" value="1" />

                      <a href="#"
                        class="d-flex align-self-center icon"
                        @click.prevent="plusQty"  
                        :disabled="product.stock===0"
                      ><i class="fas fa-plus"></i></a>
                    </div>
                  </div>
                </div>
                </div>
               <div class="d-flex flex-column">
                <div
                  class="section"
                  style="padding-bottom:0px;"
                >
                  <button
                      @click="buyItem(product._id)"
                      class="btn btn-dark btn-block d-flex"
                      v-if="product.stock > 0"
                  ><i class="fas fa-shopping-cart" style="margin-right:5px;"
                  ></i><p style="font-size: 14px">Add to Cart</p></button>
                  <button
                      class="btn btn-dark btn-block"
                      v-else
                      disabled
                  ><p style="font-size: 14px">Out of stock</p></button>
                </div>
               </div>
              </div>
              <div
                v-else
                class="text-center col-md-3 d-flex"
                style="border-radius: 2em; max-width: 100%; padding-top: 10px"
            >
                <div class="d-flex justify-content-center" style="width: 100%;">
                    <div style="background-color: white; padding: 10px"><h5 style="margin: 0px; color: black">Admin can not buy product</h5></div>
                </div>
            </div>
            </div>
          </div>
            <!-- </div> -->
        </div>
            <!-- <div
                v-if="!isAdmin"
                class="col-md-3 pay-container"
            >   <div>
                    <h6 class="title-attr"><small>Quantity</small></h6>
                </div>
                <div
                    class="section"
                    style="padding-bottom:20px;"
                >
                    <div>
                        <div style="display: flex;">
                            <button 
                                @click="subsQty" 
                                class="qty-btn btn-minus"
                                :disabled="product.stock===0"
                            > - </button>
                            <input 
                            :disabled="product.stock<=0"
                            v-model="quantity" value="1" />
                            <button 
                                @click="plusQty"  
                                class="qty-btn btn-plus"
                                :disabled="product.stock===0"
                            > + </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div v-if="errorMessage.trim()!==''" style="color: #f22323">{{errorMessage}}</div>
                    <span>Stocks: {{product.stock}}</span>
                </div>
                <div
                    class="section"
                    style="padding-bottom:20px;"
                >
                    <button
                        @click="buyItem(product._id)"
                        class="btn btn-dark btn-block"
                        v-if="product.stock>0"
                    ><i class="fas fa-shopping-cart" style="margin-right:5px;"
                    ></i>Add to Cart</button>
                    <button
                        class="btn btn-dark btn-block"
                        v-else
                        disabled
                    >Out of stock</button>
                </div>
            </div>

            <div
                v-else
                class="text-center col-md-3"
                style="border-radius: 2em;"
            >
                <div>
                    <h5 style="background-color: rgb(26,26,26)">Admin can not buy product</h5>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import converter from '../helpers/converter.js'
import { mapActions, mapState } from 'vuex';

export default {
    data() {
      return {
        quantity: 1,
        totalPrice: 0,
        errorMessage: ''
      }
    },
    computed: {
      ...mapState(['user', 'product', 'allCarts']),
      isAdmin() {
        return this.$store.getters.isAdmin
      }
    },
    mounted() {
      this.getProduct(this.$route.params.id);
      this.getCart();
      console.log(this.user)
    },
    watch: {
      quantity() {
        this.quantity > this.product.stock ? (this.quantity = this.product.stock, this.errorMessage = `Maximum quantity is ${this.product.stock}`) 
        : this.quantity <= 0 ? (this.quantity = 1, this.errorMessage = 'Minimum quantity is 1')
        : this.totalPrice = this.quantity * this.product.price
      },
      // allCarts() {
      //   // this.getCart();
      //   console.log(this.allCarts)
      // }
    },
    methods: {
      ...mapActions(['createCart', 'getProduct', 'getCart']),
      converter,
      buyItem(ProductId) {
        let currentCartItem = this.allCarts.find(el => el.ProductId._id == this.$route.params.id);
        // console.log(currentCartItem.quantity);
        if (currentCartItem && currentCartItem.quantity > this.product.stock) {
          // if (currentCartItem.quantity > this.product.stock) {
            Swal.fire({
              type: 'error',
              title: 'Out of stock',
              text: 'Check cart to finish your transaction',
              confirmButtonColor: 'black',
            });
          // }
        }
        else {
          if (localStorage.token) {
            let payload = {
              ProductId,
              totalPrice: this.totalPrice ? this.totalPrice : this.product.price,
              quantity: this.quantity,
              UserId: localStorage.id
            }
            this.getCart();
            this.createCart(payload)
            Swal.fire({
              type: 'success',
              title: `Added to Cart`,
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              this.$router.push('/cart')
            }, 1800)
            // console.log(this.allCarts);
          }
          else this.$router.push('/login')
        }
      },
      plusQty() {
        this.product.stock ? this.quantity++ : false
      },
      subsQty() {
        if (this.product.stock) this.quantity <= 0 ? this.quantity = 1 : this.quantity--
        else false 
      }
    },
}
</script>

<style scoped>
  ul > li{margin-right:25px;font-weight:lighter;cursor:pointer}
  li.active{border-bottom:3px solid silver;}

  .item-photo{display:flex;justify-content:center;align-items:center;border-right:1px solid #fff;}
  .menu-items{list-style-type:none;font-size:11px;display:inline-flex;margin-bottom:0;margin-top:20px}
  .btn-success{width:100%;border-radius:0;}
  .section{display: flex; justify-content: space-between;}
  .title-price{margin-top:30px;margin-bottom:0;color:black}
  .title-attr{margin-top:0;margin-bottom:0;color:#fff;}
  div.section > div {width:100%;display: flex;justify-content: space-between;}
  div.section > div > input {margin:0;padding-left:5px;font-size:10px;padding-right:5px;max-width:18%;text-align:center;}
  .attr,.attr2{cursor:pointer;margin-right:5px;height:20px;font-size:10px;padding:2px;border:1px solid gray;border-radius:2px;}
  .attr.active,.attr2.active{ border:1px solid orange;}
  .icon {
    color: #333A40;
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
  
  p {
    margin: 0
  }

  h6 {
    font-size: 14px
  }


  /* .btn-cart {
      cursor: pointer;
      color: orangered;
      display: block;
      text-align: center;
      font-weight: 600;
      margin: 10px auto 0px;
  } */

/* .pay-container {
    position: fixed;
    right: 65px;
    width: 20em;
}
.qty-btn {
    background-color: #000;
    color: #fff;
}
.qty-btn:disabled {
    color: #fff;
    background-color: #343a40;
    border-color: #343a40;
    opacity: 0.899;
    cursor: unset;
} */
</style>
