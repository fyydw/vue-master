<template>
  <div>
    <div class="homeContent_right_nav">
        <div style="padding-top: 7px;">
          <h3>陕西咸阳秦都区西部云谷</h3>
        </div>
        <div>
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">通讯录</el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-custom"></i>扇陀
              </template>
              <el-menu-item index="2-1">基本资料</el-menu-item>
              <el-menu-item index="2-2">修改密码</el-menu-item>
              <el-menu-item index="2-3" @click="logout">退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  
};
</script>
<style scoped>
</style>