<template>
    <el-card>
        <my-bracn level1="商品管理" level2="商品分类"></my-bracn>
        <div class="searchArea">
            <el-button type="ccc" @click="additem">添加分类</el-button>
        </div>


        <el-table border :data="goodscate" class="box" height="420" style="width: 100%">

              <el-tree-grid treeKey="cat_id" childKey="children" levelKey="cat_level" parentKey="cat_pid" prop="cat_name" label="分类名称" :indentSize="30">

              </el-tree-grid>
              <el-table-column prop="path" label="级别" width="180">
                  <template slot-scope="scope">
                    <span v-if= "scope.row.cat_level===0">一级</span>
                    <span v-if= "scope.row.cat_level===1">二级</span>
                    <span v-if= "scope.row.cat_level===2">三级</span>
                  </template>
              </el-table-column>
              <el-table-column prop="level" label="是否有效">
                  <template slot-scope="scope">
                    <span v-if= "scope.row.cat_deleted===false">有效</span>
                    <span v-if= "scope.row.cat_deleted===true">无效</span>
                  </template>
              </el-table-column>
              <el-table-column prop="level" label="操作">
                  <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-edit" size="mini" plain circle
                      @click="EditBox(scope.row)"></el-button>
                      <el-button type="danger" icon="el-icon-delete"
                      size="mini" plain circle @click="showDeleBox(scope.row)"></el-button>
                  </template>
              </el-table-column>
        </el-table>
              <!-- 添加用户 -->
        <el-dialog
            title="添加分类"
            :visible.sync="dialogVisibleAdditem"
            width="600px">
            <el-form :label-position="labelPosition" label-width="60px">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="formdata.cat_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-cascader
                      change-on-select
                      clearable
                      expand-trigger="hover"
                      :options="options"
                      :props="defaultProp"
                      v-model="selectedOptions">
                    </el-cascader>
                  </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleAdditem = false">取 消</el-button>
              <el-button type="primary" @click="additemgo">确 定</el-button>
            </span>
        </el-dialog>
              <!-- 修改商品分类 -->
        <el-dialog
            title="修改商品分类"
            :visible.sync="dialogVisible"
            width="30%">
            <el-input
              placeholder="请输入内容"
              v-model="itemName"
              clearable>
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible">取 消</el-button>
              <el-button type="primary" @click="Edittij()">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>

<script>
const ElTreeGrid = require('element-tree-grid')
export default {
    components: {
        ElTreeGrid
    },
    data(){
        return{
            formdata: {},
            labelPosition: 'left',
            defaultProp: {
              value: 'cat_id',
              label: 'cat_name',
              children:'children'
            },
            options: [],
            selectedOptions: [],
            goodscate: [],
            children:'children',
            formLabelWidth:'120px',
            dialogVisible: false,
            dialogVisibleAdditem: false,
            itemName: '',
            editBoxId: -1,
        }
    },
    methods:{
        showDeleBox(item) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              const res = await this.$http.delete(`categories/${item.cat_id}`)
              if(res.data.meta.status === 200){
                  this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.goodsList()
              }
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
        },
        async additemgo(){
            if(this.selectedOptions.length === 0){
              this.formdata.cat_pid = 0
              this.formdata.cat_level = 0
            }else if(this.selectedOptions.length === 1){
              this.formdata.cat_level = 1
              this.formdata.cat_pid = this.selectedOptions[0]
            }else if(this.selectedOptions.length === 2){
              this.formdata.cat_pid = this.selectedOptions[1]
              this.formdata.cat_level = 2
            }
            const res = await this.$http.post(`categories`,this.formdata)
             const {  meta: { status, msg } } = res.data
             console.log(status)
            if(status === 201){
              this.$message.success(msg)
              this.goodsList()
              this.dialogVisibleAdditem = false
            }
        },
        async additem(){
          // cat_pid	分类父 ID	不能为空
          // cat_name	分类名称	不能为空
          // cat_level	分类层级	不能为空
          this.dialogVisibleAdditem = true
          const res = await this.$http.get(`categories?type=`+2)
          this.options = res.data.data
        },
        async Edittij(){
          this.dialogVisible = false
          const res = await this.$http.put(`categories/${this.editBoxId}`,{cat_name:this.itemName})
          console.log(res)
          if(res.data.meta.status === 200 ){
            this.goodsList()
            this.$message.success(res.data.meta.msg);
          }
        },
        async EditBox (item) {
            const res = await this.$http.get(`categories/${item.cat_id}`)
            this.itemName = res.data.data.cat_name
            this.dialogVisible = true
            this.editBoxId = item.cat_id
        },
        async goodsList(){
            const res = await this.$http.get(`categories?type=3`)
            this.goodscate = res.data.data
        }
    },
    created(){
        this.goodsList()
    }
}
</script>

<style>
  .box{
    top:10px;
  }
  .searchArea{
    width:100px;
    margin-top: 10px;
  }
</style>
