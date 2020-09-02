<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索与添加 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.username" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改用户" placement="top">
              <!-- 修改 -->
              <el-button type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除用户" placement="top">
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form label-width="70px">
        <el-form-item label="用户名" >
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="手机" >
          <el-input ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    
    return {
      queryInfo: {
        username: "",
        token: "",
      },
      userList: [
        {
          username: "sq",
          password: "123123",
          phone: "13131313131",
          email: "131313@qq.com",
        },
      ],
      // total: 0,
      //   控制添加用户对话框的显示和隐藏
      addDialogVisible: false,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const result = await this.$http.get("/api/users/userinfo", {
        params: this.queryInfo,
      });
      console.log(result);
      if (result.state !== 200) {
        return this.$message.error("获取用户列表失败!");
      }
      this.userList = result.data.userinfo;
      // this.total = result.data.total
    },
  },
};
</script>

<style lang="scss" scoped>
</style>