<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>材料设置</el-breadcrumb-item>
      <el-breadcrumb-item>供应商配置</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
        <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入供应商名称" v-model="queryInfo.pname" clearable @clear="getNeedsList">
            <el-button slot="append" icon="el-icon-search" @click="getNeed"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加供应商</el-button>
        </el-col>
      </el-row>

       <!-- 需用计划列表 -->
      <el-table :data="needslist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="供应商名称" prop="pname"></el-table-column>
        <el-table-column label="供应商地区" prop="parea"></el-table-column>
        <el-table-column label="供应商企业类型" prop="pcotype"></el-table-column>
        <el-table-column label="供应商类别" prop="ptype"></el-table-column>
        <el-table-column label="供应商所属行业" prop="pprof"></el-table-column>
        <el-table-column label="供应商地址" prop="paddr"></el-table-column>
        <el-table-column label="供应商负责人" prop="leader"></el-table-column>
        <el-table-column label="负责人身份证号" prop="personid"></el-table-column>
        <el-table-column label="负责人电话" prop="telno"></el-table-column>
        <el-table-column label="社会信用号" prop="coid"></el-table-column>
        <el-table-column label="银行名称" prop="bankname"></el-table-column>
        <el-table-column label="银行账号" prop="bankcode"></el-table-column>
        
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改材料" placement="top">
              <!-- 修改 -->
              <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.pname)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除材料" placement="top">
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" @click="deletePlan(scope.row.pname)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


      <!-- 添加材料对话框 -->
      <el-dialog title="添加供应商" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <el-form :model="addForm" ref="addFormRef" label-width="100px">
          <el-form-item label="供应商名称" prop="pname">
            <el-input v-model="addForm.pname"></el-input>
          </el-form-item>
          <el-form-item label="供应商地区" prop="parea">
            <el-input v-model="addForm.parea"></el-input>
          </el-form-item>
          <el-form-item label="供应商企业类型" prop="pcotype">
            <el-input v-model="addForm.pcotype"></el-input>
          </el-form-item>
          <el-form-item label="供应商类别" prop="ptype">
            <el-input v-model="addForm.ptype"></el-input>
          </el-form-item>
          <el-form-item label="供应商所属行业" prop="pprof">
            <el-input v-model="addForm.pprof"></el-input>
          </el-form-item>
          <el-form-item label="供应商地址" prop="paddr">
            <el-input v-model="addForm.paddr"></el-input>
          </el-form-item>
          <el-form-item label="供应商负责人" prop="leader">
            <el-input v-model="addForm.leader"></el-input>
          </el-form-item>
          <el-form-item label="负责人身份证号" prop="personid">
            <el-input v-model="addForm.personid"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话" prop="telno">
            <el-input v-model="addForm.telno"></el-input>
          </el-form-item>
          <el-form-item label="社会信用号" prop="coid">
            <el-input v-model="addForm.coid"></el-input>
          </el-form-item>
          <el-form-item label="银行名称" prop="bankname">
            <el-input v-model="addForm.bankname"></el-input>
          </el-form-item>
          <el-form-item label="银行账号" prop="bankcode">
            <el-input v-model="addForm.bankcode"></el-input>
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
          <el-form-item label="供应商名称" >
            <el-input v-model="editForm.pname"></el-input>
          </el-form-item>
          <el-form-item label="供应商地区" >
            <el-input v-model="editForm.parea"></el-input>
          </el-form-item>
          <el-form-item label="供应商企业类型" >
            <el-input v-model="editForm.pcotype"></el-input>
          </el-form-item>
          <el-form-item label="供应商类别" >
            <el-input v-model="editForm.ptype"></el-input>
          </el-form-item>
          <el-form-item label="供应商所属行业" >
            <el-input v-model="editForm.pprof"></el-input>
          </el-form-item>
          <el-form-item label="供应商地址" >
            <el-input v-model="editForm.paddr"></el-input>
          </el-form-item>
          <el-form-item label="供应商负责人" >
            <el-input v-model="editForm.leader"></el-input>
          </el-form-item>
          <el-form-item label="负责人身份证号" >
            <el-input v-model="editForm.personid"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话" >
            <el-input v-model="editForm.telno"></el-input>
          </el-form-item>
          <el-form-item label="社会信用号" >
            <el-input v-model="editForm.coid"></el-input>
          </el-form-item>
          <el-form-item label="银行名称" >
            <el-input v-model="editForm.bankname"></el-input>
          </el-form-item>
          <el-form-item label="银行账号" >
            <el-input v-model="editForm.bankcode"></el-input>
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
            "pname": "",
            "parea": "",
            "pcotype": "",
            "ptype": "",
            "pprof": "",
            "paddr": "",
            "leader": "",
            "personid": "",
            "telno": "",
            "coid": "",
            "bankname": "",
            "bankcode": ""
        }
      ],
      queryInfo: {
        pname: ""
      },
      //   控制添加需用计划对话框的显示和隐藏
      addDialogVisible: false,
      addForm: {
            pname: "",
            parea: "",
            pcotype: "",
            ptype: "",
            pprof: "",
            paddr: "",
            leader: "",
            personid: "",
            telno: "",
            coid: "",
            bankname: "",
            bankcode: ""
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
      this.$http.get("/api/material/vendor/findone").then(res => {
        // console.log(res);
        this.needslist = res.data.data
        // console.log(this.needslist);
      })
    },
    //按需用需用名称查询
    getNeed() {
      this.$http.get("/api/material/vendor/findone", {
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
      this.$http.get("/api/material/vendor/add", {params: this.addForm}).then(res => {
        this.$message.success("添加需用计划成功！");
          this.addDialogVisible = false;
          this.getNeedsList();
      })
    },
    //根据mmid删除总计划条目信息
    async deletePlan(pname) {
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

      this.$http.get("/api/material/vendor/delete", {params: {pname:pname}}).then((res) => {
          // console.log(res);
          this.$message.success("删除计划成功！");
          this.getNeedsList();
        }).catch(error =>  {return this.$message.error('删除计划失败！')});
    },


     // 展示需用计划的对话框
    showEditDialog(pname) {
        // console.log(pname);
      //根据pname查询用户的信息
      this.$http.get("/api/material/vendor/findone", {
        params: {pname:pname}
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
        this.$http.get('api/material/vendor/update' ,{params: this.editForm})
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