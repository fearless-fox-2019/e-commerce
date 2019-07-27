<template>
  <v-content>
    <v-container fluid id="cart" grey darken-2>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs9>
          <v-card width="700">
            <v-layout py-4 pl-4>
              <v-flex shrink>
                <v-img
                  height="200"
                  width="200"
                  src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
                ></v-img>
              </v-flex>
              <v-flex text-center>
                <v-container grid-list-lg pa-0>
                  <v-layout column>
                    <v-flex>
                      <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <v-btn icon>
                        <v-icon>mdi-bookmark</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <v-btn icon>
                        <v-icon>mdi-share-variant</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card max-width="344" class="mx-auto">
            <v-card-title>I'm a title</v-card-title>
            <v-card-text>I'm card text</v-card-text>
            <v-card-actions>
              <v-btn text>Click</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapState } from "vuex";
export default {};
</script>

<style>
#cart {
  height: 95vh;
}
</style>
