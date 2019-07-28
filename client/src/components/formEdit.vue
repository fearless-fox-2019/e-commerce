<template>
        <div class="col-sm-9 offset-2" style="margin-top: 20px">
            <h3 id="title">Edit Item</h3>
            <br>
            <form @submit.prevent="saveEdit(currentItem._id)" style="width: 850px">
                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Name :</label>
                    <div class="col-sm-10">
                    <input type="text" v-model="currentItem.name" class="form-control" id="inputPassword" placeholder="Name">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label" for="featuredImage">Featured Image :</label>
                    <div class="col-sm-10">
                        <input type="file" class="form-control-file" id="image" @change="setImage">
                    </div>
                </div>
                <div class="form-group row">
                     <label for="name" class="col-sm-2 col-form-label">Category :</label>
                     <div class="col-sm-10">
                        <select v-model="currentItem.category" class="custom-select my-1 mr-sm-2" id="category">
                            <option value="choco">Choco Cake</option>
                            <option value="cheese">Cheesecake</option>
                            <option value="ice cream">Ice Cream Cake</option>
                            <option value="nougat">Nougat Cake</option>
                            <option value="classic">Classic Cake</option>
                            <option value="wedding">Wedding Cake</option>
                        </select>
                     </div>
                </div>
                <div class="form-group row">
                    <label for="desc" class="col-sm-2 col-form-label">Description :</label>
                    <div class="col-sm-10">
                    <input type="text" v-model="currentItem.description" class="form-control" id="description" placeholder="Description">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="desc" class="col-sm-2 col-form-label">Price :</label>
                    <div class="col-sm-10">
                    <input type="number" v-model="currentItem.price" class="form-control" id="price" placeholder="0" min="0">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="desc" class="col-sm-2 col-form-label">Stock :</label>
                    <div class="col-sm-10">
                    <input type="number" v-model="currentItem.stock" class="form-control" id="price" placeholder="0" min="0">
                    </div>
                </div><br>
                <input id="btn" type="submit" value="Save">
                <button id="btn-cancel">
                    <router-link to="/home"> Cancel </router-link>
                </button>
            </form>
            
        </div>

</template>

<script>
import axios from '@/api/api.js'
import { mapActions, mapState } from 'vuex'

export default {
    name:'formEdit',
    data(){
        return {

        }
    },
    methods:{
        ...mapActions(['getAllCake']),

        setImage(){
            this.currentItem.image= event.target.files[0]
        },
        saveEdit(id){
            console.log('masuk save')
           
            let formData = new FormData()
                 formData.append('name', this.currentItem.name)
                 formData.append('image', this.currentItem.image)
                 formData.append('category', this.currentItem.category)
                 formData.append('description', this.currentItem.description)
                 formData.append('price', this.currentItem.price)
                 formData.append('stock', this.currentItem.stock)

            axios({
                url: `/items/${id}`,
                method: 'put',
                data: formData,
                headers:{
                    'token' : localStorage.token
                }
            })
            .then(({data}) =>{

                this.getAllCake()
                this.$router.push('/home')
            })
            .catch(err =>{
                console.log('error save item')
                console.log(err)
            })
        }
    },
    computed: mapState(['currentItem'])
}
</script>

<style scoped>
 #title{
        font-family: 'Bree Serif', serif;
        margin-left: -3%
    }
    label{
        font-family: 'Bree Serif', serif;
        text-align: left
    }
    #btn{
        margin-left: 70%;
        background-color: burlywood;
        padding: 5px 15px;
        border-radius: 10px 10px;
        margin-right: 20px
    }
    #btn:hover{
        opacity: 0.8
    }
    #btn-cancel{
        background-color: #ff1a1a;
        color: black;
        padding: 5px 15px;
        border-radius: 10px 10px;
        margin-right: 20px;
        text-decoration-style: none
    }
    #btn-cance:hover{
        opacity: 0.8;
    }
</style>
