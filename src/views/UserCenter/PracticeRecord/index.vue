<template>
  <div class="userCenterPracticeRecord">
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
      <div class="content-c">
        <div class="title">
          <div class="title-l">
            <img src="@/assets/images/userCenter/titleSign.png" alt="" />
            <span>做题记录</span>
          </div>
          <div class="title-r">
            <img src="@/assets/images/questionBank/remove.png" alt="" />
            <span style="margin-left:8px">清空记录</span>
          </div>
        </div>
        <ul>
          <li @click="current(0)" :class="currentIndex == 0 ? 'active' : ''">
            <div class="cont-l">
              <p>[章节练习] 第1章 第3小节 药学专业知识概论</p>
              <p>
                <span>2020-08-09 12:30:03</span>
                <span style="margin-left:18px">总12题 / 对2题</span>
              </p>
            </div>
            <div class="cont-r">
              <span>查看解析</span>
              <el-button class="continue">重新答题</el-button>
            </div>
          </li>

          <li @click="current(1)" :class="currentIndex == 1 ? 'active' : ''">
            <div class="cont-l">
              <p>[章节练习] 第1章 第3小节 药学专业知识概论</p>
              <p>
                <span>2020-08-09 12:30:03</span>
                <span style="margin-left:18px">总12题 / 对2题</span>
              </p>
            </div>
            <div class="cont-r">
              <el-button class="reContinue">继续做题</el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getTabList } from "@/api/home/home.js";
export default {
  name: "UserCenterPracticeRecord",
  data() {
    return {
      proLists: [],
      activePro: "",
      currentIndex: null
    };
  },
  async created() {
    this.proLists = await getTabList().then(res => {
      return res.data;
    });
    this.activePro = this.proLists[0].name;
  },
  methods: {
    handleCommand(i) {
      // alert(i);
      this.activePro = this.proLists[i].name;
      // this.recentlyCourse(this.proLists[i].code);
    },
    current(index) {
      this.currentIndex = index;
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
.userCenterPracticeRecord {
  background: #f0f0f0;
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
    border-radius: 6px;
    margin-top: 10px;
    // padding: 0 28px;
    .content-c {
      .title {
        padding: 0 28px;
        height: 74px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ececec;
        .title-l {
          display: flex;
          align-items: center;
          span {
            margin-left: 10px;
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #343434;
          }
        }
        .title-r {
          display: flex;
          align-items: center;
          &:hover {
            cursor: pointer;
          }
          span {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #9a9a9a;
          }
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
  }
}
</style>
