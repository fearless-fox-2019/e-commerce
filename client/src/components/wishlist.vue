<template>
  <div class="wishlist">
    <!-- {{this.$store.state.logedUser.wishlist}} -->
    <div class="card-loop">
      <card v-for="(wish,i) in $store.state.logedUser.wishlist" :forCard="wish" :key="i" />
    </div>
  </div>
</template>

<script>
import card from "@/components/card.vue";

export default {
  components: {
    card
  },
  data() {
    return {
      //   myWishlist: this.$store.state.logedUser.wishlist
    };
  },
  created() {
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
