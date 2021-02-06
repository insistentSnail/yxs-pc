<template>
  <div class="userCenterHome">
    <div class="top">
      <div class="top-l">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ activePro }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :command="index"
              v-for="(item, index) in proLists"
              :key="index"
              >{{ item.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="top-r">
        <img src="@/assets/images/userCenter/inform.png" alt="" />
        <span>直播课程即将上线...</span>
      </div>
    </div>
    <div class="center2" v-if="this.info != null">
      <div class="center-t">
        <img src="@/assets/images/userCenter/titleSign.png" alt="" />
        <span>{{ info.price == 0 ? "免费公开课" : "热门课程" }}</span>
      </div>
      <div class="center-b">
        <div class="merge">
          <div class="mfgkk">
            <img :src="info.smallPicture" style="object-fit: cover;" alt="" />
          </div>
          <div class="content">
            <p class="p1">{{ info.courseTitle }}</p>
            <p class="p2">讲师：{{ info.teacherName }}</p>
            <p class="p3">
              上次学到：<span>{{ info.lessonTitle }}</span>
            </p>
          </div>
        </div>

        <div class="centerBtn">
          <div class="intoCourse" @click="routerToFreeCourse(info.courseId)">
            进入课程
          </div>
          <div class="continueLearn" @click="fullScreen(info)">继续学习</div>
        </div>
      </div>
    </div>
    <!-- 无数据 -->
    <div v-else class="nodata">
      <img src="@/assets/images/userCenter/noData.png" alt="" />
      <p class="nodataText">您还未学过该项目课程</p>
    </div>
    <!-- <div class="bottom">
      <div class="bottom-title">
        <img src="@/assets/images/userCenter/titleSign.png" alt="" />
        <span>我的题库</span>
      </div>
      <ul>
        <li>
          <div class="merge">
            <div class="question-l">
              <img src="@/assets/images/userCenter/lian.png" alt="" />
            </div>
            <div class="question-c">
              <p class="question-one">
                [章节练习] 第1章 第3小节 药学专业知识概论
              </p>
              <p class="question-two">来自课程：药学专业知识一基础精讲</p>
            </div>
          </div>

          <div class="question-r">
            进入继续做题
          </div>
        </li>

        <li>
          <div class="merge">
            <div class="question-l">
              <img src="@/assets/images/userCenter/kao.png" alt="" />
            </div>
            <div class="question-c">
              <p class="question-one">
                [历年真题] 2020 年执业药师考试《中药学专业知识（一）》真题及解析
              </p>
              <p class="question-two">上次得分60分</p>
            </div>
          </div>

          <div class="question-r">
            进入继续考试
          </div>
        </li>

        <li>
          <div class="merge">
            <div class="question-l">
              <img src="@/assets/images/userCenter/kao.png" alt="" />
            </div>
            <div class="question-c">
              <p class="question-one">
                [历年真题] 2020 年执业药师考试《中药学专业知识（一）》真题及解析
              </p>
              <p class="question-two">
                您正在考试 ，剩余<span style="color:#E82020">20</span>分钟
              </p>
            </div>
          </div>

          <div class="question-r">
            进入继续考试
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>
<script>
import { getTabList } from "@/api/home/home.js";
import { myHome } from "@/api/userCenter/userCenter.js";
import { getCourseDetail } from "@/api/course/course.js";
export default {
  name: "UserCenterHome",
  data() {
    return {
      proLists: [],
      activePro: "",
      info: ""
    };
  },
  async created() {
    this.proLists = await getTabList().then(res => {
      return res.data;
    });
    this.activePro = this.proLists[0].name;
    this.recentlyCourse(this.proLists[0].code);
  },
  methods: {
    fullScreen(ele) {
      getCourseDetail({ courseId: ele.courseId }).then(res => {
        this.$router.push({
          name: "FullScreen",
          params: {
            courseId: res.data.id,
            lessonId: res.data.lastLearnLesson,
            chapterId: res.data.lastLearnChapter
          }
        });
      });
    },
    routerToFreeCourse(id) {
      this.$router.push({ name: "Course", params: { id: id } });
    },
    handleCommand(i) {
      // alert(i);
      this.activePro = this.proLists[i].name;
      this.recentlyCourse(this.proLists[i].code);
    },
    // 最近的课程
    recentlyCourse(code) {
      myHome({ code }).then(res => {
        console.log(res, "最近的课程");
        this.info = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
// 子路由私有样式不生效
</style>
<style lang="scss">
.nodata {
  width: 304px;
  margin: 100px auto;
  text-align: center;
  .nodataText {
    margin-top: 20px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #c3c3c3;
  }
}
.userCenterHome {
  .top {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top-l {
      width: 200px;
      height: 60px;
      background: #ffffff;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .top-r {
      width: 742px;
      height: 60px;
      background: #ffffff;
      border-radius: 6px;
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 20px;
        margin-left: 23px;
        margin-right: 13px;
      }
      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #565656;
      }
    }
  }
  .center2 {
    width: 892px;
    height: 166px;
    background: #ffffff;
    border-radius: 4px;
    margin: 10px 0;
    padding: 30px;
    .center-t {
      height: 20px;
      display: flex;
      align-items: center;
      span {
        margin-left: 8px;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
    }
    .center-b {
      height: 124px;
      margin-top: 24px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .merge {
        display: flex;
        align-items: center;
      }
      .mfgkk {
        width: 191px;
        height: 124px;
        img {
          width: 191px;
          height: 124px;
        }
      }
      .content {
        margin-left: 16px;
        height: 124px;
        .p1 {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          margin-top: 6px;
        }
        .p2 {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          margin-top: 10px;
        }
        .p3 {
          margin-top: 42px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #17a5f2;
          span {
            color: #888888;
          }
        }
      }
      .centerBtn {
        height: 93px;
        width: 130px;

        .intoCourse {
          width: 128px;
          height: 40px;
          border: 1px solid #17a5f2;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #17a5f2;
          &:hover {
            cursor: pointer;
          }
        }
        .continueLearn {
          margin-top: 10px;
          width: 128px;
          height: 40px;
          background: #17a5f2;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
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
  }
  .bottom {
    width: 892px;
    height: 464px;
    background: #ffffff;
    border-radius: 6px;
    padding: 0 30px;
    .bottom-title {
      height: 74px;
      display: flex;
      align-items: center;
      position: relative;
      &::after {
        content: "";
        width: 896px;
        height: 1px;
        background: #ececec;
        border-radius: 1px;
        position: absolute;
        bottom: 0;
      }
      span {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        margin-left: 8px;
      }
    }
    ul {
      li {
        height: 108px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:last-child::after {
          content: none; //清除伪元素
        }
        .merge {
          display: flex;
          align-items: center;
        }
        &::after {
          width: 896px;
          height: 1px;
          background: #ececec;
          border-radius: 1px;
          content: "";
          position: absolute;
          bottom: 0;
        }
        .question-l {
          width: 50px;
          height: 50px;
        }
        .question-c {
          margin-left: 12px;
          height: 50px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .question-one {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
          .question-two {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
          }
        }
        .question-r {
          width: 128px;
          height: 40px;
          background: #17a5f2;
          border-radius: 4px;
          line-height: 40px;
          text-align: center;
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
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #17a5f2;
}
.el-icon-arrow-down {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.el-icon--right {
  margin-left: 20px;
}
</style>
