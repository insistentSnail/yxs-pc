import request from "@/api/request";
// 项目列表
export function getNavList(data) {
  return request({
    url: "/news/api/news/getTrainType",
    method: "get",
    data
  });
}

// 轮播
export function getBannerList(data) {
  return request({
    url: "/news/api/navigation/getIndexNavigationVO",
    method: "get",
    headers: {
      "train-code": data.code
    },
    data
  });
}

// 行业资讯分类
export function getArticleCategory(data) {
  return request({
    url: "/news/api/articleCategory/getArticleCategoryList",
    method: "get",
    data
  });
}

//行业资讯列表
export function getNewsList(data) {
  return request({
    url: "/news/api/news/getNewsList",
    method: "get",
    data
  });
}

// 资讯详情
export function getNewsInfo(data) {
  return request({
    url: "/news/api/news/getNewsDetail",
    method: "get",
    data
  });
}

//考试资讯列表
export function getExamList(data) {
  return request({
    url: "news/api/news/getNewsPageByCode",
    method: "get",
    data
  });
}

// 考试大纲和考试介绍接口
export function examOutline(data) {
  return request({
    url: "news/api/examGuide/getExamGuidePC",
    method: "get",
    headers: {
      "train-code": data.code
    },
    data
  });
}

// 图片接口
export function getSimpleBanner(data) {
  return request({
    url: "news/api/navigation/getSimpleBanner",
    method: "get",
    data
  });
}

// 帮助中心
export function getHelp(data) {
  return request({
    url: "news/api/articleCategory/getArticleCategoryTreeByCode",
    method: "get",
    data
  });
}
// 帮助中心 刘子源
export function getHelpInfo(data) {
  return request({
    url: "news/api/news/getNewsDetail",
    method: "get",
    data
  });
}
