import request from "@/api/request";
// 班级
export function getClassDetail(data) {
  return request({
    url: "/classroom/api/classrroom/getClassroomDetail",
    method: "get",
    data
  });
}
