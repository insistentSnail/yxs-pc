/*
 * @Author: lee
 * @Date: 2020-11-17 09:31:56
 * @LastEditTime: 2020-11-20 11:22:38
 * @LastEditors: lee
 * @Description: 
 */
import request from "@/api/request";
// 关于我们
export function getTenantInfo() {
  return request({
    url: "admin/api/tenant/getTenantInfo",
    method: "get"
  });
}
