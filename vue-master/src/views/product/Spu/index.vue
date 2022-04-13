<template>
  <div>
    <el-card style="margin: 20px 0"
      ><CategorySelect
        @getCategoryId="getCategoryId"
        :show="this.scene !== 0"
      ></CategorySelect
    ></el-card>
    <el-card>
      <!-- 展示SPU列表的结构 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="widthL100%" border :data="records">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width"
          ></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="changeSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              ></hint-button>
              <el-popconfirm title="确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
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
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>

      <spu-form
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></spu-form>
      <sku-form
        v-show="scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></sku-form>
    </el-card>

    <!-- 查看sku的对话框 -->
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
        <el-table-column prop="price" label="价格" width="width"></el-table-column>
        <el-table-column prop="weight" label="重量" width="width"></el-table-column>
        <el-table-column prop="prop" label="默认图片" width="width">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" style="width:100px;heigth:100pe">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./SpuForm/index.vue";
import SkuForm from "./SkuForm/index.vue";
export default {
  name: "Spu",
  components: { SpuForm, SkuForm },
  data() {
    return {
      //分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      loading:true,
      page: 1, //分页器当前第几页
      limit: 3, //每一页展示多少数据
      records: [], //spu列表的数据
      total: 0, //分页器一共需要展示数据的条数
      scene: 0,
      dialogTableVisible: false, //控制对话框的显示与隐藏
      spu: {}, //存储dialog所需展示信息
      skuList: [], //存储sku列表的数组
    };
  },
  mounted() {},
  methods: {
    //当分页器某一页展示数据条数发生变化的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    /* //点击分页器的第几页按钮的回调
    handleCurrentChange(page){
        this.page = page;
        this.getSpuList();
    } */
    //获取Spu列表数据的方法
    async getSpuList(pages = 1) {
      this.page = pages;
      //解构参数
      const { page, limit, category3Id } = this;
      //携带数据：page 第几页  limit 每一页需要展示多少数据 三级分类id
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      console.log(result);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    //三级联动的自定义事件，可以把子组件相应的id传给父组件
    getCategoryId({ categoryId, level }) {
      //categoryId获取到1 2 3 级的id  level为了区分是几级id
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //发送请求 获取SPU列表
        this.getSpuList();
      }
    },
    //添加spu的回调
    addSpu() {
      this.scene = 1;
      //通知子组件SPUForm发请求
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //修改spu
    changeSpu(row) {
      this.scene = 1;
      //通过$refs.spu获取子组件的方法或数据
      this.$refs.spu.initSpuData(row);
    },
    //spuform 的自定义回调
    changeScene({ scene, flag }) {
      //返回  0  场景
      this.scene = scene;
      //flag区分是保存还是修改
      if (flag == "修改") {
        //返回0场景后还得重新获取修改后的数据 再展示
        //还需要传入当前修改的页数 使得修改后停留在当前页增加体验
        this.getSpuList(this.page);
      } else {
        //返回0场景后还得重新获取修改后的数据 再展示
        this.getSpuList();
      }
    },
    //删除spu按钮的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除spu成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //添加sku按钮的回调
    addSku(row) {
      this.scene = 2;
      //父组件调用子组件发送3个请求
      this.$refs.sku.getDate(this.category1Id, this.category2Id, row);
    },
    //sku自定义回调
    changeScenes(scene) {
      this.scene = scene;
    },

    //查看当前spu的sku列表按钮
    async handler(spu) {
      this.dialogTableVisible = true;
      this.spu = spu;
      //发送请求获取sku列表的数据
      let result = await this.$API.spu.reqSkuList(spu.id);
      //console.log(result);
      if (result.code == 200) {
        this.skuList = result.data;
        this.loading = false;
      }
    },
    //关闭对话框的回调 将loading改为true 以及将sku列表的数据清空防止数据回显
    close(done){
      this.loading = true;
      this.skuList = [];
      //关闭对话框 因为这个是对话框关闭之前的close 德继续让他执行所以done()接下来的步骤
      done();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>