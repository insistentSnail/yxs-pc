<template>
  <div class="guide">
    <div class="advertisement" v-if="topImg">
      <img :src="topImg" alt="" />
    </div>
    <div class="flow">
      <!-- <ul>
        <li>
          <img src="@/assets/images/guide/one.png" alt="" />
          <div class="text">发布考试大纲</div>
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <img src="@/assets/images/guide/arrow.png" alt="" />
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </li>
        <li>
          <img src="@/assets/images/guide/two.png" alt="" />
          <div class="text">考试报名</div>
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <img src="@/assets/images/guide/arrow.png" alt="" />
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </li>
        <li>
          <img src="@/assets/images/guide/three.png" alt="" />
          <div class="text">准考证打印</div>
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <img src="@/assets/images/guide/arrow.png" alt="" />
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </li>
        <li>
          <img src="@/assets/images/guide/four.png" alt="" />
          <div class="text">技能考试时间</div>
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <img src="@/assets/images/guide/arrow.png" alt="" />
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </li>
        <li>
          <img src="@/assets/images/guide/five.png" alt="" />
          <div class="text">笔试考试时间</div>
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <img src="@/assets/images/guide/arrow.png" alt="" />
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </li>
        <li>
          <img src="@/assets/images/guide/six.png" alt="" />
          <div class="text">考试成绩</div>
        </li>
      </ul> -->
      <img class="centerImg" :src="centerImg" alt="" />
    </div>
    <div class="content">
      <div class="nav">
        <ul>
          <li
            @click="navCurrent(index)"
            :class="index == activeIndex ? 'active' : ''"
            v-for="(item, index) in navList"
            :key="index"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <!-- 主体内容 -->
      <div v-for="(item, index) in navList" :key="index">
        <div class="content-c" v-if="activeIndex == index">
          <div v-html="item.content || item.about"></div>
          <ul v-if="item.fileList" class="fileList">
            <li v-for="(ele, idx) in JSON.parse(item.fileList)" :key="idx">
              <div class="text">
                <img src="@/assets/images/guide/zip.png" alt="" />
                <span>{{ ele.name }}</span>
              </div>
              <a class="btn" :href="ele.url">
                下载
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="content-r">
        <p>项目选择</p>
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
        <div class="pic" v-for="(item, index) in bottomBanner" :key="index">
          <img :src="item.pic" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getNavList,
  examOutline,
  getSimpleBanner
} from "@/api/examState/examState.js";
export default {
  name: "Guide",
  data() {
    return {
      navList: [],
      activeIndex: 0,
      proList: [],
      proIndex: 0,
      // 底部图片
      bottomBanner: [],
      topImg: "",
      centerImg: ""
    };
  },
  async created() {
    this.activeIndex = this.$route.query.active;
    this.proList = await getNavList().then(res => {
      return res.data;
    });
    examOutline({
      code: this.proList[0].code
    }).then(res => {
      this.navList = JSON.parse(res.data);
      this.navList[this.navList.length - 1].title = "考试大纲";
      var arr = this.navList[this.navList.length - 1];
      this.navList.splice(-1, 1);
      this.navList.splice(1, 0, arr);
      console.log(this.navList, 555);
      this.centerImg = this.navList[this.navList.length - 1].pcPicture;
    });
    // 底部图片
    getSimpleBanner({
      ownner: 3,
      source: 2,
      bannerPosition: 3
    }).then(res => {
      this.bottomBanner = res.data;
    });
    getSimpleBanner({
      ownner: 3,
      source: 2,
      bannerPosition: 1
    }).then(res => {
      console.log(res, "顶部图片");
      this.topImg = res.data[0].pic;
    });
    // getSimpleBanner({
    //   ownner: 3,
    //   source: 2,
    //   bannerPosition: 2
    // }).then(res => {
    //   console.log(res, "中间图片");
    //   this.centerImg = res.data[0].pic;
    // });
  },
  methods: {
    navCurrent(index) {
      this.activeIndex = index;
    },
    proCurrent(index) {
      this.proIndex = index;
      examOutline({
        code: this.proList[index].code
      }).then(res => {
        this.navList = JSON.parse(res.data);
        this.navList[this.navList.length - 1].title = "考试大纲";
        var arr = this.navList[this.navList.length - 1];
        this.navList.splice(-1, 1);
        this.navList.splice(1, 0, arr);
        console.log(this.navList, 555);
        this.centerImg = this.navList[this.navList.length - 1].pcPicture;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.guide {
  width: 1200px;
  margin: 0 auto;
  .advertisement {
    width: 1200px;
    height: 120px;
    margin: 24px 0;
    border-radius: 4px;
    overflow: hidden;
    img {
      width: 1200px;
      height: 120px;
    }
  }
  .flow {
    width: 1200px;
    height: 183px;
    background: #ffffff;
    border-radius: 6px;
    margin-bottom: 10px;
    .centerImg {
      width: 1200px;
      height: 183px;
    }
    ul {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      li {
        width: 110px;
        text-align: center;
        position: relative;
        .text {
          margin-top: 20px;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 300;
          color: #333333;
        }
        .dots {
          top: 20px;
          right: -104px;
          height: 20px;
          display: flex;
          position: absolute;
          align-items: center;
          .dot {
            width: 6px;
            height: 6px;
            background: #dddddd;
            border-radius: 50%;
            margin-right: 14px;
          }
          img {
            margin-right: 14px;
          }
        }
      }
    }
  }
  .content {
    width: 1200px;
    // height: 910px;
    padding-bottom: 20px;
    background: #ffffff;
    border-radius: 6px;
    margin-bottom: 100px;
    overflow: hidden;
    display: flex;
    .nav {
      width: 168px;
      margin-top: 28px;
      ul {
        li {
          width: 159px;
          height: 72px;
          border-right: 1px solid #e9e9e9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          &:hover {
            cursor: pointer;
          }
          &.active {
            color: #ffffff;
            border-right: none;
            width: 168px;
            background: url("../../assets/images/guide/active.png") no-repeat;
          }
        }
      }
    }
    .content-c {
      width: 660px;
      // border: 1px solid #000;
      margin-left: 50px;
      margin-top: 36px;
      p {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        line-height: 45px;
      }
      div {
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #656565;
        line-height: 32px;
      }
    }
    .fileList {
      li {
        margin: 15px 0px;
        width: 632px;
        height: 63px;
        background: #f7f8f9;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        .text {
          display: flex;
          align-items: center;
          span {
            margin-left: 16px;
            font-size: 15px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
        }
        .btn {
          display: block;
          width: 88px;
          height: 34px;
          background: #17a5f2;
          border-radius: 4px;
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          line-height: 34px;
        }
      }
    }
    .content-r {
      width: 228px;
      margin-left: 50px;
      margin-top: 40px;
      p {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          margin-top: 16px;
          width: 110px;
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
      .pic {
        width: 228px;
        height: 127px;
        border-radius: 4px;
        overflow: hidden;
        margin-top: 16px;
        img {
          width: 228px;
          height: 127px;
        }
      }
    }
  }
}
</style>
