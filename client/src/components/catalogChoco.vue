<template>
    <div class="col-sm-10 offset-1">

        <cardItem v-for="cake in chocoCake" :key="cake._id" :item="cake"></cardItem>
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
        ...mapState(['chocoCake'])
    },

}
</script>

<style>

</style>
