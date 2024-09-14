<template>
  <div>
    <Layout :content="content" />
    <div class="app-container">
      <div style="display: flex">
        <div class="uploader">
          <el-row
            :gutter="20"
            style="width: 450px; padding: 10px 20px; background-color: #f0f0f0"
          >
            <el-button
              @click="uploadCSV"
              style="
                width: 100%;
                font-size: 15px;
                font-weight: bold;
                color: black;
                background: rgb(222, 235, 247);
                border: 2px solid rgb(178, 206, 233);
              "
            >
              请选择csv数据文件 Select CSV file
              <i
                class="el-icon-upload el-icon--right"
                style="font-size: 20px"
              ></i>
            </el-button>
          </el-row>
          <el-row
            :gutter="20"
            style="width: 450px; padding: 10px 20px; background-color: #f0f0f0"
          >
            <el-button
              style="
                width: 100%;
                font-size: 15px;
                font-weight: bold;
                color: black;
                background: rgb(222, 235, 247);
                border: 2px solid rgb(178, 206, 233);
              "
              @click="handleAddOne"
            >
              上传一条数据 Upload one data record
              <!-- <i class="el-icon-upload el-icon--right" style="font-size: 20px;" ></i> -->
            </el-button>
          </el-row>

          <el-row
            :gutter="20"
            style="
              margin-top: 20px;
              width: 450px;
              padding: 20px 20px 0px 20px;
              background-color: #f0f0f0;
            "
          >
            <el-form
              class="myform"
              :model="form"
              label-position="left"
              label-width="280px"
            >
              <el-form-item>
                <template slot="label">
                  <span class="label-text"
                    >机架号 &nbsp;&nbsp;&nbsp; Mill Stand (FM or RM)</span
                  >
                </template>
                <el-input disabled v-model="form.millStand"> </el-input>
              </el-form-item>
              <el-form-item>
                <template slot="label">
                  <span class="label-text"
                    >轧辊号 &nbsp;&nbsp;&nbsp; Roller (BC or BJ series)</span
                  >
                </template>
                <el-input disabled v-model="form.roller"> </el-input>
              </el-form-item>
              <el-form-item label="轧制时长 Rolling Time (day)">
                <el-input disabled v-model="form.rollingTime"> </el-input>
              </el-form-item>
              <!-- <el-form-item label="轧制长度 Rolling Length (cm)">
                <el-input disabled v-model="form.rollingLength"> </el-input>
              </el-form-item> -->
              <el-form-item label="轧制重量 Rolling Weight (t)">
                <el-input disabled v-model="form.rollingWeight"> </el-input>
              </el-form-item>
              <el-form-item label="上次人工切削量 Last Cutting (mm)">
                <el-input disabled v-model="form.lastCutting"> </el-input>
              </el-form-item>
              <el-form-item label="上次在线磨损量 Last Rolling Wear (mm)">
                <el-input disabled v-model="form.lastRollingWear"> </el-input>
              </el-form-item>
              <!-- <el-form-item label="上次轧制重量 Last Rolling Weight (t)">
                <el-input disabled v-model="form.lastRollingWeight"> </el-input>
              </el-form-item> -->
            </el-form>
          </el-row>

          <el-row
            :gutter="20"
            style="
              width: 450px;
              background-color: #f0f0f0;
              font-size: 12px;
              color: rgb(0, 112, 192);
            "
          >
            <div style="padding: 4px">
              Since the rolling time, rolling length, and rolling weight are
              highly correlated, the ML prediction is based on the rolling
              weight!
            </div>
            <div
              style="
                color: white;
                background-color: rgb(132, 152, 176);
                padding: 5px 7px;
              "
            >
              因为轧制时长、长度和重量等三特征高度相关，叠加赋值的情况下以轧制重量为准!
            </div>
          </el-row>
        </div>
        <div class="visualBody">
          <Gantt :ganttUrl="ganttUrl" />
          <ModelResult :modelResult="modelResult" />
        </div>
      </div>
    </div>

    <!-- 上传一条数据 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form
        class="myform"
        :model="form"
        label-position="left"
        label-width="280px"
      >
        <el-form-item>
          <template slot="label">
            <span class="label-text"
              >机架号 &nbsp;&nbsp;&nbsp; Mill Stand (FM or RM)</span
            >
          </template>
          <el-select v-model="form.millStand" placeholder="Please Select">
            <el-option
              v-for="item in millStandOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="label-text"
              >轧辊号 &nbsp;&nbsp;&nbsp; Roller (BC or BJ series)</span
            >
          </template>
          <el-select v-model="form.roller" placeholder="Please Select">
            <el-option
              v-for="item in rollerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="轧制时长 Rolling Time (day)">
          <el-input type="number" v-model="form.rollingTime"> </el-input>
        </el-form-item>
        <!-- <el-form-item label="轧制长度 Rolling Length (cm)">
          <el-input type="number" v-model="form.rollingLength"> </el-input>
        </el-form-item> -->
        <el-form-item label="轧制重量 Rolling Weight (t)">
          <el-input type="number" v-model="form.rollingWeight"> </el-input>
        </el-form-item>
        <el-form-item label="上次人工切削量 Last Cutting (mm)">
          <el-input type="number" v-model="form.lastCutting"> </el-input>
        </el-form-item>
        <el-form-item label="上次在线磨损量 Last Rolling Wear (mm)">
          <el-input type="number" v-model="form.lastRollingWear"> </el-input>
        </el-form-item>
        <!-- <el-form-item label="上次轧制重量 Last Rolling Weight (t)">
          <el-input type="number" v-model="form.lastRollingWeight"> </el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="tableCancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 上传数据 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".csv"
        :headers="upload.headers"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__tip text-center" slot="tip">
          <span>仅允许导入csv格式文件。</span>
          <el-link
            type="primary"
            :underline="false"
            style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate"
            >下载通用模板</el-link
          >
        </div>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import Gantt from "@/components/analysis/gantt.vue";
import ModelResult from "../components/analysis/modelResult.vue";
import { Upload } from "element-ui";
import { getOneDataResult } from "@/api/index";
export default {
  name: "Index",
  components: { Layout, Gantt, ModelResult },
  data() {
    return {
      content: "4200厚板轧辊磨削量的机器学习预测",
      templateUrl: "",
      state: "",
      open: false,
      title: "",
      ganttUrl: "",
      modelResult: [],
      millStandOptions: [
        {
          value: "FM",
          label: "FM",
        },
        {
          value: "RM",
          label: "RM",
        },
      ],
      rollerOptions: [
        {
          value:'BC01',
          label:'BC01'
        },
        {
          value:'BC02',
          label:'BC01'
        },{
          value:'BJ01',
          label:'BJ01'
        },{
          value:'BJ02',
          label:'BJ02'
        },{
          value:'BJ03',
          label:'BJ03'
        },{
          value:'BJ04',
          label:'BJ04'
        },{
          value:'BJ05',
          label:'BJ05'
        },{
          value:'BJ06',
          label:'BJ06'
        },{
          value:'BJ07',
          label:'BJ07'
        },{
          value:'BJ08',
          label:'BJ08'
        }
      ],
      form: {
        millStand: "",
        roller: "",
        rollingTime: "",
        rollingWeight: "",
        lastCutting: "",
        lastRollingWear: "",
      },
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        // headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: "/api/getGantt",
      },
      queryParam: {
        productName: "",
      },
    };
  },
  methods: {
    // 点击上传文件按钮
    uploadCSV() {
      this.upload.open = true;
      this.upload.title = "上传文件 Upload file";
    },

    // 下载模板
    importTemplate() {
      var a = document.createElement("a");
      a.href = "/file/template.csv";
      a.setAttribute("download", "通用模板.csv");
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    },

    // 提交搜索(后端完成)
    handleAddOne() {
      this.open = true;
      this.title = "上传一条数据 Upload one data record";
    },
    // 提交表单
    submitForm() {
      this.open = false;
      getOneDataResult(this.form).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        } else {
          const svrResult = res.data.data;
          this.modelResult.push(svrResult);
        }
      });
    },
    // 取消
    tableCancel() {
      this.open = false;
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(
        "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
          response.msg +
          "</div>",
        "导入结果",
        { dangerouslyUseHTMLString: true }
      );
      if (response.code == 200) {
        this.ganttUrl = response.data.plot_url;
        this.modelResult = this.modelResult.concat(response.data.predict_res);
      }
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
  },
  mounted(){
    console.log(process.env)
  },
  
};
</script>

<style lang="less">
.el-form-item {
  background: rgb(222, 235, 247);
  border: 2px solid rgb(178, 206, 233);
  border-radius: 5px;
  padding: 0px 10px;
  .el-form-item__label {
    color: black;
  }
  .el-input__inner {
    height: 30px;
    color: black !important;
  }
}

.visualBody {
  margin: 0 50px;
  width: 70%;
}

.el-dialog__body {
  padding: 10px 20px;
}
.el-dialog__title {
  font-size: 18x;
  font-weight: bold;
}

.uploader {
  width: 450px;
  // position: absolute;
  // right: 30px;
  // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.pagination {
  margin-top: 15px;
  float: right;

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: rgba(19, 57, 132, 1);
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:hover {
    color: rgba(19, 57, 132, 1);
  }
}
</style>