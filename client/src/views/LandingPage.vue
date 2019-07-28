<template>
    <div>
        <Navbar></Navbar>
        <div class="column">
            <div class="columns">
                <Side v-if="$store.state.sidebar"></Side>
                <div class="container">
                    <div style="display: flex; flex-wrap: wrap; justify-content: center">
                        <p>{{answer}}</p>
                        <div v-for="(item, index) in allProductsCopy" :key="index">
                            <Card :data="item"></Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '../components/Header'
import Side from '../components/Sidebar'
import Card from '../components/Card'
export default {
    data(){
        return{
            searchLandingPage: '',
            allProductsCopy: [],
            answer: ''
        }
    },
    components: {
        Navbar,
        Side,
        Card
    },
    computed: {
        ...mapState(['allProducts', 'search'])
    },
    created(){
        this.allProductsCopy = this.$store.state.allProducts
    },
    methods:{
        searchInput(){
            console.log(this.keys)
            this.searchLandingPage = this.$store.state.search
            allProducts.forEach(element => {
                    if (element.productname.toLowerCase().includes(this.searchLandingPage.toLowerCase())) {
                        this.allProductsCopy.push(element)
                        console.log('masuk sini nih')
                        this.searchLandingPage = ''
                        return
                    } else {
                        this.searchLandingPage = ''
                        this.answer = 'not found 😭'
                    }
                })
        }
    }
}
</script>

<style scoped>
</style>
