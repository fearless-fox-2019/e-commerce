<template>
  <div class="product">
    <el-container>
      <el-header>
        <navbar></navbar>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="6">
            <div class="left">
              <h3  class="categorytitle">Category</h3>
              <div v-for="(category,i) in this.$store.getters.category" :key="i">
                <span @click="byCategory(category)" class="categoryitem">{{category}}</span>
                <hr>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="right">
              <router-view />
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import navbar from "@/components/navbar.vue";

export default {
  components: {
    navbar
  },
  data() {
    return {};
  },
  methods: {
      byCategory(category){
          console.log(category,'ini yyang dicari')
          this.$store.dispatch('searchbycategory', category)
      }
  },
  created() {
    this.$store.dispatch("fetchItem");
    this.$store.dispatch("whoami");
  }
};
</script>

<style scoped>
.left {
  /* border: 1px dashed blue; */
  min-height: 80vh;
}
.right {
  /* border: 1px dashed blue; */
  min-height: 80vh;
}
.categoryitem{
    cursor: pointer;
}
</style>
