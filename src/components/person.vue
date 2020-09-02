<template>
  <div>
    <div class="aa" style="margin-left: 50px;">
      <h2 style="text-align:center;margin-top: 0;">供应商配置</h2>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="供应商编号">
          <el-input v-model="formInline.user" placeholder="供应商编号"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model="formInline.region" placeholder="供应商名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" fixed label="编号" width="60"></el-table-column>
      <el-table-column prop="name" label="供应商名称" width="120"></el-table-column>
      <el-table-column prop="name" label="供应商地区" width="120"></el-table-column>
      <el-table-column prop="name" label="供应商企业类型" width="120"></el-table-column>
      <el-table-column prop="name" label="供应商类别" width="110"></el-table-column>
      <el-table-column prop="name" label="供应商所属行业" width="120"></el-table-column>
      <el-table-column prop="name" label="供应商地址" width="110"></el-table-column>
      <el-table-column prop="name" label="供应商负责人" width="110"></el-table-column>
      <el-table-column prop="name" label="负责人身份证号" width="120"></el-table-column>
      <el-table-column prop="name" label="负责人电话" width="120"></el-table-column>
      <el-table-column prop="name" label="社会信用号" width="100"></el-table-column>
      <el-table-column prop="name" label="银行名称" width="110"></el-table-column>
      <el-table-column prop="name" label="银行账号" width="110"></el-table-column>
      <el-table-column prop="name" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
        formInline: {
        user: "",
        region: "",
      },
      tableData: [
        {
          id: "1",
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
  methods:{
      onSubmit() {
      console.log("submit!");
    },
  }
};
</script>
<style scoped>
</style>