<template>
  <div class="userCenterCourse">
    <div class="course-title">
      <img src="@/assets/images/userCenter/titleSign.png" alt="" />
      <span>我的班级</span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :label="item.name"
        :name="index + ''"
        v-for="(item, index) in hotLists"
        :key="index"
      >
        <ul class="zyys" v-if="oneList.length != 0">
          <li v-for="(item, index) in oneList" :key="index">
            <div class="merge">
              <div class="merge-l">
                <img
                  :src="item.smallPicture"
                  style="object-fit: cover;"
                  alt=""
                />
              </div>
              <div class="merge-r">
                <p class="p1">{{ item.title }}</p>
                <p class="p2">共{{ item.courseNum }}门课程</p>
                <div class="jdt">
                  <el-progress
                    :percentage="item.result"
                    :format="format(item)"
                    :class="item.result == 100 ? 'complete' : ''"
                  ></el-progress>
                </div>
              </div>
            </div>
            <div class="courseBtn">
              <div class="courseInfo" @click="routerToClass(item.id)">
                班级详情
              </div>
              <el-button
                class="startStudy"
                @click="fullScreen(item)"
                :loading="item.btnLoading"
              >
                {{
                  item.finish == "2" || item.finish == ""
                    ? "开始学习"
                    : "继续学习"
                }}
              </el-button>
            </div>
          </li>
        </ul>

        <div v-else class="nodata">
          <img src="@/assets/images/userCenter/noData.png" alt="" />
          <p class="nodataText">暂无数据</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { myClass } from "@/api/userCenter/userCenter.js";
import { getTabList } from "@/api/home/home.js";
import { getClassDetail } from "@/api/class/class.js";
import { getCourseDetail } from "@/api/course/course.js";
export default {
  name: "UserCenterCourse",
  data() {
    return {
      activeName: "0",
      oneList: [],
      hotLists: [],
      tabName: ""
    };
  },
  async created() {
    this.hotLists = await getTabList().then(res => {
      return res.data;
    });
    this.tabName = this.hotLists[0].name;
    myClass({ code: this.hotLists[0].code }).then(res => {
      console.log(res.data);
      this.oneList = res.data;
    });
  },
  methods: {
    fullScreen(ele) {
      this.$set(ele, "btnLoading", true); //响应式设值，不然视图不更新
      getClassDetail({ classroomId: ele.id }).then(res => {
        console.log(res, 888);
        // 未学习时
        if (res.data.lastLearnCourseId == null) {
          getCourseDetail({ courseId: res.data.courseList[0].id }).then(res => {
            console.log(res, "未学习课程详情");
            this.$set(ele, "btnLoading", false);
            this.$router.push({
              name: "FullScreen",
              params: {
                courseId: res.data.id,
                lessonId: res.data.chapterList[0].courseLessonList[0].id,
                chapterId: res.data.chapterList[0].id
              }
            });
          });
        } else {
          // 已学习过
          getCourseDetail({ courseId: res.data.lastLearnCourseId }).then(
            res => {
              console.log(res, "已学习课程详情");
              this.$set(ele, "btnLoading", false);
              this.$router.push({
                name: "FullScreen",
                params: {
                  courseId: res.data.id,
                  lessonId: res.data.lastLearnLesson,
                  chapterId: res.data.lastLearnChapter,
                  tabName: this.tabName //课程属于哪个tab下
                }
              });
            }
          );
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.tabName = this.hotLists[tab.name].name;
      myClass({ code: this.hotLists[tab.name].code }).then(res => {
        this.oneList = res.data;
      });
    },
    // 班级跳转详情
    routerToClass(id) {
      this.$router.push({
        name: "Class",
        params: { id: id, activeName: "second" }
      });
    },
    format(item) {
      // 必须return 一个function
      if (item.finish == "1") {
        return () => {
          return `已学完`;
        };
      } else if (item.finish == "2" || item.finish == "") {
        return () => {
          return `未学习`;
        };
      } else {
        if (item.result == 0) {
          return () => {
            return `不足1%`;
          };
        } else {
          return () => {
            return `已学${item.result}%`;
          };
        }
      }
    }
  }
};
</script>
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
</style>
<style lang="scss" scoped>
.userCenterCourse {
  width: 892px;
  height: 904px;
  background: #ffffff;
  border-radius: 6px;
  padding: 0 30px;
  .course-title {
    padding: 30px 0 20px;
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
  // element-ui tab栏样式
  /deep/ .el-tabs__item.is-active {
    color: #17a5f2;
  }
  /deep/ .el-tabs__item {
    color: #999999;
  }
  /deep/ .el-tabs__active-bar {
    height: 3px;
    background: #17a5f2;
    border-radius: 1px;
  }
  /deep/ .el-tabs__header {
    margin: 0;
  }
  // 进度条宽度
  /deep/ .el-progress-bar {
    width: 230px;
  }
  // 进度条后面文字
  /deep/ .el-progress__text {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #17a5f2;
  }
  // 已完成文字颜色不同
  .complete /deep/ .el-progress__text {
    color: #999999;
  }
  .zyys {
    li {
      height: 184px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .merge {
        display: flex;
        align-items: center;
        height: 124px;
        .merge-l {
          height: 124px;
          img {
            width: 191px;
            height: 124px;
          }
        }
        .merge-r {
          height: 124px;
          margin-left: 16px;
          .p1 {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
          .p2 {
            margin-top: 3px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
          }
          .jdt {
            margin-top: 60px;
          }
        }
      }
      .courseBtn {
        width: 266px;
        height: 40px;
        display: flex;
        margin-top: 85px;
        .courseInfo {
          width: 128px;
          height: 40px;
          border: 1px solid #17a5f2;
          box-sizing: border-box;
          border-radius: 4px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #17a5f2;
          &:hover {
            cursor: pointer;
          }
        }
        .startStudy {
          width: 128px;
          height: 40px;
          background: #17a5f2;
          border-radius: 4px;
          // line-height: 40px;
          text-align: center;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          margin-left: 10px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      &::after {
        content: "";
        width: 891px;
        height: 1px;
        background: #ececec;
        border-radius: 1px;
        position: absolute;
        bottom: 0;
      }
    }
  }
}
</style>
