<template>
  <div>
    <v-card>
      <v-img :src="game.image" height="300px" style="filter: brightness(0.85);"></v-img>
      <v-card-title primary-title>
        <div>
          <div class="headline">
            <h1 style="font-size: 25px;">{{ game.name }}</h1>
          </div>
          <div>
            <span>Rp.{{ game.price }}</span>
          </div>
          <small>Stock {{ game.stock }}</small>
        </div>
      </v-card-title>

      <v-card-actions>
        <dialogGlob :game="game" />
        <v-spacer></v-spacer>
        <div class="text-xs-center">
          <detailGame :detail="game" />
        </div>
      </v-card-actions>  
    </v-card>
  </div>
</template>

<script>
import dialogGlob from '../components/dialogGlob'
import ax from "../api/api";
import detailGame from "./detailGame";
export default {
  name: "product",
  props: ["game"],
  components: {
    detailGame,
    dialogGlob
  },
  data() {
    return {
      dialog: false
      // gameId : this.game._id
    };
  },
  methods: {
    getOneGame(){
      this.$store.commit('SET_GAME_DATA', this.game)
      this.$store.dialogGlob = true
    },
    toCart() {      
      this.$router.push("/cart");
    }
  },
  created() {
    this.$store.dispatch("getAllGames");
  }
};
</script>

<style>
</style>
