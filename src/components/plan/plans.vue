<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物资计划</el-breadcrumb-item>
      <el-breadcrumb-item>材料总计划</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.planname" clearable @clear="getPlanList">
            <el-button slot="append" icon="el-icon-search" @click="getPlan"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加计划</el-button>
        </el-col>
      </el-row>

      <!-- 计划列表 -->
      <el-table :data="planlist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="总计划名称" prop="planname"></el-table-column>
        <el-table-column label="提交人" prop="cmtId"></el-table-column>
        <el-table-column label="项目ID" prop="prjid"></el-table-column>
        <el-table-column label="审批人" prop="leaderNext"></el-table-column>
        <el-table-column label="提交日期" prop="cdate"></el-table-column>
        <el-table-column label="材料" prop="mname"></el-table-column>
        <el-table-column label="使用位置" prop="userLoc"></el-table-column>
        <el-table-column label="使用量" prop="mnum"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改计划" placement="top">
              <!-- 修改 -->
              <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.planname)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除计划" placement="top">
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" @click="deletePlan(scope.row.prjid)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加计划对话框 -->
    <el-dialog title="添加计划" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" ref="addFormRef" label-width="100px">
        <el-form-item label="总计划名称" prop="planname">
          <el-input v-model="addForm.planname"></el-input>
        </el-form-item>
        <el-form-item label="提交人" prop="cmtId">
          <el-input v-model="addForm.cmtId"></el-input>
        </el-form-item>
        <el-form-item label="项目ID" prop="prjid">
          <el-input v-model="addForm.prjid"></el-input>
        </el-form-item>
        <el-form-item label="审批人" prop="leaderNext">
          <el-input v-model="addForm.leaderNext"></el-input>
        </el-form-item>
        <el-form-item label="提交日期" prop="cdate">
          <el-input type="date" v-model="addForm.cdate"></el-input>
        </el-form-item>
        <el-form-item label="材料" prop="mname">
          <el-input v-model="addForm.mname"></el-input>
        </el-form-item>
        <el-form-item label="使用位置" prop="userLoc">
          <el-input v-model="addForm.userLoc"></el-input>
        </el-form-item>
        <el-form-item label="使用量" prop="mnum">
          <el-input v-model="addForm.mnum"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPlans">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改计划的对话框 -->
    <el-dialog title="修改计划" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="editForm" ref="editFormRef" label-width="100px">
        <el-form-item label="总计划名称" >
          <el-input v-model="editForm.planname" disabled></el-input>
        </el-form-item>
        <el-form-item label="提交人" >
          <el-input v-model="editForm.cmtId"></el-input>
        </el-form-item>
        <el-form-item label="项目ID" >
          <el-input v-model="editForm.prjid"></el-input>
        </el-form-item>
        <el-form-item label="审批人" >
          <el-input v-model="editForm.leaderNext"></el-input>
        </el-form-item>
        <el-form-item label="提交日期" >
          <el-input type="date" v-model="editForm.cdate"></el-input>
        </el-form-item>
        <el-form-item label="材料">
          <el-input v-model="editForm.mname"></el-input>
        </el-form-item>
        <el-form-item label="使用位置">
          <el-input v-model="editForm.userLoc"></el-input>
        </el-form-item>
        <el-form-item label="使用量">
          <el-input v-model="editForm.mnum"></el-input>
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
    return {
      planlist: [
        {
          prjid: "",
          planname: "",
          cmtId: "",
          leaderNext: "",
          cdate: "",
          mname: "",
          userLoc: "",
          mnum: "",
        },
      ],
      queryInfo: {
        planname: "",
      },
      //   控制添加计划对话框的显示和隐藏
      addDialogVisible: false,
      //添加计划的表单数据
      addForm: {
        prjid: "",
        planname: "",
        cmtId: "",
        leaderNext: "",
        cdate: "",
        mname: "",
        userLoc: "",
        mnum: "",
      },
      // 控制修改计划对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的计划信息对象
      editForm: {},
    };
  },
  created() {
    this.getPlanList();
  },
  methods: {
    //查询全部
     getPlanList() {
       this.$http.get("/api/material/totleplan/search").then(res => {
        // console.log(res);
        this.planlist = res.data.data;
      });
      // if (res.status !== 200) {
      //     return this.$message.error("获取计划列表失败!");
      //   }
    },
    // 按总计划名称查询
     getPlan() {
       this.$http
        .get("/api/material/totleplan/search", {
          params: this.queryInfo,
        })
        .then((res) => {
          console.log(res);
          this.planlist = res.data.data;
        });
        // if (res.status !== 200) {
        //     return this.$message.error("获取计划列表失败!");
        //   }
    },
    // 监听添加计划对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 添加总计划条目
    addPlans() {
      console.log(this.addForm);
      this.$http
        .get("/api/material/totleplan/insert", { params: this.addForm })
        .then((res) => {
          console.log(res);
          if (res.status !== 201) {
            this.$message.error("添加计划失败！");
          }

          this.$message.success("添加计划成功！");
          this.addDialogVisible = false;
          this.getPlanList();
        });
    },
    //根据prjid删除总计划条目信息
    async deletePlan(prjid) {
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

      this.$http.get("/api/material/totleplan/delete/" + prjid).then((res) => {
          // console.log(res);
          this.$message.success("删除计划成功！");
          this.getPlanList();
        }).catch(error =>  {return this.$message.error('删除计划失败！')});
    },

     // 展示计划的对话框
    showEditDialog(planname) {
      //根据planname查询用户的信息
      this.$http.get("/api/material/totleplan/search", {
        params: {planname:planname}
      }).then(res => {
          this.editForm = res.data.data[0]
          // console.log(res);
          // console.log(this.editForm);
        })
      
      // if (res.status !== 200) {
      //   return this.$message.error('查询计划信息失败！')
      // }

      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
     
     // 修改计划信息并提交
    editPlanInfo() {
        this.$http.get('api/material/totleplan/update' , {params: this.editForm})
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getPlanList()
        // 提示修改成功
        this.$message.success('更新计划信息成功！')
      
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  .el-button {
    padding: 0;
    width: 40px;
    height: 40px;
  }
}
</style>