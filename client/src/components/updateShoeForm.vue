<template>
  <b-modal id="updateShoeForm" title="Update Stock and Price" ref="my-modals">
    <b-form @submit.prevent="updatePrice">
      <b-form-group id="input-group-3" label="Price:" label-for="input-3">
          <b-form-input
            id="input-3"
            required
            v-model="shoeData.price"
            type="number"
            placeholder="Price"
          ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Quantity:" label-for="input-4">
        <b-form-input
          id="input-4"
          required
          v-model="shoeData.quantity"
          type="number"
          placeholder="Quantity"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" class="right" variant="primary" >Submit</b-button>
    </b-form>
  </b-modal>
  
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      shoeData: {
        price: 0,
        quantity: 0
      }
    }
  },
  methods: {
    updatePrice() {
      this.$store.dispatch('updateForm', this.shoeData)
      this.hideModal()
    },
    hideModal() {
      this.$refs['my-modals'].hide()
    },
  }
}
</script>

<style>

</style>
