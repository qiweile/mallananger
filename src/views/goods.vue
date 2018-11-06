<template>
    <el-card>
        <my-bracn level1="商品管理" level2="商品列表"></my-bracn>
        <el-card class="box">
            <el-input placeholder="请输入内容" class="searchInput">
              <el-button @click="selectuserlist" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" @click="adduser">添加用户</el-button>
        </el-card>
        <el-table :data="tableData" height="335" border style="width: 100%">
            <el-table-column type="index" label="#" width="50">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="600">
            </el-table-column>
            <el-table-column prop="goods_price" label="商家价格(元)" width="120">
            </el-table-column>
            <el-table-column prop="goods_weight" label="商品重量">
            </el-table-column>
            <el-table-column label="创建日期">
                <template slot-scope="scope">
                  {{scope.row.upd_time | fmtDate}}
                </template>
            </el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-edit" size="mini" plain circle
                      @click="EditBox(scope.row)"></el-button>
                      <el-button type="danger" icon="el-icon-delete"
                      size="mini" plain circle @click="showDeleBox(scope.row)"></el-button>
                  </template>
            </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </el-card>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [],
        currentPage: 1,
        dangqianIspage: 1,
        meipagetioashu: 4,
        total: -1
      }
    },
    methods: {
        handleSizeChange(val) {
          this.meipagetioashu = val
          this.currentPage = 1
          this.dangqianIspage = 1
          this.getlist()
          this.handleCurrentChange(1)
        },
        handleCurrentChange(val) {
          this.dangqianIspage = val
          this.currentPage = val
          this.getlist()
        },
        async getlist(){
            const res = await this.$http.get(`goods?pagenum=${this.dangqianIspage}&pagesize=${this.meipagetioashu}`)
            const { data:{goods,total}} = res.data
            this.tableData = goods
            this.total = total
            console.log(res)
        }
    },
    created () {
        this.getlist()
    }
  }
</script>

<style>
  .box{
    margin: 10px 0;
    height:80px;
    width:500px;
  }
  .searchInput {
    width: 350px;
  }
</style>
