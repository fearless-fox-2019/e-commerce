<template>
    <div>
        <b-navbar type="light" variant="success" style="height: 80px;">
            <b-navbar-brand>
                <router-link to="/" id="router-link">
                    ToKuMu
                </router-link>
            </b-navbar-brand>

            <!-- <b-navbar-nav class="w-100 pl-3 pr-3">
                <b-nav-form class="w-100">
                    <b-form-input size="sm" class="mr-sm-2 flex-sm-fill" placeholder="Search">
                    </b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit" @click.prevent="">
                        Search
                    </b-button>
                </b-nav-form>
            </b-navbar-nav> -->

            <b-navbar-nav class="ml-auto">
                <b-nav-item v-b-modal.modal-login class="login-button" v-if="!loggedIn">
                    Login
                </b-nav-item>
                <b-nav-item v-b-modal.modal-register class="register-button bg-white" v-if="!loggedIn">
                    Register
                </b-nav-item>
                
                <b-nav-item v-b-modal="'modal-cart'" class="cart-button" v-show="loggedIn">
                    <router-link to="/cart" id="router-link">
                        Cart
                    </router-link>
                </b-nav-item>
                
                <b-nav-item v-b-modal="'modal-logout'" class="logout-button bg-white" v-show="loggedIn">
                    Logout
                </b-nav-item>
            </b-navbar-nav>

            <register></register>
            <login></login>
            <confirmation-modal :modalData="{id: 'logout', title: 'Logout', body: 'Are you sure to logout?'}" @execute="logout"></confirmation-modal>
        </b-navbar>
    </div>
</template>

<script>
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

export default {
    components: {
        Register,
        Login,
        ConfirmationModal
    },
    methods: {
        logout(){
            this.$store.commit("logout");
            this.$router.push("/")
        }
    },
    computed: {
        loggedIn(){
            return this.$store.getters.loggedIn;
        }
    }
}
</script>

<style>
    .register-button, .logout-button{
        border-radius: 5px;
        font-size: 20pt;
    }

    .login-button, .cart-button{
        color: white;
        margin-right: 20px;
        font-size: 20pt;
    }

    #router-link{
        text-decoration: none;
        color: inherit;
        font-size: 20pt;
    }

    #router-link :hover{
        color: white;
    }
    
</style>
