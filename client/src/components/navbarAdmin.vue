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
            <div class="dropdown">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown">
                            <router-link to="/home">Items </router-link>
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item">
                                <router-link to="/home">
                                    All Items
                                </router-link>
                            </a>
                            <a class="dropdown-item">
                                <router-link to="/item/add">
                                    Add New Item
                                </router-link>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown">
                            <router-link to="/transaction/all"> Transactions </router-link>
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item">
                                <router-link to="/transaction/all">
                                    All Transaction
                                </router-link>
                            </a>
                            <a class="dropdown-item">
                                <router-link to="/transaction/unpaid"> 
                                    Unpaid 
                                </router-link>
                            </a>
                            <a class="dropdown-item">
                                <router-link to="/transaction/paid"> 
                                    Paid
                                </router-link>
                            </a>
                            <a class="dropdown-item">
                                <router-link to="/transaction/complete"> 
                                    Complete
                                </router-link>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Invite Admin</a>
                    </li>
                </ul>
            </div>
            
            <!-- Login Register -->

            <div class="ml-auto" style="color: white">
                <a @click="logout" class="btn btn-danger">Logout</a>
            </div>
        </nav> 
    </div>
</template>

<script>
export default {
    name:'navbarAdmin',
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

.dropdown:hover>.dropdown-menu {
  display: block;
}

.dropdown>.dropdown-toggle:active {
  /*Without this, clicking will make it sticky*/
    pointer-events: none;
}

</style>
