<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="search-earde">
        <span>线上热门搜索</span>

        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <lineCharts title="搜索用户数"></lineCharts>
        </el-col>
        <el-col :span="12">
          <lineCharts title="人均搜索次数"></lineCharts>
        </el-col>
      </el-row>
      <!-- table -->
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column type="index" label="排名"  width="80">
        </el-table-column>
        <el-table-column prop="name" label="搜索关键字"  width="180">
        </el-table-column>
        <el-table-column prop="address" label="用户数" sortable >
        </el-table-column>
        <el-table-column prop="address" label="周涨幅" sortable>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination class="pagination"
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
    </div>
  </el-card>
</template>

<script>
import lineCharts from "./lineCharts";
export default {
  name: "",
  components: { lineCharts },
  data() {
    return {
      tableData:[{}],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.clearfix {
  border-bottom: 1px solid #eee;
  padding: 5px 10px;
}
.search-earde {
  display: flex;
  justify-content: space-between;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.pagination{
  float: right;
}
</style>