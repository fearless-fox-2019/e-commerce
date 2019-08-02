<template>
  <v-layout justify-center align-center id="container" column>
    <v-flex>
      <p id="title">Admin</p>
    </v-flex>
    <v-divider></v-divider>
    <v-flex id="isi" shrink>
      <v-tabs centered color="white" grow id="tab" background-color="red lighten-1" slider-color="blue">
        <v-tab v-for="(tab, i) in tabs" :key="tab" :to="target[i]" >{{tab}}</v-tab>
      </v-tabs>
      <router-view />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      target: ['/admin/create', '/admin/transactions'],
      tabs: ['Create', 'Transactions']
    }
  },
  computed: {
    ...mapState(['loggedUser'])
  },
  mounted () {
    if (this.loggedUser && this.loggedUser.role !== 'admin') {
      this.$toast.open({ message: 'Admin Only !', type: 'is-danger' })
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
#title {
  margin: 0;
  text-align: center;
  color: #e53935;
  font-size: 45px;
}
</style>
