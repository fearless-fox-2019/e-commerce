<template>
  <div class="allproduct">
    disini
    ada all product
    <!-- {{this.$store.state.allItem}} -->
    <div class="card-loop">
      <card v-for="(item,i) in $store.state.allItem" :forCard="item" :key="i" />
    </div>
  </div>
</template>

<script>
import card from "@/components/card.vue";
export default {
  components: {
    card
  },
  created() {
    this.$store.dispatch("fetchItem");
    this.$store.dispatch("whoami");
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
