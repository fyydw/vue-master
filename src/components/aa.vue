<template>
  <div class="home_container">

    <div class="homeContent_left">
      <el-row class="tac">
        <el-col :span="12" class="tac_nav">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <h3>睿合易谷后台管理系统</h3>
            <el-submenu class="home_list" index="1">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>物资计划</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">材料总计划</el-menu-item>
                <el-menu-item index="1-2">材料需用计划</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">材料合同</template>
                <el-menu-item index="1-4-1">合同管理</el-menu-item>
                <el-menu-item index="1-4-1">材料结算</el-menu-item>
                <el-menu-item index="1-4-1">材料付款</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu class="home_list" index="2">
              <template slot="title">
                <i class="el-icon-s-promotion"></i>
                <span>材料入场</span>
              </template>
            </el-submenu>
            <el-submenu class="home_list" index="3">
              <template slot="title">
                <i class="el-icon-message-solid"></i>
                <span>材料出库</span>
              </template>
            </el-submenu>
            <el-submenu class="home_list" index="4">
              <template slot="title">
                <i class="el-icon-s-help"></i>
                <span>数据分析</span>
              </template>
            </el-submenu>
            <el-submenu class="home_list" index="5">
              <template slot="title">
                <i class="el-icon-upload"></i>
                <span>材料调拨</span>
              </template>
            </el-submenu>
            <el-submenu class="home_list" index="6">
              <template slot="title">
                <i class="el-icon-s-cooperation"></i>
                <span>材料盘点</span>
              </template>
            </el-submenu>
            <el-submenu class="home_list" index="7">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>材料配置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">供应商配置</el-menu-item>
                <el-menu-item index="1-2">基础物质</el-menu-item>
                <el-menu-item index="1-3">仓库配置</el-menu-item>
                <el-menu-item index="1-4">合同配置</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="homeContent_right">
      
      <div class="homeContent_right_main">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClick(row) {
      // console.log(row);
    },
    
  },
};
</script>

<style scoped lang="scss">
.w {
  width: 1519px;
}
.home_container {
  height: 100%;
  background: pink;
  display: flex;
  justify-content: space-between;
  .homeContent_left {
    height: 100%;
    width: 14%;
  }
  .homeContent_right {
    height: 100%;
    width: 86%;

    .homeContent_right_nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
      // background: rgb(84, 92, 100);
      h3 {
        color: rgb(255, 208, 75);
      }
    }
    .homeContent_right_main {
      height: 92%;
      width: 100%;
      // background: #ccc;
    }
  }
}
h3 {
  background-color: rgb(84, 92, 100);
  padding: 10px;
  margin: 0;
  color: #fff;
  text-align: center;
}
.tac {
  height: 100%;
  .tac_nav {
    height: 100%;
    width: 100%;
    .el-menu-vertical-demo {
      height: 100%;
    }
  }
}
.home_list {
  margin: 10px 0;
}
.material_planner {
  font-size: 14px;
  color: rgb(255, 255, 255);
}
.el-submenu .el-menu-item {
  min-width: 180px !important;
}
</style>
