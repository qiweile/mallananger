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
                <el-submenu v-for="(item,index) in leftList" :key="index" :index="index+''">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item v-for="(item1,index) in item.children" :key="index" :index="'/'+item1.path">
                        <i class="el-icon-menu"></i>
                        <span>{{item1.authName}}</span>
                    </el-menu-item>
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
        created(){
            this.getleftList();
        },
        data(){
            return {
                leftList: []
            }
        },
        methods: {
            async getleftList(){
                const res = await this.$http.get('menus')
                this.leftList = res.data.data
            },
            logup() {
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
  html,
  body {
    padding: 0;
    margin: 0;
  }

  .box,
  .el-container {
    height: 100%;
  }

  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 100%;
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

  .menu {
    height: 100%;
  }
</style>
