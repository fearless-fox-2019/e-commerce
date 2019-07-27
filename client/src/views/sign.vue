<template>
  <div class="sign">
    <el-row>
      <el-col :span="8" :offset="8">
        <div class="loginform" v-if="whatform === 'loginform'">
          <p class="signinformtitle">Login</p>
          <el-form :label-position="'top'" ref="form" :model="signinform" label-width="120px">
            <el-form-item label="Username / Email">
              <el-input autofocus="true" class="signininput" v-model="signinform.ue"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input class="signininput" type="password" v-model="signinform.password"></el-input>
            </el-form-item>
            <span class="donthave">Don`t have an account? <span style="cursor: pointer; color: blue" @click="changeForm">Register here</span> </span>
            <div >
              <el-button class="buttonform" type="primary" @click="signIn">Sign In</el-button>
              <el-link class="buttonform" type="info" @click="changeForm">Register</el-link>
              <el-divider></el-divider>
            </div>
          </el-form>
          <span>Or sign in with: </span>
          <div class="loginchoice">
              <span style="margin: 5px">facebook</span>
              <span style="margin: 5px">twitter</span>
              <span style="margin: 5px">google</span>
              <span style="margin: 5px">github</span>
          </div>
        </div>
      </el-col>
      <el-col :span="8" :offset="8">
        <div class="registerform" v-if="whatform === 'registerform'">
          <p class="signinformtitle">Register</p>
          <el-form :label-position="'top'" ref="form" :model="signupform" label-width="120px">
            <el-form-item label="Username">
              <el-input autofocus="true" class="signininput" v-model="signupform.username"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input class="signininput" type="email" v-model="signupform.email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input class="signininput" type="password" v-model="signupform.password"></el-input>
            </el-form-item>
            <span class="donthave">Already have an account? <span style="cursor: pointer; color: blue" @click="changeForm">Login here</span> </span>
            <div >
              <el-button class="buttonform" type="primary" @click="signUp">Sign Up</el-button>
              <!-- <el-link class="buttonform" type="info" @click="changeForm">Register</el-link> -->
              <el-divider></el-divider>
            </div>
          </el-form>
          <span>Or sign in with: </span>
          <div class="loginchoice">
              <span style="margin: 5px">facebook</span>
              <span style="margin: 5px">twitter</span>
              <span style="margin: 5px">google</span>
              <span style="margin: 5px">github</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      whatform: "loginform",
      signinform: {
        ue: "",
        password: ""
      },
      signupform: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signIn() {
        console.log(this.signinform,' melihat signin form')
        this.$store.dispatch('signinUser', this.signinform)
    },
    signUp() {
        console.log(this.signupform, ' melihat signup form')
        this.$store.dispatch('signupUser', this.signupform)
    },
    changeForm() {
      if (this.whatform === "loginform") {
        this.whatform = "registerform";
      } else {
        this.whatform = "loginform";
      }
    }
  }
};
</script>

<style scoped>
.loginform {
  width: 400px;
  height: 550px;
  margin: 10px auto;
  margin-top: 50px;
  border: 2px dashed coral;
  background-color: whitesmoke;
}
.registerform {
  width: 400px;
  height: 650px;
  margin: 10px auto;
  margin-top: 50px;
  border: 2px dashed coral;
  background-color: whitesmoke;
}
.el-form-item {
  margin: 0px;
}
.el-form--label-top .el-form-item__label {
  padding: 0px;
}
.rightloginform {
  border: 1px solid transparent;
}
.signininput {
  width: 300px;
}
.signinformtitle {
  margin: 10px 5px 6px 5px;
  font-size: 60px;
}
.buttonform{
    margin: 20px 15px;
}
.donthave{
    font-size: 12px;
}
</style>
