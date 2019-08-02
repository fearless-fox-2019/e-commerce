<template>
    <div id="regis">
        <div class="container">
            <div style="padding-top:50px; text-align: center; font-family: 'Playfair Display', serif;">
                <img src="../assets/gem.png" alt="" width="55">
                <strong style="fontSize:80px; color: pink">GEMS</strong>
                <img src="../assets/gem.png" alt="" width="55">
            </div>
            <div class="columns" style="padding-top: 10px">
                <div class="column has-text-centered" style="margin-top: 50px">
                    <div>
                        <strong style="fontSize: 50px; font-family: 'Indie Flower', cursive; color: #E79ACB;">REGISTER</strong>
                    </div>
                    <div class="column box is-8 is-offset-2">
                        <div class="notification" style="background-color: #E49AC9;">
                            <form>
                                <b-field>
                                    <b-input type="text"
                                        placeholder="Username"
                                        v-model="username"
                                        icon="account">
                                    </b-input>
                                </b-field>
                                <b-field>
                                    <b-input placeholder="Email"
                                        type="email"
                                        v-model="email"
                                        icon-pack="fas"
                                        icon="envelope">
                                    </b-input>
                                </b-field> 
                                <b-field>
                                    <b-input type="password"
                                        placeholder="Password"
                                        icon-pack="fas"
                                        v-model="password"
                                        icon="lock"
                                        password-reveal>
                                    </b-input>
                                </b-field>
                                <div style="display: flex; justify-content: space-around">
                                    <b-button type="is-primary is-rounded"
                                        inverted
                                        outlined
                                        @click="$router.push('/login')">
                                        Login
                                    </b-button>
                                    <b-button type="is-warning is-rounded"
                                        outlined
                                        @click="$router.push('/')">
                                        Home
                                    </b-button>
                                    <b-button type="submit is-primary is-rounded"
                                        @click="register"
                                        inverted
                                        outlined>
                                        Register
                                    </b-button>
                                </div>
                                <!-- <input type="text" v-model="username" placeholder="username">
                                <input type="text" v-model="email" placeholder="email">
                                <input type="password" v-model="password" placeholder="password"> -->
                                <!-- <button class="is-warning" type="submit">register</button>
                                <button @click="$router.push('/')">home</button>
                                <button @click="$router.push('/login')">login</button> -->
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
export default {
    data(){
        return{
            id: '',
            username: '',
            email: '',
            password: ''
        }
    },
    methods:{
        register(){
            this.$store.dispatch('registeruser', {
                username: this.username,
                email: this.email,
                password: this.password
            })
            .then(response => {
                console.log(response, 'register')
                console.log('masuk sini success')
                Swal.fire('Success Register !', 'Anda bisa login dahulu', 'success')
                this.$router.push("/login");
                this.username = ''
                this.password = ''
                this.email = ''
            })
            .catch(err => {
                Swal.fire('Oops!', 'something went wrong', 'error')
                this.$router.push("/register");
            })
        }
    }

}
</script>

<style scoped>
</style>
