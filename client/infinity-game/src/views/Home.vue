<template>
  <v-content>
    <v-container fluid id="home" grey darken-2>
      <snackbar />
      <v-layout row wrap>
        <v-flex xs12>
          <carousel />
        </v-flex>                   
        <v-flex id="product" xs3 class="pa-1" style="margin-top : 70px;" v-for="game in $store.state.gameList" :key="game._id">
          <v-hover>
            <productCard
              :game="game"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"
            />
          </v-hover>
        </v-flex>      
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import carousel from "../components/carousel";
import productCard from "../components/productCard";
import ax from "../api/api";
import detail from "../components/detailGame";
import snackbar from '../components/snackbar'
export default {
  name: "home",
  components: {
    carousel,
    productCard,
    snackbar
  },
  created() {
    this.$store.dispatch("getAllGames");
    this.$store.commit("SET_LOGIN")
  },
  data() {
    return {
      
    };
  },
  methods: {

  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Jockey+One&display=swap');
@import url('https://fonts.googleapis.com/css?family=Staatliches&display=swap');
* {
  /* font-family: "Yanone Kaffeesatz", sans-serif; */
  font-family: 'Jockey One', sans-serif;
  font-size: 20px;
}
#home {
  margin-top: 47px;
}
#product {
  margin-top: 25px;
}
#header {
  margin-top: 30px;
  text-align: center; 
}
</style>

