<template>
  <el-container>
    <el-header>
      <div id="home-left">
        <img src="../assets/img/heima.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <div id="home-right">
        <el-row>
          <el-button type="info" @click="logout">退出</el-button>
        </el-row>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="menushow?'65px':'200px'">
        <div
          style="background-color:rgb(74,80,100); font-size:12px; height:25px; text-align:center; line-height:25px; color:#fff; letter-spacing:0.1em; user-select:none; cursor:pointer"
          @click="menushow=!menushow"
        >|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :style="menushow?'width:65px':'width:200px;'"
          :collapse="menushow"
          :router="true"
          :collapse-transition="false"
          style="border:none"
        >
          <el-submenu :index="item.id+''" v-for="(item,k) in menuList" :key="item.id">
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <i :class="'iconfont icon-'+menuicon[k]" style="margin-right:8px"></i>
              <span style="font-size:13px">{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="item2.path"
              v-for="item2 in item.children"
              :key="item2.id"
            >{{item2.authName}}</el-menu-item>
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
  created() {
    this.getMenuList()
  },
  data() {
    return {
      menushow: false,
      // 定义一个接受数据的数组用来接受后端返回来得数据他是数组形式的
      menuList: [],
      menuicon: ['user', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get('/menus')
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.erorr(res.meta.msg)
      }
      this.menuList = res.data
    },
    logout() {
      this.$confirm('是否退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    width: 100%;
    background-color: rgb(55, 61, 65);
    display: flex;
    justify-content: space-between;
    align-items: center;
    #home-left {
      display: flex;
      font-size: 22px;
      align-items: center;
      user-select: none;
      color: #fff;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
