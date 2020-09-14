<template>
  <div class="login-box">
    <div class="container">
      <div class="title-box">
        <div class="title-box-sub">
          <img :src="logoUrl" alt="logo" width="36">
          <h1>似水流年 公司</h1>
        </div>
      </div>
      <div class="form-box">
        <el-form :model="userForm" :rules="loginRules" ref="userForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
          <h3 class="title">欢迎登陆</h3>
          <el-form-item prop="userName">
            <el-input type="text" v-model="userForm.userName" @keyup.enter.native="loginBtn" prefix-icon="iconfont iconicon" auto-complete="off" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :type="passwords" v-model="userForm.password" @keyup.enter.native="loginBtn" prefix-icon="iconfont iconmima" auto-complete="off" placeholder="请输入密码"></el-input>
            <i class="icon-pwd iconfont iconpassword-show" :class="{iconxianshi: pwdShow}" @click="switchBtn"></i>
          </el-form-item>
          <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
          <el-form-item class="login-btn">
            <el-button type="primary" style="width:100%;" @click="loginBtn" :loading="logining">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import session from '@/utils/session' // 引入sessiontorage组件
  // import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        userForm: {
          userName: 'admin',
          password: '123456'
        },
        loginRules: {
          userName: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        passwords: 'password',
        pwdShow: true,
        checked: true,
        logoUrl: require('../assets/logo.png')
      }
    },
    methods: {
      loginBtn () {
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            let data = {
              userName: this.userForm.userName,
              password: this.userForm.password
            }
            this.logining = true
            session.set('user', JSON.stringify(data))
            session.set('token', data.token)
            this.$router.push({ path: '/clientList' })
          }
        })
      },
      // 密码显示隐藏
      switchBtn () {
        this.pwdShow = !this.pwdShow
        this.passwords = this.passwords === 'password' ? 'text' : 'password'
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: url('../assets/bg1.png') no-repeat;
    background-size: 100% 100%;
    .container {
      display: flex;
      width: 800px;
      height: 430px;
      -webkit-animation: offsetLeft 1s ease-in-out both;
      animation: offsetLeft 1s ease-in-out both;
      box-shadow: 0 0 100px #cac6c6;
      border-radius: 4px;
      overflow: hidden;
      .title-box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        .title-box-sub {
          text-align: center;
          img {
            overflow: hidden;
            border-radius: 50%;
          }
          h1 {
            margin-top: 10px;
            font-size: 36px;
            color: #fff;
            font-weight: bold;
            font-family: fzlt;
          }
        }
      }
      .form-box {
        flex: 1;
        background-color: rgba(255, 255, 255, 1);
        .login-btn {
          margin-top: 20px;
        }
      }
      .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        padding: 35px 35px 15px 35px;
        background: #fff;
        .title {
          margin: 0px auto 50px auto;
          font-size: 26px;
          text-align: center;
          font-weight: bold;
          color: #1272c9;
        }
        .remember {
          margin: 0px 0px 35px 0px;
        }
      }
      .icon-pwd {
        position: absolute;
        top: 0;
        right: 10px;
        z-index: 9;
        cursor: pointer;
      }
    }
  }

/* 设置动画 */
@keyframes offsetLeft {
  0%{
    opacity:0;
    -webkit-transform:translate3d(0, -20px, 0);
    transform:translate3d(0, -20px, 0);
  }100%{
    opacity:1;
    -webkit-transform:translate3d(0, 0, 0);
    transform:translate3d(0, 0, 0);
  }
}
</style>
<style lang="less">
.login-box {
  .form-box {
    .el-input__inner {
      border-top-width: 0px;
      border-left-width: 0px;
      border-right-width: 0px;
      border-bottom-width: 1px;
      border-radius: 0;
    }
    .iconfont {
      color: #1272c9;
    }
    input:-internal-autofill-previewed,
    input:-internal-autofill-selected {
      background-image: none !important;
        color: rgb(0, 0, 0) !important;
        transition: background-color 5000s ease-in-out 0s !important;
    }
    .el-button {
      color: #FFF;
      background-color: #1272c9;
      border-color: #1272c9;
      &:hover {
        background-color: rgba(18,114,201,.8);
        border-color: transparent;
      }
    }
  }
}
</style>
