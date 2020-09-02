<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>材料入场</el-breadcrumb-item>
      <el-breadcrumb-item>入场验收</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
        <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入材料ID" v-model="queryInfo.mmid" clearable @clear="getNeedsList">
            <el-button slot="append" icon="el-icon-search" @click="getNeed"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加材料</el-button>
        </el-col>
      </el-row>

       <!-- 需用计划列表 -->
      <el-table :data="needslist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="车牌号" prop="vno"></el-table-column>
        <el-table-column label="验证人员" prop="verMan"></el-table-column>
        <el-table-column label="供应商ID" prop="proId"></el-table-column>
        <el-table-column label="合同" prop="mConId"></el-table-column>
        <el-table-column label="材料" prop="aprlistId"></el-table-column>
        <el-table-column label="状态" prop="ifacpt"></el-table-column>
        <el-table-column label="物质" prop="mmid"></el-table-column>
        <el-table-column label="数量" prop="mnum"></el-table-column>
        <el-table-column label="是否存放仓库" prop="ifsave"></el-table-column>
        <el-table-column label="存放仓库名称" prop="repold"></el-table-column>
        <el-table-column label="是否确认" prop="rmanver"></el-table-column>
        <el-table-column label="文件" prop="filepathsmlist"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改材料" placement="top">
              <!-- 修改 -->
              <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.mmid)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除材料" placement="top">
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" @click="deletePlan(scope.row.mmid)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


      <!-- 添加材料对话框 -->
      <el-dialog title="添加材料" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <el-form :model="addForm" ref="addFormRef" label-width="100px">
          <el-form-item label="车牌号" prop="vno">
            <el-input v-model="addForm.vno"></el-input>
          </el-form-item>
          <el-form-item label="验证人员" prop="verMan">
            <el-input v-model="addForm.verMan"></el-input>
          </el-form-item>
          <el-form-item label="供应商ID" prop="proId">
            <el-input v-model="addForm.proId"></el-input>
          </el-form-item>
          <el-form-item label="合同" prop="mConId">
            <el-input v-model="addForm.mConId"></el-input>
          </el-form-item>
          <el-form-item label="材料" prop="aprlistId">
            <el-input v-model="addForm.aprlistId"></el-input>
          </el-form-item>   
          <el-form-item label="状态" prop="ifacpt">
            <el-input v-model="addForm.ifacpt"></el-input>
          </el-form-item>
          <el-form-item label="物质" prop="mmid">
            <el-input v-model="addForm.mmid"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="mnum">
            <el-input v-model="addForm.mnum"></el-input>
          </el-form-item>
          <el-form-item label="是否存放仓库" prop="ifsave">
            <el-input v-model="addForm.ifsave"></el-input>
          </el-form-item>
          <el-form-item label="存放仓库名称" prop="repold">
            <el-input v-model="addForm.repold"></el-input>
          </el-form-item>
          <el-form-item label="是否确认" prop="rmanver">
            <el-input v-model="addForm.rmanver"></el-input>
          </el-form-item>
          <el-form-item label="文件" prop="filepathsmlist">
            <el-input v-model="addForm.filepathsmlist"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNeedsPlans">确 定</el-button>
        </span>
      </el-dialog>
    <!-- 修改需用计划的对话框 -->
    <el-dialog title="修改需用计划" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="editForm" ref="editFormRef" label-width="100px">
          <el-form-item label="车牌号" >
            <el-input v-model="editForm.vno"></el-input>
          </el-form-item>
          <el-form-item label="验证人员" >
            <el-input v-model="editForm.verMan"></el-input>
          </el-form-item>
          <el-form-item label="供应商ID" >
            <el-input v-model="editForm.proId"></el-input>
          </el-form-item>
          <el-form-item label="合同" >
            <el-input v-model="editForm.mConId"></el-input>
          </el-form-item>
          <el-form-item label="材料" >
            <el-input v-model="editForm.aprlistId"></el-input>
          </el-form-item>   
          <el-form-item label="状态" >
            <el-input  v-model="editForm.ifacpt"></el-input>
          </el-form-item>
          <el-form-item label="物质" >
            <el-input v-model="editForm.mmid"></el-input>
          </el-form-item>
          <el-form-item label="数量" >
            <el-input v-model="editForm.mnum"></el-input>
          </el-form-item>
          <el-form-item label="是否存放仓库" >
            <el-input v-model="editForm.ifsave"></el-input>
          </el-form-item>
          <el-form-item label="存放仓库名称">
            <el-input v-model="editForm.repold"></el-input>
          </el-form-item>
          <el-form-item label="是否确认">
            <el-input v-model="editForm.rmanver"></el-input>
          </el-form-item>
          <el-form-item label="文件" >
            <el-input v-model="editForm.filepathsmlist"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPlanInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- ---------------- -->
  </div>
</template>

<script>
export default {
    data() {
    return{
      needslist: [
        {
            "vno": "",
            "verMan": "",
            "proId": "",
            "mConId": "",
            "aprlistId": "",
            "ifacpt": "",
            "mmid": "",
            "mnum": 123,
            "ifsave": "",
            "repold": "",
            "rmanver": "",
            "filepathsmlist": ""
        }
      ],
      queryInfo: {
        mmid: ""
      },
      //   控制添加需用计划对话框的显示和隐藏
      addDialogVisible: false,
      addForm: {
            vno: "",
            verMan: "",
            proId: "",
            mConId: "",
            aprlistId: "",
            ifacpt: "",
            mmid: "",
            mnum: 123,
            ifsave: "",
            repold: "",
            rmanver: "",
            filepathsmlist: ""
        },
      // 控制修改计划对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的计划信息对象
      editForm: {},
    }
  },
  created() {
      this.getNeedsList();
  },
  methods: {
    //查询全部
    getNeedsList() {
      this.$http.get("/api/material/admission/search").then(res => {
        // console.log(res);
        this.needslist = res.data.data
        // console.log(this.needslist);
      })
    },
    //按需用需用名称查询
    getNeed() {
      this.$http.get("/api/material/admission/search", {
        params: this.queryInfo
      }).then(res => {
        // console.log(res);
        this.needslist = res.data.data
      })
    },
    // 监听添加计划对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //添加需用计划条目
    addNeedsPlans() {
      this.$http.get("/api/material/admission/add", {params: this.addForm}).then(res => {
        this.$message.success("添加需用计划成功！");
          this.addDialogVisible = false;
          this.getNeedsList();
      })
    },
    //根据mmid删除总计划条目信息
    async deletePlan(mmid) {
      console.log(mmid);
      // 弹框询问计划是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该计划, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 如果计划确认删除，则返回值为字符串 confirm
      // 如果计划取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      this.$http.get("/api/material/admission/del", {params: {mmid:mmid}}).then((res) => {
          // console.log(res);
          this.$message.success("删除计划成功！");
          this.getNeedsList();
        }).catch(error =>  {return this.$message.error('删除计划失败！')});
    },


     // 展示需用计划的对话框
    showEditDialog(mmid) {
      //根据mmid查询用户的信息
      this.$http.get("/api/material/admission/search", {
        params: {mmid:mmid}
      }).then(res => {
          this.editForm = res.data.data[0]
          console.log(res);
          // console.log(this.editForm);
        })
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 修改计划信息并提交
    editPlanInfo() {
        this.$http.get('api/material/admission/update' ,{params: this.editForm})
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getNeedsList()
        // 提示修改成功
        this.$message.success('更新计划信息成功！')
      
    },
}
}
</script>

<style lang="scss" scoped>
  .el-table {
  .el-button {
    padding: 0;
    width: 23px;
    height: 23px;
  }
}
</style>