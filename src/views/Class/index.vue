<template>
  <div class="class">
    <!-- 课程顶部 -->
    <div class="classInfo">
      <div class="classInfo-c">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'ELective' }"
            >选课中心</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{
            $route.params.activeName2
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>
            {{ info.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
          <div class="content-l">
            <img :src="info.smallPicture" style="object-fit: cover;" alt="" />
          </div>
          <div class="content-r">
            <div class="content-title">
              <div class="title">{{ info.title }}</div>
              <div class="collect">
                <img src="@/assets/images/class/collect.png" alt="" />
                <span>收藏</span>
              </div>
            </div>
            <div class="classNum">共{{ info.courseNum }}门课</div>
            <div class="priceBox">
              <img src="@/assets/images/class/priceBackground.png" alt="" />
              <div class="price">
                <div class="label">价格：</div>
                <div class="number">
                  <span>¥</span>
                  <span
                    style="font-size:32px;font-weight:bold;margin-left:3px;line-height:28px"
                    >{{ info.price }}
                  </span>
                </div>
              </div>
            </div>
            <div class="applyNum">{{ info.joinCount }}人报名</div>
            <div class="btnBox">
              <div class="ljbm" v-if="info.price != 0">
                {{ info.signUpStatus == 0 ? "立即报名" : "您已报名" }}
              </div>
              <div class="ljbm" v-if="info.price == 0" @click="freeJoin">
                免费加入
              </div>
              <div
                class="mfst"
                @click="freeJoin"
                v-if="info.signUpStatus == 0 && info.price != 0"
              >
                免费试听
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 班级详情和课程介绍 -->
    <div class="classContent">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="班级详情" name="first" class="bjxq">
          <div v-html="info.about"></div>
        </el-tab-pane>
        <el-tab-pane label="课程介绍" name="second" class="kcjs">
          <div style="padding:0px 55px 0 65px;">
            <swiper
              ref="mySwiper"
              :options="swiperOptions"
              style="height:220px"
            >
              <swiper-slide
                v-for="(item, index) in info.courseList"
                :key="index"
              >
                <div
                  :class="
                    activeClass == index ? 'activeClassItem' : 'classItem'
                  "
                  @click="current(index)"
                >
                  <div class="classItem-t">
                    <img
                      style="width:186px;height:122px;object-fit: cover;"
                      :src="item.smallPicture"
                      alt=""
                    />
                  </div>
                  <div class="classItem-b">
                    <div class="twoLine">
                      {{ item.title }}
                    </div>
                  </div>
                </div>
              </swiper-slide>
              <!-- <div class="swiper-pagination" slot="pagination"></div>
              <div
                class="swiper-button-prev"
                slot="button-prev"
                style="display:none"
              ></div>
              <div
                class="swiper-button-next"
                slot="button-next"
                style="display:none"
              ></div> -->
            </swiper>
            <div class="btn-prev" slot="button-prev" @click="prev">
              <div :class="swiperIndex == 0 ? 'leftUnable' : 'left'"></div>
            </div>
            <div class="btn-next" slot="button-next" @click="next">
              <div
                :class="
                  swiperIndex == swiperLists.length - 5
                    ? 'rightUnable'
                    : 'right'
                "
              ></div>
            </div>
          </div>

          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item
              class="section"
              :title="item.title + '(共' + item.lessonNum + '节课)'"
              :name="index"
              v-for="(item, index) in chapterList"
              :key="index"
            >
              <ul class="sectionChild">
                <li
                  v-for="(ele, i) in item.courseLessonList"
                  :key="i"
                  @click="
                    ele.free == 1
                      ? openVideo(ele)
                      : info.bugFlag == 1
                      ? fullScreen(ele)
                      : noBug()
                  "
                >
                  <div class="child-l">
                    <img
                      :src="
                        info.bugFlag == 1
                          ? unLock
                          : ele.free == 1
                          ? unLock
                          : lock
                      "
                      alt=""
                    />
                    <span :class="videoIndex == i ? 'blue' : 'normal'">{{
                      ele.title
                    }}</span>
                  </div>
                  <div class="child-r">
                    <img
                      src="@/assets/images/class/free.png"
                      v-show="ele.free == 1 ? true : false"
                      alt=""
                    />
                  </div>
                </li>
                <!-- <li>
                <div class="child-l">
                  <img src="@/assets/images/class/unLock.png" alt="" />
                  <span class="nomal">1.1 深化医药卫生制度（26分20秒）</span>
                </div>
                <div class="child-r">
                  <img src="@/assets/images/class/free.png" alt="" />
                </div>
              </li>
              <li>
                <div class="child-l">
                  <img src="@/assets/images/class/lock.png" alt="" />
                  <span class="nomal">1.1 深化医药卫生制度（26分20秒）</span>
                </div>
                <div class="child-r">
                  <img src="@/assets/images/class/free.png" alt="" />
                </div>
              </li> -->
              </ul>
            </el-collapse-item>
          </el-collapse>
          <!-- 自定义的折叠面板 -->
          <!-- <div
            class="section"
            v-for="(item, index) in sectionLists"
            :key="index"
          >
            <div class="sectionTitle">
              <div class="title">{{ item.title }}</div>
              <div class="closeOrOpen" @click="close(index)">
                <span>收起</span>
                <img
                  src="@/assets/images/class/close.png"
                  alt=""
                  style="margin-top: 5px;"
                />
              </div>
            </div>
            <ul
              class="sectionChild"
              v-show="closeIndex == index ? false : true"
            >
              <li v-for="(ele, i) in item.children" :key="i">
                <div class="child-l">
                  <img src="@/assets/images/class/unLock.png" alt="" />
                  <span class="blue">{{ ele.content }}</span>
                </div>
                <div class="child-r">
                  <img src="@/assets/images/class/free.png" alt="" />
                </div>
              </li>
            </ul>
          </div> -->
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 定制学习方案 -->
    <div class="selfProject" v-show="self == 0">
      <div class="project-banner">
        <img src="@/assets/images/elective/banner.png" alt="" />
        <p class="p1">名师为你定制专属学习方案</p>
        <p class="p2">适合自己的才是最好的</p>
      </div>
      <div class="project-form">
        <div class="form-row">
          <span>1.您的年龄？</span>
          <el-radio-group v-model="form.age" style="margin-top: 5px">
            <el-radio :label="1">18-24岁</el-radio>
            <el-radio :label="2">24岁-30岁</el-radio>
            <el-radio :label="3">30-40岁</el-radio>
            <el-radio :label="4">40岁以上</el-radio>
          </el-radio-group>
        </div>
        <div class="form-row">
          <span>2.您的学历?</span>
          <el-radio-group v-model="form.education" style="margin-top: 5px">
            <el-radio :label="1">中专</el-radio>
            <el-radio :label="2">大专</el-radio>
            <el-radio :label="3">本科</el-radio>
            <el-radio :label="4">本科以上</el-radio>
          </el-radio-group>
        </div>
        <div class="form-row">
          <span>3.您的基础如何？</span>
          <el-radio-group v-model="form.basics" style="margin-top: 5px">
            <el-radio :label="1">零基础</el-radio>
            <el-radio :label="2">基础一般</el-radio>
            <el-radio :label="3">基础较好</el-radio>
          </el-radio-group>
        </div>
        <div class="form-row" style="height:117px">
          <span>4.您想去考哪种证书？</span>
          <el-radio-group
            v-model="form.certificate"
            style="height: 50px;margin-top: 5px;display: flex;flex-wrap: wrap;"
          >
            <el-radio :label="1">护士资格</el-radio>
            <el-radio :label="2">初级药士</el-radio>
            <el-radio :label="3">初级药师</el-radio>
            <el-radio :label="4">初级中药师</el-radio>
            <el-radio :label="5">执业药师</el-radio>
            <el-radio :label="6">健康管理师</el-radio>
            <el-radio :label="7" style="align-self: flex-end;"
              >乡村助理医师</el-radio
            >
            <el-radio :label="8" style="align-self: flex-end;"
              >护理自考本科</el-radio
            >
            <el-radio :label="9" style="align-self: flex-end;"
              >药学自考本科</el-radio
            >
          </el-radio-group>
        </div>
        <div class="formInput">
          <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
          <el-input
            v-model="form.phone"
            placeholder="请输入您的手机号码"
            style="margin-right:20px"
          ></el-input>
          <el-input
            v-model="form.yzm"
            placeholder="请输入右侧图形验证码"
            class="yzmInput"
          ></el-input>
          <div class="yzm">验证码</div>
          <el-button type="primary" @click="submit">提交报名申请</el-button>
        </div>
        <p class="tip">- 提交后即可获得免费学习名额 -</p>
      </div>
    </div>

    <!-- 试听弹窗 -->
    <div class="mask" v-if="maskDialog">
      <div class="videoBox">
        <div class="videoBox-c">
          <div class="video-top">
            <div class="videoTitle-l">
              <img src="@/assets/images/class/music.gif" alt="" />
              <span>{{ videoTitle }}</span>
            </div>
            <div class="videoTitle-r" @click="maskDialog = false">
              <img src="@/assets/images/class/videoClose.png" alt="" />
            </div>
          </div>
          <div class="video-content">
            <!-- <video ref="video" controls="controls" :src="videoSrc">
              您的浏览器不支持 video 标签。
            </video> -->
            <!-- 渠道logo -->
            <div class="logo">
              <img
                :src="logo ? logo : require('@/assets/images/home/logo.png')"
                alt=""
                style="height:54px"
              />
            </div>
            <div v-if="playerShow" class="prism-player" id="avideo"></div>
            <!-- <div class="play" @click="play" v-if="start">
              <img src="@/assets/images/class/play.png" alt="" />
            </div> -->
            <div class="preOrNext">
              <div class="pre" @click="videoPre">
                <img src="@/assets/images/class/pre.png" alt="" />
                <span>上一节</span>
              </div>
              <div class="next" @click="videoNext">
                <span>下一节</span>
                <img src="@/assets/images/class/next.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="apply" @click="applyStudy">
          报名学习
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tenement } from "@/api/home/home.js";
// import "swiper/dist/css/swiper.css";
// //引入组件 注册组件
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
// import 'swiper/css/swiper.css'
// If you use Swiper 6.0.0 or higher
import "swiper/swiper-bundle.css";
import { getClassDetail } from "@/api/class/class.js";
import { getCourseDetail, videoPlay, videoPause } from "@/api/course/course.js";
export default {
  name: "Class",
  // components: {
  //   swiper,
  //   swiperSlide
  // },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      activeName: "first",
      form: {
        age: 1,
        education: 1,
        basics: 1,
        certificate: 1,
        name: "",
        phone: "",
        yzm: ""
      },
      self: 0,
      // 轮播下标
      swiperIndex: 0,
      // 选中的课程
      activeClass: null,
      swiperLists: [1, 2, 3, 4, 5, 6, 7, 8],
      swiperOptions: {
        slidesPerView: 5,
        // //显示分页
        // pagination: {
        //   el: ".swiper-pagination",
        //   type: "bullets",
        //   clickable: true,
        //   dynamicBullets: false
        // },

        // // 设置点击箭头
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // },
        // 获取当前下标
        on: {
          slideChangeTransitionEnd: () => {
            this.swiperIndex = this.$refs.mySwiper.$swiper.activeIndex;
            console.log(this.$refs.mySwiper.$swiper.activeIndex); //切换结束时，告诉我现在是第几个slide
          }
        }
        //自动轮播
        // autoplay: {
        //   delay: 2000,
        //   //当用户滑动图片后继续自动轮播
        //   disableOnInteraction: false
        // }
        //开启循环模式
        // loop: true
      },
      sectionLists: [
        {
          title: "第一章  执业药师与食品安全（共12节课）",
          id: 1,
          children: [
            {
              id: 11,
              content: "1.1  深化医药卫生制度（26分20秒）",
              free: true //免费
            },
            {
              id: 12,
              content: "1.2  深化医药卫生制度改革（26分20秒）",
              free: true //免费
            },
            {
              id: 15,
              content:
                "1.5  深化医药卫生制度改革深化医药卫生制度改革深化医药卫生制度改革深化医药卫生制度改革（26分20秒）",
              free: false //免费
            }
          ]
        },
        {
          title: "第二章  医药卫生体制改革与药品供应保障制度（共8节课）",
          id: 2,
          children: [
            {
              id: 21,
              content: "1.1  深化医药卫生制度（26分20秒）",
              free: true //免费
            },
            {
              id: 22,
              content: "1.2  深化医药卫生制度改革（26分20秒）",
              free: true //免费
            },
            {
              id: 25,
              content:
                "1.5  深化医药卫生制度改革深化医药卫生制度改革深化医药卫生制度改革深化医药卫生制度改革（26分20秒）",
              free: false //免费
            }
          ]
        }
      ],
      // closeIndex: -1, //默认第一个展开
      // closeStatus: true, //默认是收起状态

      activeNames: [0],
      unLock: require("@/assets/images/class/unLock.png"),
      lock: require("@/assets/images/class/lock.png"),
      start: true, //开始播放按钮显隐
      maskDialog: false,
      videoIndex: null, //点击哪个视频正在播放

      // 班级详情
      info: {},
      chapterList: [],

      playerShow: true,
      videoTitle: "",
      lessonId: "",
      studyLogId: "",
      courseId: "",
      playDuration: "", //刚进页面跳到用户上次播放时间
      newDuration: "",
      status: "",
      lastId: "",
      logo: ""
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  async created() {
    console.log(this.$route.params.id);
    this.info = await getClassDetail({
      classroomId: this.$route.params.id
    }).then(res => {
      return res.data;
    });
    var index = this.info.courseList.findIndex(ele => {
      return ele.id == this.info.lastLearnCourseId;
    });
    this.current(index); //定位到哪个轮播图下
    // 从用户中心班级详情跳进来,定位到课程介绍页
    if (this.$route.params.activeName) {
      this.activeName = this.$route.params.activeName;
    }

    tenement({
     // tenantId: localStorage.getItem("tenantId")
    }).then(res => {
      console.log("租户信息", res);
      if (res.data != null) {
        this.logo = res.data.logo;
      }
    });
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(0, 1000, false);
  },
  methods: {
    // 免费加入
    freeJoin() {
      this.activeName = "second";
      this.current(0);
      document.documentElement.scrollTop = 300;
    },
    handleClick(tab, event) {
      console.log(tab.index, event);
      this.self = tab.index;
      if (this.self == 1) {
        this.current(0);
      }
    },
    submit() {
      console.log(this.form);
    },
    prev() {
      this.swiper.slidePrev();
    },
    next() {
      this.swiper.slideNext();
    },
    // 轮播图选中项
    current(index) {
      this.activeClass = index;
      getCourseDetail({ courseId: this.info.courseList[index].id }).then(
        res => {
          this.info.bugFlag = res.data.bugFlag;
          this.chapterList = res.data.chapterList;
        }
      );
    },
    // 折叠面板
    handleChange(val) {
      console.log(val);
    },
    // 打开试听弹窗
    openVideo(ele) {
      this.maskDialog = true;
      this.videoSrc(ele, player => {
        this.player = player;
      });
      this.start = true;
    },
    // 试听视频接口
    videoSrc(ele, callback) {
      this.videoTitle = ele.title;
      this.videoIndex = ele.id;
      this.lastId = this.lessonId ? this.lessonId : ele.id;
      this.lessonId = ele.id;
      this.courseId = ele.courseId;

      if (this.player) {
        console.log(this.player.getCurrentTime(), "播放了多少秒");
        var time = Math.floor(this.player.getCurrentTime());
        videoPause({
          courseId: this.courseId,
          lessonId: this.lastId,
          playType: 0,
          studyLogId: this.studyLogId,
          playDuration: time
        }).then(res => {
          console.log(res, "暂停播放");
        });
      }

      videoPlay({ courseId: ele.courseId, lessonId: ele.id }).then(res => {
        console.log(res, "视频播放");
        const player = new Aliplayer(
          {
            id: "avideo",
            width: "100%",
            height: "437px",
            autoplay: false,
            encryptType: 1,
            vid: res.data.videoId,
            playauth: res.data.playAuth,
            cover: res.data.cover
          },
          function(player) {
            console.log("播放器创建好了。");
            callback(player);
          }
        );
        player.on("play", this.onPlayerPlay); //当视频开始播放时
        player.on("pause", this.onPlayerPause); //当视频暂停播放时
        player.on("ended", this.onPlayerEnded);
        player.on("ready", this.onPlayerReady); //能够开始播放视频
        this.status = res.data.status;
        if (res.data.status == 1) {
          this.playDuration = res.data.playDuration;
        } else {
          this.newDuration = res.data.newDuration;
        }
      });
    },
    onPlayerReady() {
      if (this.status == 1) {
        console.log(this.playDuration, "试听111");
        this.player.seek(this.playDuration);
        this.player.play();
      } else {
        console.log(this.newDuration, "试听222");
        this.player.seek(this.newDuration);
        this.player.play();
      }
      clearInterval(timer);
      var timer = setInterval(() => {
        if (this.player.getStatus() === "playing") {
          videoPause({
            courseId: this.courseId,
            lessonId: this.lastId,
            playType: 0,
            studyLogId: this.studyLogId,
            playDuration: Math.floor(this.player.getCurrentTime())
          }).then(res => {
            console.log(res, "暂停播放");
          });
        }
      }, 90000);
    },
    onPlayerPlay() {
      videoPlay({ courseId: this.courseId, lessonId: this.lessonId }).then(
        res => {
          this.studyLogId = res.data.studyLogId;
          console.log(res, "开始播放");
        }
      );
    },
    onPlayerEnded() {
      console.log(this.player.getCurrentTime(), "播放了多少秒");
      var time = Math.floor(this.player.getCurrentTime());
      videoPause({
        courseId: this.courseId,
        lessonId: this.lastId,
        playType: 0,
        studyLogId: this.studyLogId,
        playDuration: time
      }).then(res => {
        console.log(res, "结束播放");
      });
    },
    onPlayerPause() {},
    // 上一节
    videoPre() {
      var newArr = [];
      this.info.chapterList.forEach(ele => {
        ele.courseLessonList.forEach(item => {
          if (item.free == 1) {
            newArr.push(item);
          }
        });
      });
      var index = newArr.findIndex(ele => {
        return ele.id == this.videoIndex; //记得要return
      });
      if (index == 0) {
        this.$message({
          message: "已经到底了，亲",
          type: "warning"
        });
        return false;
      }
      this.playerShow = false; //目的是让页面上只有一个Aliplayer 阿里云播放器
      setTimeout(() => {
        this.playerShow = true;
        this.videoSrc(newArr[index - 1], player => {
          this.player = player;
        });
      }, 500);
    },
    // 下一节
    videoNext() {
      var newArr = [];
      this.info.chapterList.forEach(ele => {
        ele.courseLessonList.forEach(item => {
          if (item.free == 1) {
            newArr.push(item);
          }
        });
      });
      var index = newArr.findIndex(ele => {
        return ele.id == this.videoIndex; //记得要return
      });
      if (index == newArr.length - 1) {
        this.$message({
          message: "已经到底了，亲",
          type: "warning"
        });
        return false;
      }
      this.playerShow = false;
      setTimeout(() => {
        this.playerShow = true;
        this.videoSrc(newArr[index + 1], player => {
          this.player = player;
        });
      }, 500);
    },
    // 课程未购买
    noBug() {
      this.$message({
        message: "请购买该课程！",
        type: "warning"
      });
    },
    // 打开购买的视频
    fullScreen(ele) {
      console.log(ele);
      this.$router.push({
        name: "FullScreen",
        params: {
          courseId: ele.courseId,
          lessonId: ele.id,
          chapterId: ele.chapterId
        }
      });
    },
    // 报名学习
    applyStudy() {
      console.log("报名学习");
    }
    // close(index) {
    //   this.closeIndex = index;
    //   this.closeStatus = true;
    // }
  }
};
</script>
<style lang="scss" scoped>
.class {
  padding-bottom: 60px;
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(
      $color: #222,
      $alpha: 0.6
    ); //不能用opacity,会继承到子元素上并且不可修改
    z-index: 999;
    left: 0;
    top: 0;
  }
  .videoBox {
    height: 610px;
    width: 852px;
    position: fixed;
    top: 190px;
    left: 50%;
    z-index: 9999;
    opacity: 1;
    transform: translateX(-50%);
    .apply {
      width: 192px;
      height: 50px;
      background: #17a5f2;
      border-radius: 4px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      margin: 20px auto;
      &:hover {
        cursor: pointer;
      }
    }
    .videoBox-c {
      height: 507px;
      width: 828px;
      background: #000;
      opacity: 1;
      padding: 12px;
      .video-top {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .videoTitle-l {
          display: flex;
          align-items: center;
          span {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            margin-left: 6px;
          }
        }
        .videoTitle-r {
          &:hover {
            cursor: pointer;
          }
        }
      }
      .video-content {
        width: 100%;
        height: 437px;
        position: relative;
        .logo {
          position: absolute;
          right: 40px;
          top: 20px;
          z-index: 99999;
        }
        #avideo {
          width: 100%;
          height: 437px;
        }
        .play {
          width: 82px;
          height: 82px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .preOrNext {
          position: absolute;
          right: 160px;
          bottom: -30px;
          width: 130px;
          justify-content: space-between;
          align-items: center;
          display: flex;
          .pre {
            &:hover {
              cursor: pointer;
            }
            span {
              margin-left: 5px;
            }
          }
          .next {
            &:hover {
              cursor: pointer;
            }
            span {
              margin-right: 5px;
            }
          }
          span {
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
          }
        }
        video {
          width: 100%;
          height: 437px;
        }
      }
    }
  }
  // 课程顶部
  .classInfo {
    width: 1920px;
    height: 386px;
    background: #ffffff;
    border-radius: 4px;
    .classInfo-c {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      overflow: hidden;
      .el-breadcrumb {
        margin-top: 23px;
      }
      .content {
        height: 299px;
        margin-top: 29px;
        display: flex;
        .content-l {
          width: 458px;
          height: 299px;
          img {
            width: 458px;
            height: 299px;
          }
        }
        .content-r {
          margin-left: 24px;
          width: 718px;
          .content-title {
            height: 24px;
            margin-top: 8px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            .title {
              font-size: 24px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #333333;
            }
            .collect {
              display: flex;
              &:hover {
                cursor: pointer;
              }
              span {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #888888;
                margin-left: 8px;
              }
            }
          }
          .classNum {
            margin-top: 15px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #888888;
          }
          .priceBox {
            width: 716px;
            height: 72px;
            margin-top: 24px;
            position: relative;
            .price {
              height: 24px;
              width: 80%;
              position: absolute;
              top: 24px;
              left: 20px;
              display: flex;
              align-items: flex-end;
              .label {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #888888;
              }
              .number {
                font-size: 24px;
                color: #ff4520;
                font-family: Arial-BoldMT;
                display: flex;
                align-items: flex-end;
                span {
                  font-size: 14px;
                  line-height: 14px;
                }
              }
            }
          }
          .applyNum {
            margin-top: 50px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #888888;
            opacity: 0.84;
          }
          .btnBox {
            margin-top: 14px;
            display: flex;
            .ljbm {
              width: 160px;
              height: 50px;
              background: #17a5f2;
              border-radius: 4px;
              line-height: 50px;
              text-align: center;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
              &:hover {
                cursor: pointer;
              }
            }
            .mfst {
              width: 158px;
              height: 48px;
              border: 1px solid #17a5f2;
              border-radius: 4px;
              line-height: 50px;
              text-align: center;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #17a5f2;
              margin-left: 14px;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  // 班级详情和课程介绍
  .classContent {
    width: 1120px;
    margin: 30px auto 0;
    padding: 10px 40px 30px;
    background: #ffffff;
    border-radius: 6px;
    .bjxq {
      p {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
        line-height: 32px;
      }
    }
    .kcjs {
      /deep/ .swiper-container {
        padding-top: 20px;
        overflow: auto;
        overflow-x: hidden;
      }
      .activeClassItem {
        box-shadow: 0px 8px 18px 0px rgba(148, 148, 148, 0.36);
        width: 186px;
        height: 194px;
        background: #fff;
        border-radius: 4px;
        height: 220px;
        margin-top: -10px;
        &:hover {
          cursor: pointer;
        }
        .classItem-t {
          width: 186px;
          height: 122px;
        }
        .classItem-b {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          height: 72px;
          padding: 16px 14px 0;
        }
      }
      .classItem {
        width: 186px;
        height: 194px;
        background: #f9f9f9;
        border-radius: 4px;
        &:hover {
          cursor: pointer;
        }
        .classItem-t {
          width: 186px;
          height: 122px;
        }
        .classItem-b {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #888888;
          height: 72px;
          padding: 16px 14px 0;
          .twoLine {
            height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      .btn-prev {
        width: 52px;
        height: 194px;
        background: #f9f9f9;
        border-radius: 4px;
        top: 20px;
        position: absolute;
        left: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        .left {
          width: 16px;
          height: 18px;
          background: url("../../assets/images/class/leftAble.png");
        }
        .leftUnable {
          width: 16px;
          height: 18px;
          background: url("../../assets/images/class/leftUnable.png");
        }
      }
      .btn-next {
        width: 52px;
        height: 194px;
        background: #f9f9f9;
        border-radius: 4px;
        top: 20px;
        position: absolute;
        right: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        .right {
          width: 16px;
          height: 18px;
          background: url("../../assets/images/class/rightAble.png");
        }
        .rightUnable {
          width: 16px;
          height: 18px;
          background: url("../../assets/images/class/rightUnable.png");
        }
      }
      .section {
        .sectionTitle {
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
          .closeOrOpen {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #888888;
            display: flex;
            align-items: center;
            span {
              margin-right: 9px;
            }
          }
        }
        .sectionChild {
          li {
            &:first-child {
              margin-top: 18px;
            }
            &:hover {
              cursor: pointer;
            }
            width: 1070px;
            height: 58px;
            background: #f9f9f9;
            border-radius: 4px;
            margin-top: 8px;
            padding: 0 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .child-l {
              display: flex;
              align-items: center;
              .blue {
                color: #17a5f2;
              }
              .normal {
                color: #5d5d5d;
              }
              span {
                margin-left: 22px;
              }
            }
            .child-r {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
  // 定制学习方案
  .selfProject {
    width: 1200px;
    height: 546px;
    margin: 48px auto 0;
    background: #ffffff;
    box-shadow: 0px 5px 6px 0px rgba(10, 2, 4, 0.06);
    border-radius: 0px 0px 6px 6px;
    .project-banner {
      height: 98px;
      width: 100%;
      position: relative;
      p {
        position: absolute;
        width: 100%;
      }
      .p1 {
        top: 30px;
        text-align: center;
        color: #ffffff;
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: 400;
      }
      .p2 {
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.64;
        bottom: 7px;
      }
    }
    .project-form {
      padding: 0 30px;
      height: 448px;
      .form-row {
        height: 67px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        align-items: center;
        span {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          display: inline-block;
          width: 258px;
        }
      }
      .formInput {
        height: 46px;
        margin-top: 30px;
        display: flex;
        align-items: center;
        .el-input {
          width: 238px;
          margin-right: 12px;
        }
        .yzm {
          width: 90px;
          height: 38px;
          border: 1px solid #ccc;
          line-height: 38px;
          text-align: center;
          margin-right: 22px;
        }
      }
      .tip {
        margin-top: 16px;
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #a5a5a5;
      }
    }
  }
}
</style>
<style lang="scss">
.el-collapse-item__header {
  height: 68px;
  line-height: 68px;
}

.el-breadcrumb__inner a,
.el-breadcrumb__inner {
  color: #333333;
}
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #888888;
}
.el-tabs__item.is-active {
  color: #17a5f2;
}
.el-tabs__item:hover {
  color: #17a5f2;
}
.el-tabs__item {
  color: #333333;
}
.el-collapse-item__header {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.el-collapse {
  border-top: none;
}
</style>
