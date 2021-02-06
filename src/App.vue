<template>
  <div id="app">
    <!-- <div id="nav">
      <el-button type="primary">主要按钮</el-button>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Header
      ref="header"
      v-if="$route.meta.headerShow"
      @func="getMsgFormSon"
      @input="getInput"
    ></Header>
    <keep-alive>
      <!-- 头部传来的数据再传到路由视图中 -->
      <router-view
        @clear="clear"
        ref="search"
        v-if="$route.meta.keepAlive"
        :type="type"
      />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <Footer v-if="$route.meta.footerShow"></Footer>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default {
  name: "App",
  components: {
    Footer,
    Header
  },
  data() {
    return {
      type: ""
    };
  },
  methods: {
    getMsgFormSon(data) {
      // 头部子组件传来的值
      this.type = data;
      console.log(data, "data");
    },
    getInput(val) {
      // console.log(val, "val");
      // this.searchText = val;
      this.$refs.search.current(0); //调用子组件的方法 //搜索
    },
    clear() {
      this.$refs.header.clearInput(); //清空视图输入框
    }
  }
};
</script>

<style lang="scss">
body,
html,
ul,
li,
p,
h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style-type: none;
}
a {
  text-decoration: none;
}
html {
  scroll-behavior: smooth; //平滑滚动
}
#app {
  background: #f0f0f0;
}
</style>
