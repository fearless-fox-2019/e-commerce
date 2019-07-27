<template>
    <div id="card-item" class="card">
        <img class="card-img-top" :src="item.image" alt="Image Cake" style="height:275px">
        <div class="card-body">
            <h5 class="card-title">{{item.name}}</h5>
             <div v-if="isLogin" class="d-flex justify-content-around">
                <button id="btn-buy" class="btn btn-primary btn-sm" @click.prevent="toDetail">
                    Buy Now
                </button>
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

<style scoped>
    #card-item{
        width: 275px;
        margin: 4px 4px;
        
    }
    #card-item:hover{
        box-shadow: 2px 2px 4px #000000;
    }
    #btn-buy:hover{
        opacity: 0.8;
    }
</style>
