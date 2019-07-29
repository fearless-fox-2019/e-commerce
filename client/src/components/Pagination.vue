<template>
    <div class="animated fadeIn mb-4">
    <h1 class="mt-2" style="text-align: center; font-weight: 800;">Our Products</h1>
    <b-row class="justify-content-center">
        <div class="card-pagination">
            <div class="page-index" v-for="i in nbPages" :key="i"  @click="goto(i)" :class={active:currentPage(i)}></div>
        </div>
    </b-row>
    <b-row class="justify-content-center">
        <b-card-group deck>
            <b-card no-body style="max-width: 160px" v-for="card in currentPageCards" :key="card._id" :img-src="card.image_path" img-alt="Img" img-top>
              <div class="m-1">
                <h6 class="m-0"><b>{{ card.name }}</b></h6>
                <h6 class="m-0">Rp{{ card.price }}</h6>
              </div>
              <b-btn @addToCart="$emit(addToCart, payload)" size="sm" class="m-1" style="background-color: #faed26; color: #46344e; border: 0; font-weight: 600;" block>
                <router-link :to="'/products/'+card._id+'/'">See Product
                </router-link>
              </b-btn>
            </b-card>
        </b-card-group>
    </b-row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      cards: [],
      paginatedCards: [],
      nbPages: 0,
      nbRowPerPage: 5,
      currentPageIndex: 0
    }
  },
  computed: {
    formattedCards () {
      return this.cards.reduce((c, n, i) => {
        if (i % 4 === 0) c.push([])
        c[c.length - 1].push(n)
        return c
      }, [])
    },
    currentPageCards () {
      this.createPages()
      return this.paginatedCards[this.currentPageIndex]
    }
  },
  methods: {
    currentPage (i) {
      return i - 1 === this.currentPageIndex
    },
    createPages () {
      let lengthAll = Object.keys(this.cards).length
      this.nbPages = 0
      for (let i = 0; i < lengthAll; i = i + this.nbRowPerPage) {
        this.paginatedCards[this.nbPages] = this.cards.slice(
          i,
          i + this.nbRowPerPage
        )
        this.nbPages++
      }
    },
    goto (i) {
      this.currentPageIndex = i - 1
    }
  },
  created () {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/products'
    })
    .then(({ data }) => {
      this.cards = data
      console.log('Fetched')
    })
    .catch( err => {
      console.log(err)
    })
  }
}
</script>
<style>
.card-pagination{
  display:flex;
  align-items: center;
  padding:20px;
}
.page-index{
  margin-left:10px;
  width:10px;
  height:10px;
  border-radius:5px;
  background:#faed26;
}
.active{
   width:20px;
  height:20px;
  border-radius:20px;
}
h6 {
  font-size: 14px !important;
}
</style>
