<template>
    <div>
        <div class="card" style="width:300px">
            <img class="card-img-top" :src="item.image" alt="Image Cake" style="height:300px">
            <div class="card-body">
                <h4 class="card-title">{{item.name}}</h4>
                <p class="card-text">{{item.description}}</p>

                <div v-if="isLogin" class="d-flex justify-content-around">
                    <a class="btn btn-primary btn-sm" @click.prevent="toDetail">
                        Buy Now
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name:'cardItem',
    props:['item'],
    data(){
        return {
            isLogin:false
        }
    },
    methods:{
        ...mapMutations(['Set_currentItem']),

        toDetail(){
            this.Set_currentItem(this.item)
            this.$router.push(`/detail/${this.item._id}`)
        }
    },
    created(){
        if(localStorage.token){
            this.isLogin= true
        }
    }
}
</script>

<style>

</style>
