import Vue from "vue";
import Vuex from "vuex";
import storage from "store";
import jsCookie from "js-cookie";
// import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clientToken: "",
    accessToken: "",
    userInfo: "",
    keyword: ""
  },
  mutations: {
    SET_ACCESS_TOKEN(store, token) {
      store.accessToken = token;
      storage.set("access_token", token);
      jsCookie.set("access_token", token, {
        domain: ".yixiaoshu.net"
      });
    },
    SET_CLIENT_TOKEN(store, token) {
      store.clientToken = token;
      storage.set("client_token", token);
    },
    CLEAR_ACCESS_TOKEN(store, token) {
      store.accessToken = "";
      store.clientToken = "";
      storage.remove("access_token", token);
      storage.remove("client_token", token);
      window.localStorage.removeItem("userInfo");
      jsCookie.remove("access_token", {
        domain: ".yixiaoshu.net"
      });
      jsCookie.remove("userInfo", {
        domain: ".yixiaoshu.net"
      });
    },
    SET_USER_INFO(store, userInfo) {
      store.userInfo = userInfo;
      storage.set("user_info", userInfo);
    },
    SET_KEYWORD(store, keyword) {
      store.keyword = keyword.replace(/\s+/g, "");
      storage.set("keyword", keyword);
    },
    CLEAR_KEYWORD(store, keyword) {
      store.keyword = "";
      storage.remove("keyword", keyword);
    }
  },
  actions: {
    setAccessToken({ commit }, token) {
      commit("SET_ACCESS_TOKEN", token);
    },
    setClientToken({ commit }, token) {
      commit("SET_CLIENT_TOKEN", token);
    },
    removeAccessToken({ commit }) {
      commit("CLEAR_ACCESS_TOKEN");
    }
  },
  getters: {
    getKeyword: state => state.keyword || storage.get("keyword"),
    getAccessToken: state => () =>
      state.accessToken ||
      storage.get("access_token") ||
      jsCookie.get("access_token", {
        domain: ".yixiaoshu.net"
      }),
    getClientToken: state => () =>
      state.clientToken || storage.get("client_token")
  },
  modules: {}
});
