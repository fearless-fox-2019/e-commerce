<template>
  <el-container class="landing">
    <el-header height="80px">
      <navbar />
    </el-header>
    <el-main>
      <div class="hero"></div>
      <div class="mainpage">
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple"></div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import navbar from "@/components/navbar";

export default {
  components: {
    navbar
  }
};
</script>

<style scoped>
</style>

