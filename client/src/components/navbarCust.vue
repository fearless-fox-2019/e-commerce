<template>
    <div>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark d-flex mb-3">
            <!-- Logo -->
            <div>
                <a class="navbar-brand" style="color: gold">
                    <img src="@/assets/clover.png" alt="Logo" style="height: 40px">
                    Claves Patisserie
                </a>
            </div>
            
            <!-- Menu -->
             <div>
                <ul class="navbar-nav">
                    <li class="nav-item">
                         <router-link to="/catalog/chocolate-cake">
                            <a class="nav-link">Chocolate Cake</a>
                         </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Cheesecake</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Ice Cream Cake</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Nougat Cake</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Classic</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Wedding Cake</a>
                    </li>
                </ul>
            </div>
            
            <!-- Shopping Cart-Logout -->

            <div class="ml-auto" style="color: white">
                <a>
                    <router-link to="/mycart">
                        <i class="fas fa-shopping-cart"></i>
                    </router-link>
                </a>
                <a @click="logout" class="btn btn-danger">Logout</a>
            </div>
        </nav> 
    </div>
</template>

<script>
export default {
    name:'navbarCust',
    methods:{
        logout(){
            localStorage.clear()
            this.$store.commit('Set_isLogin', false)
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>


</style>
