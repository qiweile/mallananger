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
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="100"></el-table-column>
      <el-table-column label="创建日期" width="180">
        <template slot-scope="scope">
            {{scope.row.create_time | fmtDate}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" :plain="true" :circle="true" size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" :plain="true" :circle="true" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" :plain="true" :circle="true" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="box">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default{
    data () {
      return {
        tableData: [],
        pagenum:1,
        pagesize:2,
        currentPage: 1,
        total:0
      }
    },

    methods: {
      handleSizeChange (pagesize) {
        this.currentPage = 1
        this.pagesize = pagesize
        this.getList()
      },
      handleCurrentChange(pagenum) {
        this.pagenum = pagenum
        this.getList()
      },
      async getList() {
        const AUTH_TOKEN = sessionStorage.getItem('token')
        this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
        const list = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
        if(list.status === 200){
          this.tableData = list.data.data.users
          this.total = list.data.data.total
          // console.log(list.data.data.total)
        }
      },

    },
    mounted () {
      this.getList()
    }
  }
</script>

<style>
  .box{
    width:180px;
  }
  .box-card {
    height: 100%;
  }

  .searchArea {
    width:454px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .searchArea .searchInput {
    width: 350px;
  }
</style>
