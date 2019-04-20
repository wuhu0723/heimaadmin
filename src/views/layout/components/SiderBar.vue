<template>
  <div class="sidebar" style='overflow:hidden;transition:width 1s;'>
    <div class="logo">
      <img src="@/assets/logo_admin.png" alt>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="collapse"
    >
      <el-submenu :index="item.path" v-for='item in items' :key='item.path'>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="subitem.path" v-for='subitem in item.children' :key='subitem.path'>
          <i class="el-icon-location"></i>
          <span>{{subitem.title}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import {MenuData} from '@/constants/menus.js'
export default {
  props:['collapse'],
  data(){
    return {
      items:MenuData
    }
  }
}
</script>
<style lang="scss" scoped>
.logo{
    height: 70px;
    background-color: #000;
   padding-left: 15px;
   padding-top: 13px;
}
.aside{
    
}
.el-menu-vertical-demo{
  // height: calc(100vh - 70px);
  height: 100%;
  border-right:none;
}

</style>


