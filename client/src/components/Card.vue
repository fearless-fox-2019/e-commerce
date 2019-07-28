<template>
    <div class="card" style="margin: 10px; background-color: #ffd8f0;">
        <div style="padding: 10px">
            <div v-if="data.image !== ''">
                <img :src="data.image" alt="card" width="200">
            </div>
            <div v-else>
                <img src="../assets/3.gif" alt="card" width="200">
            </div>
            <div>
                <strong>{{data.productname}}</strong>
                <p>Rp.{{data.price}}</p>
            </div>
            <div style="text-align: center; margin-top: 10px">
                <b-button type="is-primary" outlined @click="toDetail(data._id)">
                    DETAIL
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    methods: {
        toDetail(id){
            this.$store.dispatch('getProductById', id)
            this.$router.push('/detail/'+id)
        }
    }
}
</script>

<style>

</style>
