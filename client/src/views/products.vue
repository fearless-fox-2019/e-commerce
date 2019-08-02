<template>
  <div class="allproduct">
    <b-container fluid style="margin-top:20px;">
      <b-row>
        <b-col cols="2" class="sidebar" >
          <ul>
            <li class="list-category" @click="searchProducts('clothes')">Clothes</li>
            <li class="list-category" @click="searchProducts('bottoms')">Bottoms</li>
            <li class="list-category" @click="searchProducts('shoes')">Shoes</li>
            <li class="list-category" @click="searchProducts('bags')">Bags</li>
            <li class="list-category" @click="searchProducts('accesories')">Accesories</li>
          </ul>
        </b-col>
        <b-col cols="10">
          <router-view :products="products"/>

          <!-- <b-row> -->
            <!-- <b-row>
              <b-pagination
                style="margin-left: 100%; backgrouf-color:red;"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
              ></b-pagination>
            </b-row> -->
          <!-- </b-row> -->
        </b-col>
      </b-row>
      <div>

      </div>
    </b-container>
  </div>
</template>

<script>
import axios from '../config/axios.js'
import productCard from '../components/productCard.vue'

export default {
  components: {
    productCard
  },
  data () {
    return {
      perPage: 3,
      currentPage: 1,
      rows: 5,
      products: [],
      src: ''
    }
  },
  methods: {
    getAllProducts () {
      axios({
        method: `GET`,
        url: `/products`
      })
        .then(({ data }) => {
          console.log('data', data)
          this.products = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchProducts (value) {
      console.log(value)
      axios({
        method: `GET`,
        url: `/products?search=${value}`
      })
        .then(({ data }) => {
          this.products = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    console.log(this.$route)
    console.log(this.$route.fullpath)
    console.log(this.products)

    // this.products = []
    this.getAllProducts()
  }
}
</script>

<style scoped>
.sidebar {
  margin-top: 30px;
  /* background-color: #e0e0e0; */
  min-height: 100;
  height: 100;
}

ul{
  margin : 0;
  padding : 0;
}
.list-category {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  list-style: none;
  border-bottom: 0.5px solid grey;
}

.list-category:hover{
  background-color: #D8572A;
  width: 100%;
  color: #fff;
}

.pagination-page {
  display: flex;
  justify-content: center;
}

/* .button-cart{
  display: none;
}

.product:hover + .button-cart, .button-cart:hover{
  display: inline-block;
} */
</style>
