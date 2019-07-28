<template>
  <div class="columns is-multiline">
    <div class="column is-8 is-offset-1 box">
      <div class="columns is-multiline form">
        <div class="column is-12">
          <h2>Admin Product</h2>
          <div class="box clearmargin" v-for="product in products" :key="product._id" style="margin-top: 1.25em">
            <div class="columns is-multiline">
              <div class="column is-one-third">
                <img :src="product.picture" :alt="product.productName">
              </div>
              <div class="column is-two-third admin-product">
                <h1>{{product.productName}}</h1>
                <p>{{product.productDescription.substring(0,150)}}...</p>
                <!-- Info -->
                <div class="columns is-multiline" style="margin-top: 0.5em">
                  <div class="column is-half">
                    <h4> Quantity : {{product.quantity}} Pc(s)</h4>
                  </div>
                  <div class="column is-half">
                    <h4>Price : Rp.{{product.price}}</h4>
                  </div>
                </div>
                <!-- Options -->
                <div class="columns is-multiline">
                  <div class="column is-half">
                    <b-button
                    type="is-warning"
                    @click.prevent="editProduct(product._id)"
                    style="font-weight: 600"
                    >Edit Product</b-button>
                  </div>
                  <div class="column is-half">
                    <b-button
                    type="is-danger"
                    style="font-weight: 600"
                    @click.prevent="deleteProduct(product._id)"
                    >Delete Product</b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        file: null,
      },
    };
  },
  methods: {
    deleteProduct(id) {
      axios({
        method: 'DELETE',
        url: `/products/delete/${id}`,
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          this.$store.commit('filterProductId', id);
          this.$notification.open({
            duration: 3000,
            message: 'Product Deleted !',
            position: 'is-top-right',
            type: 'is-info',
            hasIcon: true,
          });
        })
        .catch((err) => {
          this.$notification.open({
            duration: 3000,
            message: 'Error : Deleting Item',
            position: 'is-top-right',
            type: 'is-danger',
            hasIcon: true,
          });
          console.log(err);
        });
    },
    editProduct(id) {
      this.$store.commit('selectProduct', id);
      this.$emit('switchdash', 'edit-product');
      this.$emit('selectproduct', id);
    },
  },
  computed: mapState({
    products: state => state.products,
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

.admin-product h1, p, h3, h4 {
  text-align: start
}

.admin-product h1 {
  font-weight: 600;
  font-size: 1.25em
}

.admin-product h4 {
  font-size: 1em
}

.box.clearmargin {
  margin: 0;
}

.admin-product p {
  font-size: 0.75em
}

</style>
