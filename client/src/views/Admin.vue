<template>
  <div class="mt-3">
    <b-container>
      <b-card bg-variant="light">
        <b-card-title>
        Add Product
        </b-card-title>
        <b-form @submit.prevent="onSubmit">
        <b-form-input v-model="title" placeholder="Title" class="mt-3"></b-form-input>
        <label for="price" class="mt-2">Price</label>
        <b-form-input id="price" v-model="price" type="number" min="0"></b-form-input>
        <label for="stock" class="mt-2">Stock</label>
        <b-form-input id="stock" v-model="stock" type="number" min="0"></b-form-input>
        <label for="textarea" class="mt-2">Product Detail</label>
        <b-form-textarea
        id="textarea"
        v-model="detail"
        placeholder="Enter something..."
        rows="3"
        max-rows="6"
        ></b-form-textarea>
        <b-form-file
        v-model="file"
        placeholder="Choose an image..."
        drop-placeholder="Drop file here..."
        accept="image/*"
        class="mt-2"
        ></b-form-file>
         <b-alert
        :show="dismissCountDown"
        dismissible
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged(dismissCountDown)"
        variant="success" class="mt-2">Success Add Product</b-alert>
        <b-button v-if="!isUpload" type="submit" variant="primary" class="mt-2">Add Product</b-button>
        <b-button v-if="isUpload" variant="primary" disabled class="mt-2" block>
          <b-spinner small type="grow"></b-spinner>
          Loading...
        </b-button>
            </b-form>
            </b-card>
        </b-container>
    </div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      title: '',
      detail: '',
      file: '',
      price: '',
      stock: '',
      isUpload: false,
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    onSubmit () {
      this.isUpload = false
      this.isUpload = true
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('detail', this.detail)
      formData.append('name', this.title)
      formData.append('price', this.price)
      formData.append('stock', this.stock)
      let token = localStorage.getItem('token')
      let username = localStorage.getItem('username')
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/products',
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        data: formData,
        headers: {
          token,
          username
        }
      })
        .then(({ data }) => {
          this.isUpload = false
          this.showAlert()
          this.title = ''
          this.detail = ''
          this.file = ''
          this.price = ''
          this.stock = ''
          console.log(data)
        })
        .catch(err => {
          this.errorMessage = err
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
