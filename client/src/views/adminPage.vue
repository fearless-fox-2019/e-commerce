<template>
  <div class="admin">
    <el-container>
      <el-header height="50px">
        <navbar>
            <a @click="signout" v-show="this.$store.state.isLogin" class="signOut"> Log Out</a>
        </navbar>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6" class="left">
            <div class="aaa">hehehe</div>
          </el-col>
          <el-col :span="18">
            <div class="menuparent">
              <el-link
                v-for="(menu, i) in menubar"
                :key="i"
                class="menu"
                @click="changeTab(menu)"
              >{{ menu }}</el-link>
            </div>
            <hr />
            <div class="allProduct" v-if="displayPage === 'all Product'">
              <allProduct @changetab="changeTabWithItem"></allProduct>
            </div>
            <div class="addItem" v-else-if="displayPage === 'add Item'">
              {{displayPage}}
              <addItem></addItem>
            </div>
            <div class="editItem" v-else-if="displayPage === 'edit Item'">
              {{displayPage}}
              <editItem :editData="editData"></editItem>
            </div>
            <div class="allTransaction" v-else-if="displayPage === 'all Transaction'">
              {{displayPage}}
              <allTransaction></allTransaction>
            </div>
            <div class="allReview" v-else-if="displayPage === 'all Review'">
              {{displayPage}}
              <allReview></allReview>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import card from "@/components/card.vue";
import allProduct from "@/components/admin/allProduct.vue";
import addItem from "@/components/admin/addItem.vue";
import editItem from "@/components/admin/editItem.vue";
import allReview from "@/components/admin/allReview.vue";
import allTransaction from "@/components/admin/allTransaction.vue";

export default {
  data() {
    return {
      menubar: [
        "all Product",
        "add Item",
        "edit Item",
        "all Transaction",
        "all Review"
      ],
      displayPage: "all Product",
      editData: {}
    };
  },
  methods: {
    changeTab(page) {
    //   console.log(page, "huehehehe");
      this.displayPage = page;
      this.editData = null
    //   console.log(this.displayPage, "huehehehe");
    },
    changeTabWithItem(data){
        // console.log(data,'ini data yang diedit')
        this.displayPage = data.pageDir
        this.editData = data.data
    },
    signout(){
      console.log('mau keluar nich')
      this.$store.dispatch('signout')
    }
  },
  created() {
    this.$store.dispatch("fetchItem");
  },
  components: {
    navbar,
    card,
    allProduct,
    addItem,
    editItem,
    allReview,
    allTransaction
  },
  created() {
    this.$store.dispatch("whoami");
    this.$store.commit("changeStatus", true);
  }
};
</script>

<style scoped>
.left {
  border: 1px dashed blue;
}
.menuparent {
  display: flex;
  align-items: flex-start;
  padding-left: 40px;
  border: 1px dashed blue;
}
.menu {
  padding: 4px 17px;
  /* border-left: 1px solid black;
  border-right: 1px solid black; */
}
.card-loop {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  margin: 10px 10px 30px 13px;
}
.signOut{
  cursor: pointer;
}
</style>
