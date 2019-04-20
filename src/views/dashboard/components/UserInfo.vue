<template>
  <section class="dashboard-user">
    <el-row>
      <el-col :span="15">
        <dl class="user-info">
          <dd class="user-avatar"><img src="@/assets/avatar.jpg"></dd>
          <dt>黑马头条官方账号</dt>
          <dd class="tips">视频发布</dd>
        </dl>
      </el-col>
      <el-col :span="3">
        <div class="num">
          222
        </div>
        <div class="text">粉丝数</div>
      </el-col>
      <el-col :span="3">
        <div class="num">
          333
        </div>
        <div class="text">累计阅读量</div>
      </el-col>
      <el-col :span="3">
        <div class="num">
          444
        </div>
        <div class="text">累计评论数</div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.dashboard-user{
  background-color: #fff;
  padding: 10px;
  .user-info{
    font-size: 14px;
    .user-avatar{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      float: left;
      margin-right: 10px;
    }
    .tips{
      font-size: 12px;
      color: #ccc;
    }
  }
  .el-col:nth-last-of-type(-n+3){
    text-align: center;
    font-size: 12px;
    .text{
      color: #ccc;
    }
  }
}
</style>

