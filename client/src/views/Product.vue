<template>
  <div>
    <homebar></homebar>

    <div class="columns" id="top">
      <div
        class="column"
        style="display: flex ; justify-content:left; padding: 0 30; margin-top:180px; margin-left: 40px"
      >
        <div class="card" style="min-width:100vh ; opacity:0.9">
          <div class="card-image" style="display:flex ; justify-content:center">
            <figure class="image" style="width:100%; padding:10px">
              <img
                :src="product.picture"
                alt="Placeholder image"
                style="max-width:100%; max-height:100%;"
              />
            </figure>
          </div>
          <div
            class="card-content"
            style="display: flex ; justify-content:left; flex-direction:column"
          >
            <div class="media">
              <div class="media-content">
                <h1>
                  <strong>{{ product.name }}</strong>
                </h1>
              </div>
            </div>
            <div
              class="media-content"
              style="display: flex ; justify-content:left; flex-direction:column"
            >
              <p>Description : {{ product.description }}</p>
              <p>Quantity : {{ product.quantity }}</p>
              <p>
                Price :
                <money-format :value="product.price" :subunit-value="true" :hide-subunits="true"></money-format>
              </p>
              <b-button
                v-if="!$store.state.isAdmin"
                rounded
                type="is-success"
                @click.prevent="addToCart"
              >Add To Cart</b-button>
              <br />
              <b-button
                v-if="$store.state.isAdmin"
                rounded
                type="is-danger"
                @click.prevent="deleteItem(product._id)"
              >Delete</b-button>
              <br />
              <b-button
                v-if="$store.state.isAdmin"
                rounded
                type="is-primary"
                @click.prevent="editItem(product._id)"
              >Edit</b-button>
            </div>
          </div>
        </div>
        <edit-form class="column is-7" v-if="editForm" :data="product"></edit-form>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import homebar from '../components/HomeBar.vue'
import MoneyFormat from 'vue-money-format'
import axios from 'axios'
import EditFormProduct from '../components/EditFormProduct.vue'
const baseUrl = 'http://localhost:3000'
export default {
  components: {
    homebar,
    'money-format': MoneyFormat,
    'edit-form': EditFormProduct
  },
  data () {
    return {
      product: '',
      quantity: 0,
      found: this.$store.state.products.filter(el => {
        if (el._id === this.$route.params.id) {
          return el
        }
      }),
      editForm: false
    }
  },
  methods: {
    producte () {
      let found = this.$store.state.products.filter(el => {
        if (el._id === this.$route.params.id) {
          return el
        }
      })
      this.product = found[0]
    },
    addToCart () {
      this.$store.dispatch('addToCart', this.product)
      this.$swal('success add to cart')
    },
    deleteItem (id) {
      axios({
        method: 'delete',
        url: baseUrl + `/products/${id}`
      })
        .then(data => {
          this.$store.dispatch('getProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    editItem (id) {
      this.editForm = true
    }
  },
  watch: {
    $route: 'producte'
  },
  created () {
    this.producte()
  }
}
</script>

<style>
#top {
  min-height: 100vh;
  min-width: 105%;
  background-color: black;
  background-image: url("../assets/backItem.jpg");
}
.card h1 {
  font-size: 50px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.card p {
  font-size: 25px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
#homebar {
  height: 100px;
  display: flex;
  align-items: flex-end;
  margin-top: 50px;
  position: fixed;
}
</style>
