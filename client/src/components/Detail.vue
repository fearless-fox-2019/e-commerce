<template>
    <p>
        {{ payload.detail }}
    </p>
</template>

<script>
import axios from 'axios'   
export default {
    data () {
        return {
            payload: '',
            checkoutCount: '',
        }
    },
    created () {
        alert('From Detail')
        axios({
            method: 'get',
            url: `http://localhost:3000/api/products/${this.$route.params.productId}`
        })
        .then(({ payload }) => {
            this.payload = payload
            console.log('Fetched from Detail')
        })
        .catch( err => console.log(err))
    }
}
</script>

<style>

</style>

