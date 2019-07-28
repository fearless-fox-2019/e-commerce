<template>
  <div>
    <TransactionCard v-for="tr in delivered" :transaction="tr" :key="tr._id" type="delivered"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TransactionCard from '@/components/TransactionCard.vue'
export default {
  computed : {
    ...mapState(['delivered'])
  },
  components : {
    TransactionCard
  }
}
</script>

<style scoped>


</style>
