<template>
  <div class="footerMain">
    <div class="footer-c">
      <div class="footer-t">
        <div class="footer-l">
          <div class="footerText">
            <p @click="$router.push({ name: 'AboutUs' })">关于我们</p>
            <p @click="$router.push({ name: 'AboutUs' })">联系我们</p>
          </div>
          <div class="long"></div>
          <div class="footerText">
            <p @click="$router.push({ name: 'Yszc' })">隐私条款</p>
            <p @click="$router.push({ name: 'Yhxy' })">用户协议</p>
          </div>
          <div class="long"></div>
          <div class="footerText">
            <p @click="intoHelp">帮助中心</p>
            <p @click="intoMessage">留言反馈</p>
          </div>
          <div class="long"></div>
          <div class="footerText">
            <p>
              <a target="_blank" href="https://www.yixiaoshu.net/">
                商务合作
              </a>
            </p>
            <p class="wb"><img src="@/assets/images/home/wb.png" alt="" /></p>
          </div>
          <div class="long"></div>
          <div class="footerText">
            <p>客服电话</p>
            <p class="tel">{{ tel ? tel : "0791-88197248" }}</p>
          </div>
        </div>
        <div class="footer-r">
          <img src="@/assets/images/home/appDownLoad.png" alt="" />
          <span>APP下載</span>
        </div>
      </div>
    </div>
    <div class="footer-b">
      <span>技术支持： 南昌云端网络科技有限公司 赣ICP备15008425号-7</span>
      <img src="@/assets/images/home/police.png" alt="" style="margin:0 10px" />
      <span class="beian" style="margin-left:8px" @click="toBei()"
        >备案号：赣ICP备15008425号</span
      >
      <span style="margin-left:8px">赣公网安备：36011102000325号 </span>
      <span style="margin-left:8px">增值电信业务许可证号：赣B2-20210020</span>
    </div>
  </div>
</template>

<script>
import { tenement } from "@/api/home/home.js";
export default {
  name: "FooterMain",
  props: {},
  data() {
    return {
      tel: "",
      info: {}
    };
  },
  created() {
    if (this.$cookie.get("userInfo", { domain: ".yixiaoshu.net" })) {
      this.info = JSON.parse(
        this.$cookie.get("userInfo", {
          domain: ".yixiaoshu.net"
        })
      );
    }
    if (window.localStorage.getItem("userInfo")) {
      this.info = JSON.parse(window.localStorage.getItem("userInfo"));
    }
    console.log(this.info, "this.info");
    var url = window.location.href;
    var matchReg = /\?.*/g; //匹配？之后的部分
    console.log(url.match(matchReg));
    var id = "";
    if (url.match(matchReg) != null) {
      // 说明地址栏？后面有参数
      id = this.getSearchString("id", url.match(matchReg)[0]);
      localStorage.setItem("tenantId", id);
    }

    if (this.info.tenant_id) {
      localStorage.setItem("tenantId", this.info.tenant_id);
    }

    //key(需要检索的键） url（传入的需要分割的url地址，例：?id=2&age=18）
    console.log(id, this.info.tenant_id, 55555);
    // 根据id查询租户信息
    //用户登录了就传用户信息里的id，否则传首页地址栏里的id
    tenement({
      // tenantId: localStorage.getItem("tenantId")
    })
      .then(res => {
        console.log("租户信息2", res);
        if (res.data != null) {
          this.logo = res.data.logo;
          this.tel = res.data.telephone;
        }
      })
      .finally(() => {
        this.showLogo = true;
      });
  },
  methods: {
    toBei() {
      window.open("http://beian.miit.gov.cn/");
    },
    getSearchString(key, Url) {
      var str = Url;
      str = str.substring(1, str.length); // 获取URL中?之后的字符（去掉第一位的问号）
      // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
      var arr = str.split("&");
      var obj = new Object();
      // 将每一个数组元素以=分隔并赋给obj对象
      for (var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
      }
      return obj[key];
    },
    intoHelp() {
      this.$router.push({
        name: "Help"
      });
    },
    intoMessage() {
      this.$router.push({
        name: "Message"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footerMain {
  width: 100%;
  height: 174px;
  background-color: #30343e;
  position: relative;
  z-index: 999;
  .footer-c {
    width: 1200px;
    margin: 0 auto;
    height: 134px;
    .footer-t {
      height: 134px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .footer-r {
        display: flex;
        flex-direction: column;
        margin-top: 26px;
        margin-right: 5px;
        span {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #747474;
          margin-top: 10px;
          text-align: center;
        }
      }
    }
    .footer-l {
      margin-top: 5px;
      display: flex;
      align-items: center;
      .footerText {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #747474;
        height: 48px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        p {
          &:hover {
            cursor: pointer;
          }
          a {
            color: #747474;
          }
        }
        .wb {
          display: flex;
          align-items: flex-end;
        }
        .tel {
          font-size: 20px;
          font-family: DIN;
          font-weight: bold;
          color: #e0e0e0;
          display: flex;
          align-items: flex-end;
        }
      }
      .long {
        width: 1px;
        height: 40px;
        background: #666668;
        opacity: 0.3;
        margin-left: 40px;
        margin-right: 40px;
      }
    }
  }
  .footer-b {
    height: 40px;
    background: #262a33;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #747474;
    .beian {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
