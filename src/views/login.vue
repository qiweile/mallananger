<template>
  <div class="login-wrap">
    <el-form
    label-position="top"
    label-width="80px"
    :model="formData"
    class="login-form">
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-button" @click="login()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default{
  data () {
    return{
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      const res = await this.$http.post('login', this.formData)
      const { data, meta } = res.data
      if (meta.status === 200) {
        const token = data.token
        sessionStorage.setItem('token', token)
        this.$router.push('/')
        this.$message.success(meta.msg)
      } else {
        this.$message.error(meta.msg)
      }
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-form .login-button {
  width: 100%;
}
</style>
