<template>
    <div class="card col-sm-10 offset-sm-1">
        <div class="card-body row">
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
                <p>Status:</p>
                <p>{{status}}</p>
                <div v-if="status == 'Unpaid'">
                    <small class="form-text text-muted">Please confirm your payment.</small>
                    <button @click="updatePayment" type="button" class="btn btn-warning btn-sm">Confirm Payment</button>
                </div>
                <div v-if="status == 'In Shipping with Courier'">
                    <small class="form-text text-muted">Please confirm if you've receive the package.</small>
                    <button @click="updateReceive" type="button" class="btn btn-primary btn-sm">Receive</button>
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
            status:''
        }
    },
    methods:{
        ...mapActions(['getCustTransaction']),

        updatePayment(){
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
                this.status= 'Packing'
                this.getCustTransaction()
            })
            .catch(err => {
                console.log('error update confirm payment')
                console.log(err)
            })

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

<style>

</style>
