<template>

   <div class="sum">
          <b-card-group deck>
          <b-card class="bg-dark text-white">
            <b-list-group class="bg-dark text-white">
              <b-list-group-item v-for="cart in carts" :key="cart._id">{{cart.productId.name}} X {{cart.quantity}} = ${{cart.productId.price * cart.quantity}}.00</b-list-group-item>
            </b-list-group>
            <h4>Total Price: ${{totalPrice}}.00 </h4>
            <p class="card-text mt-2">
              Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
              consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur
              mollit voluptate est in duis laboris ad sit ipsum anim Lorem.
            </p>
          </b-card>
        </b-card-group>
        </div>
  
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      count: 0,
      total:0
    }
  },
  computed: {
    ...mapState(['carts', 'totalPrice'])
  },
  methods: {
    getTotalPrice() {
      this.$store.dispatch('getTotal')
    }
  },
  watch: {

  },
  created() {
    this.getTotalPrice()
    // console.log('asd')
   this.$store.commit('GET_TOTAL_PRICE',this.total)
  }
}
</script>

<style scoped>
.list-group-item {
  background-color: #343a40;
}

.sum {
  min-height: 400px;
}

</style>
