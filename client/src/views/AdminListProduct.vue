<template>
    <div style="margin-top: 7em; padding-left: 200px; padding-right: 200px">
        <div class="text-center mb-3 mt-5">
            <h3>Product List</h3>
        </div>
        <table class="table table-hover" style="background-color: #fff">
            <thead>
                <tr>
                    <th scope="col"><p>#</p></th>
                    <th scope="col"><p>Name</p></th>
                    <th scope="col"><p>Price</p></th>
                    <th scope="col"><p>Category</p></th>
                    <th scope="col"><p>Stock</p></th>
                    <th scope="col"><p>Action</p></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="product._id">
                    <th scope="row">{{index+1}}.</th>
                    <td><p>{{product.name}}</p></td>
                    <td><p>{{converter(product.price)}}</p></td>
                    <td><p>{{product.category}}</p></td>
                    <td><p>{{product.stock}}</p></td>
                    <td>
                        <router-link :to="`/admin/edit-product/${product._id}`"><span class="btn-edit">Edit </span> </router-link>| <span @click="deleteProduct(product._id)" class="color-red cursor-pointer">Delete</span>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
  import api from '../apis/localhost';
  import converter from '../helpers/converter.js';
  import Swal from 'sweetalert2';

  export default {
    data() {
      return {
        products : []
      }
    },
    mounted() {
      this.fetchProducts()
    },
    methods: {
      converter,
      fetchProducts() {
        api
        .get('/products')
        .then(({ data }) => this.products = data)
        .catch(err => console.log(err))
      },
      deleteProduct(id) {
        Swal.fire({
          title: 'Delete this product?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
          if (result.value) {
            api
            .delete(`/products/${id}`)
            .then( product => {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.products = this.products.filter(el => el._id !== product._id)
              this.fetchProducts()
            })
            .catch(err => console.log(err))
          }
        })
      }
    },
  }
</script>

<style scoped>
.color-red {
  color: #e33012;
}
.cursor-pointer {cursor: pointer;}
.btn-edit {
    color: cornflowerblue;
}
.btn-edit:hover {
    cursor: pointer;
}

p {
  margin: 0
}
</style>
