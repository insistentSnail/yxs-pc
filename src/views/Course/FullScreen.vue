<template>
  <div class="box">
    <div class="fullScreen" v-show="previewMode">
      <div class="video-top">
        <div class="video-l">
          <img
            src="@/assets/images/fullScreen/goBack.png"
            alt=""
            @click="goBack"
          />
          <div class="one">
            <!-- 执业药师 > 执业药师《全程通关班》> -->
            {{ tabName }} <span v-if="tabName">></span>
            <span class="two">
              {{ info.title }}
            </span>
            <span class="now">
              正在播放
            </span>
          </div>
        </div>
        <div class="video-r">
          <img
            :src="
              userInfo.avatar
                ? userInfo.avatar
                : require('@/assets/images/userCenter/avatar.png')
            "
            alt=""
          />
          <span @click="$router.push({ name: 'UserCenterHome' })"
            >学习中心 ></span
          >
        </div>
      </div>
      <div class="videoContent">
        <div class="videoContent-l">
          <!-- <video
          ref="video"
          controls="controls"
          src=""
          style="width:100%;height:100%"
        >
          您的浏览器不支持 video 标签。
        </video> -->
          <!-- 渠道logo -->
          <div class="modeSwitch">
            <div class="preview" @click="preview">预览模式</div>
            <div class="study">学习模式</div>
          </div>

          <div class="logo" v-show="showLogo">
            <img v-if="logo" :src="logo" alt="" style="height:54px" />
            <img
              v-else
              src="@/assets/images/home/logo.png"
              alt=""
              style="height:54px"
            />
          </div>

          <div class="prism-player" id="avideo" v-if="playerShow"></div>
          <div
            v-if="tipShow"
            class="mask"
            style="width:100%;height:100%;position:absolute;background:rgba(90,90,90,.5);z-index:88;top:0"
          ></div>
          <div class="tip" v-if="tipShow">
            还有 {{ times }} 秒倒计时，自动进入下一节
          </div>

          <div class="icon" v-if="tipShow">
            <div class="icon-l" @click="rePlay2">
              <img src="@/assets/images/fullScreen/rebroad.png" alt="" />
              <div>重播</div>
            </div>
            <div class="icon-r" @click="nextVideo">
              <img src="@/assets/images/fullScreen/next.png" alt="" />
              <div>下一节</div>
            </div>
          </div>

          <div class="nav">
            <div class="navList" @click="collShow ? close() : open()">
              <img src="@/assets/images/fullScreen/close.png" alt="" />
              <span>收起</span>
            </div>
            <div class="navList">
              <img src="@/assets/images/fullScreen/menu.png" alt="" />
              <span>目录</span>
            </div>
            <div class="navList">
              <img src="@/assets/images/fullScreen/note.png" alt="" />
              <span>笔记</span>
            </div>
            <div class="navList">
              <img src="@/assets/images/fullScreen/practice.png" alt="" />
              <span>练习</span>
            </div>
          </div>
        </div>
        <!-- 右边折叠面板 -->
        <div class="videoContent-r" v-show="collShow">
          <div class="videoContent-t">
            <img src="@/assets/images/fullScreen/menu.png" alt="" />
            <span>目录</span>
          </div>
          <!-- 折叠面板 -->
          <div class="coll">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item
                :title="item.title + '(共' + item.lessonNum + '节课)'"
                :name="index"
                v-for="(item, index) in info.chapterList"
                :key="index"
              >
                <ul>
                  <li
                    :class="ele.id == lessonId ? 'active' : ''"
                    v-for="(ele, i) in item.courseLessonList"
                    :key="i"
                    @click="toVideoSrc(ele)"
                  >
                    <div class="act-l">
                      <img
                        style="width:20px;height:20px"
                        v-if="ele.id == lessonId"
                        src="@/assets/images/fullScreen/bePlaying.gif"
                        alt=""
                      />
                      <img
                        v-if="ele.id != lessonId"
                        class="play"
                        src="@/assets/images/fullScreen/play.png"
                        alt=""
                      />
                    </div>
                    <div class="act-l" v-if="ele.id != lessonId">
                      <div
                        class="progress"
                        style="margin-top: 2px;margin-right:3px"
                      >
                        {{ ele.rate | formatRate }}
                      </div>
                    </div>
                    <span
                      >{{ ele.title }}
                      <span style="margin-left:10px">{{
                        ele.length | formatSeconds
                      }}</span>
                    </span>
                  </li>

                  <!-- <li>
                  <div class="act-l">
                    <div class="progress">已学20%</div>
                  </div>

                  <span>1.2 深化医药卫生制度深化医药卫生制度 度 20:16</span>
                </li> -->
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="collect">
            <img src="@/assets/images/fullScreen/collect.png" alt="" />
            <span>收藏</span>
          </div>
        </div>
      </div>
    </div>

    <div class="class" v-show="!previewMode">
      <Header></Header>
      <div class="nav">
        <div class="nav-l">
          <span> {{ tabName }} <span v-if="tabName">></span> </span>
          <span style="color:#333333"> {{ info.title }}</span>
          <span style="color:#17A5F2;margin-left:5px">正在播放</span>
        </div>
        <div class="nav-r">
          <div class="yulan">预览模式</div>
          <div class="xue" @click="studyMode">学习模式</div>
        </div>
      </div>
      <div class="content">
        <div class="content-l">
          <div
            v-if="tipShow"
            class="mask"
            style="width:100%;height:100%;position:absolute;background:rgba(90,90,90,.5);z-index:88;top:0"
          ></div>
          <div class="tip" v-if="tipShow">
            还有 {{ times }} 秒倒计时，自动进入下一节
          </div>
        </div>
        <div class="content-r">
          <div class="videoContent-t">
            <img src="@/assets/images/fullScreen/menu.png" alt="" />
            <span>目录</span>
          </div>
          <!-- 折叠面板 -->
          <div class="coll">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item
                :title="item.title + '(共' + item.lessonNum + '节课)'"
                :name="index"
                v-for="(item, index) in info.chapterList"
                :key="index"
              >
                <ul>
                  <li
                    :class="ele.id == lessonId ? 'active' : ''"
                    v-for="(ele, i) in item.courseLessonList"
                    :key="i"
                    @click="toVideoSrc(ele)"
                  >
                    <div class="act-l">
                      <img
                        style="width:20px;height:20px"
                        v-if="ele.id == lessonId"
                        src="@/assets/images/fullScreen/bePlaying.gif"
                        alt=""
                      />
                      <img
                        v-if="ele.id != lessonId"
                        class="play"
                        src="@/assets/images/fullScreen/play.png"
                        alt=""
                      />
                    </div>
                    <div class="act-l" v-if="ele.id != lessonId">
                      <div
                        class="progress"
                        style="margin-top: 2px;margin-right:3px"
                      >
                        {{ ele.rate | formatRate }}
                      </div>
                    </div>
                    <span
                      >{{ ele.title }}
                      <span style="margin-left:10px">{{
                        ele.length | formatSeconds
                      }}</span>
                    </span>
                  </li>

                  <!-- <li>
                  <div class="act-l">
                    <div class="progress">已学20%</div>
                  </div>

                  <span>1.2 深化医药卫生制度深化医药卫生制度 度 20:16</span>
                </li> -->
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
      <!-- 班级详情和课程介绍 -->
      <div class="classContent">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="课程详情" name="first" class="bjxq">
            <div v-html="info.about"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { tenement } from "@/api/home/home.js";
import { videoPlay, getCourseDetail, videoPause } from "@/api/course/course.js";
export default {
  name: "FullScreen",
  components: {
    Footer,
    Header
  },
  data() {
    return {
      activeNames: [],
      collShow: true,
      courseId: "",
      lessonId: "",
      chapterId: "",
      info: {},
      player: null,
      playerShow: true,
      tipShow: false,
      // 用户信息
      userInfo: {},
      studyLogId: "",
      playDuration: "", //刚进页面跳到用户上次播放时间
      newDuration: "",
      status: "",
      times: 5, //5秒倒计时
      tabName: "",
      logo: "",
      showLogo: false,
      previewMode: true, //预览模式
      activeName: "first"
    };
  },
  filters: {
    formatRate: function(value) {
      if (value == null || value == "0%") {
        return `未学习`;
      } else if (value == "100%") {
        return `已学完`;
      } else {
        return `已学${value}`;
      }
    },
    formatSeconds: function(value) {
      var theTime = parseInt(value); // 秒
      var middle = 0; // 分
      var hour = 0; // 小时

      if (theTime > 60) {
        middle = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (middle > 60) {
          hour = parseInt(middle / 60);
          middle = parseInt(middle % 60);
        }
      }
      var result = "" + parseInt(theTime) + "";
      if (middle > 0) {
        result = "" + parseInt(middle) + ":" + result;
      }
      if (hour > 0) {
        result = "" + parseInt(hour) + ":" + result;
      }
      return result;
    }
  },
  created() {
    this.courseId = this.$route.params.courseId;
    this.lessonId = this.$route.params.lessonId;
    this.chapterId = this.$route.params.chapterId;
    this.tabName = this.$route.params.tabName;
    this.userInfo =
      JSON.parse(window.localStorage.getItem("userInfo")) ||
      JSON.parse(
        this.$cookie.get("userInfo", {
          domain: ".yixiaoshu.net"
        })
      );
    // videoPlay({ courseId: this.courseId, lessonId: this.lessonId }).then(
    //   res => {
    //     console.log(res, "视频播放");
    //   }
    // );
    tenement({
      //  tenantId: localStorage.getItem("tenantId")
    })
      .then(res => {
        console.log("租户信息", res);
        if (res.data != null) {
          this.logo = res.data.logo;
        }
      })
      .finally(() => {
        this.showLogo = true;
      });
  },
  mounted() {
    this.videoSrc(null, player => {
      this.player = player;
    });
    this.initCourse();
  },
  destroyed() {
    this.onPlayerEnded();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index, event);
    },
    preview() {
      this.previewMode = false;
      var child = document.querySelector("#avideo");
      document.querySelector(".videoContent-l").removeChild(child);
      document.querySelector(".content-l").appendChild(child);
      // this.videoSrc(null, player => {
      //   this.player = player;
      // });
    },
    studyMode() {
      this.previewMode = true;
      var child = document.querySelector("#avideo");
      document.querySelector(".videoContent-l").appendChild(child);
      document.querySelector(".content-l").removeChild(child);
      // this.videoSrc(null, player => {
      //   this.player = player;
      // });
    },
    rePlay2() {
      console.log(this.player, 999);
      this.$nextTick(() => {
        this.player.seek(0);
        this.player.play();
      });
    },
    nextVideo() {
      var newArr = [];
      if (this.info.chapterList.length > 0) {
        this.info.chapterList.forEach(ele => {
          if (ele.courseLessonList != null) {
            ele.courseLessonList.forEach(item => {
              newArr.push(item);
            });
          }
        });
      }

      var index = newArr.findIndex(ele => {
        return ele.id == this.lessonId; //记得要return
      });
      // console.log(index, newArr.length, 456);
      // debugger;
      if (index == newArr.length - 1) {
        // this.$message({
        //   message: "视频已经到底了，亲",
        //   type: "warning"
        // });
        return false;
      }
      this.videoSrc(newArr[index + 1], player => {
        this.player = player;
      });
    },
    toVideoSrc(ele) {
      // var child =
      //   '<div class="prism-player" id="avideo" v-if="playerShow"></div>';
      // if (this.previewMode) {
      //   document.querySelector(".videoContent-l").appendChild(child);
      //   document.querySelector(".content-l").removeChild(child);
      // } else {
      //   document.querySelector(".videoContent-l").removeChild(child);
      //   document.querySelector(".content-l").appendChild(child);
      // }

      this.videoSrc(ele, player => {
        this.player = player;
      });
      getCourseDetail({ courseId: this.courseId }).then(res => {
        this.info = res.data;
      }); //切换视频时播放进度也要更新
    },
    videoSrc(ele, callback) {
      if (ele == null) {
        // 开始进来调用的视频接口
        videoPlay({ courseId: this.courseId, lessonId: this.lessonId }).then(
          res => {
            console.log(res, "视频播放");
            this.studyLogId = res.data.studyLogId;
            const player = new Aliplayer(
              {
                id: "avideo",
                width: "100%",
                height: "100%",
                autoplay: false,
                encryptType: 1,
                vid: res.data.videoId,
                playauth: res.data.playAuth,
                cover: res.data.cover
              },
              function(player) {
                console.log("播放器创建好了。");
              }
            );
            player.on("play", this.onPlayerPlay);
            player.on("pause", this.onPlayerPause);
            player.on("ended", this.onPlayerEnded);
            player.on("ready", this.onPlayerReady); //能够开始播放视频
            this.status = res.data.status;
            if (res.data.status == 1) {
              this.playDuration = res.data.playDuration;
            } else {
              this.newDuration = res.data.newDuration;
            }
            callback(player);
          }
        );
      } else {
        this.lastId = this.lessonId;
        this.lessonId = ele.id;
        // setTimeout(() => {
        // 点击菜单调用的视频接口
        videoPlay({ courseId: this.courseId, lessonId: ele.id }).then(res => {
          console.log(res, "视频播放");
          this.studyLogId = res.data.studyLogId;
          // 切换播放源
          this.player.replayByVidAndPlayAuth(
            res.data.videoId,
            res.data.playAuth
          );
          // const player = new Aliplayer(
          //   {
          //     id: "avideo",
          //     width: "100%",
          //     height: "100%",
          //     autoplay: false,
          //     encryptType: 1,
          //     vid: res.data.videoId,
          //     playauth: res.data.playAuth,
          //     cover: res.data.cover
          //   },
          //   function(player) {
          //     console.log("播放器创建好了。");
          //   }
          // );
          // player.on("play", this.onPlayerPlay); //当视频开始播放时
          // player.on("pause", this.onPlayerPause); //当视频暂停播放时
          // player.on("ended", this.onPlayerEnded); //当视频播放结束时
          // player.on("ready", this.onPlayerReady); //能够开始播放视频
          this.status = res.data.status;
          if (res.data.status == 1) {
            this.playDuration = res.data.playDuration;
          } else {
            this.newDuration = res.data.newDuration;
          }
          // this.onPlayerEnded();
          // callback(player);
        });
        // }, 500);
      }
    },
    onPlayerReady() {
      if (this.status == 1) {
        console.log(this.playDuration, "111");
        this.player.seek(this.playDuration);
        this.player.play();
      } else {
        console.log(this.newDuration, "222");
        this.player.seek(this.newDuration);
        this.player.play();
      }
      clearInterval(timer);
      var timer = setInterval(() => {
        // 在播放的时候才调用接口
        if (this.player.getStatus() === "playing") {
          var time = Math.floor(this.player.getCurrentTime());
          console.log(time, "每90秒");
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
      }, 90000);
    },
    onPlayerPlay() {
      this.tipShow = false;
      videoPlay({ courseId: this.courseId, lessonId: this.lessonId }).then(
        res => {
          this.studyLogId = res.data.studyLogId;
          console.log(res, "开始播放");
        }
      );
    },
    onPlayerEnded() {
      this.tipShow = true;
      this.times = 5;
      var timer = setInterval(() => {
        this.times--;
        if (this.times <= 0) {
          this.nextVideo(); //5秒后自动进入下一节
          clearInterval(timer);
        }
      }, 1000);
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
    onPlayerPause() {
      // this.tipShow = true;
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
    },
    // 初始化目录
    initCourse() {
      getCourseDetail({ courseId: this.courseId }).then(res => {
        this.info = res.data;
        // this.info.chapterList.forEach(ele => {
        //   if (ele.id == this.chapterId) {
        //     ele.courseLessonList.forEach(item => {
        //       if (item.id == this.lessonId) {
        //         item.active = true;
        //       }
        //     });
        //   }
        // });

        // 找下标用来打开折叠面板
        var index = this.info.chapterList.findIndex(ele => {
          return ele.id == this.chapterId;
        });
        this.activeNames = [index];
      });
    },
    handleChange(val) {
      console.log(val);
    },
    goBack() {
      var time = Math.floor(this.player.getCurrentTime());
      setTimeout(() => {
        videoPause({
          courseId: this.courseId,
          lessonId: this.lessonId,
          playType: 0,
          studyLogId: this.studyLogId,
          playDuration: time
        }).then(res => {
          console.log(res, "结束播放");
        });
      }, 1000);
      this.$router.go(-1);
    },
    close() {
      this.collShow = false;
    },
    open() {
      this.collShow = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  .fullScreen {
    width: 100%;
    height: 100%;
    background: #202020;
    overflow: hidden;
    .video-top {
      padding: 0 25px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .video-l {
        display: flex;
        align-items: center;
        img {
          &:hover {
            cursor: pointer;
          }
        }
        .one {
          margin-left: 25px;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          .two {
            color: #ffffff;
          }
          .now {
            color: #17a5f2;
          }
        }
      }
      .video-r {
        display: flex;
        align-items: center;
        img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          overflow: hidden;
        }
        &:hover {
          cursor: pointer;
        }
        span {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
        }
      }
    }
    .videoContent {
      height: 905px;
      display: flex;
      .videoContent-l {
        position: relative;
        flex: 1;
        .modeSwitch {
          position: absolute;
          right: 320px;
          top: 20px;
          z-index: 9999;
          width: 228px;
          height: 44px;
          background: #17a5f2;
          border-radius: 6px;
          display: flex;
          align-items: center;
          .preview {
            flex: 1;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
              cursor: pointer;
            }
          }
          .study {
            width: 112px;
            height: 36px;
            background: #ffffff;
            border-radius: 5px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #17a5f2;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 2px;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .logo {
          position: absolute;
          right: 100px;
          top: 15px;
          z-index: 99999;
        }
        .tip {
          top: 300px;
          left: 50%;
          z-index: 99;
          transform: translateX(-50%);
          position: absolute;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #bbbbbb;
        }
        .icon {
          z-index: 99;
          position: absolute;
          width: 400px;
          height: 150px;
          top: 400px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: space-between;
          .icon-l {
            width: 96px;
            text-align: center;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #bbbbbb;
            &:hover {
              cursor: pointer;
            }
          }
          .icon-r {
            width: 96px;
            text-align: center;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #bbbbbb;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .nav {
          position: absolute;
          right: 0;
          top: 0;
          width: 48px;
          height: 530px;
          padding: 150px 0;
          background: #1b1b1b;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .navList {
            display: flex;
            flex-direction: column;
            align-items: center;
            &:hover {
              cursor: pointer;
            }
            img {
              width: 18px;
              height: 18px;
            }
            span {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #aaaaaa;
            }
          }
        }
      }
      .videoContent-r {
        width: 340px;
        height: 100%;
        padding: 0 30px;
        background: #2c2c2c;
        .videoContent-t {
          height: 70px;
          display: flex;
          align-items: center;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            width: 340px;
            height: 1px;
            background: #393939;
            border-radius: 1px;
          }
          span {
            margin-left: 8px;
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 300;
            color: #ffffff;
          }
        }
        .coll {
          height: 750px;
          overflow: auto;
          /deep/ .el-collapse {
            border-top: none;
          }
          /deep/ .el-collapse-item__header {
            background: #2c2c2c;
            border-bottom: 1px solid #393939;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            height: auto;
            // white-space: nowrap;
            // text-overflow: ellipsis;
            // overflow: hidden;
            // word-break: break-all;
          }
          /deep/ .el-collapse-item__wrap {
            background: #2c2c2c;
            border-bottom: 1px solid #393939;
          }
          /deep/ .el-collapse-item__content {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #aaaaaa;
          }
          ul {
            li {
              display: flex;
              padding: 15px 0;
              .act-l {
                width: 60px;
                display: flex;
                justify-content: center;
                .progress {
                  width: 60px;
                  height: 20px;
                  background: #393939;
                  border-radius: 4px;
                  text-align: center;
                  line-height: 20px;
                  font-size: 12px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #aaaaaa;
                }
              }
              .play {
                display: none;
                width: 20px;
                height: 20px;
              }
              &:hover {
                span {
                  color: #17a5f2;
                }
                .play {
                  display: block;
                }
              }
              &.active {
                span {
                  color: #17a5f2;
                }
                background: #393939;
                border-radius: 4px;
              }
            }
          }
        }
        .collect {
          margin-top: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            margin-left: 8px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #888888;
          }
        }
      }
    }
  }
  .class {
    .nav {
      display: flex;
      height: 66px;
      width: 1200px;
      margin: 0 auto;
      justify-content: space-between;
      align-items: center;
      .nav-l {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #888888;
      }
      .nav-r {
        width: 194px;
        height: 32px;
        background: #17a5f2;
        border-radius: 6px;
        display: flex;
        align-items: center;
        .yulan {
          width: 96px;
          height: 28px;
          background: #ffffff;
          border-radius: 5px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #17a5f2;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 2px;
          &:hover {
            cursor: pointer;
          }
        }
        .xue {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .content {
      width: 1200px;
      height: 540px;
      background: #282828;
      border-radius: 2px 6px 6px 2px;
      margin: 0 auto 60px;
      display: flex;
      .content-l {
        width: 828px;
        height: 540px;
        position: relative;
        .tip {
          top: 200px;
          left: 50%;
          z-index: 99;
          transform: translateX(-50%);
          position: absolute;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #bbbbbb;
        }
        .prism-player {
          width: 100%;
          height: 100%;
        }
      }
      .content-r {
        flex: 1;
        padding: 0 20px;
        overflow-y: auto;
        overflow-x: hidden;
        .videoContent-t {
          height: 70px;
          display: flex;
          align-items: center;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            width: 340px;
            height: 1px;
            background: #393939;
            border-radius: 1px;
          }
          span {
            margin-left: 8px;
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 300;
            color: #ffffff;
          }
        }
        .coll {
          height: 750px;
          overflow: auto;
          /deep/ .el-collapse {
            border-top: none;
          }
          /deep/ .el-collapse-item__header {
            background: #2c2c2c;
            border-bottom: 1px solid #393939;
            height: auto;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
          }
          /deep/ .el-collapse-item__wrap {
            background: #2c2c2c;
            border-bottom: 1px solid #393939;
          }
          /deep/ .el-collapse-item__content {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #aaaaaa;
          }
          ul {
            li {
              display: flex;
              padding: 15px 0;
              .act-l {
                width: 60px;
                display: flex;
                justify-content: center;
                .progress {
                  width: 60px;
                  height: 20px;
                  background: #393939;
                  border-radius: 4px;
                  text-align: center;
                  line-height: 20px;
                  font-size: 12px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #aaaaaa;
                }
              }
              .play {
                display: none;
                width: 20px;
                height: 20px;
              }
              &:hover {
                span {
                  color: #17a5f2;
                }
                .play {
                  display: block;
                }
              }
              &.active {
                span {
                  color: #17a5f2;
                }
                background: #393939;
                border-radius: 4px;
              }
            }
          }
        }
      }
    }
    .classContent {
      width: 1120px;
      margin: 30px auto 0;
      padding: 10px 40px 30px;
      background: #ffffff;
      border-radius: 6px;
      margin-bottom: 100px;
      .bjxq {
        p {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          line-height: 32px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.prism-setting-item.prism-setting-cc {
  display: none !important;
}
.prism-setting-item.prism-setting-audio {
  display: none !important;
}
.prism-cc-btn {
  display: none !important;
}
.fullScreen {
  div::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    /**/
  }
  div::-webkit-scrollbar-track {
    background: #393939;
    border-radius: 2px;
  }
  div::-webkit-scrollbar-thumb {
    background: #888888;
    border-radius: 2px;
  }
  // div::-webkit-scrollbar-thumb:hover {
  //   background: #333;
  // }
  // div::-webkit-scrollbar-corner {
  //   background: #179a16;
  // }
}
</style>
