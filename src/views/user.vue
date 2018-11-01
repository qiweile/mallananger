<template>
  <el-card class="box-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="searchArea">
      <el-input placeholder="请输入内容" class="input-with-select searchInput">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success">成功按钮</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="日期" width="100"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="100"></el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="100"></el-table-column>
      <el-table-column prop="role_name" label="用户状态" width="100"></el-table-column>
      <el-table-column prop="data" label="操作" width="100"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default{
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      async getList(x,num) {
        const AUTH_TOKEN = sessionStorage.getItem('token')
        this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        const list = await this.$http.get('users?pagenum='+x+'&pagesize='+num)
        if(list.status === 200){
          this.tableData = list.data.data.users
        }
      }

    },
    mounted() {
      this.getList(1,4)
    }
  }
</script>

<style>
  .box-card {
    height: 100%;
  }

  .searchArea {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .searchArea .searchInput {
    width: 350px;
  }
</style>
