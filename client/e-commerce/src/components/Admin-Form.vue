<template>
  <div class="columns is-multiline">
    <b-loading :active.sync="isLoading">
      <b-icon
        pack="fas"
        icon="spinner"
        size="is-large"
        custom-class="fa-spin">
      </b-icon>
    </b-loading>
    <div class="column is-8 is-offset-1 box">
      <div class="columns is-multiline form">
        <div class="column is-12">
          <h2>Add New Product</h2>
        </div>

        <!-- Left -->
        <div class="column is-half">

          <b-field label="Product Name">
              <b-input v-model="form.productName" placeholder="Product name" required></b-input>
          </b-field>

          <b-field label="Product Description">
              <b-input v-model="form.productDescription"
              maxlength="300"
              type="textarea" placeholder="Description Here" required></b-input>
          </b-field>

        </div>
        <!-- Right -->
        <div class="column">
          <b-field label="Product Price" expanded>
            <b-field>
              <b-select placeholder="Currency">
                <option>Rp.</option>
                <option>$</option>
              </b-select>
              <b-input placeholder="0,00" type="number" v-model="form.price" expanded required></b-input>
            </b-field>
          </b-field>

          <b-field label="Product Quantity">
            <b-numberinput v-model="form.quantity" required></b-numberinput>
          </b-field>

          <h4>Product Picture</h4>
          <b-field class="file">
            <b-upload v-model="form.file" accept="image/*" required>
              <a class="button is-primary">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
            <span class="file-name" v-if="form.file" style="max-width: 8.5em">
              {{ form.file.name }}
            </span>
          </b-field>
        </div>
      </div>
      <b-button
        v-if="form.file"
        type="is-primary"
        icon-pack="fas"
        icon-left="plus"
        @click.prevent="createProduct"
        style="margin-bottom: 25px; font-weight:600"
      >Add Product</b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from '../config/axios';

export default {
  data() {
    return {
      form: {
        productName: null,
        productDescription: null,
        quantity: 0,
        price: 0,
        file: null,
      },
    };
  },
  methods: {
    createProduct() {
      this.$store.commit('loadingOn');
      const formData = new FormData();
      formData.append('productName', this.form.productName);
      formData.append('productDescription', this.form.productDescription);
      formData.append('quantity', this.form.quantity);
      formData.append('price', this.form.price);
      formData.append('file', this.form.file);
      axios({
        method: 'POST',
        url: '/products/create',
        data: formData,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          this.$store.commit('insertProduct', data);
          this.$store.commit('loadingOn');
          this.$notification.open({
            duration: 2000,
            message: `Product ${this.form.productName} Has Been Added`,
            position: 'is-top-right',
            type: 'is-info',
            hasIcon: true,
          });
          this.$emit('switchdash', 'all');
        })
        .catch((err) => {
          this.$notification.open({
            duration: 3000,
            message: `Error : ${err.response.data.message.split(':')}`,
            position: 'is-top-right',
            type: 'is-danger',
            hasIcon: true,
          });
          this.$store.commit('loadingOn');
          console.log(err);
        });
    },
  },
  computed: mapState({
    isLoading: state => state.isLoading,
  }),
};
</script>

<style computed>
label {
  text-align: start
}

.form h2  {
  font-size: 24px;
  font-weight: 600;
  text-align: start;
}

.column h4 {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 600;
  text-align: start
}

.file {
  margin-top : 10px;
}

.box {
  margin-top : 10vh;
}

.form {
  padding: 5%
}

.file-name {
  max-width: 8em;
}
</style>
