<template>
  <div id="login-container">
    <div id="login-box">
      <div id="logo-box">
        <img src="../assets/img/logo.png" alt>
      </div>
      <el-form :rules="loginFromRules" ref="loginFormRef" :model="loginFrom">
        <el-form-item  prop="username">
          <el-input v-model="loginFrom.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input v-model="loginFrom.password" type="password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :offset="15">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="restForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFrom: {
        username: '',
        password: ''
      },
      loginFromRules: {
        username: [
          // { required: true, message: '请输入用户名称', trigger: 'blur' },
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          // { required: true, message: '请输入用户名称', trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid === true) {
          // axios带着用户信息去到后端数据库校验
          const { data: res } = await this.$http.post('/login', this.loginFrom)
          // 判断用户名或者密码，真是性的校验失败
          if (res.meta.status !== 200) {
            return this.$message.error('用户名不存在')
          }
          // 通过浏览器的sessionStorage记录服务器返回的token信息
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('./home')
        }
      })
    },
    restForm() {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
#login-container {
  background-color: #2b4b6b;
  height: 100%;
  overflow: hidden;
  #login-box {
    width: 450px;
    height: 304px;
    background-color: #fff;
    border-radius: 6px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .el-form {
      position: absolute;
      bottom: 0px;
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
    }
    #logo-box {
      width: 130px;
      height: 130px;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid #eee;
      padding: 8px;
      box-shadow: 0 0 10px #eee;

      img {
        width: 100%;
        background-color: #eee;
        border-radius: 50%;
      }
    }
  }
}
</style>
