<!-- 熔铸模块 -->
<template>
    <div class="castingModule">
      <el-collapse v-model="activeName">
        <el-collapse-item name="2">
          <template slot="title">
            <div class="module">
              <i class="el-icon-info"> </i>
              支撑辊使用状况甘特图
            </div>
          </template>
          <el-image 
                v-if="ganttUrl"
                style="width: 60%;"
                :src="ganttUrl" 
                :preview-src-list="[ganttUrl]">
            </el-image>
            <el-empty  v-else></el-empty>
        </el-collapse-item>
      </el-collapse>
    </div>
  </template>
  
  <script>

  export default {
    //import引入的组件需要注入到对象中才能使用
    props: ["ganttUrl"],
    data() {
      return {
        activeName: '2',
      };
    },
    computed: {

    },
    methods: {},
    created() {},
    mounted() {
        
    },
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