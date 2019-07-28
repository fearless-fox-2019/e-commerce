<template>
    <div id='login'>
        <div class="container">
            <div style="padding-top:50px; text-align: center; font-family: 'Playfair Display', serif;">
                <img src="../assets/gem.png" alt="" width="55">
                <strong style="fontSize:80px; color: pink">GEMS</strong>
                <img src="../assets/gem.png" alt="" width="55">
            </div>
            <div class="columns" style="padding-top: 10px">
                <div class="column has-text-centered" style="margin-top: 50px">
                    <div>
                        <strong style="fontSize: 50px; font-family: 'Indie Flower', cursive; color: #E79ACB; ">LOGIN</strong>
                    </div>
                    <div class="column box is-8 is-offset-2">
                        <div class="notification" style="background-color: #E49AC9;">
                            <!-- <form @submit.prevent="login">
                                <b-field label="Username">
                                    <b-input v-model="user.email" maxlength="30" required></b-input>
                                </b-field>

                                <b-field label="Password">
                                    <b-input v-model="user.password" type="password" maxlength="30" required></b-input>
                                </b-field>
                                <b-field>
                                    <p class="control">
                                    <button class="button is-dark" type="submit">Log in</button>
                                    </p>
                                </b-field>
                            </!--> 
                            <!-- <form @submit.prevent="login">
                                <b-field>
                                    <b-input placeholder="Email"
                                        v-model="email"
                                        type="email"
                                        icon-pack="fas"
                                        icon="envelope">
                                    </b-input>
                                </b-field> 
                                <b-field>
                                    <b-input type="password"
                                        v-model="password"
                                        placeholder="Password"
                                        icon-pack="fas"
                                        icon="lock"
                                        password-reveal>
                                    </b-input>
                                </b-field>
                                <div style="display: flex; justify-content: space-around">
                                    <b-button type="submit is-primary is-rounded"
                                        inverted
                                        outlined>
                                        Login
                                    </b-button>
                                    <b-button type="button is-warning is-rounded"
                                        outlined
                                        @click="$router.push('/')">
                                        Home
                                    </b-button>
                                    <b-button type="button is-primary is-rounded"
                                        inverted
                                        outlined
                                        @click="$router.push('/register')">
                                        Register
                                    </b-button>
                                </div>
                            </form> -->
                            <form @submit.prevent="login">
                                <input type="text" v-model="email">
                                <input type="password" v-model="password">
                                <button type="submit">login</button>
                                <button @click="$router.push('/')">home</button>
                                <button @click="$router.push('/register')">register</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="">
                        <img width="500" src="../assets/3.gif" alt="Seponsorwkwkwk" srcset="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            id: '',
            username: '',
            email:'',
            password:''
        }
    },
    computed:{
        ...mapState(['userLogin'])
    },
    methods:{
        login(){
            this.$store.dispatch('USER_LOGIN', {
                email: this.email,
                password: this.password
            })
            console.log(this.$store.state.userLogin, 'user views')
            if(localStorage){
                this.$router.push("/");
                Swal.fire('Success Login !', 'Anda bisa memilih product', 'success')
            }else{
                Swal.fire('Oops!', 'something went wrong', 'error')
                this.$router.push("/login");
            }
            // if(!response){
            //         Swal.fire('Failed to Login !', 'something went wrong', 'error')
            // }else{
            //     console.log('masuk sini success')
            //     this.$router.push("/");
            //     Swal.fire('Success Login !', 'Anda bisa memilih product', 'success')
            //     this.email = ''
            //     this.password = ''
            // }
            // if(!userLogin){
            //     Swal.fire('Oops!', 'something went wrong', 'error')
            //     this.$router.push("/login");
            // }
        }
    }

}
</script>

<style scoped>
</style>
