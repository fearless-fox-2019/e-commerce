<template>
  <div>
    <v-card v-for="tr in shipping" :key="tr._id" class="tr-item">
      <p>{{tr.address}}</p>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {  
  computed : {
    ...mapState(['shipping'])
  }
}
</script>

<style scoped>
.tr-item {
  margin: 15px;
}

</style>
