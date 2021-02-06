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
          <span class="text">帮助中心</span>
        </div>
        <!-- <div class="btn" @click="login">
          登录
          <span>|</span>
          注册
        </div> -->
      </div>
    </div>

    <div class="banner">
      <!-- <div class="search">
        <img src="@/assets/images/help/search.png" alt="" />
        <div class="line"></div>
        <input
          type="text"
          placeholder="输入问题关键字，找到答案"
          v-model="text"
        />
      </div> -->
    </div>

    <!-- 主体内容 -->
    <div class="con">
      <div class="nav">
        <ul v-for="(item, index) in navLists" :key="index">
          <div class="title">
            <div class="line"></div>
            <span>{{ item.name }}</span>
          </div>
          <li
            :class="id == ele.id ? 'active' : ''"
            @click="helpInfo(item, ele)"
            v-for="(ele, idx) in item.articleList"
            :key="idx"
          >
            {{ ele.title }}
          </li>
        </ul>
      </div>
      <div class="con-c">
        <div class="con-top">
          {{ itemInfo.name }}
          <div class="line"></div>
        </div>
        <div class="cont" v-html="eleInfo.body"></div>
        <div class="con-bottom">
          <!-- 注：所有在苹果公司iOS设备的医小书App内购买课程不享受以上退款服务。 -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHelp, getHelpInfo } from "@/api/examState/examState.js";
export default {
  name: "Help",
  data() {
    return {
      info: {
        real_name: ""
      },
      text: "",
      navLists: [],
      itemInfo: {},
      eleInfo: {},
      id: ""
    };
  },
  created() {
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
    getHelp({
      code: "bzzx"
    }).then(res => {
      console.log(res, "liebiao");
      this.navLists = res.data.children;
      this.helpInfo(this.navLists[0], this.navLists[0].articleList[0]);
    });
  },
  methods: {
    helpInfo(item, ele) {
      getHelpInfo({
        newsId: ele.id
      }).then(res => {
        console.log(res, "帮助详情");
        this.eleInfo = res.data;
      });
      this.itemInfo = item;
      this.id = ele.id;
    },
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

  .banner {
    height: 240px;
    width: 100%;
    background: url("../../assets/images/help/banner.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    margin-bottom: 70px;
    .search {
      width: 1200px;
      height: 80px;
      background: #ffffff;
      box-shadow: 0px 2px 16px 0px rgba(185, 192, 196, 0.36);
      border-radius: 4px;
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      img {
        margin-left: 30px;
      }
      .line {
        width: 1px;
        height: 40px;
        background: #e4e4e4;
        border-radius: 1px;
        margin: 0 30px;
      }
      input {
        width: 600px;
        outline: none;
        border: none;
      }
    }
  }
  .con {
    width: 1200px;
    margin: 0 auto 60px;
    display: flex;
    .nav {
      width: 240px;
      height: 800px;
      background: #ffffff;
      border-radius: 4px;
      padding: 0 30px;
      ul {
        .title {
          display: flex;
          align-items: center;
          height: 80px;
          border-bottom: 1px solid #e4e4e4;
          .line {
            width: 5px;
            height: 20px;
            background: #17a6f3;
            border-radius: 2px;
          }
          span {
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #333333;
            margin-left: 15px;
          }
        }
        li {
          text-indent: 22px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          line-height: 40px;
          &.active {
            color: #17a6f3;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .con-c {
      width: 860px;
      // height: 1090px;
      background: #ffffff;
      border-radius: 4px;
      margin-left: 20px;
      padding: 0 40px;
      position: relative;
      .con-top {
        height: 80px;
        border-bottom: 1px solid #e4e4e4;
        position: relative;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
        display: flex;
        align-items: center;
        .line {
          width: 141px;
          height: 3px;
          background: #17a6f3;
          position: absolute;
          bottom: 0;
        }
      }
      .cont {
        padding: 35px 0;
      }
      .con-bottom {
        position: absolute;
        height: 74px;
        border-top: 1px solid #e4e4e4;
        bottom: 0;
        width: calc(100% - 80px);
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #17a6f3;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
