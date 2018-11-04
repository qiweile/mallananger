<template>
  <div>
    <my-bracn level1="权限管理" level2="权限列表"></my-bracn>
    <el-table border :data="list" class="box" height="480" border style="width: 100%">
      <el-table-column type="index" label="#" width="180">
      </el-table-column>
      <el-table-column prop="authName" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="180">
      </el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list:[]
      }
    },
    created() {
      this.showList()
    },
    methods: {
      async showList() {
        const res = await this.$http.get(`rights/list`)
        console.log(res)
        this.list = res.data.data
      }
    }
  }

</script>

<style>
  .box {
    margin-top: 20px;
  }
</style>
