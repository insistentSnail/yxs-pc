import request from "./request";
// 预登录
export const clientLogin = config =>
  request({
    url: "/auth/oauth/token",
    method: "post",
    data: { grant_type: "client_credentials", scope: "server" },
    headers: {
      Authorization: "Basic eXhzLXBjOnl4cy1wYw==",
      "Content-Type": "	application/x-www-form-urlencoded"
    },
    clientLogin: true,
    ...config
  });
