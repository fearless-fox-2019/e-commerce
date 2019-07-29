<template>
  <div class="category">
    <h1>ini menggunakan category</h1>
    <!-- {{$store.state.searchCategory}} -->
    <div class="card-loop">
      <card v-for="(item,i) in $store.state.searchCategory" :forCard="item" :key="i" />
    </div>
  </div>
</template>

<script>
import card from "@/components/card.vue";

export default {
  components: {
    card
  }
};
</script>

<style scoped>
.card-loop {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  margin: 10px 10px 30px 13px;
}
</style>
