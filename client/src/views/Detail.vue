<template>
    <div>
        <navbarCust></navbarCust>
        <div class="row container">
            <div class="col-sm-6">
                <img :src="currentItem.image" alt="Image Cake" style="height: 300px">
            </div>
            <div class="col-sm-6">
                <h3>{{currentItem.name.toUpperCase()}}</h3>
                <h6>{{currentItem.description}}</h6>
                <h5>Price: {{currentItem.price}}</h5>
                <h6>Stock: {{currentItem.stock}}</h6>
                <div class="form-group row">
                    <label for="inputQty" class="col-sm-2 col-form-label">Quantity: </label>
                    <div class="col-sm-10">
                    <input v-model="quantity" type="number" class="form-control" placeholder=1 min="1" :max="currentItem.stock">
                    </div>
                </div>
                <button type="button" class="btn btn-success" @click="addCart">Add To Cart</button>
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

<style>

</style>
