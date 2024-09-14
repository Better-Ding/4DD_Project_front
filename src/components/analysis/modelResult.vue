<!-- 熔铸模块 -->
<template>
  <div class="castingModule">
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="module">
            <i class="el-icon-info"> </i>
            机器学习预测结果
          </div>
        </template>
        <el-table
        stripe
          :data="
            modelResult.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          style="width: 100%"
        >
          <el-table-column type="index" label="ID" width="50">
          </el-table-column>
          <el-table-column prop="millStand" label="Mill Stand" width="100">
          </el-table-column>
          <el-table-column
            prop="roller"
            label="Roller"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="rollingTime"
            label="Time(Day)"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="rollingWeight"
            label="Rolling Weight(T)"
            width="200"
          ></el-table-column>
          <el-table-column label="Roll Wear (Prediction)">
            <template slot-scope="scope">
              <div
                slot="reference"
                class="name-wrapper"
                style="font-weight: bold; color: red"
              >
                {{ scope.row.predict_res }}&nbsp; &plusmn; &nbsp; {{ scope.row.residuals}}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="modelResult.length"
      >
      </el-pagination>
    </div>
  </div>
</template>
  
  <script>
export default {
  //import引入的组件需要注入到对象中才能使用
  props: ["modelResult"],
  data() {
    return {
      currentPage: 1,
      pageSize: 15,
      activeName: "1",
    };
  },
  computed: {},
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  created() {},
  mounted() {},
};
</script>
  
  <style scoped lang="less">
.el-collapse {
  border: 0px solid #ebeef5;
}
.el-collapse-item {
  min-height: 70px;
}
.module {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>