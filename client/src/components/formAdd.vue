<template>
        <div class="col-sm-10 offset-1">
            <h3>Add New Item</h3>
            <form @submit.prevent="addNewItem">
                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                    <input type="text" v-model="newItem.name" class="form-control" id="inputPassword" placeholder="Name">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="featuredImage">Featured Image</label>
                    <div class="col-sm-9 offset-1">
                        <input type="file" class="form-control-file" id="image" @change="setImage">
                    </div>
                </div>
                <div class="form-group row">
                     <label for="name" class="col-sm-2 col-form-label">Category</label>
                     <div class="col-">
                        <select v-model="newItem.category" class="custom-select my-1 mr-sm-2" id="category">
                            <option value="choco" selected>Choco Cake</option>
                            <option value="cheese">Cheesecake</option>
                            <option value="ice cream">Ice Cream Cake</option>
                            <option value="nougat">Nougat Cake</option>
                            <option value="classic">Classic Cake</option>
                            <option value="wedding">Wedding Cake</option>
                        </select>
                     </div>
                </div>
                <div class="form-group row">
                    <label for="desc" class="col-sm-2 col-form-label">Description</label>
                    <div class="col-sm-10">
                    <input type="text" v-model="newItem.description" class="form-control" id="description" placeholder="Description">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="desc" class="col-sm-2 col-form-label">Price</label>
                    <div class="col-sm-10">
                    <input type="number" v-model="newItem.price" class="form-control" id="price" placeholder="0" min="0">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="desc" class="col-sm-2 col-form-label">Stock</label>
                    <div class="col-sm-10">
                    <input type="number" v-model="newItem.stock" class="form-control" id="price" placeholder="0" min="0">
                    </div>
                </div>
                <input type="submit" value="Save">
            </form>
        </div>

</template>

<script>
import axios from '@/api/api.js'
import { mapActions } from 'vuex'

export default {
    name:'formAdd',
    data(){
        return {
            newItem:{
                name: '',
                image:'',
                category:'choco',
                description:'',
                price:'',
                stock:''
            }
        }
    },
    methods:{
        ...mapActions(['getAllCake']),

        setImage(){
            this.newItem.image= event.target.files[0]
        },
        addNewItem(){
            let formData = new FormData()
                 formData.append('name', this.newItem.name)
                 formData.append('image', this.newItem.image)
                 formData.append('category', this.newItem.category)
                 formData.append('desription', this.newItem.description)
                 formData.append('price', this.newItem.price)
                 formData.append('stock', this.newItem.stock)

            axios({
                url: '/items',
                method: 'POST',
                data: formData,
                headers:{
                    'token' : localStorage.token
                }
            })
            .then(({data}) =>{
                // this.$store.dispatch('getAllCake')
                this.getAllCake()
                this.$router.push('/home')
            })
            .catch(err =>{
                console.log('error add item')
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>
