<template>
    <div>
        <Navbar></Navbar>
        <!-- <p>jo</p> -->
        <div style="display: flex; flex-wrap: wrap; justify-content: center; padding-top: 50px;r">
            <div>
                <p><strong>Add Product</strong></p>
                <button class="button is-warning" inverted outlined @click="page= 'fill'">open</button>
                <button class="button is-primary" outlined @click="page = ''">close</button>
            </div>
            <br>
            <div v-if="page == 'fill'">
                <form @submit.prevent="addProduct">
                    <!-- <b-field>
                        <b-input type="text" placeholder="product name"></b-input>
                    </b-field>
                    <b-field class="file">
                        <b-upload v-model="newData.image">
                            <a class="button is-primary">
                                <b-icon icon="upload"></b-icon>
                                <span>Click to upload</span>
                            </a>
                        </b-upload>
                        <span class="file-name" v-if="newData.image">
                            {{ newData.image.name }}
                        </span>
                    </b-field>
                    <b-field>
                        <b-input v-model="newData.stock" type="number" placeholder="stock product"></b-input>
                    </b-field>
                    <b-field>
                        <b-input type="number" placeholder="price @product"></b-input>
                    </b-field>
                    <b-field>
                        <b-input type="textarea" placeholder="description product"></b-input>
                    </b-field>
                    <b-field>
                        <b-button class="is-danger" type="submit">
                            add
                        </b-button>
                    </b-field> -->
                    <input type="text" v-model="newData.productname" placeholder="Product Name"><br>
                    <input type="file" class="form-control-file" id="upload" v-on:change="selectImage"><br>
                    <input type="number" v-model="newData.stock" placeholder="Stock Product"><br>
                    <input type="text" v-model="newData.category" placeholder="Category Product"><br>
                    <input type="number" v-model="newData.price" placeholder="Product Price"><br>
                    <input type="textarea" v-model="newData.description" placeholder="Product Description"><br>
                    <button class="button is-info" type="submit">add</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Header'
export default {
    data(){
        return{
            page: '',
            newData: {
                productname:'',
                stock: '',
                price: '',
                description: '',
                category: '',
                image: '',
            },
        }
    },
    components:{
        Navbar
    },
    methods:{
        addProduct(){
            let input = new FormData()
            input.append("productname", this.newData.productname)
            input.append("stock", this.newData.stock)
            input.append("image", this.newData.image)
            input.append("price", this.newData.price)
            input.append("category", this.newData.category)
            input.append("description", this.newData.description)
            this.$store.dispatch('addProduct', input)
            this.$route.push('/')
        },
        selectImage(event){
            this.newData.image = event.target.files[0]
        }
    }

}
</script>

<style>

</style>
