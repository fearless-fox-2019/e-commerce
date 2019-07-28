<template>
    <div>
        <Navbar></Navbar>
        <div class="container">
            <div>
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Product Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in ALL_PRODUCTByUser" :key="index">
                            <td>{{index}}</td>
                            <td>{{item.productname}}</td>
                            <td>{{item.image}}</td>
                            <td>{{item.price}}</td>
                            <td>
                                <b-button type="submit is-danger is-rounded"
                                    outlined
                                    @click="deleteProduct(item._id)">
                                    Delete
                                </b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <b-button type="submit is-danger is-rounded"
                    outlined>
                    Checkout Cart
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Header.vue'
import { mapState } from 'vuex'
    export default {
        data() {
            return {
            }
        },
        components:{
            Navbar
        },
        computed:{
            ...mapState(['ALL_PRODUCTByUser'])
        },
        created(){

        },
        methods:{
            deleteProduct(id){
                this.$store.dispatch('deleteCart', id)
                this.$router.push('/cart')
            }
        }
    }
</script>