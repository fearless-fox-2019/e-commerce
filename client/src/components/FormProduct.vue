<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-half box">
      <p style="margin-bottom:10px">
        <strong>INPUT YOUR TREASURE!!</strong>
      </p>
      <div class="columns is-mobile">
        <div class="column">
          <b-field label="Picture">
            <img :src="url" alt="product" />
          </b-field>
          <div class="input-container">
            <input type="file" name="file" id="file" @change="onFileChange" class="inputfile" />
            <label for="file">
              <i class="fas fa-images"></i>Choose a file
            </label>
          </div>
        </div>
        <div class="column">
          <b-field label="Name" label-position="on-border">
            <b-input v-model="form.name"></b-input>
          </b-field>
          <b-field label="Description" label-position="on-border">
            <b-input maxlength="200" v-model="form.desc" type="textarea"></b-input>
          </b-field>

          <b-field label="Price" label-position="on-border">
            <p class="control">
              <span class="button is-static">Berry</span>
            </p>
            <b-input type="number" placeholder="0" v-model="form.price"></b-input>
          </b-field>

          <b-field label="Quantity" label-position="on-border">
            <b-input type="number" min="1" placeholder="0" v-model="form.quantity"></b-input>
          </b-field>

          <button @click.prevent="createProduct" class="button is-dark">Sell</button>
        </div>
      </div>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
const baseUrl = 'http://localhost:3000'
export default {
  data () {
    return {
      url: 'https://semantic-ui.com/images/wireframe/image.png',
      picture: null,
      form: {
        name: '',
        desc: '',
        quantity: 0,
        price: 0
      }
    }
  },
  methods: {
    onFileChange (e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
      this.picture = file
    },
    createProduct () {
      const formData = new FormData()
      // console.log(this.url);
      formData.append('image', this.picture)
      formData.append('name', this.form.name)
      formData.append('quantity', this.form.quantity)
      formData.append('description', this.form.desc)
      formData.append('price', this.form.price)

      this.axios({
        method: 'post',
        url: baseUrl + '/products',
        data: formData
      })
        .then(({ data }) => {
          this.$emit('addData', data.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.inputfile + label {
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-block;
  width: 200px;
  border-radius: 5%;
}

.inputfile:focus + label,
.inputfile + label:hover {
  background-color: cornflowerblue;
}

.inputfile + label {
  cursor: pointer; /* "hand" cursor */
}

.button {
  width: 100px;
}
</style>
