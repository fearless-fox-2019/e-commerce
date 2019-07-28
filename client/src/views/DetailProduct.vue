<template>
    <div>
        <Navbar></Navbar>
        <div class="container">
            <div class="column">
                <div class="columns">
                    <div class="column" style="display: flex; justify-content: center">
                        <div class="box" style="width: 580px; margin-top: 60px; height: 550px; display: flex; align-items:center; justify-content: center">
                            <div v-if="productById.image !== ''" style="margin: 10px">
                                <img :src="productById.image" alt="card">
                            </div>
                            <div v-else style="margin: 10px">
                                <img src="https://s3.bukalapak.com/img/3597730592/w-1000/Boneka_Kucing_45cm_Boneka_Lucu_Boneka_Hadiah_Ulang_Tahun_Val.jpg" alt="card">
                            </div>
                        </div>
                    </div>
                    <div class="column" style="display: flex; justify-content: center">
                        <div class="box" style="width: 580px; margin-top: 60px; height: 550px;">
                            <div style="margin: 10px">
                                <strong style="fontSize: 40px">{{productById.productname}}</strong>
                                <p>{{productById.price}}</p>
                                <a type="is-primary" outlined @click="addtoCart(productById._id)">Add to Cart</a>
                                <p>{{productById.stock}}</p>
                                <h4><strong>Description:</strong></h4>
                                <p>{{productById.description}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Navbar from '../components/Header'
export default {
    components: {
        Navbar
    },
    computed: {
        ...mapState(['productById', 'userLogin'])
    },
    methods:{
        addtoCart(productId){
            if(localStorage.token){
                console.log('apa masih sampe sini? --addCart store')
                console.log(productId, 'ini apa ..')
                console.log(this.$store.state.userLogin.data.id, 'isinya apa aja si')
                this.$store.dispatch('addCart', {
                    ProductId: productId,
                    UserId: this.$store.state.userLogin.data.id
                })
                .then(response => {
                    console.log('berhasil ngga?')
                    this.$router.push('/cart')
                    Swal.fire('Berhasil atc', this.$store.state.productById.productname, 'success')
                })
                .catch(err => {
                    Swal.fire('Maaf','tidak bisa atc','error')
                    this.$router.push("/");
                })
            }else{
                this.$router.push('/')
                Swal.fire('Maaf..', 'Silahkan Login terlebih dahulu', 'error')
            }
        }
    }
}
</script>

<style>

</style>
