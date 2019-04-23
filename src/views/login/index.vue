<template>
  <div class="login">
    <div class="container">
      <img src="@/assets/logo_index.png" alt>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-ruleForm">
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="checkpass" class="checkcode">
          <el-input v-model="ruleForm.checkpass"></el-input>
          <el-button plain @click="getCode">{{codeText}}</el-button>
        </el-form-item>
        <div class="allow">
          <div id="code"></div>
          <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
          <a href="#">用户协议</a>和
          <a href="#">隐私条款</a>
        </div>
        <el-form-item class="loginBtn">
          <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import gt from "@/components/gt"; //人机交互验证码
//  , getMobileCode , getCaptchas
import { loginByUsername, getMobileCode, getCaptchas } from "@/api/login";
export default {
  data() {
    return {
      ruleForm: {
        phone: "18516952650",
        checkpass: "123456"
      },
      // 发送验证码按钮显示文本
      codeText: "发送验证码",
      // 是否已经点击获取验证码
      haveSendCode: false,
      // 是否显示了人机交互验证
      showPeopleCode: false,
      checked: true,
      rules: {
        phone: [
          { required: true, message: "请输入正确的手机号", trigger: "blur" }
        ],
        checkpass: [{ required: true, message: "验证码错误", trigger: "blur" }]
      }
    };
  },
  methods: {
    async submitForm() {
      let { phone, checkpass } = this.ruleForm;
      if (!phone || !checkpass) {
        this.$message({
          message: "手机号和验证码不能为空",
          type: "warning"
        });
        return;
      }
      await loginByUsername(phone, checkpass);
       this.$router.replace({path:'/'}) //跳转
    },
    // 获取验证码，这里为了避免频繁发送，需要进行人机验证码验证
    async getCode() {
      if (!this.ruleForm.phone) {
        this.$message({
          type: "warning",
          message: "请输入手机号再试!"
        });
        return;
      }
      if (!this.haveSendCode) {
        // 在真正发送获取验证码之前，需要先进行人机交互验证
        if (!this.showPeopleCode) {
          // 是否上次点击还没有响应
          let mobile = this.ruleForm.phone;
          // 通过手机号获取一个人机交互验证码回来
          let result = await getCaptchas(mobile);
          // 如果没有显示人机交互验证码的时候，显示人机交互验证
          // 下面的代码固定定死
          window.initGeetest(
            {
              gt: result.gt,
              challenge: result.challenge,
              offline: !result.success,
              new_captcha: true,
              product: "float"
            },
            captchaObj => {
              // 现在已经显示了人机交互验证了，为了避免反复点击的时候出现多个人机交互验证，这里设置一个标记
              this.showPeopleCode = true;
              document.getElementById("code").innerHTML = "";
              // 将人机交互验证码添加到页面指定结构中
              captchaObj.appendTo("#code");
              // 人机交互验证通过之后的回调
              captchaObj.onSuccess(async () => {
                // 获取人机交互验证所产生的数据，因为后期的获取验证码需要将其中的一些数据传递到后台
                let codeResult = captchaObj.getValidate();
                // geetest_challenge: "69421ef7c7d7ccaf055e2e3c524a25af8x"
                // geetest_seccode: "0a86ee2f2a37e9cf2541a90fbc549a43|jordan"
                // geetest_validate: "0a86ee2f2a37e9cf2541a90fbc549a43"
                // console.log(codeResult)
                // 现在终于可以发送获取验证码的请求了
                // await:由于下面的请求是异步请求，我们得让这个请求完成之后再进行后续的操作
                await getMobileCode(mobile, {
                  challenge: codeResult.geetest_challenge,
                  validate: codeResult.geetest_validate,
                  seccode: codeResult.geetest_seccode
                });
                // 获取验证码成功后，显示‘发送验证码成功’，同时用户手机上可以接收到验证码
                this.$message({
                  message: "获取验证码成功",
                  type: "success"
                });
                this.haveSendCode = true;
                let count = 5;
                let timerId = setInterval(() => {
                  this.codeText = count + "秒后重新获取";
                  count--;
                  if (count == 0) {
                    this.codeText = "获取验证码";
                    this.haveSendCode = false;
                    this.showPeopleCode = false;
                    clearInterval(timerId);
                  }
                }, 1000);
              });
            }
          );
        }
        else{
          this.$message({
            message:'请先进行人机交互验证',
            type:'warning'
          })
        }
      }else{
        this.$message({
            message:'请等待一段时间再试',
            type:'warning'
          })
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/login_bg.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    background-color: #fff;
    width: 40%;
    padding: 20px 0;
    > img {
      width: 30%;
      display: block;
      margin: 0px auto;
    }
    .login-ruleForm {
      padding: 25px 30px 0;
      .el-form-item {
        margin-bottom: 20px;
      }
      .checkcode {
        .el-input {
          width: 60%;
          float: left;
        }
        .el-button {
          width: 35%;
          float: right;
        }
      }
      .allow {
        font-size: 12px;
        margin-bottom: 20px;
        color: #888;
        .el-checkbox {
          margin-right: 10px;
        }
        .el-checkbox__label {
          font-size: 12px;
        }
        a {
          color: skyblue;
        }
      }
    }
    .loginBtn {
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
