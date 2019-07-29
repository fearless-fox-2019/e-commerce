<template>
    <div style="margin-top: 8em;">
        <div class="row d-flex justify-content-center" style="width: 100%">
            <div class="col-md-12 d-flex justify-content-center" style="margin: 0; padding: 0; width: 100%">
                <h1 style="margin-bottom: 20px">User Profile</h1>
            </div>
            <div class="col-md-3">
                <div class="d-flex align-items-center">
                  <div class="circle-name d-flex justify-content-center align-self-center">
                    <span>{{user.name ? user.name[0].toUpperCase() : ""}}</span>
                  </div>
                  <div class="card-title d-flex align-items-center" style="margin: 0"><h4>{{user.name}}</h4></div>
                </div>
                <hr style="margin: 0px; margin-top: 5px; margin-bottom: 10px">
                <div class="d-flex justify-content-center">
                  <router-link :to="/user/+($route.params.id)+'/profile'">Profile</router-link>
                  <div style="padding-left: 20px; padding-right: 20px"> | </div>
                  <router-link :to="/user/+($route.params.id)+'/transaction'">Transaction</router-link>
                </div>
            </div>
        </div>
                <div class="card-body">
                    <router-view
                        :user="user"
                    ></router-view>
                </div>
    </div>
</template>

<script>
import api from '../apis/localhost';

export default {
  data() {
    return {
      user: {},
      transaction: {}
    }
  },
  methods: {
    getUser() {
      api.get(`/users/${this.$route.params.id}`)
        .then(({data}) => {
            this.user = data
        })
        .catch(err => console.log(err))
    }
  },
  mounted() {
    this.getUser()
  },
}
</script>

<style scoped>
  .circle-name {
    background-color: #bdbdbd;
    padding: 5px 10px;
    border-radius: 50%;
    height: 35px;
    width: 35px;
    align-self: center;
    margin-right: 1em;
  }

  .circle-name span {
    color: #fff;
    font-weight: 600;
  }

  h4 {
    margin: 0
  }

  p {
    margin: 0px
  }
</style>

