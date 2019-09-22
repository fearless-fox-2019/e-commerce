<template>
  <v-card id="create">
    <v-form @submit.prevent="edit" ref="form">
      <v-text-field
        label="name"
        v-model="input.name"
      ></v-text-field>
      <v-text-field
        v-model="input.description"
        label="description"
      ></v-text-field>
      <v-text-field
        v-model="input.stock"
        label="stock"
        type="number"
      ></v-text-field>
      <v-text-field
        v-model="input.price"
        label="price"
        type="number"
      ></v-text-field>
      <input type="file" ref="image" style="display: none;"  @change="getPreview">
      <v-btn
      color="blue white--text"
      id="choose-btn"
      @click="triggerImage"
      >Change Image</v-btn>
      <div id="image-profile-container" v-if="imagePreview">
        <v-card id="profile-imgpreview" elevation="5" width="250">
          <v-img
            :src="imagePreview"
            :lazy-src="`https://picsum.photos/10/6?image=20`"
            class="grey lighten-2"
                ></v-img>
        </v-card>
      </div>
      <v-divider></v-divider>
      <v-btn
        type="submit"
        color="red white--text"
        >Edit</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      imagePreview: '',
      input: {}
    }
  },
  methods: {
    edit () {
      let data = this.input
      this.$store.dispatch('updateProduct', { data })
        .then(({ data }) => {
          this.$toast.open({ message: 'Product updated !', type: 'is-success' })
          this.$store.dispatch('fetchProducts')
        })
    },
    getPreview (e) {
      const file = e.target.files[0]
      if (!file) return
      this.input.image = file
      this.imagePreview = URL.createObjectURL(file)
    },
    triggerImage () {
      this.$refs.image.click()
    }
  },
  computed: {
    ...mapState(['loggedUser', 'products'])
  },
  mounted () {
    const filter = this.products.filter(product => product._id == this.$route.params.id)
    this.input = filter[0]
    this.imagePreview = filter[0].image
  }
}
</script>

<style scoped>
  #create {
    width: 80%;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #e53935;
    padding: 20px;
  }
</style>
