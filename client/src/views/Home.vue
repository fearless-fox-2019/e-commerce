<template>
  <div id="home">
    <div id="welcome">
      <v-sheet
        height="120px"
        tile
        id="sheet"
      >
        <div id="title">
          Welcome to B-Store
        </div>
        <div id="subtitle">
           The most updated and complete book store in the universe
        </div>
      </v-sheet>
    </div>
    <v-progress-linear background-color="white" indeterminate color="red" top :active="isLoading"></v-progress-linear>
    <ProductList />
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
import { mapState } from 'vuex'
export default {
  components: {
    ProductList
  },
  computed: {
    ...mapState(['isLoading'])
  }
}
</script>

<style scoped>
  #welcome {
    border-bottom: 3px solid red;
  }

  #home {
    display: flex;
    flex-direction: column;

  }
  #sheet {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: white;
    background: rgb(0,114,187);
    background: linear-gradient(90deg, rgba(0,114,187,1) 0%, rgba(122,174,208,1) 50%, rgba(0,114,187,1) 100%);

  }

  #subtitle {
    font-size: 16px;
  }

</style>
