<template>
    <div class="form-black mb-5" style="margin-top: 8em; padding-left: 450px; padding-right: 450px">
        <div class="text-center mb-3 mt-5">
            <h3>Edit Product</h3>
        </div>
        <form 
            @submit.prevent="editFormProduct" 
            enctype="multipart/form-data"
        >
            <div class="form-group">
                <input 
                    type="file" 
                    name="image"
                    ref="file"
                    accept="image/*"
                    @change="handleFileUpload"
                >
            </div>
            <div v-if="productForm.image">
                <img 
                    :src="productForm.image" 
                    :ref="'image'"
                    alt="Picture" 
                    style="width:25%"
                >
            </div>
            <div class="form-group">
                <label for="product-name">Name</label>
                <input
                    id="product-name"
                    type="text" 
                    class="form-control"
                    v-model="productForm.name"
                    aria-describedby="emailHelp" 
                    placeholder="Product Name"
                    required
                >
            </div>

            <div class="form-group">
                <label for="product-price">Price</label>
                <input
                    id="product-price"
                    type="number" 
                    class="form-control" 
                    v-model="productForm.price"
                    aria-describedby="emailHelp" 
                    placeholder="Price"
                    required
                >
            </div>

            <div class="form-group">
                <label for="product-stock">Stock</label>
                <input 
                    id="product-stock"
                    type="number" 
                    class="form-control" 
                    v-model="productForm.stock"
                    aria-describedby="emailHelp" 
                    placeholder="Stock"
                    required
                >
            </div>

            <div class="form-group">
                <label for="product-category">Category</label>
                <select class="form-control" v-model="productForm.category" id="product-category" required>
                    <option value="" disabled>Choose Category</option>
                    <option value="table">table</option>
                    <option value="drawer">drawer</option>
                </select>
            </div>

            <div class="form-group">
                <label for="product-category">Detail</label>
                <div>
                    <textarea 
                        id="product-category"
                        v-model="productForm.detail" 
                        cols="103" 
                        rows="10" 
                        style="resize:vertical; width: 540px"
                        required
                    ></textarea>
                </div>
            </div>

            <div class="mb-3">
                <button 
                    type="submit" 
                    class="btn btn-primary push-right"
                >Edit</button>
            </div>
        </form>
    </div>
</template>

<script>
import api from '../apis/localhost';

export default {
    data() {
        return {
            productForm: {
                _id: '',
                name: '',
                price: '',
                stock: '',
                category: '',
                detail: '',
                image: ''
            }
        }
    },
    methods: {
        submitFormProduct() {
            this.$emit('submit-product', this.productForm)
        },
        handleFileUpload(event) {
            this.productForm.image = event.target.files[0]
        },
        findProduct() {
            api.defaults.headers.common['token'] = localStorage.token

            api
            .get(`products/${this.$route.params.id}`)
            .then(({data}) => {
                this.productForm._id=data._id
                this.productForm.name=data.name
                this.productForm.price=data.price
                this.productForm.stock=data.stock
                this.productForm.category=data.category
                this.productForm.detail=data.detail
                this.productForm.image=data.image
            })
            .catch(err => {
                console.log(err);
            })
        },
        editFormProduct() {
            this.$emit('edit-product', this.productForm)
        }
    },
    mounted() {
        this.findProduct()
    },
}
</script>

<style>

</style>
