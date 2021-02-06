<template>
  <div class="login">
    <div class="topLogo">
      <div class="topLogo-c">
        <div class="logo" @click="toHome">
          <!-- <img
            src="@/assets/images/home/logo.png"
            alt=""
            style="margin-right:20px"
          />
          <img
            src="@/assets/images/home/slogen.png"
            alt=""
            style="margin-top: 3px;"
          /> -->
          <p
            style="font-size: 16px;font-family: Microsoft YaHei;font-weight: 400;"
          >
            返回网校首页
          </p>
        </div>
      </div>
    </div>
    <div class="loginBanner">
      <img :src="backgroundImg" alt="" />
      <div class="loginBox">
        <p class="loginTitle">登录我的网校</p>
        <ul>
          <li>账号登录</li>
        </ul>
        <div>
          <el-input
            v-model="form.userName"
            class="loginInput"
            placeholder="手机号/用户名"
            style="margin-top:26px"
            @keyup.enter.native="login"
          ></el-input>
          <el-input
            show-password
            v-model="form.passWord"
            class="loginInput"
            placeholder="密码"
            style="margin-top:16px"
            @keyup.enter.native="login"
          ></el-input>
          <div class="loginStatus">
            <el-checkbox v-model="form.checked">自动登录</el-checkbox>
            <span>忘记密码</span>
          </div>
          <div class="loginBtn" @click="login">
            登录
          </div>
          <div class="applyAccount">没有账号？<span>报名申请</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { login } from "@/api/login.js";
import { getSimpleBanner } from "@/api/examState/examState.js";
export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        passWord: "",
        checked: true
      },
      backgroundImg: ""
    };
  },
  mounted() {
    getSimpleBanner({
      ownner: 0,
      source: 2
    }).then(res => {
      this.backgroundImg = res.data[0].pic;
    });
  },
  created() {},
  methods: {
    toHome() {
      this.$router.push({ name: "Home" });
    },
    login() {
      console.log(this.form);
      if (this.form.userName == "") {
        this.$message({
          message: "请输入账号",
          type: "warning"
        });
        return false;
      }
      if (this.form.passWord == "") {
        this.$message({
          message: "请输入密码",
          type: "warning"
        });
        return false;
      }
      login({
        grant_type: "password",
        scope: "server",
        username: this.form.userName,
        password: this.form.passWord
      })
        .then(res => {
          console.log(window.location.origin, res.user_tenant_domain);
          if (window.location.origin != res.user_tenant_domain) {
            store.dispatch("setAccessToken", res.access_token);
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.$cookie.set("userInfo", JSON.stringify(res), {
              domain: ".yixiaoshu.net"
            });
            console.log(
              this.$cookie.get("access_token", {
                domain: ".yixiaoshu.net"
              }),
              this.$cookie.get("userInfo", {
                domain: ".yixiaoshu.net"
              }),
              "指定域名的cookie值"
            );
            setTimeout(() => {
              window.location.replace(
                res.user_tenant_domain + "/#/userCenter/course"
              );
            }, 1000);
          } else {
            if (res.access_token) {
              store.dispatch("setAccessToken", res.access_token);
              this.$message({
                message: "登录成功",
                type: "success"
              });
              window.localStorage.setItem("userInfo", JSON.stringify(res));
              this.$router.push({
                name: "UserCenterCourse", //假如重定向的得跳重定向后的那个页面
                params: { res: JSON.stringify(res) }
              });
            }
          }
        })
        .catch(error => {
          console.log(error.response);
          if (error.response.data.code == 1) {
            this.$message({
              message: error.response.data.msg,
              type: "warning"
            });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  background: #fff;
  padding-bottom: 166px;
  .loginInput {
    /deep/ .el-input__inner {
      background: #f8f8f8;
    }
  }
  .topLogo {
    height: 100px;
    width: 100%;
    .topLogo-c {
      width: 1200px;
      height: 100px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .logo {
        display: flex;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .loginBanner {
    width: 100%;
    height: 640px;
    // background: url("../../assets/images/login/loginBanner.png") no-repeat;
    position: relative;
    img {
      position: absolute;
      width: 100%;
      height: 640px;
      left: 0;
      top: 0;
      z-index: 999;
    }
    .loginBox {
      position: absolute;
      z-index: 9999;
      width: 324px;
      height: 462px;
      background: #ffffff;
      box-shadow: 0px 8px 22px 0px rgba(185, 206, 213, 0.4);
      border-radius: 8px;
      top: 79px;
      right: 459px;
      padding: 0 30px;
      .loginTitle {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #17a5f2;
        margin-top: 48px;
        text-align: center;
      }
      ul {
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        li {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          position: relative;
          &::after {
            content: "";
            width: 88px;
            height: 2px;
            background: #17a5f2;
            position: absolute;
            left: -16px;
            bottom: -12px;
          }
        }
      }
      .loginStatus {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        /deep/ .el-checkbox__label {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #888888;
        }
        span {
          &:hover {
            cursor: pointer;
          }
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #888888;
        }
      }
      .loginBtn {
        margin-top: 20px;
        width: 324px;
        height: 50px;
        background: #17a5f2;
        border-radius: 6px;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        &:hover {
          cursor: pointer;
        }
      }
      .applyAccount {
        margin-top: 20px;
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #565656;
        span {
          color: #17a5f2;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
