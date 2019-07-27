<template>
  <div class="navbar">
    <div class="logo">
      <span>Arcadia</span>
    </div>
    <el-form @submit.prevent.native="search">
      <el-input
        placeholder="Search item..."
        autofocus="true"
        v-model="searchBar"
        class="search-bar-input"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-form>
    <div class="login-register-button">
      <el-popover
        ref="popover"
        placement="left-start"
        title="My cart"
        width="500"
        trigger="hover"
        content="this is content, this is content, this is content"
      >
        <el-table :data="cart">
          <el-table-column width="150" property="date" label="date"></el-table-column>
          <el-table-column width="100" property="name" label="name"></el-table-column>
          <el-table-column width="300" property="address" label="address"></el-table-column>
        </el-table>
      </el-popover  >
      <el-badge v-popover:popover :value="itemincart" class="item" v-show="this.$store.state.isLogin">
        <i class="el-icon-shopping-bag-1 iconbag" ></i>
      </el-badge>
        <i class="el-icon-shopping-bag-1 iconbag" v-show="!this.$store.state.isLogin" ></i>
      <a class="signin" @click="signIn" v-show="!this.$store.state.isLogin">
        <i class="el-icon-user" style="margin-right: 8px;"></i>Login/Register
      </a>
      <a class="myProfile" @click="myProfile">Hi, {{this.$store.state.logedUser.username}}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchBar: "",
      itemincart: 0,
      cart: [
        {
          date: "2016-05-02",
          name: "Jack",
          address: "New York City"
        },
        {
          date: "2016-05-04",
          name: "Jack",
          address: "New York City"
        },
        {
          date: "2016-05-01",
          name: "Jack",
          address: "New York City"
        },
        {
          date: "2016-05-03",
          name: "Jack",
          address: "New York City"
        }
      ]
    };
  },
  methods: {
    signIn() {
      console.log("menuju halaman login");
      this.$router.push("/sign");
    },
    signUp() {
      console.log("menuju halaman register");
    },
    search() {
      // console.log(this.searchBar)
      this.$store.dispatch("searchItem", this.searchBar);
      this.searchBar = "";
    },
    myProfile() {}
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.dispatch("whoami");
      this.$store.commit("changeStatus",true)
    }

  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Viga&display=swap");

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
}
.login-register-button {
  display: flex;
}
.signin {
  margin-right: 20px;
  cursor: pointer;
}
.signup {
  cursor: pointer;
}
.search-bar-input {
  width: 380px;
}
.iconbag {
  margin-right: 25px;
  font-size: 25px;
  cursor: pointer;
}
.logo {
  font-family: "Viga", sans-serif;
  font-size: 30px;
  margin: 0px;
  cursor: pointer;
}
.item {
  /* margin-top: 10px; */
  margin-right: 10px;
}
.el-badge.item {
  width: 30px;
}
.el-badge__content.is-fixed {
  right: 20px;
}
.myProfile {
  cursor: pointer;
}
</style>
