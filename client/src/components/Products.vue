<template>
  <b-row class="allProductsRow">
    <b-col cols="4" class="productsCard" v-for="allShoe in allShoes" :key="allShoe._id">
        <b-card
          :title="allShoe.name"
          :img-src="allShoe.image"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text>

          </b-card-text>

          <b-button href="#" @click="getProductDetail(allShoe._id)" variant="primary">Product Details</b-button>
        </b-card>
      </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
const baseUrl = `http://localhost:3000/api/shoes`
export default {
  data () {
    return {
      allShoes: []
    }
  },
  created () {
    this.getAllShoes()
  },
  methods: {
    getAllShoes () {
      axios.get(`${baseUrl}/allShoes`)
        .then(({ data }) => {
          this.allShoes = data
          console.log(this.allShoes)
          console.log(this.$store.state)
          
        })
    },
    getProductDetail (id) {
      axios.get(`${baseUrl}/${id}`)
        .then(({ data }) => {
          this.$router.push({ path: `/shoes/${id}` })
        })
    }
  }
}
</script>

<style scoped>
.allProductsRow {
  margin-top: 20px;
}

.card-body {
  background-color: #e0e0e0;
}

.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

</style>
