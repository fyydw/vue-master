<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.jpg" alt />
        <span>睿合易谷后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          unique-opened
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/users">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>物资计划</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/plans">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>材料总计划</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/needsPlans">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>材料需用计划</span>
              </template>
            </el-menu-item>
            <el-submenu index="/materialContract">
              <template slot="title"><i class="el-icon-menu"></i>材料合同</template>
              <el-menu-item index="/contractManagement">合同管理</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-promotion"></i>
              <span>材料入场</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/admissionMaterials">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>入场验收</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-promotion"></i>
              <span>材料出库</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/materialDelivery">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>材料进退库</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-upload"></i>
              <span>材料盘点</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/detailMaterial">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>仓库材料明细表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-s-cooperation"></i>
              <span>材料设置</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/supplierConfiguration">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>供应商配置</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/basicMaterialWarehouse">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>基础物资库</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/warehouseConfiguration">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>仓库配置</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/contractConfiguration">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>合同配置</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="scss">
.el-header {
  background-color: rgb(84, 92, 100);
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 295px;
      height: 61px;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: rgb(84, 92, 100);
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eee;
}
.el-container {
  height: 100%;
}
.el-icon-s-order {
  margin-right: 10px;
}
</style>
