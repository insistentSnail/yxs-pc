<template>
  <div class="userCenter">
    <div class="topLogo">
      <div class="topLogo-c">
        <div class="logo" @click="toHome">
          <img
            :src="logo ? logo : require('@/assets/images/home/logo.png')"
            alt=""
            style="height:54px;margin-right:20px"
          />
          <!-- <img
            src="@/assets/images/home/slogen.png"
            alt=""
            style="margin-top: 2px;"
          /> -->
        </div>
        <ul>
          <li @click="toHome">网校首页</li>
          <!-- <li>我要买课</li> -->
          <li>消息</li>
          <!-- <li>客服中心</li> -->
          <li>
            <img src="@/assets/images/userCenter/user.png" alt="" />
            <span style="margin-left:5px">{{ userForm.realName }}</span>
          </li>
          <li @click="logOut">退出</li>
        </ul>
      </div>
    </div>
    <div class="userBack">
      <div class="userBack-c">
        <div class="avatar">
          <img
            :src="
              userForm.avatar
                ? userForm.avatar
                : require('@/assets/images/userCenter/avatar.png')
            "
            alt=""
          />
          <div class="avatar-r">
            <p class="p1">
              {{ userForm.realName }} ，<span>再忙也不要忘了学习哦~</span>
            </p>
            <p class="p2">
              用户名：{{ userForm.username }} | {{ userForm.tenantName }}学员
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="userContent">
      <div class="userContent-c">
        <div class="userContent-nav">
          <ul>
            <div class="one">
              <li
                style="margin-top:14px"
                :class="current == 0 ? 'active' : ''"
                @click="routerActive(0)"
              >
                <router-link to="/userCenter/home">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 0
                          ? require('@/assets/images/userCenter/userHomeActive.png')
                          : require('@/assets/images/userCenter/userHome.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>用户首页</span>
                </router-link>
              </li>
            </div>
            <div class="two">
              <p>学习中心</p>
              <li
                @click="routerActive(1)"
                :class="current == 1 ? 'active' : ''"
              >
                <router-link to="/userCenter/course">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 1
                          ? require('@/assets/images/userCenter/courseActive.png')
                          : require('@/assets/images/userCenter/course.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>我的课程</span>
                </router-link>
              </li>
              <li
                @click="routerActive(2)"
                :class="current == 2 ? 'active' : ''"
              >
                <router-link to="/userCenter/class">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 2
                          ? require('@/assets/images/userCenter/classActive.png')
                          : require('@/assets/images/userCenter/class.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>我的班级</span>
                </router-link>
              </li>
              <li
                @click="routerActive(3)"
                :class="current == 3 ? 'active' : ''"
              >
                <router-link to="/userCenter/record">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 3
                          ? require('@/assets/images/userCenter/studyActive.png')
                          : require('@/assets/images/userCenter/study.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>学习记录</span>
                </router-link>
              </li>
            </div>

            <div class="three">
              <p>题库中心</p>
              <li
                @click="routerActive(4)"
                :class="current == 4 ? 'active' : ''"
              >
                <router-link to="/userCenter/exercise">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 4
                          ? require('@/assets/images/userCenter/exerciseActive.png')
                          : require('@/assets/images/userCenter/exercise.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>开始做题</span>
                </router-link>
              </li>
              <li
                @click="routerActive(5)"
                :class="current == 5 ? 'active' : ''"
              >
                <router-link to="/userCenter/practiceRecord">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 5
                          ? require('@/assets/images/userCenter/recordActive.png')
                          : require('@/assets/images/userCenter/record.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>做题记录</span>
                </router-link>
              </li>
              <li
                @click="routerActive(6)"
                :class="current == 6 ? 'active' : ''"
              >
                <router-link to="/userCenter/examRecord">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 6
                          ? require('@/assets/images/userCenter/examRecordActive.png')
                          : require('@/assets/images/userCenter/examRecord.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>考试记录</span>
                </router-link>
              </li>
              <li
                @click="routerActive(7)"
                :class="current == 7 ? 'active' : ''"
              >
                <router-link to="/userCenter/collect">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 7
                          ? require('@/assets/images/userCenter/errorActive.png')
                          : require('@/assets/images/userCenter/error.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>错题/收藏</span>
                </router-link>
              </li>
            </div>

            <div class="four">
              <p>个人管理</p>
              <li
                @click="routerActive(8)"
                :class="current == 8 ? 'active' : ''"
              >
                <router-link to="">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 8
                          ? require('@/assets/images/userCenter/noteActive.png')
                          : require('@/assets/images/userCenter/note.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>我的笔记</span>
                </router-link>
              </li>
              <li
                @click="routerActive(9)"
                :class="current == 9 ? 'active' : ''"
              >
                <router-link to="">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 9
                          ? require('@/assets/images/userCenter/collectActive.png')
                          : require('@/assets/images/userCenter/collect.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>我的收藏</span>
                </router-link>
              </li>
              <li
                @click="routerActive(10)"
                :class="current == 10 ? 'active' : ''"
              >
                <router-link to="/userCenter/order">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 10
                          ? require('@/assets/images/userCenter/orderActive.png')
                          : require('@/assets/images/userCenter/order.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>我的订单</span>
                </router-link>
              </li>
            </div>

            <div class="five">
              <p>其他</p>
              <li
                @click="routerActive(11)"
                :class="current == 11 ? 'active' : ''"
              >
                <router-link to="/userCenter/data">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 11
                          ? require('@/assets/images/userCenter/dataActive.png')
                          : require('@/assets/images/userCenter/data.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>我的资料</span>
                </router-link>
              </li>
              <li
                @click="routerActive(12)"
                :class="current == 12 ? 'active' : ''"
              >
                <router-link to="">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 12
                          ? require('@/assets/images/userCenter/msgActive.png')
                          : require('@/assets/images/userCenter/msg.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>消息中心</span>
                </router-link>
              </li>
              <li
                @click="routerActive(13)"
                :class="current == 13 ? 'active' : ''"
              >
                <router-link to="">
                  <div style="width:24px;display:flex;align-items:center">
                    <img
                      :src="
                        current == 13
                          ? require('@/assets/images/userCenter/zipActive.png')
                          : require('@/assets/images/userCenter/zip.png')
                      "
                      alt=""
                    />
                  </div>
                  <span>app下载</span>
                </router-link>
              </li>
            </div>
          </ul>
        </div>
        <div class="userContent-view">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { myData } from "@/api/userCenter/userCenter.js";
import { tenement } from "@/api/home/home.js";
import store from "@/store";
import { logOut } from "@/api/login.js";
export default {
  name: "UserCenter",
  data() {
    return {
      current: 1,
      info: {},
      logo: "",
      userForm: {
        realName: "",
        username: "",
        avatar: ""
      }
    };
  },
  created() {
    this.info =
      JSON.parse(window.localStorage.getItem("userInfo")) ||
      this.$route.params.res ||
      JSON.parse(
        this.$cookie.get("userInfo", {
          domain: ".yixiaoshu.net"
        })
      );
    //用户登录了就传用户信息里的id，否则传首页地址栏里的id
    tenement({
      //  tenantId: this.info.tenant_id
    }).then(res => {
      console.log("租户信息", res);
      if (res.data != null) {
        this.logo = res.data.logo;
      }
    });

    myData().then(res => {
      console.log(res, "我的资料2");
      this.userForm.realName = res.data.realName;
      this.userForm.username = res.data.username;
      this.userForm.avatar = res.data.avatar;
      this.userForm.tenantName = res.data.tenantName;
    });
  },
  methods: {
    logOut() {
      logOut().then(res => {
        if (res.data) {
          store.dispatch("removeAccessToken");
          this.$message({
            message: "退出登录",
            type: "success"
          });
          this.$router.push({
            name: "Login"
          });
          localStorage.removeItem("tenantId");
        }
      });
    },
    routerActive(index) {
      this.current = index;
    },
    // 跳转首页
    toHome() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
<style lang="scss" scoped>
.userCenter {
  .topLogo {
    height: 60px;
    width: 100%;
    .topLogo-c {
      width: 1200px;
      height: 60px;
      margin: auto;
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
      ul {
        display: flex;
        align-items: center;
        li {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #565656;
          margin-left: 30px;
          align-items: center;
          display: flex;
          &:hover {
            cursor: pointer;
          }
          &:last-child {
            color: #999999;
          }
        }
      }
    }
  }
  .userBack {
    width: 100%;
    height: 140px;
    background: url("../../assets/images/userCenter/userBack.png") no-repeat;
    .userBack-c {
      width: 1200px;
      margin: 0 auto;
      height: 140px;
      display: flex;
      align-items: center;
      .avatar {
        height: 72px;
        display: flex;
        img {
          width: 72px;
          height: 72px;
          overflow: hidden;
          border-radius: 50%;
        }
        .avatar-r {
          margin-left: 16px;
          .p1 {
            font-size: 22px;
            font-family: Microsoft YaHei;
            font-weight: 300;
            color: #ffffff;
            margin-top: 14px;
            span {
              font-size: 14px;
            }
          }
          .p2 {
            margin-top: 4px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #9a9a9a;
          }
        }
      }
    }
  }
  // 主体内容
  .userContent {
    width: 100%;
    height: 904px;
    margin: 30px 0 58px;
    .userContent-c {
      width: 1200px;
      height: 904px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .userContent-nav {
        width: 228px;
        height: 904px;
        background: #fff;
        ul {
          .one {
            overflow: hidden;
            height: 70px;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              width: 172px;
              height: 1px;
              background: #ececec;
              border-radius: 1px;
              bottom: 0px;
              left: 28px;
            }
          }
          .three {
            height: 242px;
            overflow: hidden;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              width: 172px;
              height: 1px;
              background: #ececec;
              border-radius: 1px;
              bottom: 0px;
              left: 28px;
            }
            p {
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              padding: 0 36px;
              color: #9a9a9a;
              margin-top: 20px;
              margin-bottom: 4px;
            }
          }
          .two {
            height: 196px;
            overflow: hidden;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              width: 172px;
              height: 1px;
              background: #ececec;
              border-radius: 1px;
              bottom: 0px;
              left: 28px;
            }
            p {
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              padding: 0 36px;
              color: #9a9a9a;
              margin-top: 20px;
              margin-bottom: 4px;
            }
          }
          .four {
            height: 196px;
            overflow: hidden;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              width: 172px;
              height: 1px;
              background: #ececec;
              border-radius: 1px;
              bottom: 0px;
              left: 28px;
            }
            p {
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              padding: 0 36px;
              color: #9a9a9a;
              margin-top: 20px;
              margin-bottom: 4px;
            }
          }
          .five {
            height: 196px;
            overflow: hidden;
            position: relative;
            p {
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              padding: 0 36px;
              color: #9a9a9a;
              margin-top: 20px;
              margin-bottom: 4px;
            }
          }
          li {
            height: 48px;
            padding: 0 36px;
            display: flex;
            align-items: center;
            position: relative;
            a {
              height: 48px;
              width: 100%;
              display: flex;
              align-items: center;
            }
            span {
              margin-left: 10px;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #565656;
            }
            &.active {
              background: #f8f8f8;
              span {
                color: #18a5f2;
              }
              &::after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 4px;
                height: 48px;
                background: #18a6f2;
                border-radius: 1px;
              }
            }
          }
        }
      }
      .userContent-view {
        width: 952px;
        overflow: auto;
        background: #fff;
      }
    }
  }
}
</style>
