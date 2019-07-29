<template>
  <div style="padding:20px">
    <table class="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in mycart" :key="i">
          <td>{{ i + 1}}</td>
          <td>
            <strong>{{ item.name }}</strong>
          </td>
          <td>{{ item.description }}</td>
          <td>{{ item.price }}</td>
          <td>
            <b-field>
              <b-numberinput
                @input="save(item._id)"
                min="1"
                controls-position="compact"
                rounded
                type="is-dark"
                size="is-medium"
                v-model="item.quantityToBuy"
                :max="item.quantity"
              ></b-numberinput>
            </b-field>
          </td>
          <td>
            <b-button @click.prevent="remove(item._id)" type="is-danger">Remove</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-button @click.prevent="checkout" type="is-success" size="is-medium" style="width:auto">
      <i class="fas fa-shopping-cart"></i> Checkout
    </b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  methods: {
    remove (id) {
      this.$store.dispatch('removeItem', id)
    },
    save (id) {
      this.mycart.forEach((el) => {
        if (el._id == id) {
          if (el.quantity < el.quantityToBuy) {
            this.$swal({
              type: 'warning',
              title: 'out of stock',
              showConfirmButton: false,
              timer: 1500
            })
            el.quantityToBuy++
          }
        }
      })
      return this.mycart
    },
    checkout () {
      let totalShopping = 0
      this.mycart.forEach(element => {
        totalShopping += element.quantityToBuy * element.price
        element.quantity -= element.quantityToBuy
        this.$store.dispatch('updateQuantity', {
          quantity: element.quantity,
          id: element._id
        })
      })
      this.$store.dispatch('emptyBucket', this.mycart)
      this.$store.dispatch('makeTransaction', {
        items: this.mycart,
        totalPrice: totalShopping
      })
      this.$swal({
        type: 'success',
        title: `Total Price : ${totalShopping} `,
        showConfirmButton: true
      })
    }
  },
  computed: {
    ...mapState(['cart']),
    mycart () {
      console.log(this.cart, 'ini cart')
      this.cart.forEach(element => {
        element.quantityToBuy = 1
      })
      return this.cart
    }
  }
}
</script>

<style>
th {
  min-width: 100px;
  font-size: 20px;
}

td {
  font-size: 20px;
}
</style>
