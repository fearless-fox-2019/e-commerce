<template>
  <div>
    <TransactionCard v-for="tr in allTransactions" :transaction="tr" :key="tr._id" type="all"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TransactionCard from '@/components/TransactionCard.vue'
export default {
  computed: {
    ...mapState(['delivered', 'allTransactions'])
  },
  components: {
    TransactionCard
  },
  created () {
    this.$store.dispatch('fetchAllTransactions')
  }
}
</script>

<style scoped>

</style>
