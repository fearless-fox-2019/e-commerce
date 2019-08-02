<template>
  <div>
    <v-card class="product-card" width="310" elevation="3" min-height="630px">
      <div style="margin-bottom: 15px;">
        <v-img :src="book.image" contain height="200px"></v-img>
      </div>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        <h2 class="title red--text">{{book.name}}</h2>
        {{book.description}}
      </v-card-text>
      <v-divider></v-divider>
      <div class="product-footer">
        <p id="price">{{price}}</p>
        <div>
          <v-tooltip top color="red">
            <template v-slot:activator="{ on }">
              <v-btn color="red white--text" elevation="6" v-on="on" @click="addToCart" :loading="loading">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Add to Cart</span>
          </v-tooltip>
        </div>
      </div>
      <v-divider></v-divider>
      <div v-if="loggedUser.role == 'admin'" id="admin-option">
        <v-btn  color="red white--text" @click="deletThis">Delete</v-btn>
        <v-btn  color="blue white--text" :to="`/edit/${book._id}`">Edit</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'productCard',
  props: ['book'],
  data () {
    return {
      overlay: false,
      loading: false
    }
  },
  computed: {
    price () {
      let arr = this.book.price.toString().split('')
      let start
      if (arr.length % 3 !== 0) {
        start = arr.length % 3
      }
      for (let i = start || 3; i < arr.length; i += 4) {
        arr.splice(i, 0, '.')
      }

      return 'Rp ' + arr.join('')
    },
    ...mapState(['loggedUser'])
  },
  methods: {
    addToCart () {
      this.loading = true
      const data = {
        product: this.book._id
      }
      this.$store.dispatch('addToCart', { data })
        .then(({ data }) => {
          this.$toast.open({ message: 'Added to cart !', type: 'is-success' })
          this.loading = false
          this.$store.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err.response.data.errors[0])
          this.$toast.open({ message: 'You have to login first !', type: 'is-danger' })
          this.loading = false
        })
    },
    deletThis () {
      this.$store.dispatch('deleteProduct', this.book._id)
        .then(({ data }) => {
          this.$toast.open({ message: 'Product Deleted', type: 'is-success' })
          this.$store.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style scoped>
#price {
  margin: 0;
  color: #E53935;
  font-weight: bold;
}
.product-card {
  padding: 20px;
  margin: 15px;
  background-color: rgba(52, 106, 206, 0.685);
}
.product-footer {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: flex-end;
}
#admin-option {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
