<template>
  <v-snackbar class="mt-1" v-model="$store.state.snackbar.appereance" top :color="$store.state.snackbar.status">{{$store.state.snackbar.alertMessage}}</v-snackbar>
</template>

<script>
export default {
  data(){
    return {
    }
  }  
};
</script>

<style>
</style>
