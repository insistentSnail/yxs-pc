import router from "@/router";
import store from "@/store";
import { clientLogin } from "@/api/app.js";

router.beforeEach((to, from, next) => {
  if (!store.getters.getAccessToken()) {
    //用户没登录
    if (!store.getters.getClientToken()) {
      // 预登录也没有
      debugger;
      clientLogin().then(res => {
        if (res.access_token) {
          store.dispatch("setClientToken", res.access_token);
          next();
        }
      });
    } else {
      // 预登录了
      next();
      console.log("预登录了");
    }
  } else {
    // if (!store.getters.getClientToken()) {
    //   clientLogin().then(res => {
    //     if (res.access_token) {
    //       store.dispatch("setClientToken", res.access_token);
    //       next();
    //     }
    //   });
    // } else {
    next();
    console.log("用户登录");
    // }
  }
});
