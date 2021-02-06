import request from "@/api/request";
// 用户登录
export function login(data) {
  return request({
    url: "auth/oauth/token",
    method: "post",
    headers: {
      Authorization: "Basic eXhzLXBjOnl4cy1wYw==",
      "Content-Type": "	application/x-www-form-urlencoded"
    },
    clientLogin: true,
    data
  });
}

// 退出登录
export function logOut(data) {
  return request({
    url: "/auth/token/logout",
    method: "delete",
    // headers: {
    //   Authorization: "Basic eXhzLXBjOnl4cy1wYw==",
    //   "Content-Type": "	application/x-www-form-urlencoded"
    // },
    data
  });
}

// 刷新token
export function updateToken(data) {
  return request({
    url: "auth/oauth/token",
    method: "post",
    headers: {
      Authorization: "Basic eXhzLXBjOnl4cy1wYw==",
      "Content-Type": "	application/x-www-form-urlencoded"
    },
    clientLogin: true,
    data
  });
}
