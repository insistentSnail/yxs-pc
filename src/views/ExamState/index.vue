<template>
  <div class="state">
    <div class="examState">
      <div class="examLeft">
        <div class="top">
          <el-carousel :autoplay="true" height="176px" arrow="never">
            <el-carousel-item v-for="item in bannerLists" :key="item.id">
              <img :src="item.pic" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="bottom">
          <div class="title">
            <div class="line"></div>
            <span>项目选择</span>
          </div>
          <ul>
            <li
              :class="index == proIndex ? 'active' : ''"
              @click="proCurrent(index)"
              v-for="(item, index) in proList"
              :key="index"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="examRight">
        <div class="title">
          <div class="line"></div>
          <span>考试资讯</span>
        </div>
        <ul>
          <li
            @click="intoInfo(item)"
            v-for="(item, index) in examList"
            :key="index"
          >
            <div class="li-l" style="width:80%">
              <!-- <span class="time">报名时间</span> -->
              <div class="list">
                <span class="hot">{{ item.title }}</span>
                <!-- <img src="@/assets/images/examState/hot.png" alt="" /> -->
              </div>
            </div>

            <span>{{ item.createTime.split(" ")[0] }}</span>
          </li>
        </ul>

        <!-- 分页 -->
        <el-pagination
          @current-change="examHandleCurrentChange"
          :current-page="examPagination.pageIndex"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="examPagination.totalRow"
          background
        >
        </el-pagination>
      </div>
    </div>
    <div class="industry">
      <div class="title">
        <div class="line"></div>
        <span>行业资讯</span>
      </div>
      <div class="content" v-if="newsList.length > 0">
        <div class="content-l">
          <div class="banner" @click="intoInfo(newsList[0])">
            <div class="mask">{{ newsList[0].title }}</div>
            <img :src="newsList[0].thumb" alt="" />
          </div>
          <ul>
            <li
              @click="intoInfo(item)"
              v-for="(item, index) in oneNewsList"
              :key="index"
            >
              <div class="pic">
                <img :src="item.thumb" alt="" />
              </div>
              <div class="text">
                <p class="p1">
                  {{ item.title }}
                </p>
                <p class="p2">
                  {{ item.brIfe }}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="content-r">
          <ul>
            <li
              @click="intoInfo(item)"
              v-for="(item, index) in twoNewsList"
              :key="index"
            >
              <div class="pic">
                <img :src="item.thumb" alt="" />
              </div>
              <div class="text">
                <p class="p1">
                  {{ item.title }}
                </p>
                <p class="p2">
                  {{ item.brIfe }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pagination.pageIndex"
        :page-size="9"
        layout="total, prev, pager, next"
        :total="pagination.totalRow"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getNavList,
  getBannerList,
  getArticleCategory,
  getNewsList,
  getExamList,
  getSimpleBanner
} from "@/api/examState/examState.js";
export default {
  name: "examState",
  data() {
    return {
      proList: [],
      bannerLists: [],
      proIndex: 0,
      newsList: [],
      oneNewsList: [],
      twoNewsList: [],
      // 分页数据
      pagination: {
        totalRow: 0,
        pageIndex: 1
      },
      // 考试资讯
      examList: [],
      // 考试资讯分页
      examPagination: {
        totalRow: 0,
        pageIndex: 1
      }
    };
  },
  async created() {
    this.proList = await getNavList().then(res => {
      return res.data;
    });
    // 轮播
    // getBannerList({
    //   code: this.proList[this.proIndex].code
    // }).then(res => {
    //   this.bannerLists = res.data;
    // });
    // 图片接口全部替换
    getSimpleBanner({
      ownner: 2,
      source: 2,
      code: this.proList[this.proIndex].code
    }).then(res => {
      this.bannerLists = res.data;
    });
    // 考试资讯
    getExamList({
      code: this.proList[this.proIndex].code + "-kszx",
      current: this.examPagination.pageIndex,
      size: 10
    }).then(res => {
      console.log("考试资讯", res);
      this.examPagination.totalRow = res.data.total;
      this.examList = res.data.records;
    });
    // 行业资讯
    getArticleCategory().then(res => {
      res.data.forEach(ele => {
        if (ele.code == this.proList[this.proIndex].code) {
          getNewsList({
            categoryId: ele.id,
            current: 1,
            size: 9
          }).then(res => {
            console.log("新闻列表", res);
            this.pagination.totalRow = res.data.total;
            this.newsList = res.data.records;
            this.oneNewsList = res.data.records.slice(1, 4);
            this.twoNewsList = res.data.records.slice(4);
          });
        }
      });
    });
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.pageIndex = val;
      this.proCurrent(this.proIndex);
    },
    examHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.examPagination.pageIndex = val;
      this.proCurrent(this.proIndex);
    },
    proCurrent(index) {
      this.proIndex = index;
      // 轮播
      // getBannerList({
      //   code: this.proList[this.proIndex].code
      // }).then(res => {
      //   this.bannerLists = res.data;
      // });
      getSimpleBanner({
        ownner: 2,
        source: 2,
        code: this.proList[this.proIndex].code
      }).then(res => {
        this.bannerLists = res.data;
      });
      // 考试资讯
      getExamList({
        code: this.proList[this.proIndex].code + "-kszx",
        current: this.examPagination.pageIndex,
        size: 10
      }).then(res => {
        console.log("考试资讯", res);
        this.examPagination.totalRow = res.data.total;
        this.examList = res.data.records;
      });
      // 行业资讯
      getArticleCategory().then(res => {
        res.data.forEach(ele => {
          if (ele.code == this.proList[this.proIndex].code) {
            getNewsList({
              categoryId: ele.id,
              current: this.pagination.pageIndex,
              size: 9
            }).then(res => {
              console.log("新闻列表", res);
              this.pagination.totalRow = res.data.total;
              this.newsList = res.data.records;
              this.oneNewsList = res.data.records.slice(1, 4);
              this.twoNewsList = res.data.records.slice(4);
            });
          }
        });
      });
    },
    // 跳转新闻详情
    intoInfo(item) {
      this.$router.push({
        name: "ExamInfo",
        query: {
          id: item.id
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.state {
  /deep/ .el-carousel__indicators--horizontal {
    width: 80%;
    display: flex;
    justify-content: center;
  }
  .examState {
    width: 1200px;
    margin: 30px auto;
    display: flex;
    justify-content: space-between;
    .examLeft {
      width: 300px;
      // height: 511px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top {
        height: 176px;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
        // element 轮播指示点样式
        /deep/ .el-carousel__button {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        img {
          width: 100%;
          height: 100%;
        }
        .my-swipe .van-swipe-item {
          color: #fff;
          font-size: 20px;
          line-height: 150px;
          text-align: center;
          background-color: #39a9ed;
        }
      }
      .bottom {
        // height: 278px;
        background: #fff;
        border-radius: 4px;
        padding: 24px;
        .title {
          display: flex;
          align-items: center;
          .line {
            width: 4px;
            height: 22px;
            background: #17a6f3;
            border-radius: 2px;
          }
          span {
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            margin-left: 16px;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li {
            margin-top: 16px;
            width: 118px;
            height: 34px;
            background: #f5f5f5;
            border-radius: 4px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #666666;
            line-height: 34px;
            text-align: center;
            &.active {
              background: #17a5f2;
              color: #ffffff;
            }
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .examRight {
      width: 842px;
      // height: 511px;
      background: #fff;
      border-radius: 4px;
      padding: 0 24px;
      // 分页器
      .el-pagination {
        padding: 25px 0px;
        text-align: right;
      }
      .title {
        display: flex;
        align-items: center;
        padding: 20px 0px;
        border-bottom: 1px solid #ececec;
        .line {
          width: 4px;
          height: 22px;
          background: #17a6f3;
          border-radius: 2px;
        }
        span {
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          margin-left: 16px;
        }
      }
      ul {
        li {
          margin-top: 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            position: relative;
            &.time::after {
              content: "";
              display: block;
              width: 1px;
              height: 14px;
              background: #ececec;
              border-radius: 1px;
              position: absolute;
              right: -15px;
              top: 4px;
            }
          }
          .li-l {
            display: flex;
            align-items: center;
            .list {
              display: flex;
              align-items: center;
              margin-left: 30px;
              span {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                display: block;
                width: 600px;
                &.hot {
                  width: auto;
                  // font-weight: bold;
                }
                &:hover {
                  cursor: pointer;
                  color: #17a6f3;
                }
              }
              img {
                margin-left: 8px;
              }
            }
          }
        }
      }
    }
  }
  .industry {
    width: 1152px;
    // height: 630px;
    background: #ffffff;
    border-radius: 4px;
    margin: 0px auto 100px;
    padding: 0 24px 10px;
    // 分页器
    .el-pagination {
      padding: 15px 5px;
      text-align: right;
    }
    .title {
      display: flex;
      align-items: center;
      padding: 20px 0px;
      border-bottom: 1px solid #ececec;
      .line {
        width: 4px;
        height: 22px;
        background: #17a6f3;
        border-radius: 2px;
      }
      span {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        margin-left: 16px;
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      .content-l {
        width: 554px;
        margin-top: 20px;
        .banner {
          width: 554px;
          height: 254px;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          &:hover {
            cursor: pointer;
          }
          .mask {
            width: 554px;
            height: 40px;
            background: rgba(34, 34, 34, 0.62);
            // opacity: 0.62;//opacity会被子元素继承
            border-radius: 0px 0px 4px 4px;
            position: absolute;
            bottom: 0;
            text-indent: 20px;
            line-height: 40px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
          }
          img {
            width: 554px;
            height: 254px;
          }
        }
        ul {
          li {
            display: flex;
            height: 136px;
            align-items: center;
            border-bottom: 1px solid #ececec;
            &:hover {
              cursor: pointer;
            }
            .pic {
              margin-right: 16px;
              width: 144px;
              height: 96px;
              border-radius: 4px;
              overflow: hidden;
              img {
                width: 144px;
                height: 96px;
              }
            }
            .text {
              width: 388px;
              .p1 {
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .p2 {
                margin-top: 15px;
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #888888;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
            }
          }
        }
      }
      .content-r {
        width: 554px;
        ul {
          li {
            display: flex;
            height: 136px;
            align-items: center;
            border-bottom: 1px solid #ececec;
            &:hover {
              cursor: pointer;
            }
            .pic {
              margin-right: 16px;
              width: 144px;
              height: 96px;
              border-radius: 4px;
              overflow: hidden;
              img {
                width: 144px;
                height: 96px;
              }
            }
            .text {
              width: 388px;
              .p1 {
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .p2 {
                margin-top: 15px;
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #888888;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
}
</style>
