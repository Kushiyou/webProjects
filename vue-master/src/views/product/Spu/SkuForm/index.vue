<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        type="number"
        v-model="skuInfo.price"
        placeholder="价格(元)"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(千克)">
      <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input
        type="textarea"
        rows="4"
        placeholder="规格描述"
        v-model="skuInfo.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true" ref="form" label-width="80px">
        <el-form-item
          :label="attr.attrName"
          v-for="(attr, index) in attrInfoList"
          :key="attr.id"
        >
          <el-select placeholder="请选择" v-model="attr.attrIdAndValueId"
            ><el-option
              :label="attrValue.valueName"
              :value="`${attr.id}:${attrValue.id}`"
              v-for="(attrValue, index) in attr.attrValueList"
              :key="attrValue.id"
            ></el-option
          ></el-select>
        </el-form-item>
      </el-form>
      <!-- <el-form :inline="true" ref="form" label-width="80px">
        <el-form-item label="无线通信">
          <el-select placeholder="请选择" value=""
            ><el-option label="label" value="value"></el-option
          ></el-select>
        </el-form-item>
      </el-form> -->
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true" ref="form" label-width="80px">
        <el-form-item
          :label="saleAttr.saleAttrName"
          v-for="(saleAttr, index) in spuSaleAttrList"
          :key="saleAttr.id"
        >
          <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId"
            ><el-option
              :label="saleAttrValue.saleAttrValueName"
              :value="`${saleAttr.id}:${saleAttrValue.id}`"
              v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList"
              :key="saleAttrValue.id"
            ></el-option
          ></el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表">
      <el-table
        border
        style="width: 100%"
        :data="spuImageList"
        @selection-change="handleSelectChange"
      >
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column prop="prop" label="图片" width="width">
          <template slot-scope="{ row, $index }">
            <img :src="row.imgUrl" style="width: 100px; heigth: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{ row, $index }">
            <el-button
              type="primary"
              v-if="row.isDefault == 0"
              @click="changeDefault(row)"
              >设置默认</el-button
            >
            <el-button v-else>默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancle">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "SkuForm",
  data() {
    return {
      //存储图片的信息
      spuImageList: [],
      //存储销售属性的数据
      spuSaleAttrList: [],
      //存储平台属性的数据
      attrInfoList: [],
      //收集sku数据的字段
      skuInfo: {
        //第一类收集的数据，父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类收集的数据  需要通过数据的双向绑定v-modle收集
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        //第三类 需要自己书写代码的
        //默认图片的地址
        skuDefaultImg: "",
        //收集图片的字段
        skuImageList: [
          /* {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            isDefault: "string",
            skuId: 0,
            spuImgId: 0,
          }, */
        ],
        //平台属性
        skuAttrValueList: [
          {
            attrId: 0,
            valueId: 0,
          },
        ],
        //收集销售属性列表的数据
        skuSaleAttrValueList: [
          /* {
            id: 0,
            saleAttrId: 0,
            saleAttrName: "string",
            saleAttrValueId: 0,
            saleAttrValueName: "string",
            skuId: 0,
            spuId: 0,
          }, */
        ],
      },
      spu: {},
      //收集图片的数据字段：获取到用户选中图片的信息数据，但是当前收集的数据缺少isDefault字段的 所以我们先存起来以便后边添加
      imageList: [],
    };
  },
  methods: {
    //获取skuForm数组
    async getDate(category1Id, category2Id, spu) {
      //收集父组件给与的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      //获取图片的数据
      let result = await this.$API.spu.reqSpuImageLIst(spu.id);
      if (result.code == 200) {
        let list = result.data;
        list.forEach((item) => {
          //手动添加isDefault属性 用于设置是否设为默认
          item.isDefault = 0;
        });
        this.spuImageList = list;
      }
      //获取销售属性的数据
      let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      //获取平台属性的数据
      let result2 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    //点击table表格复选框按钮时触发
    handleSelectChange(params) {
      //获取到用户选中图片的信息数据，但是当前收集的数据缺少isDefault(用于设置是否默认)字段的 所以我们先存起来以便后边添加
      this.imageList = params;
    },
    //排他操作 设置默认值 只有一个
    changeDefault(row) {
      //图片列表的数据的isDefault字段变为0
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      //当前点击的图片的row的isdefault的数据变为1
      row.isDefault = 1;
      //收集当前默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    //点击取消按钮
    cancle() {
      //通知父组件场景切换为0
      this.$emit("changeScenes", 0);
      Object.assign(this._data, this.$options.data());
    },
    //点击保存触发的事件 发送请求保存数据到服务器
    async save() {
      //整理平台属性参数 解构attrInfoList
      const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this;
      //整理平台属性数据方式1
      /*  //新建数组
        let arr = [];
        attrInfoList.forEach((item)=>{
          //当前平台属性用户进行选择
          if(item.attrIdAndValueId){
            const [attrId,valueId] = item.attrIdAndValueId.split(':')
            //携带给服务器参数应该是对象
            let obj = {valueId,attrId};
            arr.push(obj);
          }
        });
        skuInfo.skuAttrValueList = arr; */

      //方式2  reduc() item当前的属性
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);

      //整理销售属性的数据
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);

      //整理图片列表数据
      skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgUrl: item.imgUrl,
          imgName: item.imgName,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });

      //发送保存请求
      let result = await this.$API.spu.reqAddSku(skuInfo);
      //console.log(result);
      if(result.code == 200){
        this.$message({type:'success',message:'保存成功'});
        this.$emit('changeScenes',0)
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>