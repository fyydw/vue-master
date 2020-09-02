<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>材料出库</el-breadcrumb-item>
      <el-breadcrumb-item>材料进退库</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
        <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入材料出库项目ID" v-model="queryInfo.mmid" clearable @clear="getNeedsList">
            <el-button slot="append" icon="el-icon-search" @click="getNeed"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加材料出库</el-button>
        </el-col>
      </el-row>

       <!-- 需用计划列表 -->
      <el-table :data="needslist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="项目" prop="prjid"></el-table-column>
        <el-table-column label="录入人员" prop="inputid"></el-table-column>
        <el-table-column label="录入班组" prop="teamid"></el-table-column>
        <el-table-column label="录入日期" prop="iptDate"></el-table-column>
        <el-table-column label="文件说明" prop="filepaths"></el-table-column>
        <el-table-column label="出退库" prop="state"></el-table-column>
        <el-table-column label="物资ID" prop="mmid"></el-table-column>
        <el-table-column label="使用位置" prop="mloc"></el-table-column>
        <el-table-column label="需用使用量" prop="mnum"></el-table-column>
        <el-table-column label="领用仓库" prop="repoid"></el-table-column>
        
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
          <el-form-item label="项目" prop="prjid">
            <el-input v-model="addForm.prjid"></el-input>
          </el-form-item>
          <el-form-item label="录入人员" prop="inputid">
            <el-input v-model="addForm.inputid"></el-input>
          </el-form-item>
          <el-form-item label="录入班组" prop="teamid">
            <el-input v-model="addForm.teamid"></el-input>
          </el-form-item>
          <el-form-item label="录入日期" prop="iptDate">
            <el-input type="date" v-model="addForm.iptDate"></el-input>
          </el-form-item>
          <el-form-item label="文件说明" prop="filepaths">
            <el-input v-model="addForm.filepaths"></el-input>
          </el-form-item>   
          <el-form-item label="出退库" prop="state">
            <el-input v-model="addForm.state"></el-input>
          </el-form-item>
          <el-form-item label="物资ID" prop="mmid">
            <el-input v-model="addForm.mmid"></el-input>
          </el-form-item>
          <el-form-item label="使用位置" prop="mloc">
            <el-input v-model="addForm.mloc"></el-input>
          </el-form-item>
          <el-form-item label="需用使用量" prop="mnum">
            <el-input v-model="addForm.mnum"></el-input>
          </el-form-item>
          <el-form-item label="领用仓库" prop="repoid">
            <el-input v-model="addForm.repoid"></el-input>
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
          <el-form-item label="项目" >
            <el-input v-model="editForm.prjid"></el-input>
          </el-form-item>
          <el-form-item label="录入人员" >
            <el-input v-model="editForm.inputid"></el-input>
          </el-form-item>
          <el-form-item label="录入班组" >
            <el-input v-model="editForm.teamid"></el-input>
          </el-form-item>
          <el-form-item label="录入日期" >
            <el-input type="date" v-model="editForm.iptDate"></el-input>
          </el-form-item>
          <el-form-item label="文件说明" >
            <el-input v-model="editForm.filepaths"></el-input>
          </el-form-item>   
          <el-form-item label="出退库" >
            <el-input  v-model="editForm.state"></el-input>
          </el-form-item>
          <el-form-item label="物资ID" >
            <el-input v-model="editForm.mmid"></el-input>
          </el-form-item>
          <el-form-item label="使用位置" >
            <el-input v-model="editForm.mloc"></el-input>
          </el-form-item>
          <el-form-item label="需用使用量" >
            <el-input v-model="editForm.mnum"></el-input>
          </el-form-item>
          <el-form-item label="领用仓库">
            <el-input v-model="editForm.repoid"></el-input>
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
            "prjid": "",
            "inputid": "",
            "teamid": "",
            "iptDate": "",
            "filepaths": "",
            "state": "",
            "mmid": "",
            "mloc": "",
            "mnum": 123,
            "repoid": ""
        }
      ],
      queryInfo: {
        mmid: ""
      },
      //   控制添加需用计划对话框的显示和隐藏
      addDialogVisible: false,
      addForm: {
            prjid: "",
            inputid: "",
            teamid: "",
            iptDate: "",
            filepaths: "",
            state: "",
            mmid: "",
            mloc: "",
            mnum: 123,
            repoid: ""
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
      this.$http.get("/api/material/delivery/find").then(res => {
        // console.log(res);
        this.needslist = res.data.data
        // console.log(this.needslist);
      })
    },
    //按需用需用名称查询
    getNeed() {
      this.$http.get("/api/material/delivery/find", {
        params: this.queryInfo
      }).then(res => {
        console.log(res);
        this.needslist = res.data.data
      })
    },
    // 监听添加计划对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //添加需用计划条目
    addNeedsPlans() {
      this.$http.get("/api/material/delivery/add", {params: this.addForm}).then(res => {
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

      this.$http.get("/api/material/delivery/del", {params: {mmid:mmid}}).then((res) => {
          // console.log(res);
          this.$message.success("删除计划成功！");
          this.getNeedsList();
        }).catch(error =>  {return this.$message.error('删除计划失败！')});
    },


     // 展示需用计划的对话框
    showEditDialog(mmid) {
        // console.log(mmid);
      //根据mmid查询用户的信息
      this.$http.get("/api/material/delivery/find", {
        params: {mmid:mmid}
      }).then(res => {
        //   console.log(res);
          this.editForm = res.data.data[0]
        //   console.log(res);
          // console.log(this.editForm);
        })
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 修改计划信息并提交
    editPlanInfo() {
        this.$http.get('api/material/delivery/update' ,{params: this.editForm})
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