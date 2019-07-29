<template>
    <div class="row justify-content-around">

        <b-card v-for="item in items" :key="item._id" class="col-xl-2 col-lg-3 col-md-4 col-sm-6 p-5 mb-4" :title="item.name" :img-src="item.image" img-alt="Image" img-top style="margin: 0px 20px;">
            <b-card-text>
                <h5>Rp {{ item.price }} ,-</h5>
            </b-card-text>
            <div slot="footer" v-if="loggedIn"><button class="btn btn-success" v-b-modal="'modal-add-cart-'+item._id">Add to Cart</button></div>
            
            <add-to-cart :item="item" @refetch="fetchItem"></add-to-cart>
        </b-card>

    </div>
</template>

<script>

import axios from "axios";
import AddToCart from "@/components/AddToCart.vue";

export default {
    created(){
        const data = this.fetchItem();
    },
    data(){
        return {
            items: []
        }
    },
    components: {
        AddToCart
    },
    methods: {
        fetchItem(){
            axios({
                method: "GET",
                url: "http://localhost:3000/items",
            })
                .then((response) => {
                    this.items = response.data.data;
                    console.log(this.items);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    computed: {
		loggedIn(){
				return this.$store.getters.loggedIn;
		}
	} 
};
</script>

<style>
   .card-title{
        text-align: left;
    }
    .card-text{
        text-align: left;
    }
</style>
