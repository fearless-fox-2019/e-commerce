<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" width="800px">
      <template v-slot:activator="{ on }">
        <v-btn flat v-on="on">Detail</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Game Detail</span>
        </v-card-title>
        <v-container>
          <v-layout row wrap>
            <v-flex v-for="(image, i) in detail.screenShots" :key="i">
              <v-img :src="image" width="300px" height="200px;"></v-img>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-text>{{ detail.description }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">CLOSE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "detail",
  props: ["detail"],
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style>
</style>
