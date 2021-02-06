<template>
  <div class="header">
    <div class="headerMain">
      <div class="nav">
        <ul class="nav-l">
          <li @click="routerToHome">网校首页</li>
          <li @click="routerToElective">选课中心</li>
          <li>
            <img
              src="@/assets/images/home/phone.png"
              alt=""
              style="margin-right:8px"
            />
            APP下载
            <div class="ewm">
              <div class="appewm"></div>
              <p class="p1">医小书网校手机客户端</p>
              <p class="p2">
                扫左侧二维码 <br />
                立即下载体验
              </p>
            </div>
          </li>
          <!-- <li>|</li>
          <li style="color:#17A6F3">
            <img
              src="@/assets/images/home/msg.png"
              alt=""
              style="margin-right:8px"
            />
            医小书最新版本上线啦！
          </li> -->
        </ul>
        <ul class="nav-r">
          <li style="color:#17A6F3" @click="routerToLogin">
            <img
              src="@/assets/images/home/login.png"
              alt=""
              style="margin-right:8px"
            />
            {{ info.real_name ? info.real_name : "登录" }}
          </li>
          <li>商务合作</li>
          <!-- <li style="margin-right:8px">企业团报</li> -->
        </ul>
      </div>
    </div>
    <div class="logo">
      <div class="logo-c">
        <div class="logoBox">
          <img
            @click="$router.push({ name: 'Home' })"
            src="@/assets/images/help/logo.png"
            alt=""
          />
          <span class="line">|</span>
          <span class="text">留言反馈</span>
        </div>
        <!-- <div class="btn" @click="login">
          登录
          <span>|</span>
          注册
        </div> -->
      </div>
    </div>

    <div class="formBox">
      <div class="banner">
        <p class="bannerText">我们重视您的每一条反馈</p>
        <p class="bannerCon">医小书相关负责人将第一时间查阅</p>
      </div>
      <ul>
        <li>
          <div class="label">反馈类型：</div>
          <el-radio-group v-model="form.type">
            <el-radio :label="0">培训项目</el-radio>
            <el-radio :label="1">题库</el-radio>
            <el-radio :label="2">产品建议</el-radio>
            <el-radio :label="3">其它建议</el-radio>
          </el-radio-group>
        </li>

        <li>
          <div class="label">反馈科目：</div>
          <el-select
            v-model="form.code"
            placeholder="请选择培训项目"
            style="width:180px"
            clearable
            @change="chooseSubject"
          >
            <el-option
              v-for="item in proOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </li>

        <li class="textarea">
          <div class="label"><span>*</span> 反馈内容：</div>
          <el-input
            v-model="form.content"
            placeholder="请输入内容"
            type="textarea"
            resize="none"
            :rows="5"
          ></el-input>
          <div class="empty">
            <img src="@/assets/images/message/correct.png" alt="" />
            <span>内容不能为空</span>
          </div>
        </li>
        <li>
          <div class="label"></div>
          <p class="tip">
            提供问题截图有利于尽快解决您的问题，图片大小建议不超过400KB
          </p>
        </li>

        <li>
          <div class="label"></div>
          <el-upload
            style="display:flex"
            class="avatar-uploader"
            action="https://up-z0.qiniup.com/"
            :data="dataObj"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div
              style="margin:0 5px"
              v-for="(item, index) in imageUrl"
              :key="index"
            >
              <img v-if="imageUrl.length > 0" :src="item" class="avatar" />
            </div>

            <div class="load">
              <img src="@/assets/images/message/upload.png" alt="" />
              <span>上传图片</span>
            </div>
          </el-upload>
        </li>

        <li>
          <div class="label"></div>
          <el-input
            style="width:180px"
            v-model="form.realName"
            placeholder="真实姓名"
          ></el-input>
          <el-input
            style="margin-left:10px"
            v-model="form.telephone"
            placeholder="请留下真实联系方式（邮箱、QQ、手机号），方便我们答疑解惑"
          ></el-input>
        </li>
      </ul>
      <div class="btn" @click="submit">提交反馈</div>
    </div>
  </div>
</template>
<script>
import { feedbackSubmit } from "@/api/message/message.js";
import { getNavList } from "@/api/examState/examState.js";
import { uploadAvatar } from "@/api/userCenter/userCenter.js";
export default {
  name: "Message",
  data() {
    return {
      info: {
        real_name: ""
      },
      form: {
        type: 0,
        code: "",
        content: "",
        realName: "",
        telephone: ""
      },
      proOptions: [],
      imageUrl: [],
      image: "",
      dataObj: { token: "", key: "" }
    };
  },
  async created() {
    if (
      JSON.parse(this.$cookie.get("userInfo", { domain: ".yixiaoshu.net" }))
    ) {
      this.info = JSON.parse(
        this.$cookie.get("userInfo", {
          domain: ".yixiaoshu.net"
        })
      );
    }
    if (JSON.parse(window.localStorage.getItem("userInfo"))) {
      this.info = JSON.parse(window.localStorage.getItem("userInfo"));
    }
    this.proOptions = await getNavList().then(res => {
      return res.data;
    });
  },
  methods: {
    routerToElective() {
      this.$router.push({ name: "ELective" });
    },
    routerToHome() {
      this.$router.push({ name: "Home" });
    },
    routerToLogin() {
      if (this.info.real_name) {
        this.$router.push({ name: "UserCenterHome" });
      } else {
        this.$router.push({ name: "Login" });
      }
    },
    // 跳转登录页
    login() {
      this.$router.push({ name: "Login" });
    },
    chooseSubject() {},
    // 七牛云上传
    beforeAvatarUpload(file) {
      const _self = this;
      return new Promise((resolve, reject) => {
        const params = {
          fileName: file.name,
          fileSize: file.size,
          type: 1
        };
        uploadAvatar(params)
          .then(response => {
            console.log(response.data);
            const key = response.data.fileKey;
            const token = response.data.token;
            // console.log('token', token)
            this.upload_qiniu_addr = response.data.domain + "/";
            _self._data.upload_qiniu_addr = response.data.domain + "/";
            _self._data.errorMap = response.data.errorMap;
            _self._data.dataObj.token = token;
            _self._data.dataObj.key = key;
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
          });
      });
    },
    handleAvatarSuccess(res, file) {
      console.log("res", res, this.upload_qiniu_addr);
      this.image = this.upload_qiniu_addr + res.key;
      // 上限上传3张
      if (this.imageUrl.length > 2) {
        this.imageUrl.shift();
        this.imageUrl.push(this.image);
      } else {
        this.imageUrl.push(this.image);
      }
    },
    submit() {
      if (!this.form.content) {
        this.$message({
          message: "反馈内容不能为空",
          type: "warning"
        });
        return false;
      }
      var imageString = this.imageUrl.join(",");
      this.form.imgs = imageString;
      feedbackSubmit(this.form).then(res => {
        if (res.data) {
          this.$message({
            message: "提交反馈成功",
            type: "success"
          });
          console.log(res, "提交成功");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  // background: #fff;
  .headerMain {
    // position: fixed;
    background: #fff;
    height: 30px;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    // top: 0;
    .nav {
      width: 1200px;
      margin: 0 auto;
      height: 100%;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      display: flex;
      justify-content: space-between;
      .nav-l {
        height: 100%;
        display: flex;
        align-items: center;
        .ewm {
          width: 333px;
          height: 160px;
          position: absolute;
          z-index: 999;
          top: 22px;
          left: -140px;
          background: url("../../assets/images/home/ewm.png") no-repeat center;
          .appewm {
            position: absolute;
            width: 106px;
            height: 106px;
            background: url("../../assets/images/home/appewm.png") no-repeat
              center;
            z-index: 999;
            top: 24px;
            left: 26px;
          }
          .p1 {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #17a5f2;
            position: absolute;
            top: 42px;
            right: 30px;
          }
          .p2 {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            position: absolute;
            top: 74px;
            right: 70px;
          }
          display: none;
        }
        li:nth-child(3):hover .ewm {
          display: block;
        }
        li {
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
          &:hover {
            cursor: pointer;
          }
        }
        li:nth-child(1) {
          margin-left: 12px;
          margin-right: 49px;
        }
        li:nth-child(2) {
          margin-right: 49px;
        }
        li:nth-child(4) {
          margin: 0 23px;
        }
      }
      .nav-r {
        height: 100%;
        display: flex;
        align-items: center;
        li {
          height: 100%;
          display: flex;
          align-items: center;
          &:hover {
            cursor: pointer;
          }
        }
        li:nth-child(2) {
          margin-left: 50px;
          margin-right: 43px;
        }
      }
    }
  }
  .logo {
    width: 100%;
    background: #fff;
    .logo-c {
      height: 76px;
      width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logoBox {
        display: flex;
        align-items: center;
        img {
          &:hover {
            cursor: pointer;
          }
        }
        .line {
          color: #e4e4e4;
          font-size: 20px;
          margin: 0 24px;
        }
        .text {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
      }
      .btn {
        width: 120px;
        height: 34px;
        background: #ffffff;
        border: 1px solid #17a5f2;
        border-radius: 17px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #17a5f2;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          cursor: pointer;
        }
        span {
          margin: 0 10px;
        }
      }
    }
  }
  .formBox {
    width: 1200px;
    height: 788px;
    background: #ffffff;
    box-shadow: 0px 2px 18px 0px rgba(185, 192, 196, 0.3);
    border-radius: 16px 16px 4px 4px;
    margin: 40px auto 75px;
    overflow: hidden;
    .banner {
      width: 1200px;
      height: 146px;
      background: url("../../assets/images/message/banner.png") no-repeat;
      position: relative;
      .bannerText {
        left: 40px;
        top: 45px;
        position: absolute;
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
      }
      .bannerCon {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.68;
        left: 40px;
        top: 89px;
        position: absolute;
      }
    }
    ul {
      padding: 0 40px;
      li {
        display: flex;
        align-items: center;
        margin-top: 35px;
        /deep/ .el-upload {
          display: flex;
        }
        /deep/ .el-textarea__inner {
          background: #f8f8f8;
        }
        /deep/ .el-input__inner {
          background: #f8f8f8;
        }
        /deep/ .el-radio__inner {
          background: #f1f1f1;
        }
        /deep/ .el-radio__input.is-checked .el-radio__inner {
          background: #409eff;
        }
        &.textarea {
          align-items: flex-start;
          position: relative;
          .empty {
            right: 20px;
            bottom: 10px;
            position: absolute;
            display: flex;
            align-items: center;
            span {
              margin-left: 8px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #e82020;
            }
            img {
              width: 14px;
              height: 14px;
            }
          }
        }
        .label {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          margin-right: 15px;
          position: relative;
          min-width: 84px;
          span {
            color: #e82020;
            position: absolute;
            top: 3px;
            left: -10px;
          }
        }
        // 单选框样式
        .el-radio-group {
          height: 21px;
          display: flex;
          align-items: center;
        }
        .el-radio {
          height: 100%;
          display: flex;
          align-items: center;
        }
        .tip {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
        img {
          width: 84px;
          height: 84px;
        }
        // 上传图片样式
        .load {
          width: 84px;
          height: 84px;
          border: 1px solid #cccccc;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 24px;
            height: 23px;
          }
          span {
            margin-top: 2px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
          }
        }
      }
    }
    .btn {
      margin: 30px auto 0;
      width: 244px;
      height: 48px;
      background: #17a5f2;
      border-radius: 4px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      line-height: 48px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
