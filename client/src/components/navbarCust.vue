<template>
    <div>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark d-flex mb-3">
            <!-- Logo -->
            <div>
                <a class="navbar-brand" style="color: gold;font-family: 'Courgette', cursive; font-size: 24px">
                    <img src="@/assets/clover.png" alt="Logo" style="height: 35px">
                    Claves Patisserie
                </a>
            </div>
            
            <!-- Menu -->
             <div style="margin-left: 60px">
                <ul class="navbar-nav">
                    <li class="nav-item">
                         <router-link to="/catalog/chocolate-cake">
                            <a class="nav-link" id="menu-txt">Chocolate Cake</a>
                         </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/catalog/cheese-cake">
                            <a class="nav-link" id="menu-txt">Cheesecake</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/catalog/icecream-cake">
                            <a class="nav-link" id="menu-txt">Ice Cream Cake</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/catalog/nougat-cake">
                            <a class="nav-link" id="menu-txt">Nougat Cake</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/catalog/classic-cake">
                            <a class="nav-link" id="menu-txt">Classic</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/catalog/wedding-cake">
                            <a class="nav-link" id="menu-txt">Wedding Cake</a>
                        </router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link to="/mytransaction">
                            <a class="nav-link" id="menu-txt">My Order</a>
                         </router-link>
                    </li>
                </ul>
            </div>
            
            <!-- Shopping Cart-Logout -->

            <div class="ml-auto" style="color: white">
                <a style="margin-right: 20px;">
                    <router-link to="/mycart">
                        <i class="fas fa-shopping-cart" style="font-size: 22px"></i>
                    </router-link>
                </a>
                <a id="btn-logout" @click="logout" class="btn btn-outline-danger" style="color: yellow;">
                    <i class="fas fa-sign-out-alt"></i>Logout
                </a>
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
    #menu-txt{
        font-size: 13px;
        font-weight: bold;
        color: lightsalmon;
        font-family: 'Comfortaa', cursive;
    }
    #btn-logout:hover{
        cursor: pointer
    }

</style>
