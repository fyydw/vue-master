<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物资计划</el-breadcrumb-item>
      <el-breadcrumb-item>合同管理</el-breadcrumb-item>
      <el-breadcrumb-item>合同配置</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
        <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入合同名称" v-model="queryInfo.ct_name" clearable @clear="getNeedsList">
            <el-button slot="append" icon="el-icon-search" @click="getNeed"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加合同</el-button>
        </el-col>
      </el-row>

       <!-- 需用计划列表 -->
      <el-table :data="needslist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="申请人" prop="user_id"></el-table-column>
        <el-table-column label="合同名称" prop="ct_name"></el-table-column>
        <el-table-column label="合同类型" prop="ct_type"></el-table-column>
        <el-table-column label="供应商" prop="pr_id"></el-table-column>
        <el-table-column label="合同金额" prop="ct_sum"></el-table-column>
        <el-table-column label="付款方式" prop="pay_mode"></el-table-column>
        <el-table-column label="签订日期" prop="ct_date"></el-table-column>
        <el-table-column label="项目" prop="prj_id"></el-table-column>
        <el-table-column label="预付款" prop="pre_pay"></el-table-column>
        <el-table-column label="保证金" prop="deposit"></el-table-column>
        <el-table-column label="合同执行人" prop="ctext_man"></el-table-column>
        <el-table-column label="审批人" prop="leader_next"></el-table-column>
        <el-table-column label="材料" prop="m_id"></el-table-column>
        <el-table-column label="采购数量" prop="ctd_num"></el-table-column>
        <el-table-column label="采购单价" prop="ctd_money"></el-table-column>
        <el-table-column label="结算" prop="ctd_state"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改合同" placement="top">
              <!-- 修改 -->
              <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.ct_name)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除合同" placement="top">
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" @click="deletePlan(scope.row.prj_id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
      <!-- 添加需用计划对话框 -->
      <el-dialog title="添加需用计划" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <el-form :model="addForm" ref="addFormRef" label-width="100px">
          <el-form-item label="申请人" prop="user_id">
            <el-input v-model="addForm.user_id"></el-input>
          </el-form-item>
          <el-form-item label="合同名称" prop="ct_name">
            <el-input v-model="addForm.ct_name"></el-input>
          </el-form-item>
          <el-form-item label="合同类型" prop="ct_type">
            <el-input v-model="addForm.ct_type"></el-input>
          </el-form-item>
          <el-form-item label="供应商" prop="pr_id">
            <el-input v-model="addForm.pr_id"></el-input>
          </el-form-item>
          <el-form-item label="合同金额" prop="ct_sum">
            <el-input v-model="addForm.ct_sum"></el-input>
          </el-form-item>   
          <el-form-item label="付款方式" prop="pay_mode">
            <el-input v-model="addForm.pay_mode"></el-input>
          </el-form-item>
          <el-form-item label="签订日期" prop="ct_date">
            <el-input type="date" v-model="addForm.ct_date"></el-input>
          </el-form-item>
          <el-form-item label="项目" prop="prj_id">
            <el-input v-model="addForm.prj_id"></el-input>
          </el-form-item>
          <el-form-item label="预付款" prop="pre_pay">
            <el-input v-model="addForm.pre_pay"></el-input>
          </el-form-item>
          <el-form-item label="保证金" prop="deposit">
            <el-input v-model="addForm.deposit"></el-input>
          </el-form-item>
          <el-form-item label="合同执行人" prop="ctext_man">
            <el-input v-model="addForm.ctext_man"></el-input>
          </el-form-item>
          <el-form-item label="审批人" prop="leader_next">
            <el-input v-model="addForm.leader_next"></el-input>
          </el-form-item>
          <el-form-item label="材料" prop="m_id">
            <el-input v-model="addForm.m_id"></el-input>
          </el-form-item>
          <el-form-item label="采购数量" prop="ctd_num">
            <el-input v-model="addForm.ctd_num"></el-input>
          </el-form-item>
          <el-form-item label="采购单价" prop="ctd_money">
            <el-input v-model="addForm.ctd_money"></el-input>
          </el-form-item>
          <el-form-item label="结算" prop="ctd_state">
            <el-input v-model="addForm.ctd_state"></el-input>
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
          <el-form-item label="申请人" >
            <el-input v-model="editForm.user_id"></el-input>
          </el-form-item>
          <el-form-item label="合同名称" >
            <el-input v-model="editForm.ct_name"></el-input>
          </el-form-item>
          <el-form-item label="合同类型" >
            <el-input v-model="editForm.ct_type"></el-input>
          </el-form-item>
          <el-form-item label="供应商" >
            <el-input v-model="editForm.pr_id"></el-input>
          </el-form-item>
          <el-form-item label="合同金额" >
            <el-input v-model="editForm.ct_sum"></el-input>
          </el-form-item>   
          <el-form-item label="付款方式" >
            <el-input  v-model="editForm.pay_mode"></el-input>
          </el-form-item>
          <el-form-item label="签订日期" >
            <el-input type="date" v-model="editForm.ct_date"></el-input>
          </el-form-item>
          <el-form-item label="项目" >
            <el-input v-model="editForm.prj_id"></el-input>
          </el-form-item>
          <el-form-item label="预付款" >
            <el-input v-model="editForm.pre_pay"></el-input>
          </el-form-item>
          <el-form-item label="保证金">
            <el-input v-model="editForm.deposit"></el-input>
          </el-form-item>
          <el-form-item label="合同执行人">
            <el-input v-model="editForm.ctext_man"></el-input>
          </el-form-item>
          <el-form-item label="审批人" >
            <el-input v-model="editForm.leader_next"></el-input>
          </el-form-item>
          <el-form-item label="材料" >
            <el-input v-model="editForm.m_id"></el-input>
          </el-form-item>
          <el-form-item label="采购数量">
            <el-input v-model="editForm.ctd_num"></el-input>
          </el-form-item>
          <el-form-item label="采购单价">
            <el-input v-model="editForm.ctd_money"></el-input>
          </el-form-item>
          <el-form-item label="结算">
            <el-input v-model="editForm.ctd_state"></el-input>
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
          "user_id": 1,
          "ct_name": "",
          "ct_type": "",
          "pr_id": "",
          "ct_sum": "",
          "pay_mode": "",
          "ct_date": "",
          "prj_id": "",
          "pre_pay": "",
          "deposit": "",
          "ctext_man": "",
          "leader_next": "",
          "m_id": "",
          "ctd_num": "",
          "ctd_money": "",
          "ctd_state": ""
        }
      ],
      queryInfo: {
        ct_name: ""
      },
      //   控制添加需用计划对话框的显示和隐藏
      addDialogVisible: false,
      addForm: {
          user_id: 1,
          ct_name: "",
          ct_type: "",
          pr_id: "",
          ct_sum: "",
          pay_mode: "",
          ct_date: "",
          prj_id: "",
          pre_pay: "",
          deposit: "",
          ctext_man: "",
          leader_next: "",
          m_id: "",
          ctd_num: "",
          ctd_money: "",
          ctd_state: ""
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
      this.$http.get("/api/material/pact/search").then(res => {
        // console.log(res);
        this.needslist = res.data.data
      })
    },
    //按需用需用名称查询
    getNeed() {
      this.$http.get("/api/material/pact/search", {
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
      this.$http.get("/api/material/pact/insert", {params: this.addForm}).then(res => {
        this.$message.success("添加需用计划成功！");
          this.addDialogVisible = false;
          this.getNeedsList();
      })
    },
    //根据prjid删除总计划条目信息
    async deletePlan(prjid) {
      console.log(prjid);
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

      this.$http.get("/api/material/pact/delete/" + prjid).then((res) => {
          // console.log(res);
          this.$message.success("删除计划成功！");
          this.getNeedsList();
        }).catch(error =>  {return this.$message.error('删除计划失败！')});
    },


     // 展示需用计划的对话框
    showEditDialog(ct_name) {
      //根据ct_name查询用户的信息
      this.$http.get("/api/material/pact/search", {
        params: {ct_name:ct_name}
      }).then(res => {
          this.editForm = res.data.data[0]
          // console.log(res);
          // console.log(this.editForm);
        })
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
      // 修改计划信息并提交
    editPlanInfo() {
        this.$http.get('api/material/pact/update' ,{params: this.editForm})
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
    width: 30px;
    height: 30px;
  }
}
</style>