<template>
  <b-container>
    <b-card title="Your Cart" style="background-color: #EEEEEE;">
    </b-card>
    <b-row>
      <b-col cols="8">
      <cartList></cartList>
      </b-col>
      <b-col cols="4">
        <div class="sum">
          <b-card-group deck>
          <b-card header="Payment Summary" class="bg-dark text-white">
            <b-list-group class="bg-dark text-white">
              <b-list-group-item>Cras justo odio</b-list-group-item>
              <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
              <b-list-group-item>Morbi leo risus</b-list-group-item>
              <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
              <b-list-group-item>Vestibulum at eros</b-list-group-item>
            </b-list-group>
            <p class="card-text mt-2">
              Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
              consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur
              mollit voluptate est in duis laboris ad sit ipsum anim Lorem.
            </p>
          </b-card>
        </b-card-group>
        </div>
      </b-col>
    </b-row>
  </b-container>

</template>

<script>
import cartList from '../components/cartList'
export default {
    data() {
      return {

      }
    },
    components: {
      cartList
    },
    methods: {
      cartByUser() {
        this.$store.dispatch('cartUser')
        // console.log(this.$store.state.carts.data)
      }

    },
    created() {
      this.cartByUser()
    }
}
</script>

<style scoped>
.list-group-item {
  background-color: #343a40;
}

.sum {
  min-height: 400px;
  border: black solid 2px;
}

</style>
