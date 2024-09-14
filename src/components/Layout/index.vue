<template>
  <div class="pageHeader">
    <div class="logo-wrapper">
      <img :src="require('../../assets/Logo.png')" alt="" />
    </div>
    <div class="pageHeaderLine">
      {{ content }}
      <!-- <div class="pagePicker">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            导航<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  @click.native="goDemo">
              产品碳排放展示页面
            </el-dropdown-item>
            <el-dropdown-item  @click.native="goCompute">
                产品碳排放计算页面
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["content"],
  data() {
    return {};
  },
  methods:{
    goCompute(){
      this.$router.push("/compute")
    },
    goDemo(){
      this.$router.push("/index")
    }
  }
};
</script>

<style lang="less">
body {
  padding: 0;
  margin: 0;
}

.logo-wrapper {
  display: flex;
  height: 60px;
  padding: 10px;
  // margin: 10px;
  align-items: center;
  img {
    height: 100%;
  }
  div {
    margin-left: 10px;
    font-size: 22px;
    font-weight: bold;
  }
}

.pageHeaderLine {
  background: rgba(19, 57, 132, 1);
  height: 40px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  .pagePicker {
    position: absolute;
    right: 15%;
    .el-dropdown-link {
      cursor: pointer;
      color: #ffffff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    .el-dropdown {
        padding-right: 45px;
    }


  }
}
</style>