<template>
  <div class="navbar">
    <h3>ini header</h3>
    <el-form>
      <el-input placeholder="Search item..." v-model="searchBar" class="search-bar-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-form>
    <div class="login-register-button">
      <a class="signin" @click="signIn">Login</a>
      <a class="signup" @click="signUp">Register</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchBar: ""
    };
  },
  methods: {
    signIn() {
      console.log("menuju halaman login");
    },
    signUp() {
      console.log("menuju halaman register");
    }
  }
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
}
.login-register-button {
  display: flex;
}
.signin {
  margin-right: 20px;
}
.search-bar-input {
  width: 380px;
}
</style>
