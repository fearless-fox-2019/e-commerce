<template>
  <v-content>
    <v-container fluid id="home">
      <v-layout row wrap>
        <v-flex xs12>
          <carousel />
        </v-flex>
          <v-flex id="product" xs3 v-for="(game, i) in gameData" :key="i" class="pa-1">                                
          <productCard :game="game" />
          </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import carousel from "../components/carousel";
import productCard from "../components/productCard";
import ax from "../api/api"
import detail from '../components/detailGame'

export default {
  name : 'home',
  components: {
    carousel,
    productCard
  },
  created() {
    this.getAllGames();
  },
  data() {
    return {
      productImage: [],
      gameData: []
    };
  },
  methods: {
    getAllGames() {
      ax({
        method: "get",
        url: "/games"
      })
        .then(({ data }) => {
          console.log(data);
          this.gameData = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
* {
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 20px;
}
#home {
  margin-top: 47px;
}
#product {
  margin-top: 20px;
}
</style>

