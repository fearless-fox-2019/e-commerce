<template>
<div>
  <b-list-group-item></b-list-group-item>
</div>
  
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState: ['carts']
  }
}
</script>

<style>

</style>
