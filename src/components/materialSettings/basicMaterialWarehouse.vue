<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>材料设置</el-breadcrumb-item>
      <el-breadcrumb-item>基础物资库</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
        <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入物资名称" v-model="queryInfo.mcode" clearable @clear="getNeedsList">
            <el-button slot="append" icon="el-icon-search" @click="getNeed"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加物资</el-button>
        </el-col>
      </el-row>

       <!-- 需用计划列表 -->
      <el-table :data="needslist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="物资编号" prop="mcode"></el-table-column>
        <el-table-column label="物资名称" prop="mname"></el-table-column>
        <el-table-column label="所属类别" prop="mtype"></el-table-column>
        <el-table-column label="物品单位" prop="munit"></el-table-column>
        <el-table-column label="材料照片" prop="filepaths"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改材料" placement="top">
              <!-- 修改 -->
              <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.mcode)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除材料" placement="top">
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" @click="deletePlan(scope.row.mname)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


      <!-- 添加材料对话框 -->
      <el-dialog title="添加仓库" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <el-form :model="addForm" ref="addFormRef" label-width="100px">
          <el-form-item label="物资编号" prop="mcode">
            <el-input v-model="addForm.mcode"></el-input>
          </el-form-item>
          <el-form-item label="物资名称" prop="mname">
            <el-input v-model="addForm.mname"></el-input>
          </el-form-item>
          <el-form-item label="所属类别" prop="mtype">
            <el-input v-model="addForm.mtype"></el-input>
          </el-form-item>
          <el-form-item label="物品单位" prop="munit">
            <el-input v-model="addForm.munit"></el-input>
          </el-form-item>
          <el-form-item label="材料照片" prop="filepaths">
            <el-input v-model="addForm.filepaths"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addForm.remark"></el-input>
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
          <el-form-item label="物资编号" >
            <el-input v-model="editForm.mcode"></el-input>
          </el-form-item>
          <el-form-item label="物资名称" >
            <el-input v-model="editForm.mname"></el-input>
          </el-form-item>
          <el-form-item label="所属类别" >
            <el-input v-model="editForm.mtype"></el-input>
          </el-form-item>
          <el-form-item label="物品单位" >
            <el-input v-model="editForm.munit"></el-input>
          </el-form-item>
          <el-form-item label="材料照片" >
            <el-input v-model="editForm.filepaths"></el-input>
          </el-form-item>
          <el-form-item label="备注" >
            <el-input v-model="editForm.remark"></el-input>
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
            "mcode": "",
            "mname": "",
            "mtype": "",
            "munit": "",
            "filepaths": "",
            "remark": "",
        }
      ],
      queryInfo: {
        mcode: ""
      },
      //   控制添加需用计划对话框的显示和隐藏
      addDialogVisible: false,
      addForm: {
            mcode: "",
            mname: "",
            mtype: "",
            munit: "",
            filepaths: "",
            remark: ""
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
      this.$http.get("/api/material/basicmaterials/findone").then(res => {
        // console.log(res);
        this.needslist = res.data.data
        // console.log(this.needslist);
      })
    },
    //按需用需用名称查询
    getNeed() {
      this.$http.get("/api/material/basicmaterials/findone", {
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
      this.$http.get("/api/material/basicmaterials/add", {params: this.addForm}).then(res => {
        this.$message.success("添加需用计划成功！");
          this.addDialogVisible = false;
          this.getNeedsList();
      })
    },
    //根据mmid删除总计划条目信息
    async deletePlan(mname) {
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

      this.$http.get("/api/material/basicmaterials/delete", {params: {mname:mname}}).then((res) => {
          // console.log(res);
          this.$message.success("删除计划成功！");
          this.getNeedsList();
        }).catch(error =>  {return this.$message.error('删除计划失败！')});
    },


     // 展示需用计划的对话框
    showEditDialog(mcode) {
        // console.log(mcode);
      //根据mcode查询用户的信息
      this.$http.get("/api/material/basicmaterials/findone", {
        params: {mcode:mcode}
      }).then(res => {
          console.log(res);
          this.editForm = res.data.data[0]
        //   console.log(this.editForm);
        })
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 修改计划信息并提交
    editPlanInfo() {
        this.$http.get('api/material/basicmaterials/update' ,{params: this.editForm})
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