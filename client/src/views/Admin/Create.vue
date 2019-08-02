<template>
  <v-card id="create">
    <v-form @submit.prevent="create" ref="form">
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
      >Upload Image</v-btn>
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
        >Create</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      input: {
        name: '',
        description: '',
        image: '',
        stock: '',
        price: ''
      },
      imagePreview: ''
    }
  },
  methods: {
    create () {
      let data = this.input
      this.$store.dispatch('create', { data })
        .then(({ data }) => {
          
          this.$toast.open({ message: 'Product Created, Nice One ! B)', type: 'is-success' })
          this.$refs.form.reset()
          this.imagePreview = ''
          this.$store.dispatch('fetchProducts')
        })
        .catch(err => {
          this.$toast.open({ message: err.response.data.errors[0], type: 'is-danger' })
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
