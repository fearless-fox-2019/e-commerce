<template>
  <div class="customer">
      <el-header height="50px">
      <navbar>
        <a @click="signout" v-show="this.$store.state.isLogin" class="signOut"> Log Out</a>
      </navbar>
      </el-header>
    <el-row class="main">
      <el-col :span="6" class="left">
        <div class="grid-content bg-purple">
          <div class="untukimage"></div>
          <div class="data">
            <p>{{this.$store.state.logedUser.username}}</p>
            <p>{{this.$store.state.logedUser.email}}</p>
            <p>{{this.$store.state.logedUser.createdAt}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple-light">
          <el-row>
            <el-col :span="24" class="righttop">
              <div class="grid-content bg-purple">
                <!-- 2.1.1 -->
                <el-link class="righttopmenu" type="primary" @click="changeTab('wishlist')">Wishlist</el-link>
                <el-link class="righttopmenu" type="primary" @click="changeTab('cart')">Cart</el-link>
                <el-link
                  class="righttopmenu"
                  type="primary"
                  @click="changeTab('transaction')"
                >Transaction</el-link>
                <el-link
                  class="righttopmenu"
                  type="primary"
                  @click="changeTab('myReview')"
                >My Review</el-link>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="rightbot">
              <div class="grid-content bg-purple">
                <wishlist v-if="tab === 'wishlist'" />
                <cart v-if="tab === 'cart'" />
                <transaction v-if="tab === 'transaction'" />
                <review v-if="tab === 'myReview'" />
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import cart from "@/components/cart.vue";
import wishlist from "@/components/wishlist.vue";
import transaction from "@/components/transaction.vue";
import review from "@/components/review.vue";

export default {
  components: {
    navbar,
    cart,
    wishlist,
    transaction,
    review
  },
  data() {
    return {
      tab: "wishlist"
    };
  },
  methods: {
    changeTab(directionTab) {
      console.log("masuk lohhh", directionTab);
      this.tab = directionTab;
    },
    signout(){
      console.log('mau keluar nich')
      this.$store.dispatch('signout')
    }
  },
  created() {
    this.$store.dispatch("whoami");
  }
};
</script>

<style scoped>
.left {
  border: 1px dashed blueviolet;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-content: center; */
  align-items: center;
}
.righttop {
  border: 1px dashed blueviolet;
  display: flex;
  justify-content: flex-start;
  padding: 15px;
}
.righttopmenu {
  margin: 5px 20px;
  padding: 10px;
  /* border: 1px solid grey;
    border-radius: 5px; */
}
.rightbot {
  border: 1px dashed blueviolet;
}
.untukimage {
  height: 150px;
  width: 150px;
  border: 2px solid blanchedalmond;
  border-radius: 5px;
  align-items: center;
}
.main{
    padding-top: 25px;
}
.el-header{
  margin-top: 20px;
}
.signOut{
  cursor: pointer;
}
</style>
