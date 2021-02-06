<template>
  <div class="userCenterCourse">
    <div class="course-title">
      <img src="@/assets/images/userCenter/titleSign.png" alt="" />
      <span>学习记录</span>
    </div>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first"> -->
    <p class="recently">近7天学习情况</p>
    <ul class="zyys">
      <li v-for="(item, index) in recordList" :key="index">
        <div class="merge">
          <div class="merge-l">
            <img :src="item.smallPicture" style="object-fit: cover;" alt="" />
          </div>
          <div class="merge-r">
            <p class="p1">{{ item.title }}</p>
            <!-- <p class="p2">
              <span style="color:#17A5F2">上次学到：</span>1.2中药和中药临床应用
              一
            </p> -->
            <p class="p3">
              {{ item.percent | formatPercent }}
            </p>
            <!-- <div class="jdt">
                  <el-progress
                    :percentage="num"
                    :format="format"
                    :class="num == 100 ? 'complete' : ''"
                  ></el-progress>
                </div> -->
          </div>
        </div>
        <div class="courseBtn">
          <div
            class="startStudy"
            v-if="item.percent != 100"
            @click="fullScreen(item)"
          >
            继续学习
          </div>
          <div
            class="startStudy again"
            v-if="item.percent == 100"
            @click="fullScreen(item)"
          >
            再学一遍
          </div>
        </div>
      </li>
    </ul>
    <!-- </el-tab-pane>
    </el-tabs> -->
  </div>
</template>
<script>
import { myRecord } from "@/api/userCenter/userCenter.js";
import { getCourseDetail } from "@/api/course/course.js";
export default {
  name: "UserCenterCourse",
  data() {
    return {
      activeName: "first",
      num: 60,
      recordList: []
    };
  },
  filters: {
    formatPercent: function(value) {
      if (value == null || value == 0) {
        return `不足1%`;
      } else if (value == 100) {
        return `已学完`;
      } else {
        return `已学${value}%`;
      }
    }
  },
  created() {
    myRecord().then(res => {
      console.log(res, "记录");
      this.recordList = res.data.learnList;
    });
  },
  methods: {
    fullScreen(ele) {
      getCourseDetail({ courseId: ele.id }).then(res => {
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    format(percentage) {
      if (percentage == 100) {
        return `已学完`;
      } else if (percentage == 0) {
        return `未学习`;
      } else if (percentage < 1) {
        return `不足1%`;
      } else {
        return `已学${percentage}%`;
      }
    }
  }
};
</script>
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
  .recently {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #999999;
    margin-top: 30px;
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
            margin-top: 8px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
          }
          .p3 {
            margin-top: 50px;
            font-size: 16px;
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
        width: 128px;
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
          border: 1px solid #17a5f2;
          border-radius: 4px;
          box-sizing: border-box;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #17a5f2;
          &.again {
            border: 1px solid #ffa900;
            color: #ffa900;
          }
          // margin-left: 10px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      // &::after {
      //   content: "";
      //   width: 891px;
      //   height: 1px;
      //   background: #ececec;
      //   border-radius: 1px;
      //   position: absolute;
      //   bottom: 0;
      // }
    }
  }
}
</style>
