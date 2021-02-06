<template>
  <div class="userCenterExamRecord">
    <div class="course-title">
      <img src="@/assets/images/userCenter/titleSign.png" alt="" />
      <span>考试记录</span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <ul v-if="oneList.length > 0">
          <li
            @click="current(index)"
            :class="currentIndex == index ? 'active' : ''"
            v-for="(item, index) in oneList"
            :key="index"
          >
            <div class="cont-l">
              <p>{{ item.examPaperTitle }}</p>
              <p>
                <span>{{ item.submitTime }}交卷</span>
                <span style="margin-left:18px" v-if="item.status == 1"
                  >{{ item.score }}分 |
                  {{ item.markingStatus | markingStatus }}</span
                >
                <span
                  style="margin-left:18px;color:#FFAA00"
                  v-if="item.status == 0"
                  >考试中，还剩{{ item.remainTime }}分钟</span
                >
              </p>
            </div>
            <div class="cont-r" v-if="item.status == 1">
              <span @click="watchExamResult(item)">查看解析</span>
              <el-button class="reContinue" @click="toExam(item)"
                >再考一次</el-button
              >
            </div>
            <div class="cont-r" v-if="item.status == 0">
              <el-button class="continue" @click="toExam(item)"
                >继续考试</el-button
              >
            </div>
          </li>
        </ul>
        <div class="nodata" v-else>
          <img src="@/assets/images/userCenter/noData.png" alt="" />
          <p class="nodataText">暂无数据</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="合格" name="second">
        <ul v-if="oneList.length > 0">
          <li
            @click="current(index)"
            :class="currentIndex == index ? 'active' : ''"
            v-for="(item, index) in oneList"
            :key="index"
          >
            <div class="cont-l">
              <p>{{ item.examPaperTitle }}</p>
              <p>
                <span>{{ item.submitTime }}交卷</span>
                <span style="margin-left:18px" v-if="item.status == 1"
                  >{{ item.score }}分 |
                  {{ item.markingStatus | markingStatus }}</span
                >
                <span
                  style="margin-left:18px;color:#FFAA00"
                  v-if="item.status == 0"
                  >考试中，还剩{{ item.remainTime }}分钟</span
                >
              </p>
            </div>
            <div class="cont-r" v-if="item.status == 1">
              <span @click="watchExamResult(item)">查看解析</span>
              <el-button class="reContinue" @click="toExam(item)"
                >再考一次</el-button
              >
            </div>
            <div class="cont-r" v-if="item.status == 0">
              <el-button class="continue" @click="toExam(item)"
                >继续考试</el-button
              >
            </div>
          </li>
        </ul>
        <div class="nodata" v-else>
          <img src="@/assets/images/userCenter/noData.png" alt="" />
          <p class="nodataText">暂无数据</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="不合格" name="third">
        <ul v-if="oneList.length > 0">
          <li
            @click="current(index)"
            :class="currentIndex == index ? 'active' : ''"
            v-for="(item, index) in oneList"
            :key="index"
          >
            <div class="cont-l">
              <p>{{ item.examPaperTitle }}</p>
              <p>
                <span>{{ item.submitTime }}交卷</span>
                <span style="margin-left:18px" v-if="item.status == 1"
                  >{{ item.score }}分 |
                  {{ item.markingStatus | markingStatus }}</span
                >
                <span
                  style="margin-left:18px;color:#FFAA00"
                  v-if="item.status == 0"
                  >考试中，还剩{{ item.remainTime }}分钟</span
                >
              </p>
            </div>
            <div class="cont-r" v-if="item.status == 1">
              <span @click="watchExamResult(item)">查看解析</span>
              <el-button class="reContinue" @click="toExam(item)"
                >再考一次</el-button
              >
            </div>
            <div class="cont-r" v-if="item.status == 0">
              <el-button class="continue" @click="toExam(item)"
                >继续考试</el-button
              >
            </div>
          </li>
        </ul>
        <div class="nodata" v-else>
          <img src="@/assets/images/userCenter/noData.png" alt="" />
          <p class="nodataText">暂无数据</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="考试中" name="fourth">
        <ul v-if="oneList.length > 0">
          <li
            @click="current(index)"
            :class="currentIndex == index ? 'active' : ''"
            v-for="(item, index) in oneList"
            :key="index"
          >
            <div class="cont-l">
              <p>{{ item.examPaperTitle }}</p>
              <p>
                <span>{{ item.submitTime }}交卷</span>
                <span style="margin-left:18px" v-if="item.status == 1"
                  >{{ item.score }}分 |
                  {{ item.markingStatus | markingStatus }}</span
                >
                <span
                  style="margin-left:18px;color:#FFAA00"
                  v-if="item.status == 0"
                  >考试中，还剩{{ item.remainTime }}分钟</span
                >
              </p>
            </div>
            <div class="cont-r" v-if="item.status == 1">
              <span @click="watchExamResult(item)">查看解析</span>
              <el-button class="reContinue" @click="toExam(item)"
                >再考一次</el-button
              >
            </div>
            <div class="cont-r" v-if="item.status == 0">
              <el-button class="continue" @click="toExam(item)"
                >继续考试</el-button
              >
            </div>
          </li>
        </ul>
        <div class="nodata" v-else>
          <img src="@/assets/images/userCenter/noData.png" alt="" />
          <p class="nodataText">暂无数据</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { examResult } from "@/api/userCenter/userCenter.js";
export default {
  name: "UserCenterExamRecord",
  data() {
    return {
      activeName: "first",
      currentIndex: null,
      oneList: []
    };
  },
  filters: {
    markingStatus: function(value) {
      if (value == 2) {
        return "及格";
      } else if (value == 3) {
        return "不及格";
      }
    }
  },
  async created() {
    examResult({
      current: 1,
      size: 10
    }).then(res => {
      console.log(res, "全部");
      this.oneList = res.data.records;
    });
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index, event);
      if (tab.index == 0) {
        examResult({
          current: 1,
          size: 10
        }).then(res => {
          console.log(res, "全部");
          this.oneList = res.data.records;
        });
      } else if (tab.index == 3) {
        examResult({
          current: 1,
          size: 10,
          status: 0
        }).then(res => {
          console.log(res, "考试中");
          this.oneList = res.data.records;
        });
      } else if (tab.index == 1) {
        examResult({
          current: 1,
          size: 10,
          status: 1,
          markingStatus: 2
        }).then(res => {
          console.log(res, "合格");
          this.oneList = res.data.records;
        });
      } else if (tab.index == 2) {
        examResult({
          current: 1,
          size: 10,
          status: 1,
          markingStatus: 3
        }).then(res => {
          console.log(res, "不合格");
          this.oneList = res.data.records;
        });
      }
    },
    current(index) {
      this.currentIndex = index;
    },
    // 查看解析
    watchExamResult(item) {
      this.$router.push({
        name: "ExamResult",
        query: {
          examResultId: item.id,
          name: "首页",
          type: "考试记录"
        }
      });
    },
    // 跳转考试页面
    toExam(item) {
      this.$router.push({
        name: "Exam",
        query: {
          id: item.examPaperId,
          name: "首页",
          title: item.examPaperTitle,
          type: "考试记录"
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.userCenterExamRecord {
  width: 952px;
  height: 100%;
  background: #ffffff;
  border-radius: 6px;
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
  // tab切换
  /deep/ .el-tabs__nav {
    width: 100%;
  }
  /deep/ .el-tabs__item {
    width: 25%;
    text-align: center;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #9a9a9a;
  }
  /deep/ .el-tabs__item.is-active {
    color: #17a5f2;
  }
  /deep/ .el-tabs__active-bar {
    height: 3px;
    background: #17a5f2;
    border-radius: 1px;
  }
  /deep/ .el-tabs__header {
    margin: 0;
    padding: 0 28px;
  }
  .course-title {
    padding: 30px 28px 20px;
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
  ul {
    li {
      padding: 0 28px;
      height: 105px;
      border-bottom: 1px solid #ececec;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &.active {
        background: #f8f9f9;
        .cont-l {
          p {
            color: #18a5f2;
          }
        }
        .cont-r {
          span {
            color: #18a5f2;
          }
          .continue {
            background: #ffaa00;
            color: #ffffff;
            border: none;
            &:hover {
              background: #ffaa00;
            }
          }
          .reContinue {
            background: #18a6f2;
            color: #ffffff;
            border: none;
            &:hover {
              background: #18a6f2;
            }
          }
        }
      }
      .cont-l {
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #343434;
          span {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #9a9a9a;
          }
        }
      }
      .cont-r {
        span {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #9a9a9a;
          margin-right: 20px;
          &:hover {
            cursor: pointer;
          }
        }
        .continue {
          width: 124px;
          height: 42px;
          border: 1px solid #ffaa00;
          border-radius: 4px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffaa00;
          &:hover {
            background: none;
          }
        }
        .reContinue {
          width: 124px;
          height: 42px;
          border: 1px solid #18a6f2;
          border-radius: 4px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #18a5f2;
          &:hover {
            background: none;
          }
        }
      }
    }
  }
}
</style>
