<template>
    <div class="navbar">
        <Hamburger class="hamburger-container" :toggle-click='toggleSidebar'/>
        <span class="company-container">江苏传智播客教育科技股份有限公司</span>
         <div class="right-menu">
      <el-tooltip content="搜索" effect="dark" placement="bottom">
       <el-input type="text" v-model="searchText" size="small" style='width:180px;margin-right:20px' placeholder="请输入搜索的文章内容" @keyup.enter.native='searchInfo'  prefix-icon="el-icon-search"  >
     </el-input>
      </el-tooltip>
      <el-tooltip content="消息" effect="dark" placement="bottom">
        <span>消息</span>
      </el-tooltip>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="userimg" class="user-avatar">
          <span class="user-name">{{username}}</span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/center">
            <el-dropdown-item>
              个人信息
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              git地址
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click = 'logout'>退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    </div>
</template>
<script>
import Hamburger from '@/components/Hamburger/index.vue'
import emitter from '@/utils/event'
import {clearUser} from '@/utils/store'
export default {
  data(){
    return {
      user:{
        name:'',
        photo:''
      },
      searchText:''
    }
  },
    components: {
        Hamburger
    },
    created(){
      // 获取当前用户信息
      // this.user = getUser()
      // emitter.$on('userChange',() => {
      //   this.user = getUser()
      // })
    },
    methods:{
      toggleSidebar(){
        emitter.$emit('changeCollepse')
      },
      logout(){
        clearUser()
        this.$router.push({path:'/login'})
      },
      searchInfo(){
        if(this.searchText){
          // 路由跳转，传递关键字
        }else{
          // 路由跳转，不传递参数，查询所有数据
        }
      }
    },
    computed:{
      username(){
        return this.user.name ? this.user.name : '未登陆'
      },
      userimg(){
        return this.user.photo ? this.user.photo : require('@/assets/avatar.jpg')
      }
    }
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  .hamburger-container {
    float: left;
    padding-top: 5px;
    margin-left: 10px;
  }
  .company-container {
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .user-name {
          margin-left: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
