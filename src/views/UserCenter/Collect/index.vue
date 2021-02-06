<template>
  <div class="userCenterCollect">
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="错题集" name="first">
          <div class="questionType">
            <ul>
              <li
                :class="currentTypeIndex == 0 ? 'active' : ''"
                @click="currentType(0)"
              >
                <div class="type-l">
                  <img src="@/assets/images/userCenter/errorLnzt.png" alt="" />
                </div>
                <div class="type-r">
                  <p class="p1">历年真题</p>
                  <p class="p2">共{{ lnzt }}道错题</p>
                </div>
              </li>

              <li
                :class="currentTypeIndex == 1 ? 'active' : ''"
                @click="currentType(1)"
              >
                <div class="type-l">
                  <img src="@/assets/images/userCenter/errorMnzt.png" alt="" />
                </div>
                <div class="type-r">
                  <p class="p1">模拟真题</p>
                  <p class="p2">共{{ mnzt }}道错题</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="contentList">
            <ul>
              <li
                :class="contentListIndex == index ? 'active' : ''"
                @click="contentList(index)"
                v-for="(item, index) in chapterList"
                :key="index"
              >
                <div class="contentList-l">
                  <p class="p1">
                    {{ item.courseName }}
                  </p>
                  <p class="p2">共{{ item.amount }}道错题</p>
                </div>
                <div class="contentList-r">
                  <!-- <el-button class="reDo">查看</el-button> -->
                  <el-button class="watch" @click="routerToError(item)"
                    >错题重做</el-button
                  >
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏题目" name="second">
          <div class="questionType">
            <ul>
              <li
                :class="currentTypeIndex2 == index ? 'active' : ''"
                v-for="(item, index) in questionTypeList2"
                :key="index"
                @click="currentType2(index)"
              >
                <div class="type-l">
                  <img src="@/assets/images/userCenter/lnzt.png" alt="" />
                </div>
                <div class="type-r">
                  <p class="p1 p3">{{ item.name }}</p>
                  <p class="p2">共错8道题</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="contentList">
            <ul>
              <li
                :class="contentListIndex2 == index ? 'active' : ''"
                @click="contentList2(index)"
                v-for="(item, index) in [1, 2]"
                :key="index"
              >
                <div class="contentList-l">
                  <p class="p1">
                    [章节练习]2020 《中药学专业知识（二）》基础精讲
                  </p>
                  <p class="p2">收藏8道题</p>
                </div>
                <div class="contentList-r">
                  <el-button class="reDo">查看</el-button>
                  <el-button class="watch removeCollect">移除收藏</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getTabList } from "@/api/home/home.js";
import { examError, practiceError } from "@/api/userCenter/userCenter.js";
export default {
  name: "UserCenterExercise",
  data() {
    return {
      proLists: [],
      activePro: "",
      activeName: "first",
      // 错题
      currentTypeIndex: 0,
      // 收藏
      questionTypeList2: [
        {
          name: "历年真题"
        },
        {
          name: "模拟真题"
        }
      ],
      currentTypeIndex2: 0,
      contentListIndex: null,
      contentListIndex2: null,
      lnzt: "",
      mnzt: "",
      chapterList: [],
      handleIndex: 0
    };
  },
  async created() {
    this.proLists = await getTabList().then(res => {
      return res.data;
    });
    this.activePro = this.proLists[0].name;

    examError({
      code: this.proLists[0].code
    }).then(res => {
      this.lnzt = res.data.lnzt;
      this.mnzt = res.data.mnzt;
    });

    practiceError({
      code: this.proLists[0].code
    }).then(res => {
      this.chapterList = res.data.records;
    });
  },
  methods: {
    handleCommand(i) {
      this.handleIndex = i;
      // alert(i);
      this.activePro = this.proLists[i].name;
      examError({
        code: this.proLists[i].code
      }).then(res => {
        this.lnzt = res.data.lnzt;
        this.mnzt = res.data.mnzt;
      });

      practiceError({
        code: this.proLists[i].code
      }).then(res => {
        this.chapterList = res.data.records;
      });
      // this.recentlyCourse(this.proLists[i].code);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 错题
    currentType(index) {
      this.currentTypeIndex = index;
      this.$router.push({
        name: "ErrorQuestion",
        query: {
          questionFrom: index,
          courseId: "",
          code: this.proLists[this.handleIndex].code,
          name: this.proLists[this.handleIndex].name
        }
      });
    },
    routerToError(item) {
      this.$router.push({
        name: "ErrorQuestion",
        query: {
          questionFrom: 2,
          courseId: item.courseId,
          code: this.proLists[this.handleIndex].code,
          name: this.proLists[this.handleIndex].name,
          courseName: item.courseName
        }
      });
    },
    // 收藏
    currentType2(index) {
      this.currentTypeIndex2 = index;
    },
    // 错题
    contentList(index) {
      this.contentListIndex = index;
    },
    // 收藏
    contentList2(index) {
      this.contentListIndex2 = index;
    }
  }
};
</script>
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
.userCenterCollect {
  background: #f0f0f0;
  // tab切换
  /deep/ .el-tabs__nav {
    height: 60px;
    width: 100%;
  }
  /deep/ .el-tabs__item {
    width: 15%;
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
    padding: 0 28px;
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
    .questionType {
      padding: 0 30px;
      margin-top: 24px;
      ul {
        display: flex;
        align-items: center;
        li {
          width: 220px;
          height: 94px;
          background: #f8f8f8;
          border-radius: 6px;
          display: flex;
          align-items: center;
          margin-right: 10px;
          &:hover {
            cursor: pointer;
          }
          &.active {
            width: 220px;
            height: 94px;
            background: #ffffff;
            box-shadow: 1px 4px 20px 0px rgba(176, 176, 176, 0.26);
            border-radius: 6px;
            margin-top: -10px;
            .type-r {
              .p1 {
                color: #e7665e;
                &.p3 {
                  color: #18a5f2;
                }
              }
            }
          }
          .type-l {
            width: 68px;
            height: 68px;
            background: #ffffff;
            box-shadow: 1px 2px 16px 0px rgba(176, 176, 176, 0.12);
            border-radius: 28px;
            margin-left: 24px;
            margin-right: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          .type-r {
            .p1 {
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #343434;
            }
            .p2 {
              margin-top: 8px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #9a9a9a;
            }
          }
        }
      }
    }
    .contentList {
      margin-top: 10px;
      ul {
        li {
          height: 105px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: relative;
          &.active {
            background: #f8f9f9;
            .contentList-l {
              .p1 {
                color: #18a5f2;
              }
            }
            .contentList-r {
              .reDo {
                background: #18a6f2;
                color: #fff;
                &:hover,
                &:focus {
                  background: #18a6f2;
                }
              }
            }
          }
          &::after {
            content: "";
            width: 896px;
            height: 1px;
            background: #ececec;
            border-radius: 1px;
            bottom: 0;
            position: absolute;
          }
          // border-bottom: 1px solid #ececec;
          .contentList-l {
            .p1 {
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #343434;
            }
            .p2 {
              margin-top: 10px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #9a9a9a;
            }
          }
          .contentList-r {
            .watch {
              width: 112px;
              height: 42px;
              border: 1px solid #48ae76;
              border-radius: 4px;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #48ae76;
              &.removeCollect {
                color: #ffaa00;
                border: 1px solid #ffaa00;
              }
              &:hover,
              &:focus {
                background: none;
              }
            }
            .reDo {
              width: 112px;
              height: 42px;
              border: 1px solid #18a6f2;
              border-radius: 4px;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #18a5f2;
              &:hover,
              &:focus {
                background: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
