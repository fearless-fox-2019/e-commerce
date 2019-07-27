<template>
    <div id= "table-alltransaction" class="col-10 offset-1">
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

                </tr>
            </thead>
            <tbody id="table-body">
                <tr v-for="(data, index) in completeTransaction" :key="data._id">
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
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from '@/api/api.js'
import  { mapState, mapActions } from 'vuex'

export default {
    name:'completeTransactionTable',
    data(){
        return {

        }
    },
    methods:{
        ...mapActions(['getAllTransaction'])

    },
    mounted(){
        this.getAllTransaction()
    },
    computed:{
        ...mapState(['completeTransaction']),
    }

}
</script>

<style>

</style>
