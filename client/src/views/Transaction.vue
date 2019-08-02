<template>
  <v-layout justify-center align-center id="container">
    <v-flex id="isi" xs9>
      <v-tabs centered color="white" grow id="tab" background-color="red lighten-1" slider-color="blue">
        <v-tab v-for="(tab, i) in tabs" :key="tab" :to="target[i]" >{{tab}}</v-tab>
      </v-tabs>
      <router-view />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      tabs: ['Shipping', 'Delivered'],
      target: ['/transaction/shipping', '/transaction/delivered']
    }
  },
}
</script>

<style scoped>
#isi {
  /* border: 1.5px solid #e53935; */
  /* border-radius: 10px; */
  height: 100%;
  padding: 15px;
  overflow-y: auto;
}

#isi::-webkit-scrollbar {
  width: 10px;
}

#isi::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-top: 1px solid #e53935;
  border-right: 1px solid #e53935;
}

#isi::-webkit-scrollbar-thumb {
  background: #e53935  ;
}
#container {
  height: 100%;
}

</style>
