<template>
  <div class="profile-page">
    <b-container fluid>
      <h2 style="display: flex; margin-left: 5%;">{{user.firstname}} {{user.lastname}}</h2>
      <span style="display: flex; margin-left: 5%;">{{user.email}}</span>
      <br />
      <b-row>
        <b-col cols="3" class="user-profile">
          <div class="detail-profile">
            <h4 style="color:white; margin-top:30px;">Profile Picture</h4>
            <img
              src="https://storage.googleapis.com/mini-wpstorage-friska/1563714564898nopic_192.gif"
              alt="profile-picture"
              style="margin-bottom: 10px;"
            />
            <br />
            <span style="color: white;">
              <strong>Hello,</strong>
              {{user.firstname}} {{user.lastname}}
            </span>
          </div>
        </b-col>
        <b-col cols="7" class="user-detail">
          <br />
          <br />
          <b-tabs content-class="mt-3" fill>
            <b-tab title="Profile" active>
              <div class="tab-profile">
                <b-form-group
                  id="fieldset-horizontal"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Firstname"
                  label-for="input-horizontal"
                >
                  <b-form-input id="input-horizontal" :value="user.firstname"></b-form-input>
                </b-form-group>

                <b-form-group
                  id="fieldset-horizontal"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Lastname"
                  label-for="input-horizontal-3"
                >
                  <b-form-input id="input-horizontal-2" :value="user.lastname"></b-form-input>
                </b-form-group>

                <b-form-group
                  id="fieldset-horizontal"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Email"
                  label-for="input-horizontal-3"
                >
                  <b-form-input id="input-horizontal-3" :value="user.email"></b-form-input>
                </b-form-group>

                <b-form-group
                  id="fieldset-horizontal"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  label="Password"
                  label-for="input-horizontal-4"
                >
                  <b-form-input id="input-horizontal-4" type="password"></b-form-input>
                </b-form-group>
              </div>

              <button class="button-cart">Update</button>
            </b-tab>
            <b-tab title="Selling">
              <form-add></form-add>
            </b-tab>
            <b-tab title="History">
              <p>I'm the tab with the very, very long title</p>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "../config/axios.js";
import formAdd from "../components/formAddProcuts.vue";
export default {
  components: {
    formAdd
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    findUser() {
      axios({
        method: `GET`,
        url: `/users/${localStorage.getItem("UserId")}`
      })
        .then(({ data }) => {
          console.log(data);
          this.user = data;
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!" +JSON.stringify(err)         
            });
        });
    }
  },
  created() {
    this.findUser();
    console.log(this.user);
  }
};
</script>

<style>
.profile-page {
  margin-top: 20px;
}
.detail-profile {
  margin-top: 4%;
  margin-bottom: 4%;
  padding: 4%;
  height: 100vh;
  background-color: grey;
}

.user-profile {
  margin-left: 3%;
  border: 1px solid grey;
  height: 100;
}

.user-detail {
  margin-left: 3%;
  border: 1px solid grey;
  height: 100;
}

.button-cart {
  border: none;
  height: 40px;
  width: 200px;
  border-radius: 3%;
  background-color: #fcca46;
}
</style>
