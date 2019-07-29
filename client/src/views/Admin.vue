<template>
    <div>
        <div class="row">
            <!-- ADD PRODUCT -->
            <div class="col-6" style="border: solid 1px black;" v-if="editClicked === false">
                <h2 style="margin: 1%" >Add Product </h2>                     
                <div class="col-12 collapse show" style="color: #343A40;">
                    <form @submit.prevent="addProduct">
                        <div class="form-group row">
                            <label class="col-3" style="margin-top: 1%" for="img">Image:</label>
                            <div class="custom-file col-9">
                                <input type="file" class="custom-file-input" v-on:change="getDataImage">
                                <label class="custom-file-label" for="customFile" style="text-align: left;"> {{product.img.name}} </label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-3" style="margin-top: 1%" for="name">Name:</label>
                            <input type="text" class="col-9 form-control" v-model="product.name">
                        </div>
                        <div class="form-group row">
                            <label class="col-3" style="margin-top: 1%" for="description">Description:</label>
                            <input type="text" class="col-9 form-control" v-model="product.description">
                        </div>
                        <div class="form-group row">
                            <label class="col-3" style="margin-top: 1%" for="price">Price:</label>
                            <input type="number" class="col-9 form-control" v-model="product.price">
                        </div>
                        <div class="form-group row">
                            <label class="col-3" style="margin-top: 1%" for="stock">Stock:</label>
                            <input type="number" class="col-9 form-control" v-model="product.stock">
                            <button class="btn btn-success" type="submit" style="margin: 1%; width: 100%;">Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- EDIT PRODUCT -->
            <div class="col-6" style="border: solid 1px black;" v-if="editClicked === true">         
                <h2 style="margin: 1%">Edit Product </h2>            
                <div class="col-12 collapse show" style="color: #343A40;">
                    <form @submit.prevent="submitEdit(product._id)">
                        <div class="form-group row">
                            <label class="col-3" style="margin-top: 1%" for="img">Image:</label>
                            <div class="custom-file col-9">
                                <input type="file" class="custom-file-input" v-on:change="getDataImage">
                                <label class="custom-file-label text-truncate" for="customFile" style="text-align: left;"> {{product.img}} </label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-3" style="margin-top: 1%" for="name">Name:</label>
                            <input type="text" class="col-9 form-control" v-model="product.name">
                        </div>
                        <div class="form-group row">
                            <label class="col-3" style="margin-top: 1%" for="description">Description:</label>
                            <input type="text" class="col-9 form-control" v-model="product.description">
                        </div>
                        <div class="form-group row">
                            <label class="col-3" style="margin-top: 1%" for="price">Price:</label>
                            <input type="number" class="col-9 form-control" v-model="product.price">
                        </div>
                        <div class="form-group row">
                            <label class="col-3" style="margin-top: 1%" for="stock">Stock:</label>
                            <input type="number" class="col-9 form-control" v-model="product.stock">
                            <button class="btn btn-dark" type="submit" style="margin: 1%; width: 100%;">Edit Product</button>
                        </div>
                    </form>
                    <button class="btn btn-success" style="margin-left:-1%; margin-top: -4%; width: 102%;" @click="gotoAdd">Add New Product</button>
                </div>
            </div>
            <!-- PRODUCT LIST -->
            <div class="col-6" style="border: solid 1px black;">
                <h2 style="margin: 1%;">Product List</h2>
                <form>
                    <input type="text" class="form-control" placeholder="Search Product Here" style="width:100%">
                </form>
                <div class="row" style="max-height: 280px; overflow: auto; margin-top: 2%;">
                    <div style="margin: 1%;" class="col-10" row align-center v-for="(product, index) in $store.state.products" :key="index">
                        <cartAdmin :data="product" v-bind:edit="editProduct" v-bind:remove="deleteProduct"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- Transaction List -->
        <div class="row">
            <h2 style="margin-left: 1%">Transaction List</h2> 
            <div class="col-12" style="max-height: 270px; overflow: auto;">
                <div v-for="(cart, index) in $store.state.allTrx" :key="index"> 
                    <card :data="cart" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import cartAdmin from "../components/CardAdmin"
import card from "../components/TrxCart"
export default {
    name: 'Admin',
    data() {
        return {
            editClicked: false,
            products: [],
            product: {
                img: '',
                name: '',
                description: '',
                price: 0,
                stock: 0,
                hotProducts: false
            },
            
            baseUrl: 'http://localhost:3000',
        }
    },
    components: {
      cartAdmin,
      card
    },
    created() {
        this.$store.commit('emptyState')
        this.$store.dispatch('retrieveProduct')
        this.$store.dispatch('getAllTrx')
    },
    methods: {
        gotoAdd() {
            this.product.img = '',
            this.product.name = '',
            this.product.description = '',
            this.product.price = 0,
            this.product.stock = 0,
            this.editClicked = false
        },
        getDataImage(event) {
            if (!this.editClicked) {
                this.product.img = event.target.files[0]  
            } else if (this.editClicked) {
                if (event.target.files[0]) this.product.img = event.target.files[0]  
            }
        },
        addProduct() {
            let formData = new FormData()
            formData.append('img', this.product.img)
            formData.append('name', this.product.name)
            formData.append('description', this.product.description)
            formData.append('price', this.product.price)
            formData.append('stock', this.product.stock)
            axios({
                method: "POST",
                url: `${this.baseUrl}/products`,
                data: formData,
                headers: {
                    "access_token" : localStorage.getItem('access_token'),
                }
            })            
            .then(({data}) => {
                // this.$store.state.products = []
                this.$store.dispatch('retrieveProduct')
                this.product.img = ""
                this.product.name = ""
                this.product.description = ""  
                this.product.price = ""
                this.product.stock = ""
                Swal.fire({
                    title: 'Success create new product!',
                    type: 'success'
                }) 
            })
            .catch(({response}) => {
                Swal.fire({
                    title: 'Failed to create new product!',
                    text: `${response.data.message}`,
                    type: 'error',
                    confirmButtonText: 'Ok'
                })
            })
        },
        editProduct(product) {
            this.editClicked = true
            this.product = product
        },
        submitEdit(id) {
            Swal.fire({
                title: 'Are you sure edit product?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#343A40',
                cancelButtonColor: '#C82333',
                confirmButtonText: 'Yes, edit it!'
            })
            .then((result) => {
                if (result.value) {
                    if (typeof(this.product.img) === 'object') {
                        let formData = new FormData()

                        formData.append('img', this.product.img)
                        formData.append('name', this.product.name)
                        formData.append('description', this.product.description)
                        formData.append('price', this.product.price)
                        formData.append('stock', this.product.stock)

                        axios({
                            method: "PATCH",
                            url: `http://localhost:3000/products/image/${id}`,
                            data: formData,
                            headers: {
                                "access_token" : localStorage.getItem('access_token')
                            }
                        })            
                        .then(({data}) => {
                            this.$store.dispatch('retrieveProduct')
                            Swal.fire({
                                title: 'Success edit product!',
                                type: 'success'
                            })   
                        })
                        .catch(({response}) => {
                            Swal.fire({
                                title: 'Failed to edit product!',
                                text: `${response.data.message}`,
                                type: 'error',
                                confirmButtonText: 'Ok'
                            })
                        })
                    } else if (typeof(this.product.img) === 'string') {
                        let obj = {
                            img: this.product.img,
                            name: this.product.name,
                            description: this.product.description,
                            price: this.product.price,
                            stock: this.product.stock,
                        }

                        axios({
                            method: "PATCH",
                            url: `http://localhost:3000/products/woimage/${id}`,
                            data: obj,
                            headers: {
                                "access_token" : localStorage.getItem('access_token')
                            }
                        })   
                        .then(({data}) => {
                            this.$store.dispatch('retrieveProduct')
                            Swal.fire({
                                title: 'Success edit product!',
                                type: 'success'
                            })   
                        })
                        .catch(({response}) => {
                            Swal.fire({
                                title: 'Failed to edit product!',
                                text: `${response.data.message}`,
                                type: 'error',
                                confirmButtonText: 'Ok'
                            })
                        })
                    }
                }
            })
        },
        deleteProduct(id) {
            Swal.fire({
                title: 'Are you sure to delete product?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#343A40',
                cancelButtonColor: '#C82333',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios({
                        method: "DELETE",
                        url: `http://localhost:3000/products/${id}`,
                        headers: {
                            "access_token" : localStorage.getItem('access_token'),
                        }
                    })            
                    .then(({data}) => {
                        // this.$store.state.products = []
                        this.$store.dispatch('retrieveProduct')
                        Swal.fire(
                            'Deleted!',
                            'Your Product has been deleted.',
                            'success'
                        )
                    })
                    .catch(({response}) => {
                        Swal.fire({
                            title: 'Failed to edit product!',
                            text: `${response.data.message}`,
                            type: 'error',
                            confirmButtonText: 'Ok'
                        })
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>
