import request from "@/api/request";
// 课程
export function getCourseDetail(data) {
  return request({
    url: "/course/api/course/getCourseDetail",
    method: "get",
    data
  });
}

// 课程视频播放
export function videoPlay(data) {
  return request({
    url: "/course/api/course/videoPlay",
    method: "get",
    data
  });
}

// 课程视频暂停接口
export function videoPause(data) {
  return request({
    url: "/course/api/course/finishStudy",
    method: "get",
    data
  });
}
