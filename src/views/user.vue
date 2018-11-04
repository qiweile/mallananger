<template>
  <el-card class="box-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="searchArea">
      <el-input placeholder="请输入内容" v-model="usernamelist" class="input-with-select searchInput">
        <el-button @click="selectuserlist" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" @click="adduser">添加用户</el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
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
            @change ="changeType(scope.row.id,scope.row.mg_state)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="selectUser(scope.row.id)" icon="el-icon-edit" :plain="true" :circle="true" size="mini">

          </el-button>
          <el-button type="success" @click="jusefenp(scope.row)" icon="el-icon-check" :plain="true" :circle="true" size="mini">

          </el-button>
          <el-button type="danger" @click="userDelete(scope.row.id)" icon="el-icon-delete" :plain="true" :circle="true" size="mini">

          </el-button>
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
    <!-- 添加用户 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisibleadduser">
        <el-form :model="formdata">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="formdata.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="formdata.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="formdata.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="formdata.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addusergo">确 定</el-button>
        </div>
      </el-dialog>
    <!-- 编辑对话框 -->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdituser">
        <el-form :model="formdata">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input disabled v-model="formdata.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="formdata.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="formdata.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser(formdata.id)">确 定</el-button>
        </div>
      </el-dialog>
    <!-- 角色分配 -->
      <el-dialog title="分配权限" :visible.sync="dialogTableVisibleJuse">
        <el-form :model="formdata">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              {{listuser}}
            </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="routse">
              <el-option :value="-1"  label="请选择">

              </el-option>
              <el-option v-for="(item,index) in options" :key="index" :label="item.roleName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="jusetijiao()">确 定</el-button>
        </div>
      </el-dialog>
  </el-card>
</template>

<script>
  export default{
    data () {
      return {
        tableData: [],
        usernamelist: '',
        usersType:'',
        pagenum:1,
        pagesize:2,
        currentPage: 1,
        total:0,
        dialogFormVisibleEdituser: false,
        dialogTableVisibleJuse: false,
        dialogFormVisibleadduser: false,
        formLabelWidth: '100px',
        formdata: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        listuser: '',
        options: [],
        routse: -1,
        userId: '',
        loading: true
      }
    },

    methods: {
      selectuserlist(){
        this.getList()
      },
      async addusergo(){
        const res = await this.$http.post(`users`,this.formdata)
        this.$message.success(res.data.meta.msg)
        this.dialogFormVisibleadduser = false
        this.getList()
      },
      adduser(){
        this.dialogFormVisibleadduser = true
      },
      userDelete(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async () => {
          const res = await this.$http.delete(`users/${id}`)
          if(res){this.$message({ type: 'success', message: '删除成功!'});}
          this.getList()
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除' });
        });
      },
      async jusetijiao(id){
        const res = await this.$http.put(`users/${this.userId}/role`,{rid:this.routse})
        this.dialogTableVisibleJuse = false
        const { meta: { status, msg }} = res.data
        this.$message.success(msg)
        this.getList()
      },
      async huoquuserjiaose(id){
        const res = await this.$http.get(`users/${id}`)
        this.routse = res.data.data.rid
      },
      async jusefenp(user){
        this.dialogTableVisibleJuse = true
        const res = await this.$http.get(`roles`)
        this.huoquuserjiaose(user.id)
        this.userId = user.id;
        this.listuser = user.username
        this.options = res.data.data
      },
      async editUser(id){
        this.dialogFormVisibleEdituser = false
        const res = await this.$http.put(`users/${id}`,this.formdata)
        if(res.data.meta.status === 200){
          this.$message.success(res.data.meta.msg)
          this.getList()
        }
      },
      async selectUser (id) {
        this.dialogFormVisibleEdituser = true
        const res = await this.$http.get(`users/${id}`)
        const {data, meta} = res.data;
        if(meta.status === 200 ){
          this.formdata = data
        }
      },
      async changeType (id,type) {
        const res = await this.$http.put(`users/${id}/state/${type}`)
        const {msg,status} = res.data.meta
        if (status === 200){
          this.$message.success(msg);
        } else {
          this.$message.warning(msg)
        }
      },
      handleSizeChange (pagesize) {
        this.currentPage = 1
        this.pagesize = pagesize
        this.getList()
      },
      handleCurrentChange(pagenum) {
        this.pagenum = pagenum
        this.getList()
      },
      // 查询用户
      async getList() {


        const list = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.usernamelist}`)
        if(list.status === 200){
          this.loading = false
          this.tableData = list.data.data.users
          this.total = list.data.data.total
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
