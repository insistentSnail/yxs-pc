<template>
  <div class="userCenterData">
    <div class="person-data">
      <div class="dataTitle">
        <img src="@/assets/images/userCenter/titleSign.png" alt="" />
        <span>个人资料</span>
      </div>
      <ul class="dataContent">
        <li>
          <div class="label"><span>头</span><span>像</span></div>
          <el-upload
            class="avatar-uploader"
            action="https://up-z0.qiniup.com/"
            :data="dataObj"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              style="width:72px;height:72px;border-radius:50%;overflow:hidden"
              :src="
                imageUrl
                  ? imageUrl
                  : require('@/assets/images/userCenter/avatar.png')
              "
              class="avatar"
            />
          </el-upload>
        </li>
        <li>
          <div class="label"><span>姓</span><span>名</span></div>
          <el-input
            v-model="userForm.realName"
            placeholder="请输入姓名"
          ></el-input>
        </li>
        <li>
          <div class="label"><span>性</span><span>别</span></div>
          <el-radio-group
            v-model="userForm.sex"
            style="height:21px;display:flex;align-items:center"
          >
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </li>
        <li>
          <div class="label"><span>简</span><span>介</span></div>
          <el-input
            v-model="userForm.introduction"
            placeholder="请输入内容"
          ></el-input>
        </li>
        <li>
          <div class="label"><span>用</span><span>户</span><span>名</span></div>
          <el-input
            v-model="userForm.username"
            placeholder="请输入内容"
            disabled
          ></el-input>
        </li>
        <li>
          <div class="label"><span>手</span><span>机</span></div>
          <el-input
            v-model="userForm.phone"
            placeholder="请输入内容"
            disabled
          ></el-input>
          <span class="change" @click="changePhone">修改</span>
        </li>
        <li>
          <div class="label"><span>生</span><span>日</span></div>
          <el-date-picker
            style="width:368px"
            v-model="userForm.birthday"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </li>
        <li>
          <div class="label"><span>职</span><span>业</span></div>
          <el-input
            style="width:368px"
            v-model="userForm.occupation"
            placeholder="请输入内容"
          ></el-input>
        </li>
        <li>
          <div class="label"><span>地</span><span>区</span></div>
          <el-select
            v-model="userForm.provinceId"
            placeholder="请选择"
            style="width:180px"
            clearable
            @change="chooseProvince"
          >
            <el-option
              v-for="item in proOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="userForm.cityId"
            placeholder="请选择"
            style="width:180px;margin-left:8px"
            clearable
            @change="chooseCity"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="userForm.areaId"
            placeholder="请选择"
            style="width:180px;margin-left:8px"
            clearable
          >
            <el-option
              v-for="item in areaOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </li>
      </ul>
    </div>
    <div style="margin-top:20px" @click="submitForm" class="save">
      保存修改
    </div>

    <!-- 修改手机号码弹窗 -->
    <el-dialog title="" :visible.sync="dialogFormVisible" width="540px">
      <el-form :model="dialogForm">
        <el-form-item label="" class="changePhoneDialog">
          <span class="label">新手机号</span>
          <el-input v-model="dialogForm.phone"></el-input>
        </el-form-item>
        <div style="display:flex;">
          <el-form-item label="" class="yzmDialog">
            <span class="label">验证码</span>
            <el-input
              v-model="dialogForm.yzm"
              placeholder="请输入验证码"
            ></el-input>
          </el-form-item>
          <div class="getYzm">获取验证码</div>
        </div>
      </el-form>
      <div @click="submit" class="save">保存修改</div>
    </el-dialog>
  </div>
</template>
<script>
import {
  myData,
  allCities,
  updateData,
  uploadAvatar
} from "@/api/userCenter/userCenter.js";
export default {
  name: "userCenterData",
  data() {
    return {
      imageUrl: "",
      userForm: {
        realName: "",
        sex: null,
        introduction: "",
        username: "",
        phone: "",
        birthday: "",
        occupation: "",
        provinceId: "",
        cityId: "",
        areaId: ""
      },
      proOptions: [], //省
      options: [], //市
      areaOptions: [], //区
      dialogFormVisible: false,
      dialogForm: {
        phone: "",
        yzm: ""
      },
      dataObj: { token: "", key: "" }
    };
  },
  async created() {
    this.proOptions = await allCities().then(res => {
      return res.data;
    });
    // 先要获取省市区数据
    myData().then(res => {
      console.log(res, "我的资料");
      this.userForm.realName = res.data.realName;
      this.userForm.sex = res.data.sex;
      this.userForm.introduction = res.data.introduction;
      this.userForm.username = res.data.username;
      this.userForm.phone = res.data.phone;
      this.userForm.birthday = res.data.birthday;
      this.userForm.occupation = res.data.occupation;
      this.userForm.provinceId = res.data.provinceId;
      this.userForm.cityId = res.data.cityId;
      this.userForm.areaId = res.data.areaId;
      this.imageUrl = res.data.avatar;
      this.chooseProvince(this.userForm.provinceId, true);
      this.chooseCity(this.userForm.cityId, true);
      // 更新用户信息后重新存一遍
      var userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      userInfo.real_name = res.data.realName;
      console.log(userInfo, "userInfo");
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    });
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log("res", res, this.upload_qiniu_addr);
      this.imageUrl = this.upload_qiniu_addr + res.key;
      this.userForm.avatar = this.imageUrl;
    },
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
    // 选择省
    chooseProvince(e, has) {
      console.log(e, "省");
      this.proOptions.forEach(ele => {
        if (ele.id == e) {
          this.options = ele.children;
        }
      });
      // 第一次进来要显示默认值，选择省份后，市和区要清空
      if (has) {
      } else {
        this.userForm.cityId = "";
        this.userForm.areaId = "";
      }
    },
    // 选择市
    chooseCity(e, has) {
      this.options.forEach(ele => {
        if (ele.id == e) {
          this.areaOptions = ele.children;
        }
      });
      if (has) {
      } else {
        this.userForm.areaId = "";
      }
    },
    // 提交表单
    submitForm() {
      updateData(this.userForm).then(res => {
        if (res.data) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          location.reload();
        }
      });
    },
    changePhone() {
      this.dialogForm.phone = "";
      this.dialogFormVisible = true;
    },
    // 修改手机号码
    submit() {
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.userCenterData {
  .save {
    width: 380px;
    height: 44px;
    background: #17a5f2;
    border-radius: 4px;
    text-align: center;
    line-height: 44px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    margin: 0 auto 20px;
    &:hover {
      cursor: pointer;
    }
  }
  .getYzm {
    margin-left: 8px;
    width: 122px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #17a5f2;
    border-radius: 4px;
    box-sizing: border-box;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #17a5f2;
    &:hover {
      cursor: pointer;
    }
  }
  .yzmDialog {
    position: relative;
    display: flex;
    .label {
      position: absolute;
      z-index: 999;
      left: 16px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #999999;
    }
    /deep/ .el-form-item__content {
      width: 250px;
      margin-left: 60px;
    }
    /deep/ .el-input__inner {
      text-indent: 90px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
    }
  }
  .changePhoneDialog {
    position: relative;
    display: flex;
    .label {
      position: absolute;
      z-index: 999;
      left: 16px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #999999;
    }
    /deep/ .el-form-item__content {
      width: 380px;
      margin: 0 auto;
    }
    /deep/ .el-input__inner {
      text-indent: 90px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
    }
  }
  /deep/ .el-input__inner {
    background: #f8f8f8;
  }
  /deep/ .el-radio {
    display: flex;
    align-items: center;
  }
  .person-data {
    width: 892px;
    height: 770px;
    background: #ffffff;
    border-radius: 6px;
    padding: 0 30px;
    .dataTitle {
      height: 70px;
      position: relative;
      display: flex;
      align-items: center;
      span {
        margin-left: 8px;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
      &::after {
        content: "";
        width: 892px;
        height: 1px;
        background: #ececec;
        border-radius: 1px;
        position: absolute;
        bottom: 0;
      }
    }
    .dataContent {
      li {
        display: flex;
        align-items: center;
        padding: 16px 0;
        position: relative;
        .change {
          position: absolute;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #17a5f2;
          right: 18px;
          top: 26px;
          &:hover {
            cursor: pointer;
          }
        }
        .label {
          width: 54px;
          margin-right: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }
}
</style>
