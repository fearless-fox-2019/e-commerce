<template>
  <div>
    <b-card
      :title="details.name"
      :img-src="details.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-button @click="clickDetails(details._id)" variant="primary">Details</b-button>
      <!-- <b-modal :id="details._id" centered :title="details.name" hide-footer>
      </b-modal> -->
    </b-card>
  </div>
</template>

<script>

export default {
  props: ["details"],
  data(){
    return {
      
    }
  },
  methods: {
    clickDetails(details){
      // console.log('details clicked', details)
      this.$router.push(`/details/${details}`)
    }
  }
}
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
}

</style>
