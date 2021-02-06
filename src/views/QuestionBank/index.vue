<template>
  <div class="questionBank">
    <div class="nav">
      <ul>
        <li
          :class="currentIndex == index ? 'active' : ''"
          v-for="(item, index) in navList"
          :key="index"
          @click="current(index)"
        >
          {{ item.name }} <span v-if="index != navList.length - 1">|</span>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="content-t">
        <ul>
          <li
            :class="questionTypeIndex == index ? 'questionType' : ''"
            v-for="(item, index) in questionType"
            :key="index"
            @click="currentType(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- 专项练习 -->
      <div class="specialPractice" v-if="questionTypeIndex == 0">
        <div v-if="specialLists.length > 0">
          <ul>
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
                    <!-- <span>0人参与</span>
                    <span style="margin-left:40px"
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
          <!-- <div class="showMore" v-if="specialLists.length > 0">
            <span>查看更多</span>
            <img src="@/assets/images/questionBank/more.png" alt="" />
          </div> -->
        </div>

        <!-- 无数据 -->
        <div v-else class="nodata">
          <img src="@/assets/images/userCenter/noData.png" alt="" />
          <p class="nodataText">暂无数据</p>
        </div>
      </div>

      <!-- 章节练习 -->
      <div class="chapterPractice" v-if="questionTypeIndex == 1">
        <div v-if="chapterList.length > 0">
          <div
            class="circulation"
            v-for="item in chapterList"
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
          <!-- <div
            class="showMore"
            v-if="chapterList.length > 0"
            @click="chapterWatch"
          >
            <span>查看更多</span>
            <img src="@/assets/images/questionBank/more.png" alt="" />
          </div> -->
        </div>
        <!-- 无数据 -->
        <div v-else class="nodata">
          <img src="@/assets/images/userCenter/noData.png" alt="" />
          <p class="nodataText">暂无数据</p>
        </div>
      </div>

      <!-- 历年真题 -->
      <div class="specialPractice" v-if="questionTypeIndex == 2">
        <div v-if="previousList.length > 0">
          <ul>
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
                  style="background: #FFA900;border-color:#FFA900"
                  @click="openExamDialog(item)"
                  class="special-r"
                >
                  继续考试</el-button
                >
              </div>
              <!-- <el-button
                class="special-r"
                style="background: #FFA900;border-color:#FFA900"
                v-if="item.takeTestStatus == 0"
                @click="openExamDialog(item)"
                >继续考试</el-button
              >
              <el-button class="special-r" v-else @click="openExamDialog(item)"
                >开始考试</el-button
              > -->
            </li>
          </ul>
          <!-- <div class="showMore" v-if="previousList.length > 0">
            <span>查看更多</span>
            <img src="@/assets/images/questionBank/more.png" alt="" />
          </div> -->
        </div>

        <!-- 无数据 -->
        <div v-else class="nodata">
          <img src="@/assets/images/userCenter/noData.png" alt="" />
          <p class="nodataText">暂无数据</p>
        </div>
      </div>

      <!-- 模拟真题 -->
      <div class="specialPractice" v-if="questionTypeIndex == 3">
        <div v-if="simulateList.length > 0">
          <ul>
            <li
              :class="simulateIndex == index ? 'active' : ''"
              v-for="(item, index) in simulateList"
              :key="index"
              @click="simulateQuestion(index)"
            >
              <div class="special-l3">
                <div class="special-img3">
                  <img src="@/assets/images/questionBank/mnzt.png" alt="" />
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
                  style="background: #FFA900;border-color:#FFA900"
                  @click="openExamDialog(item)"
                  class="special-r"
                >
                  继续考试</el-button
                >
              </div>
              <!-- <el-button
                class="special-r"
                style="background: #FFA900;border-color:#FFA900"
                v-if="item.takeTestStatus == 0"
                @click="openExamDialog(item)"
                >继续考试</el-button
              >
              <el-button class="special-r" v-else @click="openExamDialog(item)"
                >开始考试</el-button
              > -->
            </li>
          </ul>
          <!-- <div class="showMore" v-if="simulateList.length > 0">
            <span>查看更多</span>
            <img src="@/assets/images/questionBank/more.png" alt="" />
          </div> -->
        </div>

        <!-- 无数据 -->
        <div v-else class="nodata">
          <img src="@/assets/images/userCenter/noData.png" alt="" />
          <p class="nodataText">暂无数据</p>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pagination.pageIndex"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="pagination.totalRow"
        background
      >
      </el-pagination>
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
  name: "QuestionBank",
  data() {
    return {
      navList: [],
      currentIndex: 0,
      questionType: ["专项练习", "章节练习", "历年真题", "模拟真题"],
      questionTypeIndex: 0,
      questionIndex: null, //专项练习
      previousIndex: null, //历年真题
      simulateIndex: null, //模拟真题
      //专项练习
      specialLists: [],
      // 章节练习
      chapterList: [],
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
      // 分页数据
      pagination: {
        totalRow: 0,
        pageIndex: 1
      }
    };
  },
  async created() {
    this.navList = await getTabList().then(res => {
      return res.data;
    });
    this.current(0);
    // this.chapterCurrent = 1; //章节练习第一页
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.pageIndex = val;
      this.current(this.currentIndex, true);
    },
    current(index, app) {
      if (app) {
      } else {
        this.pagination.pageIndex = 1;
      }
      this.currentIndex = index;
      if (this.questionTypeIndex == 0 || this.questionTypeIndex == 1) {
        // 章节练习和专项练习
        chapterList({
          code: this.navList[index].code,
          current: this.pagination.pageIndex,
          size: 10
        }).then(res => {
          res.data.records.forEach(ele => {
            ele.open = false;
          });
          this.chapterList = res.data.records; //章节练习
          this.change1(this.chapterList[0]);
          this.specialLists = res.data.records; //专项练习
          this.pagination.totalRow = res.data.total;
        });
      }
      if (this.questionTypeIndex == 2) {
        // 历年真题
        examList({
          code: this.navList[index].code,
          current: this.pagination.pageIndex,
          size: 10,
          type: 0
        }).then(res => {
          // 历年真题
          this.previousList = res.data.records;
          this.pagination.totalRow = res.data.total;
        });
      }

      if (this.questionTypeIndex == 3) {
        // 模拟真题
        examList({
          code: this.navList[index].code,
          current: this.pagination.pageIndex,
          size: 10,
          type: 1
        }).then(res => {
          // 模拟真题
          this.simulateList = res.data.records;
          this.pagination.totalRow = res.data.total;
        });
      }
    },
    // // 章节练习查看更多
    // chapterWatch() {
    //   var maxCurrent = Math.ceil(this.total / 10);
    //   if (this.chapterCurrent < maxCurrent) {
    //     this.chapterCurrent++;
    //   }
    //   chapterList({
    //     code: this.navList[this.currentIndex].code,
    //     current: this.chapterCurrent,
    //     size: 20
    //   }).then(res => {
    //     res.data.records.forEach(ele => {
    //       ele.open = false;
    //     });
    //     this.chapterList = this.chapterList.concat(res.data.records);
    //   });
    // },
    // 题目类型
    currentType(index) {
      this.questionTypeIndex = index;
      this.pagination.pageIndex = 1;
      this.current(this.currentIndex);
    },
    // 专项练习
    currentQuestion(index) {
      this.questionIndex = index;
      specialList({
        courseId: this.chapterList[index].courseId
      }).then(res => {
        res.data.questionTypeList.unshift({ id: "0", name: "全部" });
        this.txChooseList = res.data.questionTypeList;
        this.numberChooseList = res.data.questionNumList;
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
          name: this.navList[this.currentIndex].name,
          type: this.questionType[this.questionTypeIndex]
        }
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
          name: this.navList[this.currentIndex].name
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
    // 折叠面板
    change1(item) {
      if (!item.open) {
        // 点开其他没有展开的项则关闭所有展开的项，再展开该项
        this.chapterList.forEach(ele => {
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
          name: this.navList[this.currentIndex].name
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
          name: this.navList[this.currentIndex].name,
          title: this.examItem.title,
          type: this.questionType[this.questionTypeIndex]
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
.el-pagination {
  padding: 25px 40px;
}
</style>
<style lang="scss" scoped>
.questionBank {
  .watchAnalysis {
    &:hover {
      cursor: pointer;
    }
  }
  // 专项练习弹窗
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
  .nav {
    width: 1140px;
    // height: 72px;
    margin: 30px auto 20px;
    background: #fff;
    padding: 15px 30px;
    border-radius: 4px;
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      height: 100%;
      li {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #343434;
        &.active {
          color: #18a6f3;
        }
        &:hover {
          cursor: pointer;
        }
        span {
          font-size: 18px;
          margin: 0 25px;
          color: #e4e4e4;
        }
      }
    }
  }
  .content {
    width: 1200px;
    // height: 982px;
    margin: 0 auto 96px;
    background: #ffffff;
    border-radius: 4px;
    .content-t {
      height: 72px;
      display: flex;
      align-items: center;
      box-shadow: 1px 8px 20px 0px rgba(136, 136, 136, 0.08);
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        li {
          width: 25%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          position: relative;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #343434;
          &:hover {
            cursor: pointer;
          }
          &.questionType {
            color: #18a5f2;
          }
          &.questionType::after {
            content: "";
            width: 100%;
            bottom: 0;
            left: 0;
            height: 4px;
            background: #18a6f2;
            position: absolute;
          }
        }
      }
    }
    // 专项练习
    .specialPractice {
      padding: 0 16px;
      overflow: hidden;
      ul {
        li {
          height: 128px;
          border-bottom: 1px solid #f5f5f5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          border-radius: 6px;
          &.active {
            background: #f8f9f9;
            .special-text {
              .p1 {
                color: #18a5f2 !important;
              }
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
          // 历年真题
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

          // 模拟真题
          .special-l3 {
            height: 48px;
            display: flex;
            .special-img3 {
              height: 48px;
              width: 42px;
              img {
                height: 48px;
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

          .special-r {
            width: 124px;
            height: 42px;
            background: #18a6f2;
            border-radius: 4px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
      .showMore {
        margin: 60px auto 40px;
        width: 150px;
        height: 42px;
        border: 1px solid #18a6f2;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #18a5f2;
        &:hover {
          cursor: pointer;
        }
        span {
          margin-right: 14px;
        }
      }
    }
    // 章节练习
    .chapterPractice {
      padding: 35px 22px;
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
              width: 1086px;
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
                width: 104px;
                height: 34px;
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
      .showMore {
        margin: 60px auto 0px;
        width: 150px;
        height: 42px;
        border: 1px solid #18a6f2;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #18a5f2;
        &:hover {
          cursor: pointer;
        }
        span {
          margin-right: 14px;
        }
      }
    }
  }
}
</style>
