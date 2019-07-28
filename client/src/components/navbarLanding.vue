<template>
    <div>
         <nav class="navbar navbar-expand-sm bg-dark navbar-dark d-flex justify-content-between">
            <!-- Logo -->
            <div>
                <router-link to="/">
                    <a class="navbar-brand" style="color: gold;font-family: 'Courgette', cursive; font-size: 24px">
                        <img src="@/assets/clover.png" alt="Logo" style="height: 35px">
                        Claves Patisserie
                    </a>
                </router-link>
            </div>
            
            <!-- Menu -->
            <div>
                <ul class="navbar-nav">
                     <li class="nav-item">
                         <router-link to="/cake/chocolate">
                            <a class="nav-link" id="menu-txt">Chocolate</a>
                         </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/cake/cheese">
                            <a class="nav-link" id="menu-txt">Cheesecake</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/cake/icecream">
                            <a class="nav-link" id="menu-txt">Ice Cream Cake</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/cake/nougat">
                            <a class="nav-link" id="menu-txt">Nougat</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/cake/classic">
                            <a class="nav-link" id="menu-txt">Classic</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/cake/wedding">
                            <a class="nav-link" id="menu-txt">Wedding Cake</a>
                        </router-link>
                    </li>
                </ul>
            </div>
            
            <!-- Login Register -->

            <div style="color: white">
                <a id="login-register-text" data-toggle="modal" data-target="#modalLogin">
                    Login /
                </a>
                <a  id="login-register-text" data-toggle="modal" data-target="#modalRegister">
                    Register
                </a>
            </div>
        </nav> 

        <!-- Modal Login -->
        <div class="modal animated zoomIn" id="modalLogin">
            <div class="modal-dialog">
                <div class="modal-content">

                <!-- Modal body -->
                <div class="modal-body">
                    <h5 id="title">Login </h5><br>
                    <form @submit.prevent="login">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-envelope"></i> </span>
                            </div>
                            <input type="email" class="form-control" placeholder="Email" required v-model="user.email">
                        </div><br>

                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-lock"></i> </span>
                            </div>
                            <input type="password" class="form-control" placeholder="Password" required v-model="user.password">
                            </div><br>
                    </form> 
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success" @click="login" data-dismiss="modal">Login</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
        </div>

        <!-- Modal Register -->
        <div class="modal animated zoomIn" id="modalRegister">
            <div class="modal-dialog">
                <div class="modal-content">

                <!-- Modal body -->
                <div class="modal-body">
                    <h5  id="title">Register</h5><br>
                    <form @submit.prevent="register">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i> </span>
                            </div>
                            <input type="text" class="form-control" placeholder="Name" required v-model="newUser.name">
                        </div><br>

                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-envelope"></i> </span>
                            </div>
                            <input type="email" class="form-control" placeholder="Email" required v-model="newUser.email">
                        </div><br>

                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-lock"></i> </span>
                            </div>
                            <input type="password" class="form-control" placeholder="Password" required v-model="newUser.password">
                            </div><br>
                    </form>
   
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="register" data-dismiss="modal">Register</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from '@/api/api.js'

export default {
    name:'navbarLanding',
    data(){
        return {
            newUser:{
                name:'',
                email:'',
                password:''
            },
            user:{
                email:'',
                password:''
            }
        }
    },
    methods:{

        login(){
            axios({
                url:`/users/login`,
                method: 'POST',
                data: this.user
            })
            .then(({data}) => {
                localStorage.setItem('name', data.name)
                localStorage.setItem('userId', data.userId)
                localStorage.setItem('role', data.role)
                localStorage.setItem('token', data.token)

                if(data.role == 'admin'){
                    this.$router.push('/home')
                    this.$store.commit('Set_isLogin', true)
                }else{
                    this.$router.push('/catalog/chocolate-cake')
                    this.$store.commit('Set_isLogin', true)
                }
            })
            .catch(err =>{
                console.log('error register user')
                console.log(err)

                Swal.fire({
                    position: 'center',
                    type: 'error',
                    text: 'Please Check Your Email/ Password !',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        register(){
            axios({
                url:`/users/register`,
                method: 'POST',
                data: this.newUser
            })
            .then(({data}) => {
                localStorage.setItem('name', data.name)
                localStorage.setItem('userId', data.userId)
                localStorage.setItem('role', data.role)
                localStorage.setItem('token', data.token)

                if(data.role == 'admin'){
                    this.$store.commit('Set_isLogin', true)
                    this.$router.push('/home')
                }else{
                    this.$store.commit('Set_isLogin', true)
                    this.$router.push('/catalog/chocolate-cake')
                }
            })
            .catch(err =>{
                console.log('error register user')
                console.log(err)

                Swal.fire({
                    position: 'center',
                    type: 'error',
                    text: 'Registration Failed. Please Try Again!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        }
    }
}
</script>

<style scoped>

    html, body{
        height: 100vh;

    }

    #menu-txt{
        font-size: 13px;
        font-weight: bold;
        color: lightsalmon;
        font-family: 'Comfortaa', cursive;
    }

    #login-register-text{
        font-size: 18px
    }

     #login-register-text:hover{
         font-weight: bold;
         cursor: pointer
     }

     #title{
         font-family: 'Bree Serif', serif;
         font-size: 24px;
         margin-top: 10px
     }

</style>
 