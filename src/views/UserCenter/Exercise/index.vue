<template>
  <div class="userCenterExercise">
    <div class="nav">
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
    <div class="content">
      <div class="content-tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="专项练习" name="first">
            <ul class="zxlx" v-if="specialLists.length > 0">
              <li
                :class="questionIndex == index ? 'active' : ''"
                v-for="(item, index) in specialLists"
                :key="index"
                @click="currentQuestion(index)"
              >
                <div class="special-l">
                  <div class="special-img">
                    <img src="@/assets/images/questionBank/zxlx.png" alt="" />
                  </div>
                  <div class="special-text">
                    <p class="p1">{{ item.courseName }}</p>
                    <p class="p2">
                      <!-- <span>0人参与</span> -->
                      <!-- <span style="margin-left:40px"
                        >总题量：{{ item.total }}道题</span
                      > -->
                      <span>总题量：{{ item.total }}道题</span>
                    </p>
                  </div>
                </div>
                <el-button class="special-r" @click="startSpecial(item)"
                  >开始做题</el-button
                >
              </li>
            </ul>

            <!-- 无数据 -->
            <div v-else class="nodata">
              <img src="@/assets/images/userCenter/noData.png" alt="" />
              <p class="nodataText">暂无数据</p>
            </div>
          </el-tab-pane>

          <el-tab-pane label="章节练习" name="second">
            <div class="zjlx" v-if="chapterLists.length > 0">
              <div class="totalQuestions">
                <p>总题量：890</p>
                <div>
                  <el-progress
                    :format="format(89)"
                    :percentage="50"
                  ></el-progress>
                </div>
              </div>

              <div
                class="circulation"
                v-for="item in chapterLists"
                :key="item.courseId"
              >
                <div class="one">
                  <div class="one-l">
                    <img
                      :src="
                        item.open
                          ? require('@/assets/images/questionBank/closeBig.png')
                          : require('@/assets/images/questionBank/openBig.png')
                      "
                      alt=""
                      @click="change1(item)"
                    />
                    <span>{{ item.courseName }}</span>
                  </div>
                  <!-- <div class="one-r">共{{ item.num }}章节</div> -->
                </div>

                <div
                  class="two"
                  v-for="ele in ChapterChildrenList"
                  :key="ele.chapterId"
                >
                  <div v-if="item.open">
                    <div class="twoTitle">
                      <img
                        :src="
                          ele.open
                            ? require('@/assets/images/questionBank/closeSmall.png')
                            : require('@/assets/images/questionBank/openSmall.png')
                        "
                        alt=""
                        @click="change2(ele)"
                      />
                      <span>{{ ele.chapterName }}</span>
                    </div>

                    <ul v-if="ele.open">
                      <li
                        v-for="el in ele.lessonVOList"
                        :key="el.lessonId"
                        @click="routerToPractice(el, item)"
                      >
                        <p>
                          <span>{{ el.lessonName }}</span>
                          <span style="margin-left:20px"
                            >共{{ el.totalNum }}道题</span
                          >
                        </p>

                        <div v-if="item.lessonId == el.lessonId" class="lastDo">
                          <span>上次做到这里</span>
                          <div class="btn">继续做题</div>
                        </div>
                        <div v-else class="btn">做题</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- 无数据 -->
            <div v-else class="nodata">
              <img src="@/assets/images/userCenter/noData.png" alt="" />
              <p class="nodataText">暂无数据</p>
            </div>
          </el-tab-pane>

          <el-tab-pane label="历年真题" name="third">
            <ul class="lnzt" v-if="previousList.length > 0">
              <li
                :class="previousIndex == index ? 'active' : ''"
                v-for="(item, index) in previousList"
                :key="index"
                @click="previousQuestion(index)"
              >
                <div class="special-l2">
                  <div class="special-img2">
                    <img src="@/assets/images/questionBank/lnzt.png" alt="" />
                  </div>
                  <div class="special-text">
                    <p class="p1">{{ item.title }}</p>
                    <p class="p2">
                      <span>{{ item.hasExamCount }}人参与</span>
                      <span
                        v-if="item.examTimeLast != null"
                        style="margin-left:40px;color:#FFA900"
                        >考试中，剩余{{ item.examTimeLast }}分钟</span
                      >
                      <span
                        v-if="item.lastScore != null"
                        style="margin-left:40px"
                        >{{ "上次成绩 " + item.lastScore + " 分" }}</span
                      >
                    </p>
                  </div>
                </div>
                <div style="display:flex;align-items: center;">
                  <span
                    class="watchAnalysis"
                    @click="watchExamResult(item)"
                    v-show="item.overTimeStatus != 1 && item.lastScore != null"
                    style="font-size: 14px;font-family: Microsoft YaHei;font-weight: 400;color: #999999;margin-right:16px"
                    >查看解析</span
                  >
                  <el-button
                    v-if="item.examTimeLast == null"
                    @click="openExamDialog(item)"
                    :disabled="item.overTimeStatus == 1 ? true : false"
                    class="special-r"
                    >开始考试</el-button
                  >
                  <el-button
                    v-else
                    style="border: 1px solid #FFA900;color: #FFA900;"
                    @click="openExamDialog(item)"
                    class="special-r"
                  >
                    继续考试</el-button
                  >
                </div>
              </li>
            </ul>

            <!-- 无数据 -->
            <div v-else class="nodata">
              <img src="@/assets/images/userCenter/noData.png" alt="" />
              <p class="nodataText">暂无数据</p>
            </div>
          </el-tab-pane>

          <el-tab-pane label="模拟真题" name="fourth">
            <ul class="lnzt" v-if="simulateList.length > 0">
              <li
                :class="simulateIndex == index ? 'active' : ''"
                v-for="(item, index) in simulateList"
                :key="index"
                @click="simulateQuestion(index)"
              >
                <div class="special-l2">
                  <div class="special-img2">
                    <img
                      style="height:48px"
                      src="@/assets/images/questionBank/mnzt.png"
                      alt=""
                    />
                  </div>
                  <div class="special-text">
                    <p class="p1">{{ item.title }}</p>
                    <p class="p2">
                      <span>{{ item.hasExamCount }}人参与</span>
                      <span
                        v-if="item.examTimeLast != null"
                        style="margin-left:40px;color:#FFA900"
                        >考试中，剩余{{ item.examTimeLast }}分钟</span
                      >
                      <span
                        v-if="item.lastScore != null"
                        style="margin-left:40px"
                        >{{ "上次成绩 " + item.lastScore + " 分" }}</span
                      >
                    </p>
                  </div>
                </div>
                <div style="display:flex;align-items: center;">
                  <span
                    class="watchAnalysis"
                    @click="watchExamResult(item)"
                    v-show="item.overTimeStatus != 1 && item.lastScore != null"
                    style="font-size: 14px;font-family: Microsoft YaHei;font-weight: 400;color: #999999;margin-right:16px"
                    >查看解析</span
                  >
                  <el-button
                    v-if="item.examTimeLast == null"
                    @click="openExamDialog(item)"
                    :disabled="item.overTimeStatus == 1 ? true : false"
                    class="special-r"
                    >开始考试</el-button
                  >
                  <el-button
                    v-else
                    style="border: 1px solid #FFA900;color: #FFA900;"
                    @click="openExamDialog(item)"
                    class="special-r"
                  >
                    继续考试</el-button
                  >
                </div>
              </li>
            </ul>
            <!-- 无数据 -->
            <div v-else class="nodata">
              <img src="@/assets/images/userCenter/noData.png" alt="" />
              <p class="nodataText">暂无数据</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 专项练习弹窗 -->
    <el-dialog
      width="680px"
      class="zxlxBox"
      title="专项练习设置"
      :visible.sync="zxlxDialog"
    >
      <div>
        <div class="chooseQuestionType">
          <p>按题型选择：</p>
          <ul>
            <li
              :class="txIndex == index ? 'active' : ''"
              v-for="(item, index) in txChooseList"
              :key="index"
              @click="chooseTx(index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>

        <div class="chooseQuestionType" style="margin-top:20px">
          <p>按数量选择：</p>
          <ul>
            <li
              :class="numberIndex == index ? 'active' : ''"
              v-for="(item, index) in numberChooseList"
              :key="index"
              @click="chooseNumber(index)"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>

        <div class="submit" @click="submit">确定</div>
      </div>
    </el-dialog>

    <!-- 考试弹窗 -->
    <el-dialog
      width="540px"
      class="zxlxBox"
      title="考试须知"
      :show-close="false"
      :visible.sync="examDialog"
    >
      <div class="examBox">
        <p>
          1. 本次考试限时 <span>{{ examNotice.limitTime }}</span> 分钟，共
          <span>{{ examNotice.examNum }}</span> 题，总分
          <span>{{ examNotice.score }}</span>
          分，60分视为合格，超时未交卷系统将自动为您提交。
        </p>
        <p>
          2. 本次考试不限次数。
        </p>
        <p v-if="examItem.examTimeLast == null">
          3. 点击 <span>[开始考试]</span> 扣除一次考试机会，请谨慎操作。
        </p>
        <p v-else>
          3.检测到您上次考试仍未结束，剩余{{
            examItem.examTimeLast
          }}分钟，点击【继续考试】开始答题。
        </p>
        <p>
          4.
          <span
            >请在时间和网络允许的情况下考试，否则可能会影响考试正常进行。</span
          >
        </p>
        <div class="btn" @click="routerToExam">
          {{ examItem.examTimeLast == null ? "开始考试" : "继续考试" }}
        </div>
        <div class="later" @click="examDialog = false">稍后再考</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getTabList } from "@/api/home/home.js";
import {
  chapterList,
  openChapterList,
  specialList,
  examList,
  examTip
} from "@/api/questionBank/questionBank.js";
export default {
  name: "UserCenterExercise",
  data() {
    return {
      proLists: [],
      activePro: "",
      activeName: "first",
      questionIndex: null, //专项练习
      previousIndex: null, //历年真题
      simulateIndex: null,
      // 专项练习
      specialLists: [],
      // 章节练习
      chapterLists: [],
      ChapterChildrenList: [],
      // 历年真题
      previousList: [],
      // 模拟真题
      simulateList: [],
      zxlxDialog: false, //专项练习弹窗
      examDialog: false, //考试弹窗
      txChooseList: [],
      txIndex: null,
      numberChooseList: [],
      numberIndex: null,
      currentCourseId: null, //专项练习的courseId
      currentCourseName: "",
      examNotice: {}, //考试须知
      examItem: {},
      type: "" //[章节练习 、专项练习、模拟考试、真题考试]
    };
  },
  async created() {
    this.proLists = await getTabList().then(res => {
      return res.data;
    });
    this.activePro = this.proLists[0].name;
    this.recentlyCourse(this.proLists[0].code); //不先写这个会报错
  },
  methods: {
    handleCommand(i) {
      this.activePro = this.proLists[i].name;
      this.recentlyCourse(this.proLists[i].code);
    },
    recentlyCourse(code) {
      chapterList({
        code: code,
        current: 1,
        size: 10
      }).then(res => {
        res.data.records.forEach(ele => {
          ele.open = false;
        });
        this.chapterLists = res.data.records; //章节练习
        this.change1(this.chapterLists[0]);
        this.specialLists = res.data.records; //专项练习
        this.total = res.data.total;
      });
      // 历年真题
      examList({
        code: code,
        current: 1,
        size: 10,
        type: 0
      }).then(res => {
        // 历年真题
        this.previousList = res.data.records;
      });
      // 模拟真题
      examList({
        code: code,
        current: 1,
        size: 10,
        type: 1
      }).then(res => {
        // 模拟真题
        this.simulateList = res.data.records;
      });
    },
    handleClick(tab, event) {
      console.log(tab.label, event);
      this.type = tab.label;
    },
    // 专项练习
    currentQuestion(index) {
      this.questionIndex = index;
      specialList({
        courseId: this.chapterLists[index].courseId
      }).then(res => {
        res.data.questionTypeList.unshift({ id: "0", name: "全部" });
        this.txChooseList = res.data.questionTypeList;
        this.numberChooseList = res.data.questionNumList;
      });
    },
    // 专项练习点击开始做题
    startSpecial(item) {
      this.zxlxDialog = true;
      this.currentCourseId = item.courseId;
      this.currentCourseName = item.courseName;
      this.chooseTx(0);
      this.chooseNumber(0);
    },
    // 打开考试弹窗
    openExamDialog(item) {
      this.examDialog = true;
      this.examItem = item;
      examTip({
        id: item.id
      }).then(res => {
        this.examNotice = res.data; //考试须知
      });
    },
    submit() {
      this.zxlxDialog = false;
      this.$router.push({
        name: "SpecialPractice",
        query: {
          courseId: this.currentCourseId,
          questionType: this.txChooseList[this.txIndex].id,
          value: this.numberChooseList[this.numberIndex].value,
          courseName: this.currentCourseName,
          type: "专项练习",
          name: this.activePro
        }
      });
    },
    // 按题型选择
    chooseTx(index) {
      this.txIndex = index;
    },
    // 按数量选择
    chooseNumber(index) {
      this.numberIndex = index;
    },
    format(item) {
      return () => {
        return `已做${item}题`;
      };
    },
    // 折叠面板
    change1(item) {
      if (!item.open) {
        // 点开其他没有展开的项则关闭所有展开的项，再展开该项
        this.chapterLists.forEach(ele => {
          ele.open = false;
        });
      } else {
        // 重复点击已经展开的则不作任何操作 只展开关闭
      }

      if (item.open) {
        item.open = false;
      } else {
        item.open = true;
      }
      openChapterList({
        courseId: item.courseId
      }).then(res => {
        res.data.forEach(ele => {
          ele.open = false;
        });
        this.ChapterChildrenList = res.data;
        this.change2(this.ChapterChildrenList[0]);
      });
    },
    change2(item) {
      if (item.open) {
        item.open = false;
      } else {
        item.open = true;
      }
    },
    // 跳转练习页面
    routerToPractice(el, item) {
      this.$router.push({
        name: "Practice",
        query: {
          lessonId: el.lessonId,
          courseName: item.courseName,
          lessonName: el.lessonName,
          type: "章节练习",
          name: this.activePro
        }
      });
    },
    // 跳转考试页面
    routerToExam() {
      this.examDialog = false;
      this.$router.push({
        name: "Exam",
        query: {
          id: this.examNotice.id,
          name: this.activePro,
          title: this.examItem.title,
          type: this.type
        }
      });
    },
    // 历年真题
    previousQuestion(index) {
      this.previousIndex = index;
      if (this.previousList[index].overTimeStatus == 1) {
        this.$message({
          message: "截止时间到 " + this.previousList[index].examDateEnd,
          type: "warning"
        });
      }
    },
    // 模拟真题
    simulateQuestion(index) {
      this.simulateIndex = index;
      if (this.simulateList[index].overTimeStatus == 1) {
        this.$message({
          message: "截止时间到 " + this.simulateList[index].examDateEnd,
          type: "warning"
        });
      }
    },
    // 查看解析
    watchExamResult(item) {
      this.$router.push({
        name: "ExamResult",
        query: {
          examResultId: item.lastExamResultId,
          name: this.activePro,
          type: this.type
        }
      });
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
.userCenterExercise {
  background: #f0f0f0;
  .zxlxBox {
    /deep/ .el-dialog__header {
      text-align: center;
      .el-dialog__title {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
    }
    .chooseQuestionType {
      p {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 114px;
          height: 40px;
          background: #f5f5f5;
          border-radius: 4px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #888888;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 12px;
          margin-top: 10px;
          &:hover {
            cursor: pointer;
          }
          &.active {
            color: #ffffff !important;
            background: #17a5f2 !important;
          }
          &:nth-child(1) {
            margin-left: 0px;
            color: #17a5f2;
            border: 1px solid #17a5f2;
          }
          &:nth-child(6) {
            margin-left: 0px;
          }
        }
      }
    }
    .submit {
      margin: 30px auto 0;
      width: 180px;
      height: 45px;
      background: #17a5f2;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      &:hover {
        cursor: pointer;
      }
    }
    // 考试弹窗
    .examBox {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #888888;
      line-height: 24px;
      p {
        margin: 10px 0;
      }
      span {
        color: #17a5f2;
      }
      .btn {
        width: 180px;
        height: 45px;
        background: #17a5f2;
        border-radius: 4px;
        margin: 15px auto;

        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        line-height: 45px;
        &:hover {
          cursor: pointer;
        }
      }
      .later {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #888888;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  // tab切换
  /deep/ .el-tabs__nav {
    width: 100%;
    height: 60px;
  }
  /deep/ .el-tabs__item {
    width: 25%;
    height: 60px;
    line-height: 60px;
    color: #333;
    text-align: center;
    font-size: 16px;
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
  }
  // 进度条
  /deep/ .el-progress-bar {
    width: 95%;
  }
  /deep/ .el-progress__text {
    margin-left: 20px;
  }
  .nav {
    width: 200px;
    height: 60px;
    background: #ffffff;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    width: 952px;
    height: 834px;
    background: #ffffff;
    border-radius: 4px;
    margin-top: 10px;
    .content-tab {
      height: 60px;
      box-shadow: 0px 4px 18px 0px rgba(136, 136, 136, 0.12);
      // 专项练习
      .zxlx {
        li {
          height: 105px;
          border-bottom: 1px solid #f5f5f5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          &.active {
            background: #f8f9f9;
            .special-text {
              .p1 {
                color: #18a5f2 !important;
              }
            }
            .special-r {
              width: 124px;
              height: 42px;
              background: #17a5f2;
              border-radius: 4px;
              color: #ffffff;
            }
          }
          .special-l {
            height: 44px;
            display: flex;
            .special-img {
              height: 44px;
              width: 38px;
              img {
                height: 44px;
                width: 38px;
              }
            }
            .special-text {
              margin-left: 20px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .p1 {
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
              }
              .p2 {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #999999;
              }
            }
          }
          .special-r {
            width: 124px;
            height: 42px;
            background: #ffffff;
            border: 1px solid #17a5f2;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #17a5f2;
          }
        }
      }
      // 章节练习
      .zjlx {
        padding: 30px;
        .totalQuestions {
          height: 38px;
          background: #f9f9f9;
          border-radius: 4px;
          padding: 20px;
          p {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #888888;
          }
        }
        .circulation {
          .one {
            height: 52px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .one-l {
              display: flex;
              align-items: center;
              img {
                &:hover {
                  cursor: pointer;
                }
              }
              span {
                margin-left: 13px;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #343434;
              }
            }
            .one-r {
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #343434;
              margin-right: 10px;
            }
          }
          .two {
            margin-left: 40px;
            .twoTitle {
              height: 52px;
              display: flex;
              align-items: center;
              img {
                &:hover {
                  cursor: pointer;
                }
              }
              // border-bottom: 1px solid #f5f5f5;
              span {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #343434;
                margin-left: 10px;
              }
            }
            ul {
              li {
                width: 836px;
                height: 52px;
                background: #f9f9f9;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-left: 20px;
                margin-bottom: 10px;
                .lastDo {
                  display: flex;
                  align-items: center;
                  span {
                    margin-right: 20px;
                  }
                  .btn {
                    width: 106px;
                    height: 36px;
                    background: #17a5f2;
                    border-radius: 4px;
                    border: none;
                    color: #ffffff;
                  }
                }
                .btn {
                  width: 106px;
                  height: 36px;
                  background: #f9f9f9;
                  border: 1px solid #17a5f2;
                  border-radius: 4px;
                  font-size: 16px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #17a5f2;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 8px;
                }
                &:hover {
                  background: #f2f6f8;
                  span {
                    color: #18a5f2;
                  }
                  cursor: pointer;
                }
                span {
                  font-size: 16px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #888888;
                }
              }
            }
          }
        }
      }
      // 历年真题
      .lnzt {
        li {
          height: 105px;
          border-bottom: 1px solid #f5f5f5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          .el-button:hover {
            background: none;
          }
          &:hover {
            cursor: pointer;
          }
          &.active {
            background: #f8f9f9;
            .special-text {
              .p1 {
                color: #18a5f2 !important;
              }
            }
            .special-r {
              width: 124px;
              height: 42px;
              background: #17a5f2;
              border-radius: 4px;
              color: #ffffff !important;
              border: none !important;
            }
            .watchAnalysis {
              color: #18a5f2 !important;
            }
          }
          .special-r {
            width: 124px;
            height: 42px;
            border: 1px solid #17a5f2;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #17a5f2;
          }
        }
        .special-l2 {
          height: 50px;
          display: flex;
          .special-img2 {
            height: 50px;
            width: 42px;
            img {
              height: 50px;
              width: 42px;
            }
          }
          .special-text {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .p1 {
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #333333;
            }
            .p2 {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #999999;
            }
          }
        }
      }
    }
  }
}
</style>
