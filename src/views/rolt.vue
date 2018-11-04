<template>
  <div>
    <my-bracn level1="权限管理" level2="权限列表"></my-bracn>
    <el-row style="width:100px" class="box1">
      <el-button type="primary" plain>主要按钮</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row class="level1" v-for="(item1,index) in scope.row.children" :key="index">
            <el-col :span="4">
                <el-tag @close="deleterolt(scope.row,item1.id)" closable type="success">
                  {{item1.authName}}
                </el-tag>
                <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
                <el-row class="level2" v-for="(item2,index) in item1.children" :key="index">
                    <el-col :span="4">
                        <el-tag @close="deleterolt(scope.row,item2.id)" closable type="warning">{{item2.authName}}</el-tag>
                        <i class="el-icon-arrow-right"></i>

                    </el-col>
                    <el-col :span="20">
                        <el-tag @close="deleterolt(scope.row,item3.id)" closable type="error" v-for="(item3,index) in item2.children" :key="index">
                            {{item3.authName}}</el-tag>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row v-if="scope.row.children.length===0">
            未分配任何权限
        </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index">
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName">
      </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc">
      </el-table-column>
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button type="primary" @click="selectUser(scope.row.id)" icon="el-icon-edit" :plain="true" :circle="true" size="mini">

          </el-button>
          <el-button type="success" @click="shuList(scope.row)" icon="el-icon-check" :plain="true" :circle="true" size="mini">

          </el-button>
          <el-button type="danger" @click="userDelete(scope.row.id)" icon="el-icon-delete" :plain="true" :circle="true" size="mini">

          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="分配权限"  :visible.sync="dialogVisible" width="50%"
    >
        <template slot-scope="scope">
            <!-- 树形结构 -->
            <el-tree
            ref="tree"
            :data="treeData"
            :props="defaultProps"
            node-key='id'
            :default-expanded-keys="expandedArr"
            :default-checked-keys="checkedArr"
            show-checkbox>
            </el-tree>

        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setRight()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
      return {
        tableData: [],
        treeData:[],
        expandedArr: [],
        checkedArr: [],
        dialogVisible: false,
        defaultProps:{
          children: 'children',
          label: 'authName'
        }
      }
    },
    created(){
      this.roltList()
    },
    methods: {
      async setRight(){
        this.dialogVisible = false
        const arr = this.$refs.tree.getCheckedKeys()
        const arr1 = this.$refs.tree.getHalfCheckedKeys()
        const arr2 = [...arr,...arr1]
        const res = await this.$http.post(`roles/${this.roleId}/rights`,{ rids:arr.join(',')})
        const {meta:{status,msg}} = res.data
        // console.log(res)
        if (status===200) {
            this.$message.success(msg)
            this.loadTableData()
        }
      },
      async shuList (role) {// rights/:tree
        this.dialogVisible = true
        const res = await this.$http.get(`rights/tree`)
        const arr = []
        const arr1 = []
        console.log(res.data.data)
        this.treeData = res.data.data
        res.data.data.forEach((ele )=>{
          // arr.push(ele.id)
          ele.children.forEach(ele1=>{
            // arr.push(ele1.id)
            ele1.children.forEach((ele2)=>{
              arr.push(ele2.id)
            })
          })
        })
        this.expandedArr = arr
        role.children.forEach((ele )=>{
          // arr.push(ele.id)
          ele.children.forEach(ele1=>{
            // arr.push(ele1.id)
            ele1.children.forEach((ele2)=>{
              arr1.push(ele2.id)
            })
          })
        })
        this.checkedArr = arr1
      },

      async roltList () {
        const res = await this.$http.get(`roles`)
        this.tableData = res.data.data
      },
      async deleterolt (rouId,rigId) {//roles/:roleId/rights/:rightId
        const res = await this.$http.delete(`roles/${rouId.id}/rights/${rigId}`)
        rouId.children = res.data.data
        this.$message.success(res.data.meta.msg)
      }
    }
  }

</script>

<style>
  .box1{
    width:100px;
    margin:10px 0;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
