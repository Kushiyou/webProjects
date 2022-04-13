<template>
  <div>
    <!-- 
          :inline 表示行内表单，代表一行可以放置多个表单元素
       -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1(cForm.category1Id)"
          :disabled="show"
        >
          <!-- 收集到的value 是id用于 进行对二级分类进行参数的reques -->
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      //1级分类数据
      list1: [],
      //2级分类数组
      list2: [],
      //3级分类数组
      list3: [],
      //收集相应的一级二级三级分类的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    this.getCateGory1List();
  },
  methods: {
    async getCateGory1List() {
      let result = await this.$API.attr.reqCategory1List();
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
    //一级分类select的事件回调(当一级分类option发生变化时获取相应的二级分类的数据)
    async handler1(id) {
      //清除2，3级数据
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      const { category1Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category1Id, level: 1 });

      let result = await this.$API.attr.reqCategory2List(id);
      if (result.code == 200) {
        this.list2 = result.data;
      }
    },
    //二级分类的sele的事件回调(当二级分类option发生变化时获取相应的三级分类的数据)
    async handler2() {
      //清除三级数据
      this.list3 = [];
      this.cForm.category3Id = "";

      const { category2Id } = this.cForm;
      this.$emit('getCategoryId', { categoryId: category2Id, level: 2 });

      let result = await this.$API.attr.reqCategory3List(category2Id);
      if (result.code == 200) {
        //console.log(result);
        this.list3 = result.data;
      }
    },
    //三级分类的sele的事件回调(当三级分类option发生变化时获取相应的第二个card的列表商品数据)
    handler3() {
      const { category3Id } = this.cForm;
      this.$emit('getCategoryId', { categoryId: category3Id, level: 3 });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>