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
            <a>APP下载</a>
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
          <li v-if="host">
            <a target="_blank" href="https://www.yixiaoshu.net/"> 商务合作</a>
          </li>
          <!-- <li style="margin-right:8px">企业团报</li> -->
        </ul>
      </div>
    </div>
    <div class="search">
      <div class="searchBox">
        <div class="logo" @click="routerToHome" v-show="showLogo">
          <img
            :src="logo ? logo : require('@/assets/images/home/logo.png')"
            alt=""
            style="height:54px;margin-right:30px"
          />
          <!-- <img src="@/assets/images/home/slogen.png" alt="" /> -->
        </div>
        <div class="searchForm">
          <el-select
            clearable
            @change="current"
            v-model="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <input
            @keyup.enter="input"
            type="text"
            placeholder="请输入关键词搜索"
            v-model.trim="keyword"
          />
          <img
            @click="input"
            class="searchIcon"
            src="@/assets/images/home/search.png"
            alt=""
          />
        </div>
        <div class="tel">
          <img
            src="@/assets/images/home/tel.png"
            alt=""
            style="margin-right:12px"
          />
          {{ tel ? tel : "0791-88197248" }}
        </div>
      </div>
    </div>
    <div class="navList">
      <ul class="navListBox">
        <li class="active">项目分类</li>
        <li
          v-for="(item, index) in navLists"
          :key="index"
          @click="routerTo(index)"
          :class="index > 0 && navCurrent == index ? 'active' : ''"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { tenement } from "@/api/home/home.js";
export default {
  name: "HeaterMain",
  props: {},
  data() {
    return {
      keyword: "", //搜索框的值
      value: "",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "班级"
        },
        {
          value: "1",
          label: "课程"
        }
      ],
      navLists: [
        "首页",
        "选课中心",
        "题库",
        "考试动态",
        "师资阵容",
        "网校优势",
        "关于我们"
      ],
      navCurrent: "",
      info: {
        real_name: "",
        tenant_id: ""
      },
      // 图标闪烁问题
      showLogo: false,
      logo: "",
      tel: "",

      host: true
    };
  },
  watch: {
    keyword() {
      this.$store.commit("SET_KEYWORD", this.keyword);
    }
  },
  created() {
    console.log(window.location.host, "window.location.host");
    if (window.location.host == "hqyk.yixiaoshu.net") {
      this.host = false;
    }

    console.log(this.$store.getters.getKeyword);
    console.log(window.localStorage.getItem("userInfo"), "用户信息");
    if (this.$cookie.get("userInfo", { domain: ".yixiaoshu.net" })) {
      this.info = JSON.parse(
        this.$cookie.get("userInfo", {
          domain: ".yixiaoshu.net"
        })
      );
    }
    if (window.localStorage.getItem("userInfo")) {
      this.info = JSON.parse(window.localStorage.getItem("userInfo"));
    }

    var url = window.location.href;
    var matchReg = /\?.*/g; //匹配？之后的部分
    console.log(url.match(matchReg));
    var id = "";
    if (url.match(matchReg) != null) {
      // 说明地址栏？后面有参数
      id = this.getSearchString("id", url.match(matchReg)[0]);
      localStorage.setItem("tenantId", id);
    }

    if (this.info.tenant_id) {
      localStorage.setItem("tenantId", this.info.tenant_id);
    }

    //key(需要检索的键） url（传入的需要分割的url地址，例：?id=2&age=18）
    console.log(id, this.info.tenant_id, 55555);
    // 根据id查询租户信息
    //用户登录了就传用户信息里的id，否则传首页地址栏里的id
    tenement({
      // tenantId: localStorage.getItem("tenantId")
    })
      .then(res => {
        console.log("租户信息", res);
        if (res.data != null) {
          this.logo = res.data.logo;
          this.tel = res.data.telephone;
        }
      })
      .finally(() => {
        this.showLogo = true;
      });
  },

  // computed: {
  //   getKeyword: {
  //     get: function() {
  //       return store.getters.getKeyword;
  //     },
  //     set: function() {}
  //   }
  // },

  methods: {
    getSearchString(key, Url) {
      var str = Url;
      str = str.substring(1, str.length); // 获取URL中?之后的字符（去掉第一位的问号）
      // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
      var arr = str.split("&");
      var obj = new Object();
      // 将每一个数组元素以=分隔并赋给obj对象
      for (var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
      }
      return obj[key];
    },

    routerToLogin() {
      if (this.info.real_name) {
        this.$router.push({ name: "UserCenterHome" });
      } else {
        this.$router.push({ name: "Login" });
      }
    },
    routerTo(index) {
      this.navCurrent = index;
      if (index == 0) {
        this.$router.push({ name: "Home" });
      }
      if (index == 1) {
        this.$router.push({ name: "ELective" });
        this.$emit("func", this.value); //默认是班级
      }
      if (index == 2) {
        this.$router.push({ name: "QuestionBank" });
      }
      if (index == 3) {
        this.$router.push({ name: "ExamState" });
      }
      if (index == 5) {
        this.$router.push({ name: "NetworkSchool" });
      }
      if (index == 6) {
        this.$router.push({ name: "AboutUs" });
      }
    },
    routerToElective() {
      this.navCurrent = 1;
      this.$router.push({ name: "ELective" });
    },
    routerToHome() {
      this.navCurrent = 0;
      this.$router.push({ name: "Home" });
    },
    // 搜索框
    current(e) {
      console.log(e); //e是value值
      this.$emit("func", this.value);
    },
    input() {
      this.$emit("input");
      this.navCurrent = 1;
      if (this.$route.path == "/elective") {
      } else {
        this.$router.push({ name: "ELective" });
        // const newR = this.$router.resolve({
        //   name: "ELective"
        // });
        // window.open(newR.href, "_blank");
      }
    },
    clearInput() {
      this.keyword = ""; //视图上清空搜索框
      // store.commit("CLEAR_KEYWORD");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  background: #fff;
  .headerMain {
    // position: fixed;
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
          top: 22px;
          left: -140px;
          background: url("../assets/images/home/ewm.png") no-repeat center;
          .appewm {
            position: absolute;
            width: 106px;
            height: 106px;
            background: url("../assets/images/home/appewm.png") no-repeat center;
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
          a {
            color: #666666;
          }
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
          a {
            color: #666666;
          }
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
  .search {
    height: 95px;
    width: 100%;
    .searchBox {
      width: 1200px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo {
        display: flex;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
      }
      .searchForm {
        position: relative;
        margin-left: 254px;
        display: flex;
        border: 1px solid #e0e0e0;
        .searchIcon {
          position: absolute;
          top: 12px;
          right: 12px;
          &:hover {
            cursor: pointer;
          }
        }
        .el-select {
          width: 100px;
          /deep/ .el-input__inner {
            border-radius: 0px;
          }
        }
        input {
          width: 200px;
          height: 36px;
          border: 1px solid #e0e0e0;
          // border-radius: 19px;
          outline: none;
          text-indent: 20px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          // color: #b8b8b8;
          color: #000;
          &::-webkit-input-placeholder {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #b8b8b8;
          }
        }
      }
      .tel {
        display: flex;
        align-items: center;
        font-size: 22px;
        font-family: Helvetica;
        font-weight: 400;
        color: #ffa900;
      }
    }
  }
  .navList {
    width: 100%;
    height: 55px;
    background: #17a6f3;
    .navListBox {
      width: 1200px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      li {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        padding: 17px 40px;
        &:hover {
          cursor: pointer;
        }
        &.active {
          background: #1995d8;
        }
      }
      li:nth-child(1) {
        padding: 17px 78px;
      }
    }
  }
}
</style>
