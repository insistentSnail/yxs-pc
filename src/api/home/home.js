import request from "@/api/request";
// 课程
export function getCourseList(data) {
  return request({
    url: "/course/api/course/getCourseListPC",
    method: "get",
    clientLogin: false,
    data
  });
}
// 班级
export function getClassList(data) {
  return request({
    url: "/classroom/api/classrroom/getClassListPC",
    method: "get",
    clientLogin: false,
    data
  });
}

// tab栏
export function getTabList(data) {
  return request({
    url: "/news/api/news/getTrainType",
    method: "get",
    clientLogin: false,
    data
  });
}

// 项目分类
export function getProjectType(data) {
  return request({
    url: "/news/api/news/getProjectTypeListPC",
    method: "get",
    clientLogin: false,
    data
  });
}

// 金牌讲师
export function getGoldTeacher(data) {
  return request({
    url: "/course/api/teacher/getTeacherList",
    method: "get",
    clientLogin: false,
    data
  });
}

// 轮播图
export function carousel(data) {
  return request({
    url: "/news/api/navigation/getBannerPC",
    method: "get",
    clientLogin: false,
    data
  });
}

// 根据id查询租户信息
export function tenement(data) {
  return request({
    url: "/admin/api/tenant/getTenantById",
    method: "get",
    data
  });
}
