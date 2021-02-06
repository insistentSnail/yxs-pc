import storage from "store";
import jsCookie from "js-cookie";
export default {
  getAccessToken: state => () =>
    state.accessToken ||
    storage.get("access_token") ||
    jsCookie.get("access_token", {
      domain: ".yixiaoshu.net"
    }),
  getClientToken: state => () =>
    state.clientToken || storage.get("client_token")
};
