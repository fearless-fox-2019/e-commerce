<template>
  <el-row :gutter="20">
    <el-col :span="8" :offset="8">
      <div class="loginForm">
        <el-form>
          <el-input></el-input>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style scoped>
.loginForm {
  border: 2px dashed brown;
  border-radius: 4px;
  height: 70vh;
}
</style>
