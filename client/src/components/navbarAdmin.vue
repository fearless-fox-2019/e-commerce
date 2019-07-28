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
            <div class="dropdown">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a id="menu-head" class="nav-link dropdown-toggle" data-toggle="dropdown">
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
                        <a id="menu-head" class="nav-link dropdown-toggle" data-toggle="dropdown">
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
                    <li class="nav-item dropdown">
                        <a id="menu-head" class="nav-link dropdown-toggle" data-toggle="dropdown">
                            <router-link to="/home">User </router-link>
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" data-toggle="modal" data-target="#listAdmin">
                                List Admin
                            </a>
                            <a class="dropdown-item" data-toggle="modal" data-target="#inviteAdmin">
                                Invite Admin
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
            
            <!-- Login Register -->

            <div class="ml-auto">
                <a @click="logout" class="btn btn-outline-danger" style="color: yellow">
                    <i class="fas fa-sign-out-alt"></i>Logout
                </a>
            </div>
        </nav> 

        <!-- Modal List Admin -->
        <div class="modal" id="listAdmin">
            <div class="modal-dialog">
                <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-body" style="height: 500px; overflow: scroll">
                    <h4>List User Admin: </h4><br>
                    <div v-for="user in userAdmin" :key="user._id" class="card">
                        <div class="card-body d-flex justify-content-around">
                            <div class="text-left" style="line-height: 1; font-size: 14px">
                                <p class="card-text">Name: {{user.name}}</p>
                                <p class="card-text">Email: {{user.email}}</p>
                            </div>
                            <button class="btn btn-outline-danger btn-sm" @click="removeAdmin(user._id)">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>

        <!-- Modal Invite Admin -->
        <div class="modal" id="inviteAdmin">
            <div class="modal-dialog">
                <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-body" style="height: 500px; overflow: scroll">
                    <h4>List User Admin: </h4><br>
                    <div v-for="user in userCustomer" :key="user._id" class="card" style="margin-bottom: 5px">
                        <div class="card-body d-flex justify-content-around">
                            <div class="text-left" style="line-height: 1; font-size: 14px">
                                <p class="card-text">Name: {{user.name}}</p>
                                <p class="card-text">Email: {{user.email}}</p>
                            </div>
                            <button id="btn-logout" class="btn btn-outline-success btn-sm" @click="inviteAdmin(user._id)">
                                Invite
                            </button>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from '@/api/api.js'
import { mapState, mapActions } from 'vuex'

export default {
    name:'navbarAdmin',
    methods:{
        ...mapActions(['getAllUsers']),
        removeAdmin(id){
            axios({
                url: `/users/${id}`,
                method: 'patch',
                data:{
                    role: 'customer'
                },
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) => {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    text: 'Success remove admin!',
                    showConfirmButton: false,
                    timer: 1200
                })
                this.getAllUsers()
            })
        },
        inviteAdmin(id){
            axios({
                url: `/users/${id}`,
                method: 'patch',
                data:{
                    role: 'admin'
                },
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) => {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    text: 'Success invite admin!',
                    showConfirmButton: false,
                    timer: 1200
                })
                this.getAllUsers()
            })
        },
        logout(){
            localStorage.clear()
            this.$store.commit('Set_isLogin', false)
            this.$router.push('/')
        }
    },
    created(){
        this.getAllUsers()
    },
    computed:{
        ...mapState(['userAdmin', 'userCustomer'])
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

#menu-head{
    color: coral
}

#btn-logout:hover{
        cursor: pointer
    }

</style>
