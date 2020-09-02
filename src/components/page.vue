<template>
  <div>
    <!-- 弹幕 -->
    <marquee
      behavior="alternate"
      bgcolor="pink"
      color="red"
      direction="left"
      width="1400px"
      height="30px"
      hspace="50"
      vspace="20"
      loop="-1"
      scrollamount="10"
      scrolldelay="100"
    >欢迎来到淘宝商城~~~</marquee>

    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="(item, index) in bannerImg" :key="index">
        <img :src="item.img" alt width="100%" />
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索框 -->
    <div style="margin-top: 15px; width: 300px;margin: 20px auto">
      <el-input placeholder="请输入内容" v-model="nameValue">
        <template slot="append">
          <el-button type="success" @click="getData()">搜索</el-button>
        </template>
      </el-input>
    </div>

    <!-- 商品分类 -->
    <el-row>
      <el-button type="success" v-for="(item, index) in goodsName" :key="index"  @click="getData(item.name)">{{item.name}}</el-button>
    </el-row>
    <!-- <h1 @click="jump">跳work页面</h1> -->

    <!-- 列表页 -->
    <el-table :data="tableData" style="width: 93%;margin: 0 auto">
      <el-table-column type="index" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="图标" width="180">
        <template slot-scope="scope">
          <div>
            <img :src="scope.row.pict_url" width="100" />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="商品名称" width="350">
        <template slot-scope="scope">
          <div>
            <h4>
              <font color="#303133">{{scope.row.title}}</font>
            </h4>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="shop_title" label="店铺" width="180"></el-table-column>
      <el-table-column prop="zk_final_price" label="价格" width="180"></el-table-column>
      <el-table-column prop="volume" label="数量" width="180"></el-table-column>
      <el-table-column prop label="编辑">
        <template>
          <div class="edit">
            <el-button type="success">修改</el-button>
            <el-button type="danger">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="totlenum"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      totlenum: 0,
      bannerImg: [],
      goodsName: [],
      nameValue: "",
    };
  },
  mounted() {
    this.getData(name);
  },
  methods: {
    getData(name) {
      console.log(name);
      // 商品分类查询
      this.$http
        .get("/api/w/website/findGoodsList", {
          params: {
            platId: "d0a500ecf8ab41aa9ffe8e18ac6419e1",
            info: this.nameValue || "配饰" || name,
            pageNo: this.currentPage,
          },
        })
        .then((res) => {
          //   console.log(res);
          this.tableData = res.data.data.tbk_dg_material_optional_response.result_list.map_data;
          //总页码
          this.totlenum =
            res.data.data.tbk_dg_material_optional_response.total_results;
        });
      // 轮播图
      this.$http.get("/api/w/website/bannerList").then((res) => {
        this.bannerImg = res.data.data;
        // console.log(this.bannerImg);
      });
      //商品分类
      this.$http
        .get("/api/w/website/findGoodsTypeList")
        .then((res) => {
          this.goodsName = res.data.data;
        });
    },
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //   console.log(`当前页: ${val}`);
      if (this.currentPage) {
        this.getData();
      }
    },
    jump() {
      //路径传参
      // this.$router.push("/work/zhangsan?age=18")
      //name传参
      this.$router.push({
        name: "work",
        params: {
          name: "shantuo",
          age: 18,
        },
      });
    },
  },
};
</script>

<style scoped>
.cell {
  text-align: center;
  color: #303133;
}
#app {
  color: #67c23a;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 5px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel {
  margin: 30px 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.edit {
  display: flex;
  justify-content: space-between;
}
</style>