<template>
  <div>
    <TransactionCard v-for="tr in shipping" :transaction="tr" :key="tr._id" type="shipping"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TransactionCard from '@/components/TransactionCard.vue'
export default {
  computed: {
    ...mapState(['shipping'])
  },
  components: {
    TransactionCard
  }
}
</script>

<style scoped>
.tr-item {
  margin: 15px;
}

</style>
