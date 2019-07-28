<template>
  <b-modal id="addShoeForm" title="Add Shoe" ref="my-modals" hide-footer>
    <b-form @submit.prevent="addShoes">
      <b-form-group
        id="input-group-1"
        label="Name: "
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          type="text"
          v-model="shoe.name"
          required
          placeholder="Enter Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-input
          id="input-2"
          required
          type="text"
          v-model="shoe.description"
          placeholder="Enter description"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Price:" label-for="input-3">
          <b-form-input
            id="input-3"
            required
            type="number"
            v-model="shoe.price"
            placeholder="Price"
          ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Quantity:" label-for="input-4">
        <b-form-input
          id="input-4"
          required
          type="number"
          v-model="shoe.quantity"
          placeholder="Quantity"
        ></b-form-input>
      </b-form-group>
        <b-form-file
              v-model="file"
              placeholder="Choose a file..."
              @change="onFilePicked"
            ></b-form-file>
            <div class="d-flex justify-content-center">
              <br>
              <b-spinner variant="success" label="Spinning" v-show="loading"></b-spinner>
              <img :src="imageUrl" v-show="imageUrl">
            </div>
              <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
      <b-button type="submit" class="right" variant="primary" >Submit</b-button>
    </b-form>
  </b-modal>

</template>

<script>
import axios from 'axios'
const baseUrl = `http://localhost:3000/api`
export default {
  data () {
    return {
      shoe: {
        quantity: '',
        price: '',
        name: '',
        description: '',
        image: ''
      },
      file: '',
      loading: false,
      imageUrl: '',
      imageName: '',
      imageFile: '',
      imageLinkFromGCS: ''
    }
  },
  methods: {
    onFilePicked (e) {
      this.loading = true
      this.imageUrl = ''
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        // console.log(files[0])
        // console.log(this.imageName)
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageFile = files[0] // this is an image file that can be sent to server...
          const formData = new FormData()
          formData.append('image', this.imageFile)
          axios.post(`${baseUrl}/users/googleCloudStorage`, formData)
            .then(({ data }) => {
              this.loading = false
              this.imageUrl = fr.result
              this.imageLinkFromGCS = data
            })
            .catch(err => {
              console.log(err.data)
            })
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    addShoes () {
      // this.$store.dispatch('addShoe',this.shoe)
      axios.post(`${baseUrl}/shoes/`, {
        name: this.shoe.name,
        price: this.shoe.price,
        description: this.shoe.description,
        quantity: this.shoe.quantity,
        image: this.imageLinkFromGCS
      }, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal({
            type: 'success',
            text: 'successfully added'
          })
          this.hideModal()
          this.shoe.name = ''
          this.shoe.price = ''
          this.shoe.description = ''
          this.shoe.quantity = ''
          this.shoe.image = ''
          this.file = ''
          // console.log(data)
        })
        .catch((error) => {
          this.$swal({
            type: 'error',
            text: `${error.response.data.message}`
          })
        })
    },
    hideModal () {
      this.$refs['my-modals'].hide()
    }
  }
}
</script>

<style>

</style>
