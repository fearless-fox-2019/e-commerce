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
                            Items
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item">
                                <router-link to="/home">All Items </router-link>
                            </a>
                            <a class="dropdown-item">
                                <router-link to="/item/add">Add New Item </router-link>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown">
                            Transactions
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">All Transaction</a>
                            <a class="dropdown-item" href="#">Unpaid</a>
                            <a class="dropdown-item" href="#">Paid</a>
                            <a class="dropdown-item" href="#">Delivered</a>
                        </div>
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
