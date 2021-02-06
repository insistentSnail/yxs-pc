import request from "@/api/request";
// 反馈提交
export function feedbackSubmit(data) {
  return request({
    url: "/news/api/feedBack",
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    data
  });
}
