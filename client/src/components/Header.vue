<template>
    <header>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" @click="$store.commit('side')">
                    <i class="fas fa-bars"></i>
                </a>
                <a class="navbar-item" href="#" @click="$router.push('/')">
                    <img src="http://www.sclance.com/pngs/gems-png/gems_png_556871.png" width="28" height="28">
                    GEMS
                </a>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                <a class="navbar-item" @click="$router.push('/')">
                    <i class="fas fa-home"></i> Home
                </a>
                <a class="navbar-item">
                    <i class="fas fa-percent"></i>
                    SALE
                </a>
                <a class="navbar-item" @click="admin">
                    ADMIN(temporary)
                </a>
                </div>
                <div class="navbar-divider" >
                    <p class="control is-expanded">
                        <input v-model="search" class="input" type="text" placeholder="Find an item" style="width:500px">
                    </p>
                </div>
                <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons" v-if="$store.state.isLogin">
                        <a class="button is-primary">
                            <i class="fas fa-shopping-cart"></i>
                            <strong>Cart</strong>
                        </a>
                        <a class="button is-light">
                            <i class="fas fa-user"></i>
                        </a>
                        <a class="button is-light" @click="logout">
                            <i class="fas fa-sign-out-alt"></i>
                        </a>
                    </div>
                    <div class="buttons" v-if="!$store.state.isLogin">
                        <a class="button is-primary" @click="$router.push('/register')">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light" @click="$router.push('/login')">
                            Log in
                        </a>
                    </div>
                </div>
                </div>
            </div>
        </nav>
     </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            search: '',
        }
    },
    computed:{
        ...mapState(['userLogin'])
    },
     methods:{
        logout(){
            this.$store.dispatch('USER_LOGOUT')
        },
        admin(){
            if(!localStorage.token){
                Swal.fire('Maaf ...', 'khusus admin', 'error')
            }
            if(this.$store.state.userLogin.data.name){
                const username = this.$store.state.userLogin.data.name
                if(username === 'indi') this.$router.push('/adminpage')
                else Swal.fire('Oops!', 'anda bukan admin', 'error')
            }else{
                Swal.fire('Maaf ...', 'anda bukan admin', 'error')
                console.log(this.$store.state.userLogin.data.name, 'pol')
            }
        },
        searching(){
            this.$store.dispatch('searchingitem', this.search)
        },
    },
    watch:{
        search: function (newQuestion, oldQuestion) {
            console.log('proses methods fetch database')
            this.searching()
        }
    }
   
}
</script>

<style>

</style>
