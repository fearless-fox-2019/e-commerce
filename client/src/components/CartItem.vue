<template>
    <b-card bg-variant="dark" text-variant="white" :title="item.itemId.name" style="margin: 20px 50px;">
        <div style="float: left;">
            <img :src="item.itemId.image" alt="" srcset="" style="max-height: 100px;">
        </div>
        <div style="float: right; text-align: right;">
            <h4>Quantity: {{ item.quantity }}</h4>
            <h4>Price: {{ item.itemId.price }}</h4>
            <h4>Total Price: {{ item.quantity * item.itemId.price }}</h4>
            <h4> <b-button variant="danger" @click="removeCart">Remove</b-button></h4>
        </div>
    </b-card>
</template>

<script>

import axios from "axios";

export default {
    props: ["item"],
    methods: {
        removeCart(){
            axios({
                method: "DELETE",
                url: `${process.env.VUE_APP_SERVER_URL}/carts/${this.item._id}`,
                headers: {
                    token: this.$store.state.token
                }
            })
                .then(() => {
                    this.$swal(
                        'Cart is successfully removed!',
                        '',
                        'success'
                    );
                    this.$emit("refetch");
                })
                .catch((err) => {
                    console.log(err);
                    this.$swal(
                        'Error while removing the cart!',
                        '',
                        'error'
                    );
                });
        }
    }
}
</script>

<style>

</style>
