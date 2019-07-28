<template>
    <div>
        <navbarCust></navbarCust>

        <div class="row" style="margin-top: 30px">
            <h3 v-if="myCart.length === 0" id="no-item-txt">No Item in Your Cart</h3>
            <div class="col-sm-8 offset-sm-2">
                <cardCart v-for="data in myCart" :key="data._id" :cart="data"></cardCart>
            </div>
        </div>

        <!-- Button trigger modal -->
        <button id="checkout-btn" type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#checkout">
            Checkout
        </button>

        <!-- Modal -->
        <div class="modal fade" id="checkout" tabindex="-1" role="dialog" aria-labelledby="checkout" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-body">
                <h5 id="title">Please Fill Form to Checkout</h5><br>
                <form style="font-family: 'Comfortaa', cursive;">
                    <div class="form-group row">
                        <label for="address" class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                        <textarea v-model="address" class="form-control" id="address" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="" class="col-sm-2 col-form-label">Shipping</label>
                        <div class="col-sm-10">
                            <select v-model="shipping" class="form-control" id="shipping">
                                <option value="Go-Send">Go-Send</option>
                                <option value="Grab-Send">Grab-Send</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button @click="addTransaction" type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    </div>

</template>

<script>
import axios from '@/api/api.js'
import navbarCust from '@/components/navbarCust.vue'
import cardCart from '@/components/cardCart.vue'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'myCart',
    data(){
        return {
            address:'',
            shipping:'Go-Send'
        }
    },
    components:{
        navbarCust,
        cardCart
    },
    methods:{
        ...mapActions(['getMyCart']),

        addTransaction(){
            if(this.myCart.length === 0){
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    text: 'No Item. Please add some item!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                axios({
                    url: '/transaction',
                    method: 'post',
                    data:{
                        items: this.myCart,
                        address: this.address,
                        shipping: this.shipping
                    },
                    headers:{
                        'token': localStorage.token
                    }
                })
                .then(({data}) => {
                    this.getMyCart()
                })
                .catch(err => {
                    console.log('error create transaction')
                    console.log(err)
                })
            }
        }
    },
    computed:{
        ...mapState(['myCart'])
    },
    mounted(){
        this.getMyCart()
    }
}
</script>

<style scoped>
    #no-item-txt{
        margin-left: 40%;
        font-family: 'Bree Serif', serif;
    }
    #checkout-btn{
        margin-top: 20px
    }
    #title{
        font-family: 'Bree Serif', serif;
        font-size: 24px;
        margin-top: 10px
    }
</style>
