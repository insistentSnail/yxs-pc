import request from "@/api/request";
// 课程
export function myCourse(data) {
  return request({
    url: "/course/api/course/myCourse",
    method: "get",
    headers: {
      "train-code": data.code
    }
  });
}

// 班级
export function myClass(data) {
  return request({
    url: "/classroom/api/classrroom/myClassroom",
    method: "get",
    headers: {
      "train-code": data.code
    }
  });
}

// 用户首页
export function myHome(data) {
  return request({
    url: "/course/api/course/getCourseRecently",
    method: "get",
    headers: {
      "train-code": data.code
    }
  });
}

// 学习记录
export function myRecord(data) {
  return request({
    url: "/course/api/course/statistics",
    method: "get",
    data
  });
}

// 我的资料
export function myData(data) {
  return request({
    url: "/admin/api/user/selectUserInfo",
    method: "get",
    data
  });
}

// 获取省市
export function allCities(data) {
  return request({
    url: "/admin/api/region/tree",
    method: "get",
    data
  });
}

// 修改资料
export function updateData(data) {
  console.log(data);
  return request({
    url: "/admin/api/user/updateUserInfo",
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    data
  });
}

// 上传头像
export function uploadAvatar(data) {
  return request({
    url: "/admin/api/upload/token",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data
  });
}

// 考试记录
export function examResult(data) {
  return request({
    url: "/exam/api/examresult/page",
    method: "get",
    data
  });
}

// 考试错题
export function examError(data) {
  return request({
    url: "/exam/api/examwrong/examWrongAmount",
    method: "get",
    headers: {
      "train-code": data.code
    },
    data
  });
}

// 章节练习错题
export function practiceError(data) {
  return request({
    url: "/exam/api/examwrong/zjlxCountPage",
    method: "get",
    headers: {
      "train-code": data.code
    },
    data
  });
}
