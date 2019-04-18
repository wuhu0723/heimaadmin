<template>
  <div class="app">
    <el-container>
      <el-aside width="200px">
          <sidebar></sidebar>
      </el-aside>
      <el-container>
        <el-header>
            <navbar></navbar>
        </el-header>
        <el-main>
            <appmain></appmain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Navbar from "@/views/layout/components/NavBar";
import Sidebar from "@/views/layout/components/SiderBar";
import Appmain from "@/views/layout/components/AppMain";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    Appmain
  }
};
</script>
<style lang="scss" scoped>
</style>


