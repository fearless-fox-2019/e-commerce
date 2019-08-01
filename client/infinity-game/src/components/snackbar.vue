<template>
  <v-snackbar class="mt-1" v-model="snackbar.appereance" top :color="snackbar.status" :timeout="snackbar.timeout">{{alertMessage}}</v-snackbar>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data(){
    return {
    }
  },
  computed : {
    ...mapState(['snackbar', 'alertMessage'])
  } 
};
</script>

<style>
</style>
