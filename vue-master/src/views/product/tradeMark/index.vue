<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px opx"
      @click="showDialog"
      >添加</el-button
    >
    <el-table :data="list" style="width: 100%" border>
      <!-- column表示列  -->
      <el-table-column prop="id" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="">
        <!-- template 是一个作用域插槽 -->
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; heigth: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updataTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器  current-page当前第几页  total一共多少条数据  page-size每页展示多少条数据   page-sizes代表可以设置每一页展示多少条数据  layout下边的排列  pager-count 下边显示按钮的数量-->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 5, 7]"
      :pager-count="7"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper, ->, sizes,total"
    >
    </el-pagination>

    <!-- 对话框 -->
    <!-- Form 
      :visible.sync用于控制对话框的显示与隐藏 值为true 或false
      Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
    -->
    <el-dialog title="添加品牌:" :visible.sync="dialogFormVisible">
      <!-- form表单 model 将表单数据收集到tmForm这个对象身上 将来表单验证 -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <!-- prop 是需要验证什么 -->
        <el-form-item label="品牌名称:" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" label-width="100px" prop="logoUrl">
          <!-- 上传logo功能 
          :on-success 图片上传成功后的回调
           :before-upload 图片上传前的回调

           收集图片不能使用v-model 因为不是表单元素
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",

  data() {
    return {
      //代表分页器的第几页
      page: 1,
      //当前页数展示数据的条数
      limit: 3,
      //数据总共条数 初始为0
      total: 0,
      //列表展示的数据
      list: [],
      //控制对话框
      dialogFormVisible: false,

      //收集品牌信息
      tmForm: {
        logoUrl: " ",
        tmName: " ",
      },

      //表单验证规则
      rules: {
        //品牌名称的验证规则
        tmName: [
          //required 必须要校验的字段 message 提示信息  trigger 用户行为设置（ 值可为blur(获焦、失焦), change(文本发生变化)）
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        //品牌logo的验证规则
        logoUrl: [{ required: true, message: "请选择一张图片" }],
      },
    };
  },

  mounted() {
    //console.log(this.$API);
    this.getPageList();
  },

  methods: {
    async getPageList(pager = 1) {
      this.page = pager;
      //结构请求的初始化参数
      const { page, limit } = this;
      //获取品牌列表接口
      let result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      //console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    handleSizeChange(limits) {
      //console.log(limits);
      this.limit = limits;
      this.getPageList();
    },
    //点击添加展示对话框
    showDialog() {
      this.dialogFormVisible = true;
      //清空数据
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    //点击修改展示对话框
    updataTradeMark(row) {
      this.dialogFormVisible = true;
      //因为已有的数据已经存在了 this.tmForm 这个对象里 而row是当前 列的相关数据 只需要点击确定发送修改请求及下面的再次请求数据即可
      this.tmForm = { ...row };
      //console.log(row);
    },
    //点击删除展示对话框
    deleteTradeMark(row) {
      //console.log(row);
      //弹框
      this.$confirm(`删除${row.tmName}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //当用户点击确定按钮时触发  点击即发送删除请求
          //发送请求
          let result = await this.$API.tradeMark.reqDeleteTradeMark(row.id);
          console.log(result);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //成功后重新发送获取最新的商品数据 this.list.length>1?this.page:this.page-1 这个page是当前的页数
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
          }
        })
        .catch(() => {
          //当用户点击取消按钮时触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //上传图片的回调
    handleAvatarSuccess(res, file) {
      //res 是上传成功后返回前端的数据 file 也是
      this.tmForm.logoUrl = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //添加按钮（添加品牌|修改品牌）
    addOrUpdateTradeMark() {
      //需要所有字段验证完毕再发请求
      this.$refs.ruleForm.validate(async (success) => {
        //如果成功进行请求
        if (success) {
          this.dialogFormVisible = false;

          //点击确定后发请求将这些表单数据提交给服务器
          let result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          if (result.code == 200) {
            //弹出信息提示框
            this.$message(this.tmForm.id ? "修改品牌成功" : "添加品牌成功");
            //提交成功后再次获取品牌列表
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
<style lang="scss" scope>
//上传logo的样式
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>