// axios的封装 为了可以方便的统一的使用axios做数据请求
// axios是原生ajax的封装
import axios from "axios";
import qs from "qs";
import store from "@/store";
import { Message } from "element-ui";
import router from "@/router";
import { clientLogin } from "./app.js";
import { updateToken } from "./login.js";
import jsCookie from "js-cookie";
// create an axios instance
// axios.defaults.withCredentials = false;
const service = axios.create({
  withCredentials: false,
  baseURL: "/yxx", // api的base_url
  // baseURL: "http://125.65.83.218:9999",
  timeout: 8000 // request timeout
});

// request interceptor
// service.interceptors.request.use(
//   config => {
//     if (config.method.toLowerCase() === "post") {
//       config.data = qs.stringify(config.data, {
//         // arrayFormat: "repeat",
//         allowDots: true
//       });
//     } else {
//       // config.params = config.data;
//     }
//     return config;
//   },
//   error => {
//     // Do something with request error
//     console.log(error); // for debug
//     Promise.reject(error);
//   }
// );

service.interceptors.request.use(
  config => {
    config.headers["M-HOST"] = location.host;

    // config.headers["M-HOST"] = "125.65.83.218:8085";
    if (config.clientLogin != true) {
      if (store.getters.getAccessToken()) {
        // 用户登录了
        var obj =
          JSON.parse(window.localStorage.getItem("userInfo")) ||
          JSON.parse(
            jsCookie.get("userInfo", {
              domain: ".yixiaoshu.net"
            })
          );
        config.headers["TENANT-ID"] = obj.tenant_id;
      }
      // config.headers["M-HOST"] = location.host;
      // config.headers["M-HOST"] = "125.65.83.218";
      // config.headers["Basic"] = "eXhzLXBjOnl4cy1wYw==";

      config.headers["Authorization"] = store.getters.getAccessToken() //刷新页面用户登录的token就没了
        ? "Bearer " + store.getters.getAccessToken()
        : "Bearer " + store.getters.getClientToken();
      console.log(config.headers);
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone interceptor   拦截器
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data;
    return res;
  },
  error => {
    console.log(error.response);
    // 白屏的原因是存在access_token但是token失效了
    // 此时需要重刷页面
    if (!error.response) {
      window.localStorage.removeItem("access_token");
      jsCookie.remove("access_token", {
        domain: ".yixiaoshu.net"
      });
      location.reload();
      return false;
    }
    if (
      window.localStorage.getItem("userInfo") ||
      jsCookie.get("userInfo", {
        domain: ".yixiaoshu.net"
      })
    ) {
      // 不加这个判断login.vue里 error.response拿不到数据
      console.log(JSON.parse(window.localStorage.getItem("userInfo")));
      console.log(
        jsCookie.get("userInfo", {
          domain: ".yixiaoshu.net"
        })
      );
      var obj2 =
        JSON.parse(window.localStorage.getItem("userInfo")) ||
        JSON.parse(
          jsCookie.get("userInfo", {
            domain: ".yixiaoshu.net"
          })
        );
    }

    const code = error.response.status;
    if (code == 401) {
      if (error.response.data.code == 2) {
        // 提示用户重新登录
        store.dispatch("removeAccessToken"); //清除store里的token和用户信息
        // 跳转登录页
        Message({
          message: "登陆超时,请重新登录!",
          type: "error"
        });
        // 3.强制跳转
        router.push({ name: "Login" });
      } else {
        // 需要刷新token
        store.dispatch("removeAccessToken"); //登录失效清除本地用戶信息
        // 用户没登录报错401
        if (obj2 == null) {
          console.log(error.response);
          const config = error.config;
          if (config.clientLogin && config.retry !== true) {
            return clientLogin({ retry: true });
          }
        } else {
          // 是不是刷新的token也失效了导致白屏
          updateToken({
            grant_type: "refresh_token",
            refresh_token: obj2.refresh_token
          }).then(res => {
            console.log(res, "刷新前token", store.getters.getAccessToken());
            window.localStorage.setItem("userInfo", JSON.stringify(res));
            jsCookie.set("userInfo", JSON.stringify(res), {
              domain: ".yixiaoshu.net"
            });
            store.dispatch("setAccessToken", res.access_token);
            console.log("刷新后token", store.getters.getAccessToken());
            location.reload();
          });
        }
      }
    }

    if (code == 426) {
      // 提示用户重新登录
      store.dispatch("removeAccessToken"); //清除store里的token和用户信息
      // 跳转登录页
      // Message({
      //   message: "登陆超时,请重新登录!",
      //   type: "error"
      // });
      // 3.强制跳转
      router.push({ name: "Login" });
    }

    console.log(error.response);
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

function http(config) {
  if (config.method.toLowerCase() === "post") {
    // 假如"Content-Type": "application/json"时,就不需要qs序列化了
    console.log(config, "封装接口");
    if (config.headers["Content-Type"] == "application/json;charset=UTF-8") {
    } else {
      // 主要是表单，formdata需要处理  qs.stringify参数会拼接在地址栏
      config.data = qs.stringify(config.data, {
        arrayFormat: "repeat",
        allowDots: true
      });
    }
  } else {
    config.params = config.data;
  }
  return service(config);
}

export default http;
