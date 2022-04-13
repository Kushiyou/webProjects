<template>
  <div>
    <!-- 表格table -->
    <el-table border style="100%" :data="records">
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        width="width"
      ></el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="width"
      ></el-table-column>
      <el-table-column label="默认图片" width="110px">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            style="width: 80px; heigth: 80px"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(KG)"
        width="80px"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="价格(元)"
        width="80px"
      ></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            v-if="row.isSale == 0"
            type="success"
            icon="el-icon-sort-down"
            size="mini"
            @click="sale(row)"
          ></el-button>
          <el-button
            v-else
            type="success"
            icon="el-icon-sort-up"
            size="mini"
            @click="cancel(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器  @current-change="getPageList"
      @size-change="handleSizeChange" 两个回调 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 5, 7]"
      :pager-count="7"
      layout="prev, pager, next, jumper, ->, sizes,total"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <!-- 抽屉效果 -->
    <el-drawer :visible.sync="show" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="(attr, index) in skuInfo.skuAttrValueList"
              :key="attr.id"
              style="margin-right: 10px"
              >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="400px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",

  data() {
    return {
      page: 1, //代表当前第几页
      limit: 10, //代表当前页面有几条数据
      records: [], //存储SKU列表的数据
      total: 0, //存储分页器一个展示的数据
      skuInfo: {}, //存储点击详情按钮的当前列展示的页面的数据
      show: false, //控制抽屉的效果
    };
  },

  mounted() {
    this.getSkuList();
  },

  methods: {
    //获取sku列表
    async getSkuList(pages = 1) {
      this.page = pages;
      //解构默认参数
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },

    //上架
    async sale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "上架成功" });
      }
    },
    //下架
    async cancel(row) {
      let result = await this.$API.sku.reqCancel(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功" });
      }
    },
    edit() {
      this.$message("正在开发中");
    },
    //获取sku详情的方法
    async getSkuInfo(sku) {
      //展示抽屉
      this.show = true;
      //获取sku的数组
      let result = await this.$API.sku.reqSkuById(sku.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  .el-col-5 {
    font-size: 18px;
    text-align: right;
  }
}
.el-col {
  margin: 10px 10px;
}

</style>

<style lang="scss">
    //轮播图样式
.el-carousel__button {
    height: 20px;
    width: 20px;
    background: red;
    border-radius: 50%;

  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>