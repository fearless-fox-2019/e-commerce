<template>
  <div class="ui card">
    <div class="image">
      <!-- <div class="ui left black ribbon icon label">
        <i class="edit icon" @click="$emit('edit-product', product._id)"></i>
        <i class="trash icon" @click="$emit('delete-product', product._id)"></i>
        </div> -->
      <img
        :src="product.image"
        class="visible content"
        style="width: 100%; height: 200px;"
      >
    </div>
    <div class="center aligned content">
      <a class="header" @click="detail(product._id)">{{ product.name }}</a>
      <div class="meta">
        Stock: {{ product.stock }}
      </div>
      Rp. {{ product.price }}
    </div>
<div
  v-show="!isAdmin"
  class="ui basic bottom attached button" 
  tabindex="0"
  @click="$emit('add-to-cart', product._id)"
  :class="{ disabled: onCart == 'Added to Cart' || product.stock == 0 }"
  >
    <p>{{ product.stock ? onCart : 'Stock Empty' }}</p>
</div>
<div 
  class="ui basic bottom attached button" 
  tabindex="0"
  v-show="isAdmin"
  @click="$emit('delete-product', product._id)"
  >
  <p>Delete Product</p>
</div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import backend from '../api/backend'

export default {
  name: 'ProducCard',
  props: {
    product: Object,
    cart: Array,
  },
  created() {
  },
  computed: {
    onCart() {
      let cart = this.cart.map(el => el._id)
      if(cart.indexOf(this.product._id) < 0) {
        return 'Add to Cart'
      } else {
        return 'Added to Cart'
      }
    },
    isAdmin() {
      return localStorage.getItem('email') == 'admin@mail.com'
    },
  },
  methods:{
    detail(id){
      backend
        .get(`/products/${id}`)
        .then(({data})=> {
          swal.fire({
            title: data.name,
            text: data.description,
            imageUrl: data.image,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: data.name,
          })
        })
        .catch((err)=> {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>