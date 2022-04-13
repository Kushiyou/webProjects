<template>
  <div>
    <el-card style="margin: 20px 0px"
      ><CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect
    ></el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 展示表格 -->
        <el-table border style="width: 100%" :data="attrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150px">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item label="属性名">
            <!-- 收集属性名 -->
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border=""
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80px"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称..."
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 气泡确认删除框 -->
              <el-popconfirm
                :title="`确认删除${row.valueName}吗？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入 lodash 深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",

  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //平台属性数据
      attrList: [],
      //控制表格显示与隐藏
      isShowTable: true,

      //收集新增属性|修改属性使用的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值 因为属性可以有多个
          /* {
            attrId: 0,//相应属性名的id
            valueName: "string",
          }, */
        ],
        categoryId: 0, //三级分类的ID
        categoryLevel: 0, //服务器用于区分几级Id
      },
    };
  },

  mounted() {},

  methods: {
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;

        //发请求获取下边的列表
        this.getAttList();
      }
    },
    //获取平台的属性数据
    async getAttList() {
      //console.log('发起过去');
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      console.log(result);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    //添加属性值的回调
    addAttrValue() {
      //向this.attrInfo.attrValueList数组放入元素
      //attrId是相应属性的id 就是服务器返回的分配好的id
      //valueName是添加的相应属性值的名称
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
        //flag用于切换查看模式与编辑模式
      });
      //点击添加按钮的时候就自动聚焦 input框
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    addAttr() {
      //显示收集列表
      this.isShowTable = false;
      //解决数据回显问题
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性值 因为属性可以有多个
          /* {
            attrId: 0,//相应属性名的id
            valueName: "string",
          }, */
        ],
        categoryId: this.category3Id, //三级分类的ID
        categoryLevel: 3, //服务器用于区分几级Id
      };
    },
    //修改某个属性
    updateAttr(row) {
      this.isShowTable = false;
      //使用loadash使用深拷贝 防止点击取消时也会修改
      this.attrInfo = cloneDeep(row);
      //在修改某一个属性时，将相应的属性值元素添加上flag标记
      this.attrInfo.attrValueList.forEach((item) => {
        //响应式添加flag  (不能直接将=> item.flag = false)
        this.$set(item, "flag", false);
      });
    },
    //切换编辑模式
    toLook(row) {
      //判断属性值是否为空
      if (row.valueName.trim() == "") {
        this.$message("请输入正确的格式！");
        return;
      }
      //判断属性值是否重复
      let isRept = this.attrInfo.attrValueList.some((item) => {
        /* console.log(item);
        console.log(row); */
        //需要将row从数组里面判断的时候去除
        //row是最新新增的属性值 就是最后的一个元素
        if (row !== item) {
          //item是some遍历出来的每个属性的索引  这步是用于将遍历出来的与之前的进行比较
          return row.valueName == item.valueName;
        }
      });
      if (isRept) {
        this.$message("编辑属性已重复！");
        return;
      }
      console.log(isRept);
      //row 这个形参是用户添加的最新的属性值
      //下边是编辑模式变查看模式
      row.flag = false;
    },
    //点击span的回调 是的自动聚焦编辑input
    toEdit(row, index) {
      row.flag = true;
      //获取input的节点
      // console.log(this.$refs[index]);这样是undefined因为我们是使用 v-if来控制显示隐藏span与input框的切换 涉及了节点的创建 因为这时候input华美创建呢 所有获取不到这个时候的节点
      this.$nextTick(() => {
        //获取相应的节点并聚焦
        this.$refs[index].focus();
      });
    },
    //起泡确认框 点击确认时触发
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    //进行添加或修改完成后发送请求
    async addOrUpdateAttr() {
      //1. 整理参数 属性值为空的不提交
      //2. flag状态码也不需要提交
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        item => {
          //过滤掉属性值不为空的
          if (item.valueName != '') {
            //删除flag属性 通过delet操作符
            delete item.flag;
            return true;
          }
        }
      );
      //发请求
      //try是成功的回调
      try {
        //发请求
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        this.$message({type:'success',message:'保存成功！'});
        //保存成功后重新发请求展示数据
        this.getAttList();
        //返回展示的列表
        this.isShowTable = true;
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
</style>