<template>
  <v-layout id="page">
    <v-flex xs2 id="samping"></v-flex>
    <UserForm type="register" />
  </v-layout>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
export default {
  components: {
    UserForm
  }
}
</script>

<style>
#page {
  height: 100%;
}
#samping {
  /* border: 2px solid black; */
  height: 100%;
}
</style>
