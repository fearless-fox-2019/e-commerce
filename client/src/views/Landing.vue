<template>
  <el-container class="landing">
    <el-header height="50px">
      <navbar />
    </el-header>
    <el-main>
      <div class="hero">
        <carousel />
      </div>
      <div class="mainpage">
        <el-row :gutter="10">
          <el-col :span="4">
            <div class="mainContent main-left">
              <h3>Category</h3>
              <accordion />
            </div>
          </el-col>
          <el-col :span="16">
            <div class="mainContent main-mid">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="All Product" name="first">
                  <div class="card-loop">
                    <card v-for="(item,i) in $store.state.allItem" :forCard="item" :key="i" />
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Pre-order-Item" name="Pre-order">Pre-order-Item </el-tab-pane>
                <el-tab-pane label="Sale" name="Sale">Sale</el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="mainContent main-right">
              <h3>News</h3>
              <!-- {{}} -->
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <el-footer>
      <footerlanding></footerlanding>
    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import navbar from "@/components/navbar.vue";
import card from "@/components/card.vue";
import carousel from "@/components/carousel.vue";
import accordion from "@/components/accordion.vue";
import footerlanding from "@/components/footerlanding.vue";

export default {
  components: {
    navbar,
    card,
    carousel,
    accordion,
    footerlanding
  },
  data(){
    return{
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab,event){

    }
  },
  created() {
    this.$store.dispatch("fetchItem");
  }
};
</script>

<style scoped>
.mainContent {
  border: 1px dashed blueviolet;
  /* height: 100%; */
  height: 100vh;
}
.card-loop {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  margin: 10px 10px 30px 13px;
}
.el-header {
  margin-bottom: 5px;
}
</style>

