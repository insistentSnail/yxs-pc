<template>
  <div class="home">
    <!-- banner图 -->
    <div class="banner">
      <!-- 震惊，竟然不是轮播！ -->
      <el-carousel trigger="click" height="360px">
        <el-carousel-item v-for="item in topBanner" :key="item.id">
          <img style="width:100%;height:360px" :src="item.pic" alt="" />
        </el-carousel-item>
      </el-carousel>
      <div class="banner-c">
        <div class="projectType">
          <ul v-for="item in projectType" :key="item.id">
            <li class="bold">
              <router-link to="">
                {{ item.name }}
              </router-link>
            </li>
            <li>
              <span
                @click="hotToELective2(ele.name)"
                style="margin-right:25px"
                v-for="(ele, index) in item.trainTypeList"
                :key="ele.id"
                >{{ ele.name }}
                <br v-if="(index + 1) % 2 == 0" />
              </span>
            </li>
          </ul>
        </div>
        <div class="loginBox">
          <div class="loginLogo">
            <img
              @click="routerToLogin"
              :src="
                info.avatar
                  ? info.avatar
                  : require('@/assets/images/userCenter/avatar.png')
              "
              alt=""
            />
          </div>
          <div class="loginText">
            <p>亲爱的学员</p>
            <p>欢迎来到医小书网校</p>
          </div>
          <div v-if="!info.real_name" class="loginBtn" @click="login">登录</div>
          <div v-if="!info.real_name" class="registerBtn">注册</div>
          <p
            class="nameReal"
            @click="routerToLogin"
            v-if="info.real_name"
            style="
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #18A6F3;
              text-align:center;
              margin-top:29px
              "
          >
            {{ info.real_name }}
          </p>
          <div
            class="loginBottom"
            :style="info.real_name ? 'margin-top:62px' : ''"
          >
            <div class="ksdg" @click="toOutline">
              <img
                src="@/assets/images/home/ksdg.png"
                alt=""
                style="margin-right:6px"
              />
              考试大纲
            </div>
            <div class="ksdg" @click="toGuide">
              <img
                src="@/assets/images/home/bkzn.png"
                style="margin-right:6px"
                alt=""
              />
              报考指南
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 免费公开课 -->
    <div class="openClass">
      <div class="openClass-c">
        <div class="top">
          <div class="left">
            <img src="@/assets/images/home/play.png" alt="" />
            <span>免费公开课</span>
          </div>
          <!-- <div class="right" @click="$router.push({ name: 'ELective' })">
            更多 >
          </div> -->
        </div>
        <div class="bottom">
          <div
            v-for="item in openClassList"
            :key="item.id"
            class="openClassItem"
            @click="routerToFreeCourse(item.id)"
          >
            <div class="item-l">
              <img :src="item.smallPicture" style="object-fit: cover;" alt="" />
              <!-- <img
                src="@/assets/images/home/ceshi1.png"
                style="object-fit: cover;"
                alt=""
              /> -->
            </div>
            <div class="item-r">
              <div class="item-t">
                <div class="teacher">
                  <img src="@/assets/images/home/avatar.png" alt="" />
                  <span>导师：{{ item.teacherName }}</span>
                </div>
                <div class="watch">
                  {{ item.actualLearnNum ? item.actualLearnNum : 0 }}人观看
                </div>
              </div>
              <div class="item-b">
                免费学习
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 热门班级 -->
    <div class="hotClass">
      <div class="hotClass-c">
        <div class="hotClass-t">
          <div class="hotClassIcon">
            <img src="@/assets/images/home/hot.png" alt="" />
            <span>热门班级</span>
          </div>
          <ul class="hotClassLists">
            <li
              :class="hotActive == index ? 'active' : ''"
              v-for="(item, index) in hotLists"
              :key="index"
              @click="hotIndex(index)"
            >
              {{ item.name }}
            </li>
          </ul>
          <div class="more" @click="hotToELective(hotActive)">更多 ></div>
        </div>
        <div class="hotClassItems">
          <div
            class="hotClassItem"
            v-for="(item, index) in hotItems"
            :key="index"
            @click="routerToClass(item.id)"
          >
            <div class="hotImg">
              <img :src="item.smallPicture" style="object-fit: cover;" alt="" />
            </div>
            <div class="hotText">
              <div class="left">
                <img src="@/assets/images/home/apply.png" alt="" />
                <span>{{ item.actualLearnNum }}人报名</span>
              </div>
              <div class="right">
                <span>¥</span>
                <span style="font-size:20px;font-weight:bold;margin-left:3px">{{
                  item.price
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 精选课程 -->
    <div class="hotClass">
      <div class="hotClass-c">
        <div class="hotClass-t">
          <div class="hotClassIcon">
            <img src="@/assets/images/home/select.png" alt="" />
            <span>精选课程</span>
          </div>
          <ul class="hotClassLists">
            <li
              :class="selectActive == index ? 'active' : ''"
              v-for="(item, index) in hotLists"
              :key="index"
              @click="selectIndex(index)"
            >
              {{ item.name }}
            </li>
          </ul>
          <div class="more" @click="hotToELective(selectActive)">更多 ></div>
        </div>
        <div class="selectContent">
          <div
            class="selectItem"
            v-for="(item, index) in selectItems"
            :key="item.id"
            @click="routerToFreeCourse(item.id)"
            :class="index > 4 ? 'margin selectItem' : 'selectItem'"
          >
            <div class="select-t">
              <img :src="item.smallPicture" style="object-fit: cover;" alt="" />
            </div>
            <div class="select-c">{{ item.title }}</div>
            <div class="select-b">
              <div class="left">讲师：{{ item.teacherName }}</div>
              <div class="right">
                <span>¥</span>
                <span style="font-size:20px;font-weight:bold;margin-left:3px">{{
                  item.price
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间图片 -->
    <div class="centerBanner">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in centerBanner" :key="item.id">
          <img
            style="width:1200px;height:100px;object-fit: cover;"
            :src="item.pic"
            alt=""
        /></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 高频题库 -->
    <div class="openClass">
      <div class="openClass-c">
        <div class="top">
          <div class="left">
            <img src="@/assets/images/home/questionBank.png" alt="" />
            <span>高频题库</span>
          </div>
          <div class="right">更多 ></div>
        </div>
        <div class="question-items">
          <div class="questionItem">
            <img src="@/assets/images/home/zjlx.png" alt="" />
          </div>
          <div class="questionItem">
            <img src="@/assets/images/home/zxlx.png" alt="" />
          </div>
          <div class="questionItem">
            <img src="@/assets/images/home/lnzt.png" alt="" />
          </div>
          <div class="questionItem">
            <img src="@/assets/images/home/mnzt.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 金牌讲师 -->
    <div class="openClass">
      <div class="openClass-c">
        <div class="top">
          <div class="left">
            <img src="@/assets/images/home/gold.png" alt="" />
            <span>金牌讲师</span>
          </div>
          <div class="right">更多 ></div>
        </div>
        <div class="goldTeacher">
          <div class="teacherItem">
            <div class="teacher-t" v-for="ele in lowArrOne" :key="ele.id">
              <img :src="ele.cover" alt="" />
            </div>
          </div>
          <div class="teacherItem" v-for="item in topArr" :key="item.id">
            <img :src="item.cover" alt="" />
          </div>
          <div class="teacherItem">
            <div class="teacher-t" v-for="el in lowArrTwo" :key="el.id">
              <img :src="el.cover" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 教学服务 -->
    <div class="openClass">
      <div class="openClass-c">
        <div class="top">
          <div class="left">
            <img src="@/assets/images/home/serve.png" alt="" />
            <span>教学服务</span>
          </div>
          <div class="right"></div>
        </div>
        <div class="serveItems">
          <div class="serveItem">
            <div class="serve-top">
              <img src="@/assets/images/home/jiao.png" alt="" />
            </div>
            <div class="line"></div>
            <div class="text">
              <p>
                <span>多路径教学</span>
                <span>多重考核</span>
              </p>
              <p>
                <span>名师汇聚</span>
                <span>直播互动</span>
              </p>
            </div>
          </div>
          <div class="serveItem">
            <div class="serve-top">
              <img src="@/assets/images/home/xue.png" alt="" />
              <div class="line"></div>
              <div class="text">
                <p>
                  <span>学习报表定制</span>
                  <span>学习记忆提醒</span>
                </p>
                <p>
                  <span>随堂随课笔记</span>
                  <span>学习行为数据</span>
                </p>
              </div>
            </div>
          </div>
          <div class="serveItem">
            <div class="serve-top">
              <img src="@/assets/images/home/ce.png" alt="" />
              <div class="line"></div>
              <div class="text">
                <p>
                  <span>章节练习</span>
                  <span>每日一练</span>
                </p>
                <p>
                  <span>错题复习</span>
                  <span>真题模考</span>
                </p>
              </div>
            </div>
          </div>
          <div class="serveItem">
            <div class="serve-top">
              <img src="@/assets/images/home/kao.png" alt="" />
              <div class="line"></div>
              <div class="text">
                <p>
                  <span>备考精华汇总</span>
                  <span>考试政策解读</span>
                </p>
                <p>
                  <span>模拟进阶考试</span>
                  <span>系统智能组件</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 配套服务 -->
    <div class="openClass">
      <div class="openClass-c">
        <div class="top">
          <div class="left">
            <img src="@/assets/images/home/serveIcon.png" alt="" />
            <span>配套服务</span>
          </div>
          <div class="right"></div>
        </div>
        <div class="matingItems">
          <div class="matingItem">
            <div class="mating-t">
              <div class="mfst">免费试听</div>
              <div class="shadow"></div>
            </div>
            <div class="mating-c">备考导学课程免费听</div>
            <div class="mating-b">
              <img src="@/assets/images/home/audition.png" alt="" />
            </div>
          </div>
          <div class="matingItem">
            <div class="mating-t">
              <div class="mfst">教学计划</div>
              <div class="shadow"></div>
            </div>
            <div class="mating-c">个性化学习规划与指导</div>
            <div class="mating-b">
              <img src="@/assets/images/home/plan.png" alt="" />
            </div>
          </div>
          <div class="matingItem">
            <div class="mating-t">
              <div class="mfst">双师教学</div>
              <div class="shadow"></div>
            </div>
            <div class="mating-c">名师教学+助教督学</div>
            <div class="mating-b">
              <img src="@/assets/images/home/teach.png" alt="" />
            </div>
          </div>
          <div class="matingItem">
            <div class="mating-t">
              <div class="mfst">数据督学</div>
              <div class="shadow"></div>
            </div>
            <div class="mating-c">全方位行为数据分析</div>
            <div class="mating-b">
              <img src="@/assets/images/home/data.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 悬浮导航 -->
    <div class="navTo">
      <ul>
        <li :class="navActive == 1 ? 'active' : ''" @click="current(1)">
          <p class="p1">免费</p>
          <p class="p2">公开课</p>
        </li>
        <li :class="navActive == 2 ? 'active' : ''" @click="current(2)">
          <p class="p1">热门</p>
          <p class="p2">班级</p>
        </li>
        <li :class="navActive == 3 ? 'active' : ''" @click="current(3)">
          <p class="p1">精选</p>
          <p class="p2">课程</p>
        </li>
        <li :class="navActive == 4 ? 'active' : ''" @click="current(4)">
          <p class="p1">高频</p>
          <p class="p2">题库</p>
        </li>
        <li :class="navActive == 5 ? 'active' : ''" @click="current(5)">
          <p class="p1">金牌</p>
          <p class="p2">讲师</p>
        </li>
        <li :class="navActive == 6 ? 'active' : ''" @click="current(6)">
          <p class="p1">教学</p>
          <p class="p2">服务</p>
        </li>
        <li :class="navActive == 7 ? 'active' : ''" @click="current(7)">
          <p class="p1">配套</p>
          <p class="p2">服务</p>
        </li>
      </ul>
    </div>

    <!-- 悬浮购买资讯弹窗 -->
    <div class="consult" v-show="consultShow">
      <div class="consultClose">
        <img src="@/assets/images/home/consultLogo.png" alt="" />
        <img
          @click="closeConsult"
          src="@/assets/images/home/consultClose.png"
          alt=""
        />
      </div>
      <div class="yhgk">
        <img src="@/assets/images/home/yhgk.png" alt="" />
      </div>
      <div class="ul">
        <div class="li">
          <img src="@/assets/images/home/chooseCourse.png" alt="" />
          <span>选课咨询</span>
        </div>
        <div class="li">
          <img src="@/assets/images/home/applyConsult.png" alt="" />
          <span>报名咨询</span>
        </div>
        <div class="li">
          <img src="@/assets/images/home/telConsult.png" alt="" />
          <span>电话咨询</span>
        </div>
        <div class="li">
          <img src="@/assets/images/home/company.png" alt="" />
          <span>企业团报</span>
        </div>
      </div>
    </div>

    <!-- 回到顶部 -->
    <div class="backTop" @click="backTop">
      <img src="@/assets/images/home/backTop.png" alt="" />
      <img
        class="backHover"
        src="@/assets/images/home/backTopHover.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import {
  getCourseList,
  getClassList,
  getTabList,
  getProjectType,
  getGoldTeacher,
  carousel
} from "@/api/home/home.js";
import { getSimpleBanner } from "@/api/examState/examState.js";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
export default {
  name: "Home",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      openClassList: [],
      hotLists: [
        "推荐",
        "护士资格",
        "初级药士",
        "初级药师",
        "初级中药师",
        "职业药师",
        "健康管理师",
        "乡村助理医师",
        "药学自考本科",
        "护理自考本科"
      ],
      hotActive: 0,
      hotItems: [1, 2, 3, 4],
      selectActive: 0,
      selectItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      navActive: 1,
      consultShow: false, //资讯悬浮窗
      projectType: [],
      teacherList: [],
      // 金牌讲师
      topArr: [],
      lowArr: [],
      lowArrOne: [],
      lowArrTwo: [],
      // 轮播图
      topBanner: [],
      centerBanner: [],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: true //新版本不生效
        // Some Swiper option/callback...
      },
      info: {},
      activeName: "推荐",
      activeCourse: "推荐"
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(0, 1000, false);
  },
  created() {
    this.consultShow = false;
    this.init();
    console.log(window.localStorage.getItem("userInfo"), "用户信息");
    console.log(
      this.$cookie.get("userInfo", {
        domain: ".yixiaoshu.net"
      }),
      "cookies用户信息"
    );
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
  },
  updated() {
    window.onscroll = function() {
      //为了保证兼容性，这里取两个值，哪个有值取哪一个
      //scrollTop就是触发滚轮事件时滚轮的高度
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= 300) {
        if (document.querySelector(".navTo")) {
          document.querySelector(".navTo").style.top = "300px";
        }
      } else {
        if (document.querySelector(".navTo")) {
          document.querySelector(".navTo").style.top = "800px";
        }
      }
    };
  },
  methods: {
    routerToLogin() {
      this.$router.push({ name: "UserCenterHome" });
    },
    // 热门班级更多跳转
    hotToELective(index) {
      // this.$router.push({
      //   name: "ELective",
      //   params: {
      //     index: index
      //   }
      // });
      const newR = this.$router.resolve({
        name: "ELective",
        query: {
          index: index
        }
      });
      window.open(newR.href, "_blank");
    },
    hotToELective2(name) {
      console.log(name, this.hotLists2);
      var index = this.hotLists2.findIndex(ele => {
        return ele.name == name;
      });
      this.$router.push({
        name: "ELective",
        query: {
          index: index
        }
      });
    },
    init() {
      // 免费公开课
      getCourseList({ payFlag: 0, size: 3 }).then(res => {
        this.openClassList = res.data.records.slice(0, 3);
      });
      // 精选课程
      getCourseList({ payFlag: 1, size: 10 }).then(res => {
        this.selectItems = res.data.records;
      });
      // 班級
      getClassList({ size: 4 }).then(res => {
        this.hotItems = res.data.records;
      });
      // tab
      getTabList().then(res => {
        res.data.unshift({ name: "推荐" });
        this.hotLists = res.data.slice(0, 12); //不完全展示
        this.hotLists2 = res.data;
      });
      getProjectType().then(res => {
        this.projectType = res.data;
      });
      // 金牌讲师
      getGoldTeacher({ showFlag: 1 }).then(res => {
        this.teacherList = res.data.records;
        this.topArr = this.teacherList.filter(ele => {
          return ele.topFlag == 1;
        });
        this.lowArr = this.teacherList.filter(ele => {
          return ele.topFlag == 0;
        });
        this.lowArrOne = this.lowArr.slice(0, 2);
        this.lowArrTwo = this.lowArr.slice(-2);
      });
      // 轮播图
      getSimpleBanner({
        ownner: 1,
        source: 2,
        bannerPosition: 1
      }).then(res => {
        this.topBanner = res.data;
      });
      // 图片接口都换了
      // carousel({ source: 2, bannerPosition: 1 }).then(res => {
      //   this.topBanner = res.data.records;
      // });
      // 中间轮播
      // carousel({ source: 2, bannerPosition: 2 }).then(res => {
      //   this.centerBanner = res.data.records;
      // });
      getSimpleBanner({
        ownner: 1,
        source: 2,
        bannerPosition: 2
      }).then(res => {
        this.centerBanner = res.data;
      });
    },
    hotIndex(index) {
      this.hotActive = index;
      getClassList({
        code: this.hotLists[index].code,
        size: 4
      }).then(res => {
        this.hotItems = res.data.records;
      });
      this.activeName = this.hotLists[index].name;
    },
    selectIndex(index) {
      this.selectActive = index;
      getCourseList({ payFlag: 1, code: this.hotLists[index].code }).then(
        res => {
          this.selectItems = res.data.records;
        }
      );
      this.activeCourse = this.hotLists[index].name;
    },
    // 悬浮导航栏
    current(num) {
      this.navActive = num;
      if (num == 1) {
        document.documentElement.scrollTop = 300;
      } else if (num == 2) {
        document.documentElement.scrollTop = 800;
      } else if (num == 3) {
        document.documentElement.scrollTop = 1100;
      } else if (num == 4) {
        document.documentElement.scrollTop = 2000;
      } else if (num == 5) {
        document.documentElement.scrollTop = 2200;
      } else if (num == 6) {
        document.documentElement.scrollTop = 2700;
      } else if (num == 7) {
        document.documentElement.scrollTop = 2700;
      }
    },
    // 回到顶部
    backTop() {
      document.documentElement.scrollTop = 0;
    },
    // 关闭资讯悬浮窗
    closeConsult() {
      this.consultShow = false;
    },
    // 跳转登录页
    login() {
      this.$router.push({ name: "Login" });
    },
    // 免费公开课跳转
    routerToFreeCourse(id) {
      this.$router.push({
        name: "Course",
        params: { id: id, activeCourse: this.activeCourse }
      });
    },
    // 班级跳转详情
    routerToClass(id) {
      this.$router.push({
        name: "Class",
        params: { id: id, activeName2: this.activeName }
      });
    },
    // 跳转报考指南页
    toGuide() {
      this.$router.push({
        name: "Guide",
        query: {
          active: 0
        }
      });
    },
    // 跳转考试大纲页
    toOutline() {
      this.$router.push({
        name: "Guide",
        query: {
          active: 1
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  background: #fff;
  padding-bottom: 56px;
  // 回到顶部
  .backTop {
    width: 64px;
    height: 64px;
    position: fixed;
    right: 120px;
    bottom: 150px;
    .backHover {
      display: none;
      position: absolute;
      bottom: -80px;
    }
    &:hover {
      cursor: pointer;
      .backHover {
        display: block;
      }
    }
  }
  // 悬浮资讯弹窗
  .consult {
    width: 112px;
    height: 276px;
    background: linear-gradient(0deg, #33cfff 0%, #17a5f2 100%);
    border-radius: 4px;
    position: fixed;
    z-index: 99999;
    top: 31px;
    right: 101px;
    .consultClose {
      height: 48px;
      padding: 0 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(256, 265, 265, 0.16);
      &:hover {
        cursor: pointer;
      }
    }
    .yhgk {
      width: 96px;
      height: 34px;
      margin: 10px auto 0;
      &:hover {
        cursor: pointer;
      }
    }
    .ul {
      .li {
        height: 45px;
        margin: 0 15px;
        border-bottom: 1px solid rgba(256, 265, 265, 0.16);
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:hover {
          cursor: pointer;
        }
        &:last-child {
          border-bottom: none;
        }
        span {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
  // 悬浮导航
  .navTo {
    width: 64px;
    height: 512px;
    position: fixed;
    top: 800px;
    left: 150px;
    background: #f8f8f8;
    border-radius: 2px;
    z-index: 99;
    li {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      width: 40px;
      height: 72px;
      border-radius: 2px;
      margin: 0 12px;
      overflow: hidden;
      border-bottom: 1px solid #e4e4e4;
      &:hover {
        cursor: pointer;
      }
      &:first-child {
        margin: 0;
        width: 64px;
      }
      &:last-child {
        border-bottom: none;
      }
      p {
        width: 100%;
        text-align: center;
        line-height: 16px;
        &.p1 {
          margin-top: 19px;
        }
        &.p2 {
          margin-top: 3px;
        }
      }
    }
    .active {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      width: 64px;
      background: #17a5f2;
      margin: 0;
      // display: flex;
      // align-items: center;
      // flex-wrap: wrap;
    }
  }
  .banner {
    height: 360px;
    width: 100%;
    position: relative;
    // background: url("../assets/images/home/banner.png");
    .banner-c {
      height: 100%;
      position: absolute;
      width: 1200px;
      top: 0;
      left: calc(50% - 600px);
      .projectType {
        width: 200px;
        height: 360px;
        background: #ffffff;
        position: absolute;
        z-index: 9999;
        opacity: 0.9;
        left: 0;
        padding-left: 20px;
        overflow: hidden;
        ul {
          margin-top: 24px;
        }
        .bold {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #353535;
          line-height: 24px;
          a {
            color: #353535;
          }
        }
        li {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #888888;
          line-height: 24px;
          span {
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
      .loginBox {
        width: 200px;
        height: 300px;
        position: absolute;
        z-index: 9999;
        top: 30px;
        right: 0;
        background: #ffffff;
        border-radius: 4px;
        .loginLogo {
          width: 72px;
          height: 72px;
          margin: 28px auto 0;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 72px;
            height: 72px;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .nameReal {
          &:hover {
            cursor: pointer;
          }
        }
        .loginText {
          width: 108px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          line-height: 18px;
          margin: 17px auto 0;
          text-align: center;
        }
        .loginBtn {
          width: 160px;
          height: 34px;
          border: 1px solid #17a6f3;
          border-radius: 4px;
          margin: 22px auto 0;
          line-height: 34px;
          text-align: center;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #17a6f3;
          &:hover {
            cursor: pointer;
          }
        }
        .registerBtn {
          width: 160px;
          height: 34px;
          background: #17a5f2;
          border-radius: 4px;
          text-align: center;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          line-height: 34px;
          margin: 6px auto 0;
          &:hover {
            cursor: pointer;
          }
        }
        .loginBottom {
          margin: 22px auto 0;
          width: 160px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #555555;
          .ksdg {
            display: flex;
            align-items: center;
            &:hover {
              cursor: pointer;
            }
          }
          .bkzn {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
  // 免费公开课
  .openClass {
    width: 100%;
    .openClass-c {
      width: 1200px;
      margin: 56px auto 0;
      .top {
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .left {
          height: 100%;
          display: flex;
          align-items: center;
          span {
            font-size: 24px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #353535;
            margin-left: 12px;
          }
        }
        .right {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .bottom {
        margin-top: 19px;
        display: flex;
        justify-content: space-between;
        .openClassItem {
          width: 380px;
          height: 156px;
          background: #ffffff;
          box-shadow: 3px 8px 26px 0px rgba(176, 176, 176, 0.2);
          border-radius: 6px;
          overflow: hidden;
          position: relative;
          &:hover {
            cursor: pointer;
          }
          .item-l {
            width: 190px;
            height: 124px;
            img {
              width: 190px;
              height: 124px;
            }
            position: absolute;
            top: 16px;
            left: 16px;
          }
          .item-r {
            position: absolute;
            height: 124px;
            top: 16px;
            left: 220px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .teacher {
              height: 20px;
              display: flex;
              align-items: center;
              span {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                margin-left: 7px;
              }
            }
            .watch {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #888888;
              margin-top: 12px;
            }
            .item-b {
              width: 78px;
              height: 26px;
              border: 1px solid #17a5f2;
              border-radius: 2px;
              line-height: 26px;
              text-align: center;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #17a5f2;
            }
          }
        }
      }
    }
  }
  // 热门班级
  .hotClass {
    width: 100%;
    .hotClass-c {
      width: 1200px;
      margin: 56px auto 0;
      .hotClass-t {
        height: 30px;
        .hotClassIcon {
          float: left;
          height: 30px;
          display: flex;
          align-items: center;
          span {
            margin-left: 12px;
            font-size: 24px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #353535;
          }
        }
        .hotClassLists {
          height: 30px;
          display: flex;
          align-items: flex-end;
          float: left;
          margin-top: 5px;
          li {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #585858;
            margin-left: 2px;
            // margin-left: 20px;
            position: relative;
            padding: 3px;
            &:hover {
              cursor: pointer;
            }
            &.active {
              color: #17a6f3;
              border-bottom: 1px solid #17a5f2;
            }
          }
        }
        .more {
          float: right;
          display: flex;
          height: 30px;
          align-items: flex-end;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .hotClassItems {
        margin-top: 20px;
        display: flex;
        // justify-content: space-between;
        .hotClassItem {
          width: 277px;
          height: 230px;
          border: 1px solid #eeeeee;
          border-radius: 6px;
          overflow: hidden;
          margin-right: 30px;
          &:nth-child(4) {
            margin-right: 0px;
          }
          &:hover {
            cursor: pointer;
          }
          .hotImg {
            width: 277px;
            height: 180px;
            img {
              width: 277px;
              height: 180px;
            }
          }
          .hotText {
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 16px;
            .left {
              display: flex;
              height: 50px;
              align-items: center;
              span {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #888888;
                margin-left: 6px;
              }
            }
            .right {
              font-size: 14px;
              font-family: Arial;
              font-weight: 400;
              color: #ff4520;
            }
          }
        }
      }
    }
  }
  // 精选课程
  .selectContent {
    margin-top: 18px;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    .selectItem {
      width: 216px;
      height: 272px;
      background: #f8f8f8;
      border-radius: 6px;
      overflow: hidden;
      margin-right: 30px;
      &:nth-child(5) {
        margin-right: 0px;
      }
      &:nth-child(10) {
        margin-right: 0px;
      }
      &:hover {
        cursor: pointer;
      }
      &.margin {
        margin-top: 20px;
      }
      .select-t {
        width: 100%;
        height: 140px;
        img {
          width: 216px;
          height: 140px;
        }
      }
      .select-c {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 300;
        color: #333333;
        line-height: 28px;
        height: 85px;
        margin: 0 17px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
      }
      .select-b {
        height: 46px;
        padding: 0 17px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #888888;
        }
        .right {
          font-size: 14px;
          font-family: Arial;
          font-weight: 400;
          color: #ff4520;
        }
      }
    }
  }
  // 广告
  .centerBanner {
    margin: 40px auto 0;
    height: 100px;
    width: 1200px;
    border-radius: 5px;
    overflow: hidden;
  }
  // 高频题型
  .question-items {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .questionItem {
      width: 278px;
      height: 160px;
    }
  }
  // 金牌讲师
  .goldTeacher {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .teacherItem {
      width: 294px;
      height: 344px;
      img {
        width: 294px;
        height: 344px;
      }
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .teacher-t {
        height: 168px;
        img {
          width: 294px;
          height: 168px;
        }
      }
      .teacher-b {
        height: 168px;
        img {
          width: 294px;
          height: 168px;
        }
      }
    }
  }
  // 教学服务
  .serveItems {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .serveItem {
      width: 277px;
      height: 262px;
      background: #ffffff;
      box-shadow: 3px 8px 26px 0px rgba(176, 176, 176, 0.2);
      border-radius: 6px;
      position: relative;
      .serve-top {
        width: 277px;
        height: 124px;
      }
      .line {
        width: 24px;
        height: 3px;
        background: #ffa900;
        border-radius: 2px;
        margin: 28px auto 14px;
      }
      .text {
        padding: 0 28px;
        p {
          display: flex;
          justify-content: space-around;

          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #353535;
          line-height: 36px;
        }
      }
    }
  }
  // 配套服务
  .matingItems {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .matingItem {
      width: 277px;
      height: 304px;
      background: #ffffff;
      box-shadow: 3px 8px 26px 0px rgba(176, 176, 176, 0.2);
      border-radius: 0px 0px 6px 6px;
      .mating-t {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #353535;
        margin: 47px auto 0;
        text-align: center;
        position: relative;
        width: 88px;
        height: 22px;
        .mfst {
          position: absolute;
          z-index: 4;
        }
        .shadow {
          width: 96px;
          height: 10px;
          background: #e2eef6;
          opacity: 0.9;
          position: absolute;
          z-index: 3;
          top: 23px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .mating-c {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        margin: 14px auto 0;
        text-align: center;
      }
      .mating-b {
        width: 100px;
        height: 100px;
        margin: 52px auto 0;
      }
    }
  }
  // .el-carousel__button {
  //   width: 10px;
  //   height: 10px;
  //   border-radius: 50%;
  // }
  // .el-carousel__indicators--horizontal {
  //   left: 67%;
  // }
}
</style>
