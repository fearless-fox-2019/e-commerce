<template>
    <div>
        <h1>Cart</h1>
        <cart-item v-for="item in items" :key="item._id" :item="item" @refetch="fetchCarts">
        </cart-item>
    </div>
</template>

<script>

import axios from "axios";
import CartItem from "@/components/CartItem.vue";

export default {
    created(){
        this.fetchCarts();
    },
    data(){
        return {
            items: []
        }
    },
    methods: {
        fetchCarts(){
            axios({
                method: "GET",
                url: `${process.env.VUE_APP_SERVER_URL}/carts`,
                headers: {
                    token: this.$store.state.token
                }
            })
                .then((response) => {
                    this.items = response.data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    components: {
        CartItem
    }
}
</script>

<style scoped>
</style>
