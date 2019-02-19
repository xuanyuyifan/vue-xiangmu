<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入搜索内容"
            v-model="querycdt.query"
            :clearable="true"
            @clear="getUserInfos"
            @keyup.enter.native="getUserInfos"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserInfos"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格数据展示 -->
      <el-table :data="usersInfos" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="160"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="90">
          <!-- 状态 -->
          <el-switch
            v-model="info.row.mg_state"
            slot-scope="info"
            @change="changeStat(info.row.id,info.row.mg_state)"
          ></el-switch>
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column prop="address" label="操作" width="260">
          <template slot-scope="info">
            <!-- 编辑按钮 -->
            <el-tooltip content="编辑按钮" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showeiduser(info.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip content="删除按钮" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delUser(info.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 分配角色 -->
            <el-tooltip content="角色分配" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="fenUser(info.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querycdt.pagenum"
        :page-sizes="[2, 3, 5, 7]"
        :page-size="querycdt.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="querycdt.tot"
      ></el-pagination>
      <!-- 对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogclose">
        <!-- form表单 -->
        <el-form ref="addFormref" :model="addForm" label-width="80px" :rules="addFormRoules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密 码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮 箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户 -->
      <el-dialog title="修改用户" :visible.sync="eidDialogVisible" width="50%" @close="eidDialogclose">
        <!-- form表单 -->
        <el-form ref="eidFormref" :model="eidForm" label-width="80px" :rules="eidFormRoules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="eidForm.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="*邮 箱" prop="email">
            <el-input v-model="eidForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="eidForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="eidDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="eidUser">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  created() {
    this.getUserInfos()
  },
  methods: {
    // 重置修改用户的表单
    // eidDialogclose() {
    //   this.$refs.eidFormref.resetFields()
    // },
    // 修改数据
    eidUser() {
      this.$refs.eidFormref.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.put(
            'users/' + this.eidForm.id,
            this.eidForm
          )
          if (res.meta.status !== 200) {
            return this.$message.meta.msg
          }
          // 对话框关闭，消息提示成功，页面刷新
          this.eidDialogVisible = false
          this.$message.success(res.meta.msg)
          this.getUserInfos()
        }
      })
    },
    // 显示修改用户的对话框
    async showeiduser(id) {
      this.eidDialogVisible = true
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      // 提示成功信息
      // this.$message.success(res.meta.msg)
      // 将获取到的id赋予给eidForm
      this.eidForm = res.data
    },

    // 删除id
    async delUser(id) {
      this.$confirm('确认要删除该用户么？, 删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.delete('users/' + id)
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg)
          }
          // 成功提示
          this.$message.success(res.meta.msg)
          // 刷新用户列表
          this.getUserInfos()
        })
        .catch(() => {})
    },
    // 添加用户数据
    addUser() {
      this.$refs.addFormref.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post('/users', this.addForm)
          if (res.meta.status !== 201) {
            return this.$message.error(res.meta.mag)
          }
          // 关闭foem表单
          this.addDialogVisible = false
          // 做成功的提示
          this.$message.success(res.meta.msg)
          this.getUserInfos()
        }
      })
    },
    // 重置form表单
    addDialogclose() {
      this.$refs.addFormref.resetFields()
    },

    async changeStat(uId, state) {
      const { data: res } = await this.$http.put(
        'users/' + uId + '/state/' + state
      )
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
    },
    handleSizeChange(arg) {
      this.querycdt.pagesize = arg
      this.getUserInfos()
    },
    handleCurrentChange(arg) {
      this.querycdt.pagenum = arg
      // console.log(arg)
      this.getUserInfos()
    },
    async getUserInfos() {
      const { data: res } = await this.$http.get('/users', {
        params: this.querycdt
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }

      this.querycdt.tot = res.data.total
      this.usersInfos = res.data.users
    }
  },
  data() {
    var checkAge = (rule, value, callback) => {
      // 用正则表达式校验手机号码
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error('手机格式不正确'))
      }
      callback()
    }
    return {
      // 编辑数据
      eidDialogVisible: false,
      eidForm: {
        username: '',
        email: '',
        moblie: ''
      },
      eidFormRoules: {
        password: [{ required: true, message: '密码必填', trigger: 'blur' }],
        mobile: [
          { required: true, message: '手机号码必填', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ]
      },
      // 定义一个数组接受后台数据
      usersInfos: [],
      //  定义一个查询页码功能
      querycdt: {
        query: '',
        pagenum: 1,
        pagesize: 3,
        tot: 0
      },
      // 添加用户
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        moblie: ''
      },
      addFormRoules: {
        username: [{ required: true, message: '用户名必填', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }],
        mobile: [
          { required: true, message: '手机号码必填', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>
