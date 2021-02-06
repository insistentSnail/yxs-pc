<template>
  <div class="userCenterOrder">
    <div class="orderTitle">
      <img src="@/assets/images/userCenter/titleSign.png" alt="" />
      <span>我的订单</span>
    </div>
    <ul>
      <li>
        <div class="paymentTime">支付时间 2020-08-09 29:48:09</div>
        <div class="content">
          <div class="content-l">
            <div class="orderImg">
              <img src="@/assets/images/userCenter/mfgkk.png" alt="" />
            </div>
            <div class="infoText">
              <p class="p1">2020执业中药师 药学专业知识二 基础精讲</p>
              <p class="p2"><span>¥</span>1399.00</p>
            </div>
          </div>
          <div class="content-r">支付成功</div>
        </div>
      </li>

      <li>
        <div class="paymentTime">支付时间 2020-08-09 29:48:09</div>
        <div class="content">
          <div class="content-l">
            <div class="orderImg">
              <img src="@/assets/images/userCenter/mfgkk.png" alt="" />
            </div>
            <div class="infoText">
              <p class="p1">2020执业中药师 药学专业知识二 基础精讲</p>
              <p class="p2"><span>¥</span>1399.00</p>
            </div>
          </div>
          <div class="content-r">支付成功</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "UserCenterOrder",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.userCenterOrder {
  width: 892px;
  height: 904px;
  background: #ffffff;
  border-radius: 6px;
  padding: 0 30px;
  overflow: hidden;
  .orderTitle {
    margin-top: 30px;
    display: flex;
    align-items: center;
    span {
      margin-left: 8px;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
    }
  }
  ul {
    li {
      margin-top: 20px;
      width: 892px;
      height: 214px;
      border: 1px solid #e4e4e4;
      border-radius: 1px;
      .paymentTime {
        height: 42px;
        background: #f8f8f8;
        border-bottom: 1px solid #e4e4e4;
        border-radius: 1px;
        display: flex;
        align-items: center;
        text-indent: 24px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
      .content {
        margin-top: 20px;
        height: 124px;
        padding: 0 24px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .content-l {
          display: flex;
          .orderImg {
            width: 191px;
            height: 124px;
            img {
              width: 191px;
              height: 124px;
            }
          }
          .infoText {
            margin-left: 16px;
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
              font-size: 24px;
              font-family: Arial;
              font-weight: 400;
              color: #ff4520;
              span {
                font-size: 16px;
              }
            }
          }
        }
        .content-r {
          width: 90px;
          height: 30px;
          background: #ffffff;
          border: 1px solid #ff4520;
          border-radius: 4px;
          text-align: center;
          line-height: 30px;
          box-sizing: border-box;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ff4520;
        }
      }
    }
  }
}
</style>
