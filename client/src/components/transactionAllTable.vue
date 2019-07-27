<template>
    <div id= "table-alltransaction" class="col-10 offset-1">

        <div class="d-flex flex-row-reverse">
            <form class="form-inline">
                <label for="status" style="margin-right: 20px">Status: </label>
                <select v-model="filter" class="form-control">
                    <option value="all" selected>All</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="send">Shipping</option>
                    <option value="complete">Complete</option>
                </select>
            </form>
        </div><br>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Transaction Date</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Items</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Courier</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr v-for="(data, index) in filterTransactions" :key="data._id">
                    <th scope="row">{{index+1}}</th>
                     <td>{{new Date(data.createdAt).toLocaleDateString('en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' })}}
                    </td>
                    <td>{{data.customerId.name}}</td>
                    <td>{{data.address}}</td>
                    <td>
                        <ol>
                            <li v-for="item in data.items" :key="item._id">
                                {{item.name}} ({{item.quantity}})
                            </li>
                        </ol>
                    </td>
                    <td>Rp. {{data.totalPrice}}</td>
                    <td>{{data.shipping}}</td>
                    <td>
                        {{data.status}}
                        
                    </td>
                    <td>
                        <p v-if="data.status != 'paid'">-</p>
                        <div v-if="data.status == 'paid'">
                            <button @click="updateSend(data._id)" type="button" class="btn btn-warning btn-sm">Send Item</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from '@/api/api.js'
import  { mapState, mapActions } from 'vuex'

export default {
    name:'allTransactionTable',
    data(){
        return {
            filter:'all',
            transactions:[]
        }
    },
    methods:{
        ...mapActions(['getAllTransaction']),
        
        updateSend(id){
            axios({
                url:`/transaction/${id}`,
                method: 'patch',
                data: {
                    status: 'send'
                    },
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) => {
                this.getAllTransaction()
            })
            .catch(err => {
                console.log('error update confirm payment')
                console.log(err)
            })
        }

    },
    created(){
        this.getAllTransaction()
    },
    computed:{
        ...mapState(['allTransaction', 'unpaidTransaction', 'paidTransaction', 'sendTransaction', 'completeTransaction']),
        filterTransactions(){
            if(this.filter === 'all'){
                return this.allTransaction
            }else if(this.filter === 'unpaid'){
                return this.unpaidTransaction
            }else if(this.filter === 'paid '){
                return this.paidTransaction
            }else if(this.filter === 'send'){
                return this.sendTransaction
            }else if(this.filter === 'complete'){
                return this.completeTransaction
            }
        }
    }

}
</script>

<style>

</style>
