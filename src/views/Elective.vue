<template>
  <div class="elective">
    <!-- 导航栏 -->
    <div class="navlist">
      <div class="nav-l">
        {{ type ? "试试筛选这些：" : "选择考试：" }}
      </div>
      <div class="nav-r">
        <ul>
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="navActive == index ? 'active' : ''"
            @click="current(index)"
          >
            {{ item.name }}<span>|</span>
          </li>
        </ul>
      </div>

      <div class="nav-l">排序：</div>
      <div class="nav-r">
        <ul>
          <li
            style="margin-right: 10px;"
            v-for="(item, index) in sortList"
            :key="index"
            :class="sortActive == index ? 'active' : ''"
            @click="sortCurrent(index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>

      <div class="nav-l">价格：</div>
      <div class="nav-r">
        <ul>
          <li
            style="margin-right: 10px;"
            v-for="(item, index) in freeList"
            :key="index"
            :class="freeActive == index ? 'active' : ''"
            @click="freeCurrent(index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>

    <p
      v-if="selectItems.length > 0 || hotItems.length > 0"
      style="font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #343434;
     text-align:center;
     padding:15px 0 10px;
    "
    >
      为您找到以下相关内容
    </p>
    <!-- 热门班级 -->
    <div class="hotClass" v-if="type != 1 || !type">
      <div class="hotClass-c" v-if="hotItems.length > 0">
        <div class="hotClass-t">
          <div class="hotClassIcon">
            <img src="@/assets/images/home/hot.png" alt="" />
            <span>热门班级</span>
          </div>
        </div>
        <div class="hotItems">
          <div
            class="hotItem"
            v-for="(item, index) in hotItems"
            :key="index"
            @click="routerToClass(item.id)"
          >
            <div class="hot-t">
              <img
                style="width:277px;height:180px;object-fit: cover;"
                :src="item.smallPicture"
                alt=""
              />
              <div class="applyPeople">
                <span>共{{ item.courseNum }}门课</span>
                <span>{{ item.actualLearnNum }}人报名</span>
              </div>
            </div>
            <div class="hot-c">
              {{ item.title }}
            </div>
            <div class="hot-b">
              <span>
                <span>¥</span>
                <span style="font-size:20px;font-weight:bold;margin-left:3px">{{
                  item.price
                }}</span>
              </span>
              <div class="apply">
                立即报名
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="nodata" v-else>
        <img src="@/assets/images/userCenter/noData.png" alt="" />
        <p class="nodataText">未找到相关内容,请尝试其他关键词</p>
      </div> -->
    </div>

    <!-- 精选课程 -->
    <div class="hotClass" v-if="type != 0 || !type">
      <div
        class="hotClass-c"
        style="margin-top:10px"
        v-if="selectItems.length > 0"
      >
        <div class="hotClass-t">
          <div class="hotClassIcon">
            <img src="@/assets/images/home/select.png" alt="" />
            <span>精选课程</span>
          </div>
        </div>
        <div class="selectContent">
          <div
            class="selectItem"
            v-for="(item, index) in selectItems"
            @click="routerToFreeCourse(item.id)"
            :key="index"
            :class="index > 4 ? 'margin selectItem' : 'selectItem'"
          >
            <div class="select-t">
              <img
                style="width:216px;height:140px;object-fit: cover;"
                :src="item.smallPicture"
                alt=""
              />
            </div>
            <div class="select-c">{{ item.title }}</div>
            <div class="select-b">
              <div class="left">讲师：{{ item.teacherName }}</div>
              <div class="right">
                <span>¥</span>
                <span style="font-size:20px;font-weight:bold;margin-left:3px">{{
                  item.price
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="nodata" v-else>
        <img src="@/assets/images/userCenter/noData.png" alt="" />
        <p class="nodataText">未找到相关内容,请尝试其他关键词</p>
      </div> -->
    </div>

    <div class="nodata" v-if="selectItems.length == 0 && hotItems.length == 0">
      <img src="@/assets/images/userCenter/noData.png" alt="" />
      <p class="nodataText">未找到相关内容,请尝试其他关键词</p>
    </div>
    <!-- 定制学习方案 -->
    <div class="selfProject">
      <div class="project-banner">
        <img src="@/assets/images/elective/banner.png" alt="" />
        <p class="p1">名师为你定制专属学习方案</p>
        <p class="p2">适合自己的才是最好的</p>
      </div>
      <div class="project-form">
        <div class="form-row">
          <span>1.您的年龄？</span>
          <el-radio-group v-model="form.age" style="margin-top: 5px">
            <el-radio :label="1">18-24岁</el-radio>
            <el-radio :label="2">24岁-30岁</el-radio>
            <el-radio :label="3">30-40岁</el-radio>
            <el-radio :label="4">40岁以上</el-radio>
          </el-radio-group>
        </div>
        <div class="form-row">
          <span>2.您的学历?</span>
          <el-radio-group v-model="form.education" style="margin-top: 5px">
            <el-radio :label="1">中专</el-radio>
            <el-radio :label="2">大专</el-radio>
            <el-radio :label="3">本科</el-radio>
            <el-radio :label="4">本科以上</el-radio>
          </el-radio-group>
        </div>
        <div class="form-row">
          <span>3.您的基础如何？</span>
          <el-radio-group v-model="form.basics" style="margin-top: 5px">
            <el-radio :label="1">零基础</el-radio>
            <el-radio :label="2">基础一般</el-radio>
            <el-radio :label="3">基础较好</el-radio>
          </el-radio-group>
        </div>
        <div class="form-row" style="height:117px">
          <span>4.您想去考哪种证书？</span>
          <el-radio-group
            v-model="form.certificate"
            style="height: 50px;margin-top: 5px;display: flex;flex-wrap: wrap;"
          >
            <el-radio :label="1">护士资格</el-radio>
            <el-radio :label="2">初级药士</el-radio>
            <el-radio :label="3">初级药师</el-radio>
            <el-radio :label="4">初级中药师</el-radio>
            <el-radio :label="5">执业药师</el-radio>
            <el-radio :label="6">健康管理师</el-radio>
            <el-radio :label="7" style="align-self: flex-end;"
              >乡村助理医师</el-radio
            >
            <el-radio :label="8" style="align-self: flex-end;"
              >护理自考本科</el-radio
            >
            <el-radio :label="9" style="align-self: flex-end;"
              >药学自考本科</el-radio
            >
          </el-radio-group>
        </div>
        <div class="formInput">
          <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
          <el-input
            v-model="form.phone"
            placeholder="请输入您的手机号码"
            style="margin-right:20px"
          ></el-input>
          <el-input
            v-model="form.yzm"
            placeholder="请输入右侧图形验证码"
            class="yzmInput"
          ></el-input>
          <div class="yzm">验证码</div>
          <el-button type="primary" @click="submit">提交报名申请</el-button>
        </div>
        <p class="tip">- 提交后即可获得免费学习名额 -</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getCourseList, getClassList, getTabList } from "@/api/home/home.js";
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  name: "Elective",
  props: ["type"],
  data() {
    return {
      navList: [],
      sortList: [
        // { name: "综合", orderStatus: 0 },
        { name: "最热", orderStatus: 2 },
        { name: "最新", orderStatus: 1 }
      ],
      freeList: [
        // { name: "综合", payFlag: "" },
        { name: "付费", payFlag: 1 },
        { name: "免费", payFlag: 0 }
      ],
      navActive: 0,
      sortActive: 0,
      freeActive: 0,
      selectItems: [],
      form: {
        age: 1,
        education: 1,
        basics: 1,
        certificate: 1,
        name: "",
        phone: "",
        yzm: ""
      },
      hotItems: [],
      activeName: ""
    };
  },
  computed: {
    ...mapGetters(["getKeyword"])
  },
  // 只触发一次
  async created() {
    console.log(this.type, "type");
    // this.initElective();
    console.log(this.$route.query.index);
    this.navList = await getTabList().then(res => {
      return res.data;
    });
    if (this.$route.query.index) {
      this.current(this.$route.query.index - 1);
    } else {
      this.current(0);
    }
  },
  // 一进入页面就触发  keepAlive后回退再进来不会触发created ，因此写在activated里面
  async activated() {
    this.navList = await getTabList().then(res => {
      return res.data;
    });
    if (this.$route.query.index) {
      this.current(this.$route.query.index - 1);
    } else {
      this.current(0);
    }
  },
  methods: {
    // initElective() {
    //   // 班級
    //   getClassList({ size: 4 }).then(res => {
    //     this.hotItems = res.data.records;
    //   });
    //   // 精选课程
    //   getCourseList({ payFlag: 1 }).then(res => {
    //     this.selectItems = res.data.records;
    //   });
    //   getTabList().then(res => {
    //     this.navList = res.data;
    //   });
    // },
    // 班级跳转详情
    routerToClass(id) {
      this.$router.push({
        name: "Class",
        params: { id: id, activeName2: this.activeName }
      });
    },
    // 课程跳转
    routerToFreeCourse(id) {
      this.$router.push({
        name: "Course",
        params: { id: id, activeCourse: this.activeName }
      });
    },
    current(index) {
      console.log(store.getters.getKeyword, 159);
      if (index != 0) {
        // this.searchText = "";
        this.$emit("clear"); //清空视图搜索框
        store.commit("CLEAR_KEYWORD"); //清空store里的搜索值
      }
      this.navActive = index;
      this.sortActive = 0; //每次选择考试项目 价格和排序默认第一个
      this.freeActive = 0;
      getClassList({
        orderStatus: this.sortList[this.sortActive].orderStatus,
        code: this.navList[this.navActive].code,
        payFlag: this.freeList[this.freeActive].payFlag,
        size: 4,
        title: store.getters.getKeyword
      }).then(res => {
        this.hotItems = res.data.records;
      });
      getCourseList({
        orderStatus: this.sortList[this.sortActive].orderStatus,
        code: this.navList[this.navActive].code,
        payFlag: this.freeList[this.freeActive].payFlag,
        size: 60,
        title: store.getters.getKeyword
      }).then(res => {
        this.selectItems = res.data.records;
      });
      this.activeName = this.navList[this.navActive].name;
    },
    sortCurrent(index) {
      this.sortActive = index;
      getClassList({
        orderStatus: this.sortList[this.sortActive].orderStatus,
        code: this.navList[this.navActive].code,
        payFlag: this.freeList[this.freeActive].payFlag,
        size: 4,
        title: store.getters.getKeyword
      }).then(res => {
        this.hotItems = res.data.records;
      });
      getCourseList({
        orderStatus: this.sortList[this.sortActive].orderStatus,
        code: this.navList[this.navActive].code,
        payFlag: this.freeList[this.freeActive].payFlag,
        size: 60,
        title: store.getters.getKeyword
      }).then(res => {
        this.selectItems = res.data.records;
      });
    },
    freeCurrent(index) {
      this.freeActive = index;
      getClassList({
        orderStatus: this.sortList[this.sortActive].orderStatus,
        code: this.navList[this.navActive].code,
        payFlag: this.freeList[this.freeActive].payFlag,
        size: 4,
        title: store.getters.getKeyword
      }).then(res => {
        this.hotItems = res.data.records;
      });
      getCourseList({
        orderStatus: this.sortList[this.sortActive].orderStatus,
        code: this.navList[this.navActive].code,
        payFlag: this.freeList[this.freeActive].payFlag,
        size: 60,
        title: store.getters.getKeyword
      }).then(res => {
        this.selectItems = res.data.records;
      });
    },
    submit() {
      console.log(this.form);
    }
  }
};
</script>
<style lang="scss" scoped>
.elective {
  .nodata {
    width: 330px;
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
  // element-ui样式修改
  .yzmInput {
    /deep/ .el-input__inner {
      background: #f1f1f1;
    }
  }
  .el-radio {
    width: 110px;
  }
  .el-radio-group {
    width: 850px;
  }
  .el-button {
    width: 264px;
  }
  background: #f0f0f0;
  margin-top: 20px;
  margin-bottom: 60px;
  // 导航栏
  .navlist {
    width: 1200px;
    // height: 190px;
    padding-bottom: 10px;
    background: #ffffff;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    .nav-l {
      width: 100px;
      margin-top: 29px;
      margin-left: 20px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #9a9a9a;
    }
    .nav-r {
      width: 1000px;
      margin-top: 26px;
      margin-left: 10px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #343434;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          line-height: 26px;
          &:hover {
            cursor: pointer;
          }
          &.active {
            color: #18a6f3;
          }
          span {
            margin: 0 20px;
            color: #e4e4e4;
          }
        }
      }
    }
  }
  // 热门班级
  .hotClass {
    width: 100%;
    .hotClass-c {
      width: 1200px;
      margin: 10px auto 0;
      .hotClass-t {
        height: 30px;
        .hotClassIcon {
          float: left;
          height: 30px;
          display: flex;
          align-items: center;
          span {
            margin-left: 12px;
            font-size: 24px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #353535;
          }
        }
      }
      .hotItems {
        margin-top: 20px;
        display: flex;
        // justify-content: space-between;
        .hotItem {
          width: 277px;
          height: 309px;
          background: #ffffff;
          border-radius: 6px;
          overflow: hidden;
          margin-right: 30px;
          &:nth-child(4) {
            margin-right: 0px;
          }
          &:hover {
            cursor: pointer;
          }
          .hot-t {
            height: 180px;
            width: 277px;
            position: relative;
            .applyPeople {
              width: calc(100% - 36px);
              height: 35px;
              position: absolute;
              bottom: 0;
              background: #181818;
              opacity: 0.36;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 18px;
              span {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;
                opacity: 0.84;
              }
            }
          }
          .hot-c {
            margin: 18px auto 19px;
            width: 238px;
            height: 43px;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 300;
            color: #333333;
          }
          .hot-b {
            width: 238px;
            margin: 20px auto 0;
            display: flex;
            justify-content: space-between;
            height: 32px;
            align-items: center;
            span {
              font-size: 14px;
              font-family: Arial;
              font-weight: 400;
              color: #ff4520;
            }
            .apply {
              width: 96px;
              height: 32px;
              background: #17a5f2;
              border-radius: 4px;
              line-height: 32px;
              text-align: center;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
  // 精选课程
  .selectContent {
    margin-top: 18px;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    .selectItem {
      width: 216px;
      height: 272px;
      margin-right: 30px;
      background: #f8f8f8;
      border-radius: 6px;
      overflow: hidden;
      &:nth-child(5) {
        margin-right: 0px;
      }
      &:nth-child(10) {
        margin-right: 0px;
      }
      &:nth-child(15) {
        margin-right: 0px;
      }
      &:nth-child(20) {
        margin-right: 0px;
      }
      &:nth-child(25) {
        margin-right: 0px;
      }
      &:nth-child(30) {
        margin-right: 0px;
      }
      &:nth-child(35) {
        margin-right: 0px;
      }
      &:nth-child(40) {
        margin-right: 0px;
      }
      &:nth-child(45) {
        margin-right: 0px;
      }
      &:nth-child(50) {
        margin-right: 0px;
      }
      &:nth-child(55) {
        margin-right: 0px;
      }
      &:nth-child(60) {
        margin-right: 0px;
      }
      &:hover {
        cursor: pointer;
      }
      &.margin {
        margin-top: 20px;
      }
      .select-t {
        width: 100%;
        height: 140px;
      }
      .select-c {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 300;
        color: #333333;
        line-height: 28px;
        height: 85px;
        margin: 0 17px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
      }
      .select-b {
        height: 46px;
        padding: 0 17px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #888888;
        }
        .right {
          font-size: 14px;
          font-family: Arial;
          font-weight: 400;
          color: #ff4520;
        }
      }
    }
  }
  // 定制学习方案
  .selfProject {
    width: 1200px;
    height: 546px;
    margin: 60px auto 0;
    background: #ffffff;
    box-shadow: 0px 5px 6px 0px rgba(10, 2, 4, 0.06);
    border-radius: 0px 0px 6px 6px;
    .project-banner {
      height: 98px;
      width: 100%;
      position: relative;
      p {
        position: absolute;
        width: 100%;
      }
      .p1 {
        top: 30px;
        text-align: center;
        color: #ffffff;
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: 400;
      }
      .p2 {
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.64;
        bottom: 7px;
      }
    }
    .project-form {
      padding: 0 30px;
      height: 448px;
      .form-row {
        height: 67px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        align-items: center;
        span {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          display: inline-block;
          width: 258px;
        }
      }
      .formInput {
        height: 46px;
        margin-top: 30px;
        display: flex;
        align-items: center;
        .el-input {
          width: 238px;
          margin-right: 12px;
        }
        .yzm {
          width: 90px;
          height: 38px;
          border: 1px solid #ccc;
          line-height: 38px;
          text-align: center;
          margin-right: 22px;
        }
      }
      .tip {
        margin-top: 16px;
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #a5a5a5;
      }
    }
  }
}
</style>
