<template>
  <div class="examInfo">
    <div class="breadcrumb">
      <img src="@/assets/images/examState/location.png" alt="" />
      <span>您当前的位置 > 首页 > </span>
      <span class="active">隐私条款</span>
    </div>
    <div class="content">
      <div class="text">
        <div class="text-t">
          <p>{{ info.title }}</p>
          <div class="timeBox">
            <div class="time">
              <!-- {{ info.createTime }} -->
            </div>
            <div class="fontSize">
              <img
                @click="shrink"
                src="@/assets/images/examState/shrink.png"
                alt=""
              />
              <span>字体大小</span>
              <img
                @click="enlarge"
                src="@/assets/images/examState/enlarge.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <!-- 正文 -->
        <div
          v-html="info.body"
          class="text-b"
          :style="`font-size: ${16 * stand}px;line-height: ${34 * stand}px;`"
        ></div>
      </div>
      <div class="advertisement">
        <!-- <div class="pic">
          <img src="@/assets/images/examState/onePic.png" alt="" />
        </div>
        <div class="pic">
          <img src="@/assets/images/examState/twoPic.png" alt="" />
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getHelp, getNewsInfo } from "@/api/examState/examState.js";
export default {
  name: "ExamInfo",
  data() {
    return {
      stand: 1,
      info: {}
    };
  },
  created() {
    //测试
    getNewsInfo({
      newsId: 44
    }).then(res => {
      this.info = res.data;
    });
    // getHelp({
    //   code: "yszc"
    // }).then(res => {
    //   console.log(res, "yszc");
    //   this.info = res.data.articleList[0];
    // });
  },
  methods: {
    // 字体缩小
    shrink() {
      if (this.stand <= 0.5) {
        return false;
      } else {
        this.stand = this.stand * 0.5;
      }
    },
    // 字体放大
    enlarge() {
      if (this.stand >= 2) {
        return false;
      } else {
        this.stand = this.stand * 2;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.examInfo {
  width: 1200px;
  margin: 0 auto;
  .breadcrumb {
    display: flex;
    align-items: center;
    height: 60px;
    img {
      margin-right: 6px;
    }
    span {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #888888;
      &.active {
        color: #333333;
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 56px;
    .text {
      width: 824px;
      // height: 940px;
      background: #ffffff;
      border-radius: 4px;
      padding: 0 30px;
      .text-t {
        height: 124px;
        border-bottom: 1px solid #ececec;
        overflow: hidden;
        p {
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          margin-top: 30px;
        }
        .timeBox {
          margin-top: 12px;
          display: flex;
          justify-content: space-between;
          .time {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
          }
          .fontSize {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            display: flex;
            align-items: center;
            img {
              &:hover {
                cursor: pointer;
              }
            }
            span {
              margin: 0 20px;
            }
          }
        }
      }
      .text-b {
        padding: 30px;

        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
        text-indent: 2em;
        /deep/ img {
          max-width: 200px !important;
          max-height: 200px !important;
        }
      }
    }
    .advertisement {
      width: 300px;
      .pic {
        width: 300px;
        height: 176px;
        border-radius: 4px;
        overflow: hidden;
        img {
          width: 300px;
          height: 176px;
        }
        &:nth-child(2) {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
