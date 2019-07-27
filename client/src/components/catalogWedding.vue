<template>
    <div class="row" style="margin-left: 5%; margin-top: 15px">
        <cardItem v-for="cake in weddingCake" :key="cake._id" :item="cake"></cardItem>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cardItem from '@/components/cardItem.vue'

export default {
    name: 'catalogChoco',
    components:{
        cardItem
    },
    methods:{
        ...mapActions(['getAllCake'])
    },
    created(){
        this.getAllCake()
    },
    computed:{
        ...mapState(['weddingCake'])
    },

}
</script>

<style>

</style>
