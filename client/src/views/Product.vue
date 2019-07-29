<template>
    <b-container class="mt-4">
     <b-card img-left :img-src="desc.image_path" img-alt="detail">
         <b-card-text>
            <h1>{{ desc.name }}</h1>
            <h3>Stock: {{ desc.stock - checkoutCount }}</h3>
            <h4>Price: {{ desc.price }}</h4>
            <router-link to="detail">See more...</router-link>
            <div class="mt-2">
            <b-form-input v-model="checkoutCount" type="number" class="mr-2" style="display: inline;width: 100px;" placeholder="0"></b-form-input>
            <b-btn variant="primary" @click="addToCart">Add to Cart</b-btn>
            </div>
         </b-card-text>
     </b-card>
     <router-view></router-view>
    </b-container>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions, mapMutations } from 'vuex'   
export default {
    data () {
        return {
            desc: '',
            checkoutCount: '',
        }
    },
    created () {
        axios({
            method: 'get',
            url: `http://localhost:3000/api/products/${this.$route.params.productId}`
        })
        .then(({ data }) => {
            this.desc = data
            console.log('Fetched')
        })
        .catch( err => console.log(err))
    },
    methods: {
        addToCart () {
            if(this.checkoutCount > 0 ){
                console.log('Add to Cart')
                this.$store.commit('addToCartStore', { count: this.checkoutCount, id: this.$route.params.productId })
            }
        }
    }
}
</script>

<style>

</style>
