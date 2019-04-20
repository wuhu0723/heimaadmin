<template>
  <div class="app">
    <el-container>
      <el-aside width="200px" :style="{width: collapse ? '65px' : '200px'}">
          <sidebar :collapse='collapse'></sidebar>
      </el-aside>
      <el-container style="background:#eee">
        <el-header style="height:50px">
            <navbar></navbar>
        </el-header>
        <el-main style="padding:0">
            <appmain></appmain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Navbar from "./components/NavBar.vue"
import Sidebar from "./components/SiderBar.vue"
import Appmain from "./components/AppMain.vue"
import emitter from '@/utils/event'
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    Appmain
  },
  data(){
    return {
      collapse:false
    }
  },
  created(){
    emitter.$on('changeCollepse',() => {
      this.collapse = !this.collapse
    })
  }
};
</script>
<style lang="scss" scoped>
.el-header{
  height: 50px;
  padding: 0;
}
.el-aside{
  background-color: #000;
}
.el-main{
  padding: 10px;
}
.hiddeSideBar{
  width: 60px !important;
  .logo {
    > img{
      display: none;
    }
  }
}
</style>


