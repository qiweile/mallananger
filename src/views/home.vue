<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../assets/logo.png" alt="">
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">前端51</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="logup()">退出登录</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu class="menu" :router="true" :unique-opened="true" default-active="1">
          <el-submenu index="1">
            <template slot="title">
    <i class="el-icon-location"></i>
    <span>用户管理</span>
</template>

<el-menu-item index="/users">
<i class="el-icon-menu"></i>
用户列表
</el-menu-item>
</el-submenu>

<el-submenu index="2">
<template slot="title">
  <i class="el-icon-location"></i>
  <span>权限管理</span>
</template>

<el-menu-item index='/role'>
<i class="el-icon-menu"></i>
角色列表</el-menu-item>
<el-menu-item index="/right">
<i class="el-icon-menu"></i>
权限列表</el-menu-item>
</el-submenu>

<el-submenu index="3">
<template slot="title">
  <i class="el-icon-location"></i>
  <span>商品管理</span>
</template>

<el-menu-item index="3-1">
<i class="el-icon-menu"></i>
商品列表</el-menu-item>
<el-menu-item index="3-2">
<i class="el-icon-menu"></i>
分类参数</el-menu-item>
<el-menu-item index="3-3">
<i class="el-icon-menu"></i>
商品分类</el-menu-item>
</el-submenu>

<el-submenu index="4">
<template slot="title">
  <i class="el-icon-location"></i>
  <span>订单管理</span>
</template>

<el-menu-item index="4-1">
<i class="el-icon-menu"></i>
订单列表</el-menu-item>
</el-submenu>

<el-submenu index="5">
<template slot="title">
  <i class="el-icon-location"></i>
  <span>数据统计</span>
</template>

<el-menu-item index="5-1">
<i class="el-icon-menu"></i>
数据报表</el-menu-item>
</el-submenu>

</el-menu>
</el-aside>
<el-main>
<router-view></router-view>
</el-main>
</el-container>
</el-container>
</template>

<script>
export default {
  beforeCreate () {
    const token = sessionStorage.getItem('token')
    if (!token) {
      this.$message.warning('请先登录')
      this.$router.push({
        name: 'login'
      })
    }
  },
  methods: {
    logup () {
      sessionStorage.clear()
      this.$router.push({
        name: 'login'
      })
      this.$message.success('退出登录成功')
    }
  }
}
</script>

<style>
  html,body{
    padding:0;
    margin:0;
  }
  .box,.el-container{
    height:100%;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height:100%;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .menu{
    height:100%;
  }
</style>
