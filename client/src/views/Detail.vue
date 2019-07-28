<template>
    <div>
        <navbarCust></navbarCust>
        <div class="row container" style="margin-top: 5%">
            <div class="col-sm-6">
                <img :src="currentItem.image" alt="Image Cake" style="height: 400px">
            </div>
            <div class="col-sm-6 text-left" style="margin-top: 3%; line-height: 2">
                <h4 id="name">{{currentItem.name.toUpperCase()}}</h4>
                <h6 id="description">{{currentItem.description}}</h6>
                <h6 id="price">Price: {{currentItem.price}}</h6>
                <h6 id="stock">Stock: {{currentItem.stock}}</h6>
                <div id="input" class="form-group row" style="margin-left: -1px; font-family: 'Comfortaa', cursive;" >
                    <label for="inputQty" class="col-sm-2 col-form-label" >Quantity: </label>
                    <div class="col-sm-10">
                    <input v-model="quantity" type="number" class="form-control" placeholder=1 min="1" :max="currentItem.stock" style="width: 75px">
                    </div>
                </div>
                <button id="add-btn" type="button" class="btn btn-success" @click="addCart">Add To Cart</button>
            </div>
        </div>

    </div>
</template>

<script>
import axios from '@/api/api.js'
import navbarCust from '@/components/navbarCust.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name:'detail',
    data(){
        return {
            quantity:0
        }
    },
    components:{
        navbarCust,

    },
    methods:{
        ...mapActions(['getMyCart']),

        addCart(){
            axios({
                url: '/cart',
                method: 'post',
                data:{
                    itemId: this.currentItem._id,
                    name: this.currentItem.name,
                    price: this.currentItem.price,
                    quantity: this.quantity
                },
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) => {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    text: 'Success add to your cart!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.getMyCart()
            })
            .catch(error => {
                console.log('error add to cart')
                console.log(error)
            })
        }
    },
    computed:{
        ...mapState(['currentItem'])
    }
}
</script>

<style scoped>
    #name{
        font-family: 'Bree Serif', serif;
        color: brown;
        font-size: 26px;
        font-weight: bold;
        margin-bottom: 20px

    }
    #description{
        font-family: 'Comfortaa', cursive;
        margin-left: 10px;
        margin-bottom: 10px
    }
    #price{
        font-family: 'Comfortaa', cursive;
        margin-left: 10px;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px
    }
    #stock{
        font-family: 'Comfortaa', cursive;
        margin-left: 10px;
        font-size: 16px;
    }
    #add-btn{
        margin-top: 5%;
        margin-left: 30%
    }
</style>
