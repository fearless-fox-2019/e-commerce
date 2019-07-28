<template>
    <div>
        <div class="card">
            <div class="card-body row" style="line-height:0.75">
                <div class="col-sm-3">
                    <img :src="cart.itemId.image" alt="Image Cake" style="height:80px">
                </div>
                <div class="col-sm-3 text-left" id="data-txt">
                    <p style="font-weight: bold">{{cart.name}}</p>
                    <p>Price: Rp. {{cart.price}}</p>
                    <p>Quantity: {{cart.quantity}}</p>
                    <p>Total Price: Rp. {{totalPrice}}</p>
                </div>
                <div class="col-sm-3" style="margin-top: 25px">
                     <div class="form-group row">
                        <div class="col-sm-3">
                            <button @click="updateInc" type="button" class="btn btn-primary">+</button>
                        </div>
                        <div class="col-sm-6">
                            <input v-model="cart.quantity" type="number" class="form-control" :max="cart.itemId.stock">
                        </div>
                        <div class="col-sm-3">
                            <button @click="updateDec" type="button" class="btn btn-primary">-</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <a  @click="removeCart">
                        <i class="fas fa-times" id="remove-btn"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/api/api.js'
import  { mapActions } from 'vuex'

export default {
    name:'cartCard',
    props:['cart'],
    data(){
        return {
            totalPrice:0
        }
    },
    methods:{
        ...mapActions(['getMyCart']),

        updateInc(){
            let newQuantity= Number(this.cart.quantity)+1

            if(newQuantity <= this.cart.itemId.stock){
                axios({
                    url: `/cart/increment/${this.cart._id}`,
                    method: 'patch',
                    headers: {
                        'token': localStorage.token
                    }
                })
                .then(({data}) => {
                    console.log('sukses update increment')
                    this.getMyCart()
                })
                .catch(err => {
                    console.log('error update increment')
                    console.log(err)
                })
            }else{
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Oppss...',
                    text: 'Have been reach maximum stock!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
        updateDec(){
            let newQuantity= Number(this.cart.quantity)-1

            if(newQuantity >0){
                axios({
                    url: `/cart/decrement/${this.cart._id}`,
                    method: 'patch',
                    headers: {
                        'token': localStorage.token
                    }
                })
                .then(({data}) => {
                    console.log('sukses update decrement')
                    this.getMyCart()
                })
                .catch(err => {
                    console.log('error update decrement')
                    console.log(err)
                })
            }else{
                this.removeCart()
            }
        },
        removeCart(){
            Swal.fire({
                text: `Are you sure delete item ${this.cart.name}?`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sure!'
            }).then((result) => {
                if (result.value) {
                    axios({
                        url: `/cart/${this.cart._id}`,
                        method: 'delete',
                        headers:{
                            'token': localStorage.token
                        }
                    })
                    .then(({data}) => {
                        console.log('sukses delete cart')
                        Swal.fire({
                            position: 'center',
                            type: 'success',
                            text: `Success delete your cart ${this.cart.name}`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.getMyCart()
                    })
                    .catch(err => {
                        console.log('error delete cart')
                        console.log(err)
                    })
                }
            })
            
        }
    },
    created(){
        this.totalPrice= Number(this.cart.quantity) * Number(this.cart.price)
    }

}
</script>

<style scoped>
    #data-txt{
        line-height: 0.75;
        font-size: 14px;
        margin-bottom: -10px
    }
    #remove-btn{
        margin-top: 20%;
        font-size: 24px
    }
</style>
