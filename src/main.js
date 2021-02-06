import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../permission.js";
// Cookies存储 单点登录
import jsCookie from "js-cookie";
Vue.prototype.$cookie = jsCookie;
Vue.use(ElementUI);

Vue.config.productionTip = false;
//路由跳转回到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

import _ from "lodash";
Vue.prototype._ = _;

import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

import { Swipe, SwipeItem } from "vant";

Vue.use(Swipe);
Vue.use(SwipeItem);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
