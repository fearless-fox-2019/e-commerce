<template>
    <div id= "table-alltransaction" class="col-10 offset-1" style="margin-top: 20px">
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
                <tr v-for="(data, index) in paidTransaction" :key="data._id">
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
                        <button @click="updateSend(data._id)" type="button" class="btn btn-primary btn-sm">
                            Send Item
                        </button>
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
    name:'paidTransactionTable',
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
        ...mapState(['paidTransaction']),
    }

}
</script>

<style>

</style>
