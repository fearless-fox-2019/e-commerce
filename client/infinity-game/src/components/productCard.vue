<template>
  <v-card>
    <v-img :src="game.image" height="300px"></v-img>
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
      <v-btn flat>ADD To Cart</v-btn>
      <v-spacer></v-spacer>
      <div class="text-xs-center">
        <detailGame  :detail="game" />
      </div>
    </v-card-actions>
    <!-- <v-slide-y-transition>
      <v-card-text v-show="show">{{ game.description }}</v-card-text>
    </v-slide-y-transition>-->
  </v-card>
</template>

<script>
import ax from "../api/api";
import detailGame from "./detailGame";
export default {
  name: "product",
  props: ["game"],
  components: {
    detailGame
  },
  data: () => ({
    show: false
  }),
  methods: {}
};
</script>

<style>
</style>
