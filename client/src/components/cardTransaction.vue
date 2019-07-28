<template>
    <div class="card col-sm-10 offset-sm-1">
        <div class="card-body row" style="margin-bottom: -10px">
            <div class="col-sm-3">
                <img :src="transaction.items[0].itemId.image" alt="Image Cake" style="height: 80px">
            </div>
            <div class="col-sm-6">
                <p>Items: </p>
                <ul>
                    <li v-for="item in transaction.items" :key="item._id">
                       {{item.name}} | quantity:{{item.quantity}} | Total price: {{Number(item.quantity)* Number(item.price)}}
                    </li>
                </ul>
            </div>
            <div class="col-sm-3" style="line-height: 1">
                <p>Status: </p>
                <p>{{status}}</p>
                <div v-if="status == 'Unpaid'" style="margin-top: -5px">
                    <small class="form-text text-muted" style="margin-bottom: 4px">Please confirm your payment.</small>
                    <button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#confirmPayment">
                        Confirm Payment
                    </button>
                </div>
                <div v-if="status == 'In Shipping with Courier'">
                    <small class="form-text text-muted">Please confirm if you've receive the package.</small>
                    <button @click="updateReceive" type="button" class="btn btn-primary btn-sm">Receive</button>
                </div>
            </div>
        </div>

        <!-- Modal Confirmation Payment Code -->
        <div class="modal fade" id="confirmPayment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <h5 id="title">Please Input Your Payment Code</h5><br>
                        <form @submit.prevent="updatePayment">
                            <input v-model="code" type="text" class="form-control" placeholder="ex: vg7hj"><br>
                            <div class="d-flex justify-content-center">
                                <input type="submit" class="btn btn-primary" value="Submit" data-dismiss="modal" style="margin-right: 10px">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/api/api.js'
import { mapActions } from 'vuex'

export default {
    name:'cardTransaction',
    props: ['transaction'],
    data(){
        return {
            status:'',
            code:''
        }
    },
    methods:{
        ...mapActions(['getCustTransaction']),

        updatePayment(){
            if(this.code != this.transaction.paymentCode){
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'Oppss...',
                    text: 'Your code is wrong. Please try again!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                axios({
                    url:`/transaction/${this.transaction._id}`,
                    method: 'patch',
                    data: {
                        status: 'paid'
                        },
                    headers:{
                        'token': localStorage.token
                    }
                })
                .then(({data}) => {
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Confirmation success!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.status= 'Packing'
                    this.getCustTransaction()
                })
                .catch(err => {
                    console.log('error update confirm payment')
                    console.log(err)
                })
            }
            

        },

        updateReceive(){
            axios({
                url:`/transaction/${this.transaction._id}`,
                method: 'patch',
                data: {
                    status: 'complete'
                    },
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) => {
                this.status= 'Complete'
                this.getCustTransaction()
            })
            .catch(err => {
                console.log('error update confirm payment')
                console.log(err)
            })

        }
    },
    created(){
        this.status=''
        if(this.transaction.status === "unpaid"){
            this.status= 'Unpaid'
        }
        else if(this.transaction.status === 'paid'){
            this.status= 'Packing'
        }
        else if(this.transaction.status === 'send'){
            this.status= 'In Shipping with Courier'
        }
        else{
            this.status= 'Complete'
        }
    }
}
</script>

<style scoped>
  #title{
         font-family: 'Bree Serif', serif;
         font-size: 24px;
         margin-top: 10px
     }

</style>
