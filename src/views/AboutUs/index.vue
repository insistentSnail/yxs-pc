<template>
  <div class="aboutUs">
    <div id="nav-l">
      <ul>
        <li
          @click="currentNav(index)"
          :class="index == navIndex ? 'active' : ''"
          v-for="(item, index) in navLists"
          :key="index"
        >
          <!-- <a :href="'#nav' + index"> {{ item }}</a> -->
          <span @click="navTo('#nav' + index)">{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="banner"></div>
    <div class="nav">您的位置：首页 > <span>关于我们</span></div>
    <div class="content">
      <div style="width:160px"></div>
      <!-- <div class="nav-l">
        <ul>
          <li
            @click="currentNav(index)"
            :class="index == navIndex ? 'active' : ''"
            v-for="(item, index) in navLists"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div> -->
      <div class="nav-r">
        <div class="title" id="nav0">
          <div class="line"></div>
          {{ aboutInfo.name }}
        </div>

        <!-- <div class="con">
          <div class="con-t">
            <div class="dot">
              <img src="@/assets/images/aboutUs/dot.png" alt="" />
            </div>
            <span>机构简称</span>
          </div>
          <p>{{ aboutInfo.name }}</p>
        </div> -->

        <div class="con" id="nav1">
          <div class="con-t">
            <div class="dot">
              <img src="@/assets/images/aboutUs/dot.png" alt="" />
            </div>
            <span>机构简介</span>
          </div>
          <p v-html="aboutInfo.introduce"></p>
        </div>
        <!-- 轮播 -->
        <div class="con" id="nav2">
          <div class="con-t">
            <div class="dot">
              <img src="@/assets/images/aboutUs/dot.png" alt="" />
            </div>
            <span>机构风采</span>
          </div>
          <div class="bannerList" v-if="bannerList.length > 0">
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide v-for="(item, index) in bannerList" :key="index">
                <div class="imgBox" @click="big(item.pic)">
                  <el-image class="swiperImg" :src="item.pic"></el-image>
                  <span>{{ item.name }}</span>
                  <div class="mask">
                    <div class="box">
                      <img src="@/assets/images/aboutUs/bigger.png" alt="" />
                      <span> 点击图片看大图</span>
                    </div>
                  </div>
                </div>
              </swiper-slide>
              <!-- 分页器 -->
              <!-- <div class="swiper-pagination"  slot="pagination"></div>    -->
              <!-- 左右箭头 -->
              <!-- <div class="swiper-button-prev" slot="button-prev"></div> 
            <div class="swiper-button-next" slot="button-next"></div>  -->
            </swiper>
            <div
              :class="swiperIndex == 0 ? 'btn-prev' : 'btn-prev active'"
              @click="prev"
            >
              <img src="@/assets/images/aboutUs/toLeft.png" alt="" />
            </div>
            <div
              :class="
                swiperIndex == bannerList.length - 3
                  ? 'btn-next active'
                  : 'btn-next'
              "
              @click="next"
            >
              <img src="@/assets/images/aboutUs/toRight.png" alt="" />
            </div>
          </div>
        </div>

        <div class="con" id="nav3">
          <div class="con-t">
            <div class="dot">
              <img src="@/assets/images/aboutUs/dot.png" alt="" />
            </div>
            <span>联系电话</span>
          </div>
          <p>
            {{ aboutInfo.telephone }}
          </p>
        </div>

        <div class="con" id="nav4">
          <div class="con-t">
            <div class="dot">
              <img src="@/assets/images/aboutUs/dot.png" alt="" />
            </div>
            <span>联系地址</span>
          </div>
          <p>
            {{ aboutInfo.address }}
          </p>
        </div>

        <!-- <div class="con" id="nav5">
          <div class="con-t">
            <div class="dot">
              <img src="@/assets/images/aboutUs/dot.png" alt="" />
            </div>
            <span>所在区域</span>
          </div>
          <p>{{ aboutInfo.provinceName }}{{ aboutInfo.cityName }}</p>
        </div> -->
      </div>
    </div>

    <div class="bigMask" @click="close">
      <img style="width:858px;height:540px" :src="bigImg" alt="" />
    </div>
  </div>
</template>
<script>
import { getTenantInfo } from "@/api/aboutUs/aboutUs.js";
import { getSimpleBanner } from "@/api/examState/examState.js";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
export default {
  name: "AboutUs",
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  data() {
    return {
      navLists: ["机构简称", "机构简介", "机构风采", "联系电话", "联系地址"],
      navIndex: 0,
      // 轮播下标
      swiperIndex: 0,
      swiperOptions: {
        slidesPerView: 3,
        // 获取当前下标
        on: {
          slideChangeTransitionEnd: () => {
            this.swiperIndex = this.$refs.mySwiper.$swiper.activeIndex;
            console.log(this.$refs.mySwiper.$swiper.activeIndex); //切换结束时，告诉我现在是第几个slide
          }
        }
      },
      aboutInfo: {},
      bannerList: [],
      bigImg: ""
    };
  },
  updated() {
    window.onscroll = function() {
      //为了保证兼容性，这里取两个值，哪个有值取哪一个
      //scrollTop就是触发滚轮事件时滚轮的高度
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= 300 && scrollTop < 600) {
        if (document.querySelector("#nav-l")) {
          document.querySelector("#nav-l").style.top = "300px";
        }
      } else if (scrollTop >= 600) {
        if (document.querySelector("#nav-l")) {
          document.querySelector("#nav-l").style.top = "50px";
        }
      } else {
        if (document.querySelector("#nav-l")) {
          document.querySelector("#nav-l").style.top = "660px";
        }
      }
    };
  },
  created() {
    getTenantInfo().then(res => {
      console.log(res, "关于我们");
      this.aboutInfo = res.data;
    });
    getSimpleBanner({
      ownner: 4,
      source: 2
      // bannerPosition: 2
    }).then(res => {
      this.bannerList = res.data;
    });
  },
  methods: {
    currentNav(index) {
      this.navIndex = index;
    },
    prev() {
      this.swiper.slidePrev();
    },
    next() {
      this.swiper.slideNext();
    },
    big(src) {
      this.bigImg = src;
      document.querySelector(".bigMask").style.display = "block";
    },
    close() {
      document.querySelector(".bigMask").style.display = "none";
    },
    navTo(ele) {
      document.querySelector(ele).scrollIntoView(); //代替a标签锚点的滚动
    }
  }
};
</script>
<style lang="scss" scoped>
.aboutUs {
  background: #fff;
  #nav-l {
    width: 160px;
    position: fixed;
    top: 660px;
    left: 300px;
    ul {
      li {
        width: 160px;
        height: 72px;
        color: #333333;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
        a {
          color: #333333;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 500;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        span {
          color: #333333;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 500;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &:hover {
          cursor: pointer;
        }
        &.active {
          background: url("../../assets/images/aboutUs/active.png") no-repeat;
          width: 168px;
          span {
            color: #ffffff;
          }
        }
      }
    }
  }
  .bigMask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99999;
    // background: #000000;
    // opacity: 0.36;
    background: rgba($color: #000000, $alpha: 0.36);
    display: none;
    img {
      margin: auto;
      display: block;
      margin-top: 100px;
    }
  }
  .banner {
    width: 100%;
    height: 400px;
    background: url("../../assets/images/aboutUs/banner.png") no-repeat;
  }
  .nav {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #606266;
    span {
      color: #333;
    }
  }
  .content {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 80px;
    display: flex;
    justify-content: space-between;
    // .nav-l {
    //   width: 160px;
    //   ul {
    //     li {
    //       width: 160px;
    //       height: 72px;
    //       color: #333333;
    //       font-size: 18px;
    //       font-family: PingFang SC;
    //       font-weight: 500;
    //       display: flex;
    //       align-items: center;
    //       justify-content: center;
    //       background: #f5f5f5;
    //       &:hover {
    //         cursor: pointer;
    //       }
    //       &.active {
    //         background: url("../../assets/images/aboutUs/active.png") no-repeat;
    //         width: 168px;
    //         color: #ffffff;
    //       }
    //     }
    //   }
    // }
    .nav-r {
      width: 954px;
      // height: 930px;
      min-height: 380px;
      background: #f5f5f5;
      border-radius: 4px;
      padding: 30px;
      .title {
        display: flex;
        align-items: center;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
        .line {
          width: 5px;
          height: 20px;
          background: #17a6f3;
          border-radius: 2px;
          margin-right: 11px;
        }
      }
      .con {
        margin-top: 35px;
        .con-t {
          display: flex;
          align-items: center;
          span {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            margin-left: 11px;
          }
        }
        p {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          line-height: 28px;
          text-indent: 23px;
          margin-top: 10px;
        }
        .bannerList {
          margin: 15px auto;
          width: 878px;
          // overflow: hidden;
          position: relative;
          .imgBox {
            position: relative;
            &:hover {
              .mask {
                display: block;
              }
            }
            .mask {
              display: none;
              position: absolute;
              width: 286px;
              height: 180px;
              left: 0;
              top: 0;
              background: #000000;
              opacity: 0.36;
              border-radius: 2px;
              // display: flex;
              align-items: center;
              justify-content: center;
              .box {
                margin-top: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                span {
                  font-size: 14px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #ffffff;
                  margin-left: 10px;
                }
              }
            }
          }
          .swiperImg {
            width: 286px;
            height: 180px;
            position: relative;
          }
          /deep/ .swiper-container {
            overflow: hidden;
          }
          /deep/ .swiper-wrapper {
            display: flex;
          }
          .swiper-slide {
            margin-right: 10px;
            text-align: center;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #666666;
          }
          .btn-prev {
            width: 40px;
            height: 40px;
            background: #cccccc;
            opacity: 0.7;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: -45px;
            top: 50%;
            margin-top: -30px;
            &:hover {
              cursor: pointer;
            }
            &.active {
              background: #17a6f3;
            }
          }
          .btn-next {
            width: 40px;
            height: 40px;
            background: #17a6f3;
            opacity: 0.7;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: -45px;
            top: 50%;
            margin-top: -30px;
            &:hover {
              cursor: pointer;
            }
            &.active {
              background: #cccccc;
            }
          }
        }
      }
    }
  }
}
</style>
