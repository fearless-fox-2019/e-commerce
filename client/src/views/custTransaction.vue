<template>
    <div>
        <navbarCust></navbarCust>
        <div class="row">
            <cardTransaction v-for="(data, index) in custTransaction" :key="index" :transaction="data"></cardTransaction>
        </div>
    </div>
</template>

<script>
import axios from '@/api/api.js'
import { mapState, mapActions } from 'vuex'
import navbarCust from '@/components/navbarCust.vue'
import cardTransaction from '@/components/cardTransaction.vue'

export default {
    name:'custTransactionPage',
    components:{
        navbarCust,
        cardTransaction
    },
    methods:{
        ...mapActions(['getCustTransaction'])
    },
    computed:{
        ...mapState(['custTransaction'])
    },
    created(){
        this.getCustTransaction()
    }

}
</script>

<style>

</style>
